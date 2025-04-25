export const DEFAULT_CHAT_MODEL = 'gpt-4.1-nano';

export type ModelFeatures = 'chat' | 'vision' | 'code' | 'math' | 'reasoning' | 'streaming';
export type ModelCapability = 'basic' | 'advanced' | 'reasoning';
export type ModelAccess = 'free' | 'premium' | 'beta' | 'admin';

interface UserProperties {
  id: string;
  isPremium: boolean;
  isAdmin: boolean;
  isBeta: boolean;
  isBanned: boolean;
}

interface ChatModel {
  id: string;
  name: string;
  description: string;
  maxTokens?: number;
  features: ModelFeatures[];
  capability: ModelCapability;
  category: 'fast' | 'balanced' | 'advanced';
  provider: 'OpenAI' | 'Google' | 'Groq' | 'Mistral' | 'Anthropic';
  access: ModelAccess;
  enabled: boolean;
  requestLimit?: number;
  tokensPerRequest?: number;
  costPerToken?: number;
}

export const chatModels: ChatModel[] = [
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    description: 'Fast and efficient for everyday tasks',
    provider: 'OpenAI',
    maxTokens: 16384,
    features: ['chat', 'streaming'],
    capability: 'basic',
    category: 'fast',
    access: 'free',
    enabled: true
  },
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    description: 'Latest GPT-4 model with improved capabilities',
    provider: 'OpenAI',
    maxTokens: 128000,
    features: ['chat', 'code', 'reasoning', 'streaming'],
    capability: 'reasoning',
    category: 'advanced',
    access: 'premium',
    enabled: false
  },
  {
    id: 'gpt-4.1',
    name: 'GPT-4.1',
    description: 'Latest GPT model with strong capabilities',
    provider: 'OpenAI',
    maxTokens: 128000,
    features: ['chat', 'code', 'math', 'reasoning', 'streaming'],
    capability: 'reasoning',
    category: 'advanced',
    access: 'premium',
    enabled: false,
    beta: true
  },
  {
    id: 'gpt-4.1-mini',
    name: 'GPT-4.1 Mini',
    description: 'Balanced speed and capabilities',
    provider: 'OpenAI',
    maxTokens: 32768,
    features: ['chat', 'code', 'streaming'],
    capability: 'advanced',
    category: 'balanced',
    access: 'premium',
    enabled: false,
    beta: true
  },
  {
    id: 'gpt-4.1-nano',
    name: 'GPT-4.1 Nano',
    description: 'Fast and efficient for everyday conversations',
    provider: 'OpenAI',
    maxTokens: 16384,
    features: ['chat', 'streaming'],
    capability: 'basic',
    category: 'fast',
    access: 'free',
    enabled: true,
    beta: true
  },

  // Google Models
  {
    id: 'gemini-flash-1.5',
    name: 'Gemini 1.5 Flash',
    description: 'Fast responses optimized for speed',
    provider: 'Google',
    maxTokens: 32000,
    features: ['chat', 'streaming'],
    capability: 'basic',
    category: 'fast',
    access: 'free',
    enabled: true,
    beta: true
  },
  {
    id: 'gemini-flash-1.5-pro',
    name: 'Gemini 1.5 Pro Flash',
    description: 'Advanced reasoning with optimized speed',
    provider: 'Google',
    maxTokens: 128000,
    features: ['chat', 'code', 'reasoning', 'streaming'],
    capability: 'reasoning',
    category: 'advanced',
    access: 'premium',
    enabled: false,
    beta: true
  },
  {
    id: 'gemma-it-3-27b',
    name: 'Gemma IT 27B',
    description: 'Instruction-tuned Gemma model',
    provider: 'Google',
    maxTokens: 8192,
    features: ['chat', 'streaming'],
    capability: 'basic',
    category: 'balanced',
    access: 'free',
    enabled: true
  },

  // Groq Models
  {
    id: 'deepseek-r1-llama',
    name: 'DeepSeek Llama 70B',
    description: 'Optimized Llama model on Groq',
    provider: 'Groq',
    maxTokens: 32768,
    features: ['chat', 'streaming'],
    capability: 'basic',
    category: 'fast',
    access: 'free',
    enabled: true
  },
  {
    id: 'llama-3.1-8b',
    name: 'Llama 3.1 8B',
    description: 'Fast Llama model for quick responses',
    provider: 'Groq',
    maxTokens: 8192,
    features: ['chat', 'streaming'],
    capability: 'basic',
    category: 'fast',
    access: 'free',
    enabled: true
  },
  {
    id: 'llama-3.3-70b',
    name: 'Llama 3.3 70B',
    description: 'Versatile large Llama model',
    provider: 'Groq',
    maxTokens: 32768,
    features: ['chat', 'code', 'streaming'],
    capability: 'advanced',
    category: 'advanced',
    access: 'premium',
    enabled: false
  },
  {
    id: 'mistral-saba',
    name: 'Mistral Saba 24B',
    description: 'Efficient Mistral model on Groq',
    provider: 'Groq',
    maxTokens: 32768,
    features: ['chat', 'streaming'],
    capability: 'balanced',
    category: 'balanced',
    access: 'premium',
    enabled: false
  },

  // Reasoning Models
  {
    id: 'gpt-01-mini',
    name: 'GPT-O1 Mini',
    description: 'Lightweight model with reasoning capabilities',
    provider: 'OpenAI',
    maxTokens: 16384,
    features: ['chat', 'reasoning', 'streaming'],
    category: 'balanced',
    capability: 'reasoning',
    access: 'premium',
    enabled: true,
    beta: true
  },
  {
    id: 'gpt-03-mini',
    name: 'GPT-O3 Mini',
    description: 'Balanced model with enhanced reasoning',
    provider: 'OpenAI',
    maxTokens: 32768,
    features: ['chat', 'code', 'reasoning', 'streaming'],
    category: 'advanced',
    capability: 'reasoning',
    access: 'premium',
    enabled: true,
    beta: true
  },
  {
    id: 'gpt-04-mini',
    name: 'GPT-O4 Mini',
    description: 'Advanced reasoning and analysis capabilities',
    provider: 'OpenAI',
    maxTokens: 128000,
    features: ['chat', 'code', 'math', 'reasoning', 'streaming'],
    category: 'advanced',
    capability: 'reasoning',
    access: 'premium',
    enabled: true,
    beta: true
  },
  {
    id: 'deepseek-r1-distill',
    name: 'DeepSeek Reasoning',
    description: 'Open model with reasoning capabilities',
    provider: 'Groq',
    maxTokens: 32768,
    features: ['chat', 'reasoning', 'streaming'],
    category: 'advanced',
    capability: 'reasoning',
    access: 'premium',
    enabled: true,
    beta: true
  }
];

export const getModelsByCapability = (models: ChatModel[]) => {
  return {
    basic: models.filter(m => m.capability === 'basic'),
    advanced: models.filter(m => m.capability === 'advanced'),
    reasoning: models.filter(m => m.capability === 'reasoning'),
  };
};

export const canAccessModel = (model: ChatModel, user?: UserProperties) => {
  // Banned users can't access anything
  if (user?.isBanned) return false;

  // Admins get access to everything, no restrictions
  if (user?.isAdmin) return true;

  // For non-admin users, check enabled state first
  if (!model.enabled) return false;

  // For non-authenticated users, only free models
  if (!user) return model.access === 'free';

  // For authenticated users, check their access level
  switch (model.access) {
    case 'free':
      return true;
    case 'premium':
      return user.isPremium;
    case 'beta':
      return user.isBeta || user.isPremium;
    case 'admin':
      return false;
  }
};