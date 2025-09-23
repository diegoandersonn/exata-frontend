import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/providers/query-provider";
import { LocalizationProvider } from "@/contexts/LocalizationContext";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Exata Administradora de Bens",
  description: "Exata Administradora de Bens",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} antialiased w-screen h-screen overflow-x-hidden`}
      >
        <LocalizationProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </LocalizationProvider>
      </body>
    </html>
  );
}
