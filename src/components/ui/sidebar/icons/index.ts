import { Wallet } from "./wallet";
import { Settings } from "./settings";
import { Payments } from "./payments";
import { Maximize } from "./maximize";
import { Minimize } from "./minimize";
import { Home } from "./home";
export const SidebarIcons = {
  Wallet,
  Settings,
  Payments,
  Maximize,
  Minimize,
  Home,
};

export type IconType = keyof typeof SidebarIcons;
