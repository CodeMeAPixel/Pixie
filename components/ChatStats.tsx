import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface ChatStatsItem {
  id: string;
  title: string | null;
  count: number;
}

interface ChatStatsProps {
  totalChats: number;
  totalMessages: number;
  perChat: ChatStatsItem[];
}

export function ChatStats({ totalChats, totalMessages, perChat }: ChatStatsProps) {
  return (
    <Card className="w-full border-0 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">Chat Statistics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="rounded-lg bg-muted/50 p-4 text-center">
            <p className="text-sm font-medium text-muted-foreground">Total Chats</p>
            <p className="mt-1 text-3xl font-bold tracking-tight">{totalChats}</p>
          </div>
          <div className="rounded-lg bg-muted/50 p-4 text-center">
            <p className="text-sm font-medium text-muted-foreground">Total Messages</p>
            <p className="mt-1 text-3xl font-bold tracking-tight">{totalMessages}</p>
          </div>
        </div>
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Messages per Chat</h2>
          <ul className="space-y-2">
            {perChat.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50"
              >
                <Link 
                  href={`/chat/${item.id}`} 
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  {item.title || item.id}
                </Link>
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  {item.count}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
