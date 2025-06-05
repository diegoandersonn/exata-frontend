'use client'
import '../../globals.css'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AcademySidebar } from '@/components/ui/sidebar/AcademySidebar'
import AcademyNavbar from '@/components/AcademyNavbar'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
  token: string
  id: string
}>) {

  return (
    <>
      <AcademyNavbar />
      <SidebarProvider className="bg-[#F7F8FA] flex justify-center ">
        <AcademySidebar />
        <main className="w-full max-h-full mt-20 mb-5 [&>*]:mx-10 [&>*]:rounded-2xl">{children}</main>
      </SidebarProvider>
    </>
  )
}
