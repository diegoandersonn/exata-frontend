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
import { url } from "inspector";

// Menu items.
const items = [
  {
    title: "Imóveis",
    url: "/admin/properties",
    icon: "Home",
  },
  {
    title: "Configurações",
    url: "/admin/settings",
    icon: "Settings",
  },
  {
    title: "Avaliações",
    url: "/admin/avaliations",
    icon: "Avaliations",
  }
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
            } fixed mt-6 cursor-pointer w-fit flex mr-[3.5rem]`}
          >
            <div>
              <Image
                id="exata-logo"
                src="/exata-logo.svg"
                alt="Logo da Exata administradora de bens versao em branco"
                title="Logo da Exata"
                width={30}
                height={30}
                className={`cursor-pointer invert mt-[-0.28rem]`}
                onClick={() => push("/admin/properties")}
              />
              <div className="bg-white w-[1rem] h-[0.25rem] absolute left-1 bottom-[0.33rem] z-20"></div>
            </div>
            <h1 className="text-white font-bold text-lg h-full self-end pb-[0.05rem] absolute left-[3.1rem] -translate-x-1/2 bottom-0 z-30 pointer-events-none">
              XATA
            </h1>
          </div>
          <Image
            id="exata-logo"
            src="/exata-logo.svg"
            alt="Logo da Exata administradora de bens versao em branco"
            title="Logo da Exata"
            width={45}
            height={45}
            className={`${
              state !== "collapsed" ? "hidden" : "visible"
            } cursor-pointer invert mt-[-0.85rem] mb-[-0.5rem]`}
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
