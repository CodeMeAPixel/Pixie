import {
  type UIMessage,
  appendResponseMessages,
  createDataStreamResponse,
  smoothStream,
  streamText,
} from 'ai';
import { auth } from '@/app/(auth)/auth';
import { systemPrompt } from '@/lib/ai/prompts';
import {
  deleteChatById,
  getChatById,
  saveChat,
  saveMessages,
} from '@/lib/db/queries';
import {
  generateUUID,
  getMostRecentUserMessage,
  getTrailingMessageId,
} from '@/lib/utils';
import { generateTitleFromUserMessage } from '../../actions';
import { createDocument } from '@/lib/ai/tools/create-document';
import { updateDocument } from '@/lib/ai/tools/update-document';
import { requestSuggestions } from '@/lib/ai/tools/request-suggestions';
import { getWeather } from '@/lib/ai/tools/get-weather';
import { isProductionEnvironment } from '@/lib/constants';
import { myProvider } from '@/lib/ai/providers';
import { Session } from 'next-auth';
import { chatModels, canAccessModel } from '@/lib/ai/models';
import { z } from 'zod';
import { webSearch } from '@/lib/ai/tools/web-search';
import { codeInterpreter } from '@/lib/ai/tools/code-interpreter';
import { randomUUID } from 'crypto';

export const maxDuration = 60;

const generateMessageUUID = () => randomUUID();

export async function POST(request: Request) {
  try {
    const { id, messages, selectedChatModel } = await request.json();

    const authSession = await auth();

    // Validate selected model exists
    const selectedModel = chatModels.find(m => m.id === selectedChatModel);
    if (!selectedModel) {
      return new Response('Invalid model selected', { status: 400 });
    }

    // Check model access with proper user properties
    const canAccess = canAccessModel(selectedModel, authSession?.user?.id ? {
      id: authSession.user.id,
      isPremium: authSession.user.isPremium ?? false,
      isAdmin: authSession.user.isAdmin ?? false,
      isBeta: authSession.user.isBeta ?? false,
      isBanned: authSession.user.isBanned ?? false
    } : undefined);

    if (!canAccess) {
      return new Response('You do not have access to this model', { status: 403 });
    }

    // Create session for anonymous users
    const session: Session = authSession || {
      user: {
        id: 'anonymous',
        name: 'Anonymous User',
        email: 'anonymous@user.com',
      },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    };

    const userMessage = getMostRecentUserMessage(messages);

    if (!userMessage) {
      return new Response('No user message found', { status: 400 });
    }

    // Only handle chat history for authenticated users
    if (authSession?.user?.id) {
      const chat = await getChatById({ id });

      if (!chat) {
        const title = await generateTitleFromUserMessage({
          message: userMessage,
        });

        await saveChat({ id, userId: authSession.user.id, title });
      } else {
        if (chat.userId !== authSession.user.id) {
          return new Response('Forbidden', { status: 403 });
        }
      }

      await saveMessages({
        messages: [
          {
            chatId: id,
            id: generateMessageUUID(), // Use proper UUID format
            role: 'user',
            parts: userMessage.parts,
            attachments: userMessage.experimental_attachments ?? [],
            createdAt: new Date(),
          },
        ],
      });
    }

    // Rest of the stream handling code remains the same
    return createDataStreamResponse({
      execute: async (dataStream) => {
        const result = streamText({
          model: myProvider.languageModel(selectedModel.id),
          system: await systemPrompt(request),
          messages,
          maxSteps: 5,
          experimental_activeTools: [
            'getWeather',
            'createDocument',
            'updateDocument',
            'requestSuggestions',
            'web_search',
            'codeInterpreter',
          ],
          tools: {
            getWeather,
            createDocument: createDocument({ session, dataStream }),
            updateDocument: updateDocument({ session, dataStream }),
            requestSuggestions: requestSuggestions({ session, dataStream }),
            web_search: webSearch({ dataStream }),
            codeInterpreter: codeInterpreter(),
          },
          onFinish: async ({ response }) => {
            // Only save assistant messages for authenticated users
            if (authSession?.user?.id) {
              try {
                const assistantId = generateMessageUUID(); // Use proper UUID for assistant message
                const [, assistantMessage] = appendResponseMessages({
                  messages: [userMessage],
                  responseMessages: response.messages,
                });

                await saveMessages({
                  messages: [
                    {
                      id: assistantId,
                      chatId: id,
                      role: assistantMessage.role,
                      parts: assistantMessage.parts,
                      attachments:
                        assistantMessage.experimental_attachments ?? [],
                      createdAt: new Date(),
                    },
                  ],
                });
              } catch (_) {
                console.error('Failed to save chat');
              }
            }
          },
          experimental_telemetry: {
            isEnabled: isProductionEnvironment,
            functionId: 'stream-text',
          },
        });

        result.consumeStream();

        result.mergeIntoDataStream(dataStream, {
          sendReasoning: true,
        });
      },
      onError: (error) => {
        console.error('Stream error:', error);
        return 'An error occurred while processing your request. Please try again.';
      },
    });
  } catch (error) {
    console.error('API error:', error);
    return new Response('An error occurred while processing your request!', {
      status: 500,
    });
  }
}

// DELETE handler remains the same since it only applies to saved chats
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return new Response('Not Found', { status: 404 });
  }

  const session = await auth();

  if (!session?.user?.id) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const chat = await getChatById({ id });

    if (chat.userId !== session.user.id) {
      return new Response('Forbidden', { status: 403 });
    }

    const deletedChat = await deleteChatById({ id });

    return Response.json(deletedChat, { status: 200 });
  } catch (error) {
    return new Response('An error occurred while processing your request!', {
      status: 500,
    });
  }
}
