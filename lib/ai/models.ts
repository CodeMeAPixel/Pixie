export const DEFAULT_CHAT_MODEL: string = 'chat-model';

interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const chatModels: Array<ChatModel> = [
  {
    id: 'chat-model',
    name: 'GPT-4.1 Nano',
    description: 'Fast and efficient general-purpose chat model by OpenAI.',
  },
  {
    id: 'chat-model-reasoning',
    name: 'DeepSeek-70B',
    description: 'Advanced reasoning model with explicit thought process.',
  },
  {
    id: 'title-model',
    name: 'Gemini 2.0 Flash',
    description: 'Specialized title generation using Google Gemini.',
  },
  {
    id: 'artifact-model',
    name: 'Gemma 3 27B',
    description: 'Advanced artifact generation using Google Gemma.',
  }
];
