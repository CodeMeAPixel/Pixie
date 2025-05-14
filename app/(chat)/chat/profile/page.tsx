import { notFound } from 'next/navigation';
import { auth } from '@/app/(auth)/auth';
import { getChatsByUserId, getMessagesByChatId } from '@/lib/db/queries';
import { ProfileSection } from '@/components/profile/profile-section';
import { type ExtendedUser } from '@/lib/db/types';

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) {
    notFound();
  }

  const userId = session.user.id;
  // Fetch all user chats
  const { chats } = await getChatsByUserId({ 
    id: userId as string, 
    limit: 1000, 
    startingAfter: null, 
    endingBefore: null 
  });

  let totalMessages = 0;
  const totalChats = chats.length;

  
  // Compute total messages
  for (const chat of chats) {
    const msgs = await getMessagesByChatId({ id: chat.id });
    totalMessages += msgs.length;
  }

  // Calculate days active
  const createdAt = session.user.createdAt ? new Date(session.user.createdAt) : new Date();
  const daysActive = Math.ceil((new Date().getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));

  const stats = [
    { label: 'Chats', value: totalChats.toString() },
    { label: 'Messages', value: totalMessages.toString() },
    { label: 'Days Active', value: daysActive.toString() }
  ];

  // User data for profile
  const user = session.user as ExtendedUser;

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <ProfileSection 
        user={user}
        stats={stats}
      />
    </div>
  );
}