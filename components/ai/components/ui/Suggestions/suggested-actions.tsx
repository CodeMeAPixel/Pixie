'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { memo, useMemo } from 'react';
import { UseChatHelpers } from '@ai-sdk/react';

interface SuggestedActionsProps {
  chatId: string;
  append: UseChatHelpers['append'];
}

function PureSuggestedActions({ chatId, append }: SuggestedActionsProps) {
  // Define all possible actions
  const allSuggestedActions = [
    {
      title: 'Custom React Hook',
      label: 'Generate code for a React custom hook',
      action: 'Write code for a React custom hook that handles dark mode with system preferences and local storage persistence.',
    },
    {
      title: 'TypeScript Guide',
      label: 'Advanced TypeScript features explained',
      action: 'Create a comprehensive guide explaining TypeScript advanced features like generics, utility types, and decorators with examples.',
    },
    {
      title: 'System Design',
      label: 'Understand system design concepts',
      action: 'Explain key system design concepts like load balancing, caching, and database sharding with real-world examples.',
    },
    {
      title: 'Code Review',
      label: 'Review and improve code quality',
      action: 'Review this code for potential improvements in terms of performance, security, and best practices.',
    },
    {
      title: 'Next.js Architecture',
      label: 'Design a scalable Next.js application',
      action: 'Help me design a scalable Next.js application architecture with proper folder structure, state management, and API organization.',
    },
    {
      title: 'Database Schema',
      label: 'Design a normalized database schema',
      action: 'Help me design a normalized database schema for a social media application with users, posts, comments, and likes.',
    },
    {
      title: 'API Design',
      label: 'Create RESTful API endpoints',
      action: 'Design RESTful API endpoints following best practices for a user management system.',
    },
    {
      title: 'Authentication',
      label: 'Implement secure authentication',
      action: 'Explain how to implement secure authentication using JWT tokens with refresh token rotation.',
    },
    {
      title: 'Testing Strategy',
      label: 'Create a testing strategy',
      action: 'Help me create a comprehensive testing strategy including unit, integration, and e2e tests for a React application.',
    },
    {
      title: 'Performance Optimization',
      label: 'Optimize React application',
      action: 'Suggest ways to optimize a React application for better performance, including code splitting, lazy loading, and memoization.',
    },
    {
      title: 'State Management',
      label: 'Compare state management solutions',
      action: 'Compare different state management solutions (Redux, Zustand, Jotai, etc.) and when to use each one.',
    },
    {
      title: 'CSS Architecture',
      label: 'Design scalable CSS architecture',
      action: 'Help me design a scalable CSS architecture using Tailwind CSS with custom design tokens and components.',
    },
    // Add more suggestions as needed
  ];

  // Get 4 random items with proper dependencies
  const suggestedActions = useMemo(() => {
    const shuffled = [...allSuggestedActions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 4);
  }, [/* No dependencies needed since allSuggestedActions is static */]);

  return (
    <div
      data-testid="suggested-actions"
      className="grid sm:grid-cols-2 gap-2 w-full"
    >
      {suggestedActions.map((suggestedAction, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.05 * index }}
          key={`suggested-action-${suggestedAction.title}-${index}`}
          className={index > 1 ? 'hidden sm:block' : 'block'}
        >
          <Button
            variant="ghost"
            onClick={async () => {
              window.history.replaceState({}, '', `/chat/${chatId}`);

              append({
                role: 'user',
                content: suggestedAction.action,
              });
            }}
            className="text-left border rounded-xl px-4 py-3.5 text-sm flex-1 gap-1 sm:flex-col w-full h-auto justify-start items-start"
          >
            <span className="font-medium">{suggestedAction.title}</span>
            <span className="text-muted-foreground">
              {suggestedAction.label}
            </span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}

export const SuggestedActions = memo(PureSuggestedActions, () => true);
