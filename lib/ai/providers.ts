import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';

import { google } from "@ai-sdk/google" 
import { openai } from "@ai-sdk/openai";
import { groq } from "@ai-sdk/groq";
import { isTestEnvironment } from '../constants';

import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        'chat-model': chatModel,
        'chat-model-reasoning': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  : customProvider({
      languageModels: {
        'chat-model': openai('gpt-4.1-nano'),
        'chat-model-reasoning': wrapLanguageModel({
          model: groq('deepseek-r1-distill-llama-70b'),
          middleware: extractReasoningMiddleware({ tagName: 'think' }),
        }),
        'title-model': google('gemini-2.0-flash-exp'),
        'artifact-model': google('gemma-3-27b-it'),
      },
      imageModels: {
        'large-model': openai.image('dall-e-2'),
        'small-model': openai.image('dall-e-3')
      },
    });
