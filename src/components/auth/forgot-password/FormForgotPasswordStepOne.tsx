import { Button } from "@/components/ui/button";
import { Form, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ForgotPasswordData,
  forgotPasswordSchema,
} from "../../../app/admin/schemas/forgot/schemas";

interface StepOneProps {
  onSubmit: (email: string) => Promise<void>;
}

export function FormForgotPasswordStepOne({ onSubmit }: StepOneProps) {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: searchParams.get("email") || "",
    },
  });

  const handleSubmit = async (formData: ForgotPasswordData) => {
    try {
      setIsLoading(true);
      await onSubmit(formData.email);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="min-w-96 lg:max-w-96 my-auto"
        aria-labelledby="title"
        noValidate
      >
        <h1
          id="title"
          className="w-full lg:max-w-96 xl:max-w-96 text-lg text-center font-semibold leading-tight mb-2 lg:mb-2 text-[#1E293B]"
        >
          Esqueceu sua senha?
        </h1>
        <p id="title-2" className="text-sm font-normal text-center mb-8">
          Digite abaixo um e-mail cadastrado para receber as instruções.
        </p>

        <FormItem className="mb-14">
          <FormLabel
            id="label-email"
            htmlFor="email"
            className="text-[#00253F]"
          >
            E-mail
          </FormLabel>
          <Input
            id="email"
            type="email"
            placeholder="exemplo@mail.com"
            className="p-2 w-full text-[#00253F] placeholder-custom"
            style={{ marginTop: "0.125rem" }}
            disabled={isLoading}
            aria-required="true"
            aria-invalid={!!form.formState.errors.email}
            aria-describedby="email-error"
            {...form.register("email")}
          />
          <FormMessage id="email-error">
            {form.formState.errors.email?.message}
          </FormMessage>
        </FormItem>

        <Button
          id="enter-btn"
          type="submit"
          disabled={!form.formState.isValid || isLoading}
          className={`w-full h-[2.5rem] text-[#FFFFFF] ${
            !form.formState.isValid || isLoading
              ? "bg-[#213f57]"
              : "bg-[#C80018] hover:bg-[#A00014] border-[#C80018]"
          } mb-[0.75rem] hover:cursor-pointer rounded-[0.375rem]`}
          aria-busy={isLoading}
        >
          {isLoading ? (
            <div
              className="h-4 w-4 animate-spin rounded-full border-b-2 border-white"
              aria-label="Carregando"
              role="status"
            />
          ) : (
            "Enviar"
          )}
        </Button>

        <p className="text-[#00253F] text-center mx-auto font-medium mb-8">
          <Link
            id="back-link"
            href="/admin"
            className="text-[#00253F] font-medium text-sm hover:underline"
            aria-label="Voltar para o login"
          >
            Voltar
          </Link>
        </p>
      </form>
    </Form>
  );
}
