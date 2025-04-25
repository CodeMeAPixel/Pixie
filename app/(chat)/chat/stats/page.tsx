import { notFound } from 'next/navigation';
import { auth } from '@/app/(auth)/auth';
import { getChatsByUserId, getMessagesByChatId } from '@/lib/db/queries';
import { ChatStats } from '@/components/ChatStats';

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
  return <ChatStats totalChats={totalChats} totalMessages={totalMessages} perChat={perChat} />;
}
