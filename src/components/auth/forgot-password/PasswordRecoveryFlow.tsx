"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FormForgotPasswordStepOne } from "./FormForgotPasswordStepOne";
import { FormForgotPasswordStepTwo } from "./FormForgotPasswordStepTwo";
import { FormForgotPasswordStepThree } from "./FormForgotPasswordStepThree";

interface ApiResponse {
  message: string;
}

interface ValidateOtpResponse {
  message: string;
  data: {recoverPasswordToken:string};
}

export const PasswordRecoveryFlow: React.FC = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState("");
  // const [token, setToken] = useState("");

  const handleEmailSubmit = async (submittedEmail: string) => {

    try {    
      const response = await fetch("http://exata-backend.us-east-2.elasticbeanstalk.com/auth/send-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: submittedEmail }),
      });

      if (!response.ok) {
        if (response.status === 404) {
          toast.error("Email não cadastrado");
          return;
        }

        if (response.status === 500) {
         
          toast.error(
            "Erro interno do servidor. Por favor, tente novamente mais tarde."
          );
        }
      }

      setEmail(submittedEmail);
      setCurrentStep(2);
      toast.success(
        "Código enviado com sucesso! Verifique sua caixa de entrada."
      );
    } catch {
      toast.error("Erro ao processar solicitação. Tente novamente.");
    }
  };

  const handleOtpSubmit = async (otpCode: string) => {
   
    try {
      
      const response = await fetch("http://exata-backend.us-east-2.elasticbeanstalk.com/auth/verify-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, token: otpCode }),
      });

      if (response.status === 403) {
        toast.error(
          "Limite de tentativas excedido. Tente novamente em 10 minutos."
        );
        return false;
      }

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Código inválido. Tente novamente.");
        } else {
          toast.error("Erro ao validar código");
        }
        return false;
      }

      // setToken(data.data.recoverPasswordToken);
      setCurrentStep(3);
      toast.success("Código validado com sucesso!");
      return true;
    } catch {
      toast.error("Erro ao verificar código. Tente novamente.");
      return false;
    }
  };

  const handleResendCode = async () => {
    try {
      const response = await fetch("http://exata-backend.us-east-2.elasticbeanstalk.com/auth/send-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao reenviar código");
      }

      toast.success("Novo código enviado com sucesso!");
    } catch {
      
      toast.error("Erro ao reenviar código. Tente novamente.");
    }
  };

  const handlePasswordSubmit = async ({ password }: { password: string }) => {
    try {
      const response = await fetch(
        "http://exata-backend.us-east-2.elasticbeanstalk.com/auth/redefine-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );     
      
      if (response.status === 401) {
        toast.error("Sessão expirada. Por favor, reinicie o processo.");
        setCurrentStep(1);
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao alterar senha");
      }

      toast.success("Senha alterada com sucesso!");

      router.push("/admin");
    } catch {
      toast.error("Erro ao alterar senha. Tente novamente.");
    }
  };

  const handleBackStepTwo = () => router.push("/admin");

  const handleBackStepThree = () => setCurrentStep(currentStep - 1);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <FormForgotPasswordStepOne onSubmit={handleEmailSubmit} />;
      case 2:
        return (
          <FormForgotPasswordStepTwo
            email={email}
            onSubmit={handleOtpSubmit}
            onBack={handleBackStepTwo}
            onResendCode={handleResendCode}
          />
        );
      case 3:
        return (
          <FormForgotPasswordStepThree
            onSubmit={handlePasswordSubmit}
            onBack={handleBackStepThree}
          />
        );
      default:
        return null;
    }
  };

  return renderStep();
};
