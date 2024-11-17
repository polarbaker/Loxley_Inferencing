'use client';

import * as React from 'react';
import { House, SquarePen, Layers3 } from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';

// This is sample data.
const data = {
  user: {
    name: "Jack O'Brien",
    email: 'my@email.com',
    avatar: '/avatars/icon.jpg',
  },
  navMain: [
    {
      title: 'Home',
      url: '/dashboard',
      icon: House,
    },
    {
      title: 'Generate',
      url: '/dashboard/generate',
      icon: SquarePen,
    },
    {
      title: 'Logo Sets',
      url: '/dashboard/logos',
      icon: Layers3,
    },
    // {
    //   title: 'Processing Jobs',
    //   url: '#',
    //   icon: ServerCog,
    // },
    // {
    //   title: 'Review',
    //   url: '#',
    //   icon: GalleryVerticalEnd,
    // },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <div className="text-lg font-bold">Loxley Logos</div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
