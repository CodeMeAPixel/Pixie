import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Chat Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-8">
          <div className="text-center">
            <p className="text-sm text-muted-foreground uppercase">Total Chats</p>
            <p className="text-3xl font-semibold">{totalChats}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground uppercase">Total Messages</p>
            <p className="text-3xl font-semibold">{totalMessages}</p>
          </div>
        </div>
        <h2 className="text-lg font-semibold">Messages per Chat</h2>
        <ul className="space-y-2">
          {perChat.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center border p-4 rounded"
            >
              <Link href={`/chat/${item.id}`} className="text-blue-500 hover:underline">
                {item.title || item.id}
              </Link>
              <span className="text-sm text-gray-600">{item.count}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
