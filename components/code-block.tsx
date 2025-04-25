'use client';

import { cn } from '@/lib/utils';

interface CodeBlockProps {
  node: any;
  inline: boolean;
  className: string;
  children: any;
}

export function CodeBlock({
  node,
  inline,
  className,
  children,
  ...props
}: CodeBlockProps) {
  if (!inline) {
    return (
      <div className="not-prose flex flex-col">
        <pre
          {...props}
          className={cn(
            "text-sm w-full overflow-x-auto p-4 rounded-xl",
            "bg-muted text-foreground",
            "border border-border"
          )}
        >
          <code className="whitespace-pre-wrap break-words">{children}</code>
        </pre>
      </div>
    );
  }
  
  return (
    <code
      className={cn(
        className,
        "text-sm py-0.5 px-1 rounded-md",
        "bg-muted/50 text-foreground"
      )}
      {...props}
    >
      {children}
    </code>
  );
}