'use client';
import { ChevronUp, LogIn } from 'lucide-react';
import Image from 'next/image';
import type { User } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const themes = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
  { label: 'Forest', value: 'forest' },
  { label: 'Ocean', value: 'ocean' },
  { label: 'Sunset', value: 'sunset' },
  { label: 'Rose', value: 'rose' },
  { label: 'Rosé Pine', value: 'rosepine' },
  { label: 'GitHub', value: 'github' },
  { label: 'Nord', value: 'nord' },
  { label: 'T3', value: 't3' },
  { label: 'System', value: 'system' },
];

export function SidebarUserNav({ user }: { user: User | undefined }) {
  if (!user) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton 
            onClick={() => signIn()}
            className="data-[state=open]:bg-sidebar-accent bg-background data-[state=open]:text-sidebar-accent-foreground h-10 w-full"
          >
            <LogIn className="w-4 h-4" />
            <span className="flex-1 text-left">Sign in</span>
            <ChevronUp className="ml-auto opacity-0" />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent bg-background data-[state=open]:text-sidebar-accent-foreground h-10">
              <Image
                src={`https://avatar.vercel.sh/${user.email}`}
                alt={user.email ?? 'User Avatar'}
                width={24}
                height={24}
                className="rounded-full"
              />
              <span className="truncate">{user?.email}</span>
              <ChevronUp className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            className="w-[--radix-popper-anchor-width]" 
          >
            <DropdownMenuItem asChild>
              <button
                type="button"
                className="w-full cursor-pointer"
                onClick={() => signOut({ redirectTo: '/' })}
              >
                Sign out
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
