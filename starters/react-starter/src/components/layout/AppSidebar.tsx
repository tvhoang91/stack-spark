import type { ComponentProps } from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { NavLink } from 'react-router'
import { VersionSwitcher } from './VersionSwitcher'

export function AppSidebar(props: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Showcase</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <NavLink to="/products">
                  {({ isActive }) => (
                    <SidebarMenuButton asChild data-active={isActive}>
                      <span>Products</span>
                    </SidebarMenuButton>
                  )}
                </NavLink>
                <NavLink to="/settings">
                  {({ isActive }) => (
                    <SidebarMenuButton asChild data-active={isActive}>
                      <span>Settings</span>
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
