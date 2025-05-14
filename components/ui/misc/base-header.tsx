'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useWindowSize } from 'usehooks-ts';
import { SidebarToggle } from '@/components/ui/sidebar/sidebar-toggle';
import { Button } from '@/components/ui/button';
import { GitIcon } from '../../icons/icons';
import { useSidebar } from '../sidebar';
import { type ReactNode } from 'react';

interface BaseHeaderProps {
  middleContent?: ReactNode;
  endContent?: ReactNode;
  showGithub?: boolean;
}

export function BaseHeader({ 
  middleContent, 
  endContent,
  showGithub = true 
}: BaseHeaderProps) {
  const { open } = useSidebar();
  const { width: windowWidth } = useWindowSize();

  return (
    <header className="flex sticky top-0 bg-background py-1.5 items-center px-2 md:px-2 gap-2">
      <SidebarToggle />

      {/* Middle content area */}
      {(!open || windowWidth < 768) && middleContent}

      {/* End content area */}
      <div className="flex items-center gap-2 ml-auto">
        {endContent}
        
        {showGithub && (
          <Button
            className="hidden md:flex py-1.5 px-2 h-fit md:h-[34px]"
            asChild
          >
            <Link href="https://github.com/CodeMeAPixel/Pixie" target="_blank">
              <GitIcon size={16} />
              Open-Source on GitHub
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
}
