'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PenIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProfileSectionProps extends React.ComponentProps<typeof Card> {
  title: string;
  description?: string;
  collapsible?: boolean;
  editable?: boolean;
  onEdit?: () => void;
}

export function ProfileSection({
  title,
  description,
  className,
  children,
  collapsible = false,
  editable,
  onEdit,
  ...props
}: ProfileSectionProps) {
  return (
    <Card className={cn('w-full', className)} {...props}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold tracking-tight">
            {title}
          </CardTitle>
          {editable && (
            <Button variant="ghost" size="sm" onClick={onEdit}>
              <PenIcon className="h-4 w-4" />
            </Button>
          )}
        </div>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
