export interface SidebarItem {
  label: string;
  url?: string;
  items?: SidebarItem[];
  collapsed?: boolean;
}
