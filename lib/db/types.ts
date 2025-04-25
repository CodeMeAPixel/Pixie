export interface User {
  id: string;
  email: string;
  name?: string;
  hashedPassword: string;
  isVerified?: boolean;
  isPremium?: boolean;
  isAdmin?: boolean;
  isBeta?: boolean;
  isBanned?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ModelPreference {
  userId: string;
  modelId: string;
  isDefault: boolean;
  createdAt: Date;
}

export interface Conversation {
  id: string;
  userId: string;
  modelId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  lastMessageAt: Date;
}

export interface Message {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: Date;
}

export interface Usage {
  id: string;
  userId: string;
  modelId: string;
  tokens: number;
  cost: number;
  createdAt: Date;
}

export type ExtendedUser = User & {
  username?: string;
  bio?: string;
  location?: string;
  website?: string;
  github?: string;
  twitter?: string;
  linkedin?: string;
  theme?: string;
  language?: string;
  timezone?: string;
  lastLoginAt?: Date;
};
