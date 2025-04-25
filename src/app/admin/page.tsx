"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { Form, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Header } from "@/components/auth/Header";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { loginFormSchema, LoginFormData } from "./schemas/login/schemas";
import Link from "next/link";
import { toast } from "react-toastify";
import { Footer } from "@/components/auth/Footer";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useAuth();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    mode: "onBlur",
  });

  const { trigger, formState } = form;

  useEffect(() => {
    if (formState.dirtyFields.email) {
      trigger("password");
    }
  }, [formState.dirtyFields.email, trigger]);

  useEffect(() => {
    if (formState.dirtyFields.password) {
      trigger("email");
    }
  }, [formState.dirtyFields.password, trigger]);

  const handleForgotPasswordClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const email = form.getValues("email");
    router.push(`/admin/forgot-password?email=${encodeURIComponent(email)}`);
  };

  async function onSubmit(values: LoginFormData) {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        if (response.status === 403) {
          toast.error("Muitas tentativas. Tente novamente em 10 minutos");
          form.setError("root", {
            message: "Muitas tentativas. Tente novamente em 10 minutos",
          });
          return;
        } else if (response.status === 401) {
          toast.error("E-mail ou senha inválidos.");
          form.setError("root", {
            message: "E-mail ou senha inválidos.",
          });
          return;
        }
        throw new Error(`Erro ao fazer login: ${response.status}`);
      }

      const data = await response.json();

      if (!data.data.token) {
        throw new Error("Token não recebido do servidor");
      }

      setAuth({ token: data.data.token });
      router.replace("/wallet");
    } catch {
      form.setError("root", {
        message: "Ocorreu um erro ao fazer login. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  }

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
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="min-w-96 lg:max-w-96 h-full my-auto"
              >
                <h1
                  id="title"
                  className="w-full lg:max-w-96 xl:max-w-96 text-lg font-semibold leading-tight mb-[2rem] text-[#1E293B]"
                >
                  Login Admin
                </h1>
                <FormItem className="mb-[1.5rem] w-[24rem]">
                  <FormLabel
                    id="label-email"
                    htmlFor="email"
                    className="text-[#00253F]"
                  >
                    E-mail
                  </FormLabel>
                  <Input
                    id="email"
                    type="text"
                    placeholder="exemplo@mail.com"
                    {...form.register("email")}
                    className={`w-full p-2 mt-[0.313rem] ${
                      form.formState.errors.email
                        ? "border-[#C80018]"
                        : "mb-[0.375rem]"
                    }`}
                    aria-labelledby="label-email"
                  />

                  {form.formState.errors.email && (
                    <FormMessage id="message-error">
                      {form.formState.errors.email.message}
                    </FormMessage>
                  )}
                </FormItem>
                <FormItem className="mb-[3.5rem]">
                  <FormLabel
                    id="label-password"
                    htmlFor="password"
                    className="text-[#00253F]"
                  >
                    Senha
                  </FormLabel>
                  <div className="relative w-full">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Digite aqui"
                      {...form.register("password")}
                      className={`w-full p-2 mt-[0.313rem]`}
                      aria-labelledby="label-password"
                    />
                    <button
                      id="show-password-btn"
                      type="button"
                      className={
                        "absolute bg-transparent border-none ml-[90%] top-[57%] -translate-y-1/2"
                      }
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={
                        showPassword ? "Ocultar senha" : "Mostrar senha"
                      }
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEye : faEyeSlash}
                        className="text-gray-500 h-4 w-4 p-2 text-center"
                        aria-hidden="true"
                      />
                    </button>
                  </div>

                  <Link
                    id="forgot-password-link"
                    href="/auth/forgot-password"
                    onClick={handleForgotPasswordClick}
                    className="text-[#64748B] hover:text-[#475569] text-sm no-underline hover:underline"
                    aria-label="Esqueci minha senha, ir para página de recuperação de senha"
                  >
                    Esqueci minha senha
                  </Link>
                </FormItem>

                <Button
                  id="enter-btn"
                  type="submit"
                  disabled={!form.formState.isReady || isLoading}
                  className={`w-full h-[2.5rem] text-[#FFFFFF] ${
                    !form.formState.isReady || isLoading
                      ? "bg-[#213f57]"
                      : "bg-[#C80018] hover:bg-[] border-[#C80018]"
                  } mb-[0.75rem] hover:cursor-pointer rounded-[0.375rem]`}
                >
                  {isLoading ? (
                    <FontAwesomeIcon
                      icon={faSpinner}
                      className="h-4 w-4 animate-spin"
                    />
                  ) : (
                    "Entrar"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
