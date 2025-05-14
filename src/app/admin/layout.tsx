import type { Metadata } from "next";
import { AuthProvider } from "@/contexts/AuthContext";
import { RegisterProvider } from "@/contexts/RegisterContext";
import { ToastContainer } from "react-toastify";
import FcmTokenHandler from "@/components/FcmTokenHandler";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Academy Wallet",
  description: "Fintech Academy Wallet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <RegisterProvider>
        <Toaster />
        {children}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </RegisterProvider>
    </AuthProvider>
  );
}
