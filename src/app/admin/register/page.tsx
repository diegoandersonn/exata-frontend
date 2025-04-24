"use client";

import Image from "next/image";
import { Header } from "@/components/auth/Header";
import { FormRegisterStepOne } from "@/components/auth/register/FormRegisterStepOne";
import { FormRegisterStepTwo } from "@/components/auth/register/FormRegisterStepTwo";
import { FormRegisterStepThree } from "@/components/auth/register/FormRegisterStepThree";
import { FormRegisterStepFour } from "@/components/auth/register/FormRegisterStepFour";
import { useRegister } from "@/contexts/RegisterContext";

export default function RegisterPage() {
  const { currentStep } = useRegister();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <FormRegisterStepOne />;
      case 2:
        return <FormRegisterStepTwo />;
      case 3:
        return <FormRegisterStepThree />;
      case 4:
        return <FormRegisterStepFour />;
      default:
        return <FormRegisterStepOne />;
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="flex-grow min-h-[calc(100vh-88px)] max-w-[1440px] xxlg:mx-auto flex justify-between">
        <aside className="relative w-[60%] sl:w-[43%] flex-shrink-0 flex items-center rounded-4xl overflow-hidden">
          <Image
            id="image"
            src="/ChatGPT Image 23 de abr. de 2025, 19_37_24.png"
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
          <div className="min-w-96 max-w-96 min-h-full mx-auto flex items-center">
            {renderStep()}
          </div>
        </section>
      </main>
    </div>
  );
}
