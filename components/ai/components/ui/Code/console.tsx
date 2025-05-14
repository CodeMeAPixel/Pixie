'use client';

import { memo } from 'react';
import { cn } from '@/lib/utils';

export interface ConsoleOutputContent {
  type: 'text' | 'image';
  value: string;
}

type ConsoleStatus = 
  | 'in_progress'
  | 'failed'
  | 'loading_packages'
  | 'completed'
  | 'streaming';  // Add streaming status

export interface ConsoleOutput {
  id: string;
  contents: ConsoleOutputContent[];
  status: ConsoleStatus;
}

export function Console({
  consoleOutputs,
  setConsoleOutputs,
}: {
  consoleOutputs: ConsoleOutput[];
  setConsoleOutputs: (outputs: ConsoleOutput[]) => void;
}) {
  return (
    <div className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md border border-border",
      "bg-background text-foreground font-mono"
    )}>
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <div className="h-3 w-3 rounded-full bg-destructive/20" />
        <span className="text-xs text-muted-foreground">Console Output</span>
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        <pre className="text-sm text-foreground/90 whitespace-pre-wrap">
          {consoleOutputs.length ? consoleOutputs[0]?.contents[0]?.value : 'No output yet...'}
        </pre>
      </div>

      {consoleOutputs[0]?.status === 'streaming' && (
        <div className="border-t border-border bg-muted/10 px-4 py-2">
          <div className="h-1 w-full animate-pulse rounded-full bg-primary/20" />
        </div>
      )}
    </div>
  );
}
