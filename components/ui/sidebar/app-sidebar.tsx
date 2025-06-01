'use client';

import type { User } from 'next-auth';
import { useRouter } from 'next/navigation';

import { PlusIcon } from '@/components/icons/icons';
import { SidebarHistory } from '@/components/ui/sidebar/sidebar-history';
import { SidebarUserNav } from '@/components/ui/sidebar/sidebar-user-nav';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  useSidebar,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipTrigger } from '../tooltip';
import { HelpCircle } from 'lucide-react';
import Image from 'next/image';
import { ThemeSelect } from '@/components/ui/theme/theme-select';

export function AppSidebar({ user }: { user: User | undefined }) {
  const router = useRouter();
  const { setOpenMobile, open } = useSidebar();

  return (
    <>
      <Sidebar className="group-data-[side=left]:border-r-0">
        <SidebarHeader>
          <SidebarMenu>
            <div className="flex flex-row justify-between items-center">
              <Link
                href="/"
                onClick={() => {
                  setOpenMobile(false);
                }}
                className="flex flex-row gap-3 items-center"
              >
                <Image src="/pixie.png" alt="Pixie Logo" width={32} height={32} />
                <span className="text-lg font-semibold px-2 hover:bg-muted rounded-md cursor-pointer">
                  Pixie Chat
                </span>
              </Link>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    type="button"
                    className="p-2 h-fit"
                    onClick={() => {
                      setOpenMobile(false);
                      router.push('/chat/help');
                    }}
                  >
                    <HelpCircle />
                  </Button>
                </TooltipTrigger>
                <TooltipContent align="end">Help</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    type="button"
                    className="p-2 h-fit"
                    onClick={() => {
                      setOpenMobile(false);
                      router.push('/');
                      router.refresh();
                    }}
                  >
                    <PlusIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent align="end">New Chat</TooltipContent>
              </Tooltip>
            </div>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarHistory user={user} />
        </SidebarContent>
        <SidebarFooter className="flex flex-col gap-2">
          <ThemeSelect />
          <SidebarUserNav user={user} />
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
