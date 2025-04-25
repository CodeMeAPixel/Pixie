import { notFound } from 'next/navigation';
import { auth } from '@/app/(auth)/auth';
import { getChatsByUserId, getMessagesByChatId } from '@/lib/db/queries';
import { ChatStats } from '@/components/ChatStats';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default async function StatsPage() {
  const session = await auth();
  if (!session?.user) {
    notFound();
  }
  const userId = session.user.id;
  // fetch all user chats
  const { chats } = await getChatsByUserId({ id: userId as string, limit: 1000, startingAfter: null, endingBefore: null });
  const totalChats = chats.length;
  let totalMessages = 0;
  // compute messages per chat
  const perChat = await Promise.all(
    chats.map(async (c) => {
      const msgs = await getMessagesByChatId({ id: c.id });
      totalMessages += msgs.length;
      return { id: c.id, title: c.title, count: msgs.length };
    })
  );

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="grid gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-6">
              <div className="rounded-lg bg-muted/50 p-4 text-center">
                <p className="text-sm font-medium text-muted-foreground">Total Chats</p>
                <p className="mt-1 text-3xl font-bold tracking-tight">{totalChats}</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-4 text-center">
                <p className="text-sm font-medium text-muted-foreground">Total Messages</p>
                <p className="mt-1 text-3xl font-bold tracking-tight">{totalMessages}</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-4 text-center">
                <p className="text-sm font-medium text-muted-foreground">Avg. Messages/Chat</p>
                <p className="mt-1 text-3xl font-bold tracking-tight">
                  {totalChats > 0 ? Math.round(totalMessages / totalChats) : 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <ChatStats totalChats={totalChats} totalMessages={totalMessages} perChat={perChat} />
      </div>
    </div>
  );
}
