import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FaHome, FaArrowLeft } from 'react-icons/fa';

export default function ChatNotFoundPage() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <div className="space-y-4">
        <h1 className="text-8xl font-bold tracking-tight text-primary/50">404</h1>
        <h2 className="text-2xl font-semibold tracking-tight">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button asChild variant="default" className="gap-2">
            <Link href="/">
              <FaArrowLeft className="h-4 w-4" />
              Back to Reality!
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}