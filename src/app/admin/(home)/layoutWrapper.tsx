"use client";
import "../../globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AcademySidebar } from "@/components/ui/sidebar/AcademySidebar";
import AcademyNavbar from "@/components/AcademyNavbar";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  token: string;
  id: string;
  isFirstAccess: boolean;
}>) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      router.refresh();
    };

    handleRouteChange();
  }, [pathname, router]);

  return (
    <>
      <AcademyNavbar />
      <SidebarProvider className="bg-[#F1F5F9] flex justify-center ">
        <AcademySidebar />
        <main className="w-full max-h-full mt-20 mb-5 [&>*]:mx-10 [&>*]:rounded-2xl">
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}
