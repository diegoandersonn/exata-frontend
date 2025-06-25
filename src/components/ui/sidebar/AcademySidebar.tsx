"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "./Link";
import { IconType } from "./icons";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Imóveis",
    url: "/admin/properties",
    icon: "Home",
  },
  // {
  //   title: "Investimentos",
  //   url: "/investment",
  //   icon: "Investments",
  // },
  // {
  //   title: "Pagamentos",
  //   url: "/payment",
  //   icon: "Payments",
  // },
];

export function AcademySidebar() {
  const { push } = useRouter();
  const { toggleSidebar, state } = useSidebar();
  const pathname = usePathname();
  return (
    <Sidebar collapsible="icon" className="z-10">
      <SidebarContent className="pt-4">
        <SidebarGroup className="flex justify-center items-center">
          <div
            className={`${
              state === "collapsed" ? "hidden" : "visible"
            } fixed mt-6 cursor-pointer w-fit flex`}
          >
            {/* <Image
              id="exata-logo"
              src="/exata-logo.svg"
              alt="Logo da Exata administradora de bens versao em branco"
              title="Logo da Exata"
              width={60}
              height={60}
              className={`cursor-pointer invert mt-[-0.75rem]`}
              onClick={() => push("/admin/properties")}
            /> */}
            <h1 className="text-white font-bold text-lg">EXATA</h1>
          </div>
          <Image
            id="exata-logo"
            src="/exata-logo.svg"
            alt="Logo da Exata administradora de bens versao em branco"
            title="Logo da Exata"
            width={60}
            height={60}
            className={`${
              state !== "collapsed" ? "hidden" : "visible"
            } cursor-pointer invert mt-[-1rem]`}
            onClick={() => push("/admin/properties")}
          />
        </SidebarGroup>
        <SidebarGroup className={`${state !== "collapsed" ? "mt-6" : ""}`}>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem
                onClick={toggleSidebar}
                className=" hover:bg-[rgba(255,255,255,0.1)] hover:text-white cursor-pointer rounded-sm flex items-center justify-center"
              >
                <SidebarTrigger />
              </SidebarMenuItem>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className={`${
                    pathname === item.url ? "bg-[#FFFFFF1A]" : ""
                  } hover:bg-[rgba(255,255,255,0.1)] text-white hover:text-white rounded-sm flex items-center justify-center`}
                >
                  <Link
                    title={item.title}
                    url={item.url}
                    icon={item.icon as IconType}
                    collapsed={state === "collapsed" ? true : false}
                  />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
