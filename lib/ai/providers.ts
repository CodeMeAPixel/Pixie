import { google } from '@ai-sdk/google';
import { openai } from '@ai-sdk/openai';
import { groq } from '@ai-sdk/groq';

import { isTestEnvironment } from '../constants';

import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';

import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';

export const myProvider = customProvider({
      languageModels: {
        'gpt-3.5-turbo': openai('gpt-3.5-turbo'),
        'gpt-4-turbo': openai('gpt-4-turbo'),
        'gpt-4.1': openai('gpt-4.1'),
        'gpt-4.1-mini': openai('gpt-4.1-mini'),
        'gpt-4.1-nano': openai('gpt-4.1-nano'),
        'gpt-4o-mini': openai('gpt-4o-mini'),

        // Google Models
        'gemini-flash-1.5': google('gemini-1.5-flash'),
        'gemini-flash-1.5-pro': google('gemini-1.5-pro'),
        'gemma-it-3-27b': google('gemma-3-27b-it'),
        
        'deepseek-r1-qwen': groq('deepseek-r1-distill-qwen-32b'),
        'llama-3.1-8b': groq('llama-3.1-8b-instant'),
        'llama-3.3-70b': groq('llama-3.3-70b-versatile'),
        'llama-guard-3': groq('llama-guard-3-8b'),
        'llama-70b-8192': groq('llama3-70b-8192'),
        'llama-8b-8192': groq('llama3-8b-8192'),
        'mistral-saba': groq('mistral-saba-24b'),
        'qwen-2.5-32b': groq('qwen-2.5-32b'),
        'qwen-qwq-32b': groq('qwen-qwq-32b'),

        // Reasoning models
        'gpt-01-mini': wrapLanguageModel({
          model: openai('o1-mini'),
          middleware: extractReasoningMiddleware({ tagName: 'think' })
        }),

        'gpt-03-mini': wrapLanguageModel({
          model: openai('o3-mini'),
          middleware: extractReasoningMiddleware({ tagName: 'think' })
        }),

        'gpt-04-mini': wrapLanguageModel({
          model: openai('o4-mini'),
          middleware: extractReasoningMiddleware({ tagName: 'think' })
        }),

        'deepseek-r1-distill': wrapLanguageModel({
          model: groq('deepseek-r1-distill-llama-70b'),
          middleware: extractReasoningMiddleware({ tagName: 'think' })
        }),
      },
      imageModels: {
        'dall-e-3': openai.image('dall-e-3'),
        'dall-e-2': openai.image('dall-e-2'),
      },
    });
