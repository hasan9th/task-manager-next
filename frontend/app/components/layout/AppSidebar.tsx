import Image from "next/image";
import Link from "next/link";
import GlobeImage from"@/public/globe.svg";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems=[
  {
  name:"Dashboard",
  url:"/"

},{name:"Settings",
  url:"/settings"
}]
export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
  <SidebarGroupLabel>Application</SidebarGroupLabel>
  <SidebarGroupAction>
    <span className="sr-only">Add Project</span>
  </SidebarGroupAction>
  <SidebarGroupContent>
    <SidebarMenu>
  {menuItems.map((menuItem) => (
    <SidebarMenuItem key={menuItem.name}>
      <SidebarMenuButton render={<a href={menuItem.url} />}>
        <span>{menuItem.name}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  ))}
</SidebarMenu>
  </SidebarGroupContent>
</SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}