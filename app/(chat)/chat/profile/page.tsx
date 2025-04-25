import { notFound } from 'next/navigation';
import { auth } from '@/app/(auth)/auth';
import { getChatsByUserId, getMessagesByChatId } from '@/lib/db/queries';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ProfileCard } from '@/components/profile/profile-card';
import { ProfileSection } from '@/components/profile/profile-section';
import { Badge } from '@/components/ui/badge';

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) {
    notFound();
  }

  console.log('Session:', session.user.isAdmin);

  const userId = session.user.id;
  // fetch all user chats
  const { chats } = await getChatsByUserId({ id: userId as string, limit: 1000, startingAfter: null, endingBefore: null });
  const totalChats = chats.length;
  let totalMessages = 0;
  
  // compute total messages
  for (const chat of chats) {
    const msgs = await getMessagesByChatId({ id: chat.id });
    totalMessages += msgs.length;
  }

  // Calculate days active (placeholder for now - you might want to track this in your database)
  const daysActive = 1;

  const stats = [
    { label: 'Chats', value: totalChats.toString() },
    { label: 'Messages', value: totalMessages.toString() },
    { label: 'Days Active', value: daysActive.toString() }
  ];

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="grid gap-6">
        <div className="grid gap-6 md:grid-cols-2">
          <ProfileCard
            avatar={`https://avatar.vercel.sh/${session.user.email}`}
            name={session.user.name || session.user.username || 'Anonymous User'}
            title={session.user.email || undefined}
            bio={session.user.bio}
            stats={stats}
            flags={session.user}
          />
          
          <ProfileSection title="Account Details">
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">User ID</p>
                <p className="text-sm font-mono bg-muted/50 p-2 rounded-md">{session.user.id}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p className="text-sm">{session.user.email}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Name</p>
                <p className="text-sm">{session.user.name || 'Not set'}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Username</p>
                <p className="text-sm">{session.user.username || 'Not set'}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Location</p>
                <p className="text-sm">{session.user.location || 'Not set'}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Website</p>
                <p className="text-sm">{session.user.website || 'Not set'}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Account Status</p>
                <div className="flex flex-wrap gap-2">
                  {session.user.isAdmin && <Badge variant="secondary">Admin</Badge>}
                  {session.user.isBeta && <Badge variant="secondary">Beta User</Badge>}
                  {session.user.isPremium && <Badge variant="secondary">Premium</Badge>}
                  {!session.user.isBanned && <Badge variant="success">Active</Badge>}
                  {session.user.isBanned && <Badge variant="destructive">Banned</Badge>}
                </div>
              </div>
            </div>
          </ProfileSection>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <ProfileSection title="Social Links">
            <div className="space-y-4">
              {['github', 'twitter', 'linkedin'].map((platform) => (
                <div key={platform} className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground capitalize">{platform}</p>
                  <p className="text-sm">{session.user[platform] || 'Not set'}</p>
                </div>
              ))}
            </div>
          </ProfileSection>

          <ProfileSection title="Preferences">
            <div className="space-y-4">
              {['theme', 'language', 'timezone'].map((pref) => (
                <div key={pref} className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground capitalize">{pref}</p>
                  <p className="text-sm">{session.user[pref] || 'System default'}</p>
                </div>
              ))}
            </div>
          </ProfileSection>
        </div>
      </div>
    </div>
  );
}
