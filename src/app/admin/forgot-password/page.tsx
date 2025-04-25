"use client";

import { Header } from "@/components/auth/Header";
import Image from "next/image";
import { PasswordRecoveryFlow } from "@/components/auth/forgot-password/PasswordRecoveryFlow";

export default function ForgotMyPassword() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="flex-grow min-h-[calc(100vh-88px)] w-[100%] xxlg:mx-auto flex justify-between">
        <aside className="relative w-[50%] flex-shrink-0 flex items-center rounded-4xl overflow-hidden">
          <Image
            id="image"
            src="/orla-de-santos-vemelha.png"
            alt="Imagem da orla de santos com filtro vermelho"
            fill
            className="w-full h-full rounded-r-[6.25rem]"
            priority
            aria-labelledby="image-description"
          />
          <p id="image-description" className="sr-only">
            Imagem da orla de santos com filtro vermelho.
          </p>
        </aside>
        <section className="flex-1">
          <div className="w-[54%] min-h-full mx-auto flex items-center">
            <PasswordRecoveryFlow />
          </div>
        </section>
      </main>
    </div>
  );
}
