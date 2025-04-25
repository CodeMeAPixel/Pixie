'use client';

import { cn } from '@/lib/utils';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-sql';
import { useLayoutEffect, useState } from 'react';
import { LuCopy, LuCheck } from 'react-icons/lu';

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
  const [isCopied, setIsCopied] = useState(false);
  const language = className?.split('-')[1] || 'plaintext';

  useLayoutEffect(() => {
    Prism.highlightAll();
  }, [children, language]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(children as string);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (!inline) {
    return (
      <div className="relative mt-2 grid">
        <button
          onClick={copyToClipboard}
          className="absolute right-2 top-2 p-2 rounded-lg bg-primary/50 hover:bg-primary transition-colors group-hover:opacity-100 z-10 sm:right-4 sm:top-4"
          aria-label="Copy code"
        >
          {isCopied ? (
            <LuCheck className="size-4" />
          ) : (
            <LuCopy className="size-4" />
          )}
        </button>
        <pre
          {...props}
          className={cn(
            "overflow-x-auto rounded-xl border border-border bg-primary/50 px-2 py-4 sm:px-4",
            "text-sm text-foreground"
          )}
        >
          <code className={`language-${language} block`}>{children}</code>
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