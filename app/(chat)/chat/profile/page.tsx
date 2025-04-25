import { notFound } from 'next/navigation';
import { auth } from '@/app/(auth)/auth';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) {
    notFound();
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <Card>
        <CardHeader className="flex flex-col items-center space-y-4 pt-6">
          <Image
            src={`https://avatar.vercel.sh/${session.user.email}`}
            alt={session.user.email || 'Avatar'}
            width={80}
            height={80}
            className="rounded-full"
          />
          <CardTitle>Your Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <p><span className="font-semibold">User ID:</span> {session.user.id}</p>
          <p><span className="font-semibold">Email:</span> {session.user.email}</p>
          <p><span className="font-semibold">Name:</span> {session.user.name || 'N/A'}</p>
        </CardContent>
      </Card>
    </div>
  );
}
