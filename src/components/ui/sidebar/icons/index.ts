import { Wallet } from "./wallet";
import { Investments } from "./investments";
import { Payments } from "./payments";
import { Maximize } from "./maximize";
import { Minimize } from "./minimize";
import { Home } from "./home";
export const SidebarIcons = {
  Wallet,
  Investments,
  Payments,
  Maximize,
  Minimize,
  Home,
};

export type IconType = keyof typeof SidebarIcons;
