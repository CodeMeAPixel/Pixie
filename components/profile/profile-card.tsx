import * as React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { ExtendedUser } from '@/lib/db/types';

interface ProfileCardProps extends React.ComponentProps<typeof Card> {
  avatar: string;
  name: string;
  title?: string;
  bio?: string;
  stats?: Array<{
    label: string;
    value: string | number;
  }>;
  flags?: ExtendedUser;
}

export function ProfileCard({
  avatar,
  name,
  title,
  bio,
  stats,
  flags,
  className,
  ...props
}: ProfileCardProps) {
  return (
    <Card className={cn('overflow-hidden border-0 shadow-sm', className)} {...props}>
      <CardHeader className="flex flex-col items-center pb-6">
        <div className="relative size-28 mb-4">
          <Image
            src={avatar}
            alt={name}
            className="object-cover rounded-full ring-4 ring-muted"
            width={112}
            height={112}
            priority
          />
          <div 
            className={cn(
              "absolute bottom-0 right-0 size-5 border-4 border-background rounded-full",
              flags?.isBanned ? "bg-destructive" : "bg-green-500"
            )} 
          />
        </div>
        <h3 className="text-2xl font-bold tracking-tight">{name}</h3>
        {title && (
          <p className="text-sm text-muted-foreground mt-1">{title}</p>
        )}
        {bio && (
          <p className="text-sm text-center text-muted-foreground mt-3">{bio}</p>
        )}
        {flags && (
          <div className="flex flex-wrap gap-2 mt-3 justify-center">
            {flags.isAdmin && (
              <Badge variant="outline" className="border-primary text-primary">
                Admin
              </Badge>
            )}
            {flags.isBeta && (
              <Badge variant="outline" className="border-blue-500 text-blue-500">
                Beta
              </Badge>
            )}
            {flags.isPremium && (
              <Badge variant="outline" className="border-orange-500 text-orange-500">
                Premium
              </Badge>
            )}
            <Badge variant="outline" className="border-zinc-500 text-zinc-500">
              Joined {new Date(flags.createdAt!).toLocaleDateString()}
            </Badge>
          </div>
        )}
      </CardHeader>
      {stats && (
        <CardContent className="grid grid-cols-3 gap-4 px-6 py-4 border-t bg-muted/50">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center text-center"
            >
              <span className="text-2xl font-bold tracking-tight">{stat.value}</span>
              <span className="text-xs font-medium text-muted-foreground mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </CardContent>
      )}
    </Card>
  );
}
