"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import useGetProperty from "@/hooks/use-getProperty";
import { useAuth } from "@/contexts/AuthContext";
import PropertyForm1 from "@/components/ui/property-form-1";
import { formatCurrency } from "@/utils/formatCurrency";
import PropertyForm2 from "@/components/ui/property-form-2";
import PropertyForm3 from "@/components/ui/property-form-3";
import FullScreenLoader from "@/components/ui/full-screen-loader";

export default function Propertie() {
  const searchParams = useSearchParams();
  const propertyId = searchParams.get("propertyId");
  const [index, setIndex] = useState<number>(0);
  const [triedNext, setTriedNext] = useState(false);
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const { property } = useGetProperty(propertyId as string);
  const [otherImages, setOtherImages] = useState<FileList | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [otherImagesPreview, setOtherImagesPreview] = useState<string[]>([]);
  const [isPending, setIsPending] = useState<boolean>(false);
  const { token } = useAuth();

  const [form, setForm] = useState({
    name: "",
    prazo: "",
    mainImage: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    garages: "",
    rent: "",
    tax: "",
    reajusteType: "",
    horarioVisita: "",
    area: "",
    descricao: "",
    cep: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
  });

  useEffect(() => {
    if (property) {
      setForm({
        name: property?.nome,
        prazo: property?.prazo,
        mainImage: property?.imagens?.[0],
        propertyType: property?.tipo,
        bedrooms: String(property?.dormitorios),
        bathrooms: String(property?.banheiros),
        garages: String(property?.vagasGaragem),
        rent: String(formatCurrency(property?.aluguel)),
        tax: String(formatCurrency(property?.iptu)),
        reajusteType: property?.tipoReajuste,
        horarioVisita: property?.horarioVisita,
        area: String(property?.area),
        descricao: property?.descricao,
        cep: property?.cep,
        street: property?.logradouro,
        number: String(property?.numero),
        complement: property?.complemento,
        neighborhood: property?.bairro,
        city: property?.cidade,
        state: property?.uf,
      });

      if (property?.imagens && property.imagens.length > 0) {
        setMainImagePreview(property.imagens[0]);
        setOtherImagesPreview(property.imagens.slice(1));
        console.log(property.imagens.slice(1));
      }
    }
  }, [property]);

  useEffect(() => {
    if (mainImageFile) {
      setMainImagePreview(URL.createObjectURL(mainImageFile));
    } else {
      setMainImagePreview(null);
    }
  }, [mainImageFile]);

  const handleNext = (e: React.MouseEvent) => {
    if (!isStepOneValid()) {
      setTriedNext(true);
      e.preventDefault();
      return;
    }
    setTriedNext(false);
    setIndex(index === 2 ? 2 : index + 1);
  };

  const router = useRouter();

  const isStepOneValid = () => {
    return (
      form.propertyType &&
      form.bedrooms &&
      form.bathrooms &&
      form.garages &&
      form.rent &&
      form.tax
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "mainImage" && e.target.files && e.target.files[0]) {
      setMainImageFile(e.target.files[0]);
    }

    if (e.target.name === "otherImages" && e.target.files) {
      const filesArray = Array.from(e.target.files);

      // adiciona previews novos ao final
      setOtherImagesPreview((prev) => [
        ...prev,
        ...filesArray.map((file) => URL.createObjectURL(file)),
      ]);

      // também atualiza o FileList sem sobrescrever
      setOtherImages((prev) => {
        const prevFiles = prev ? Array.from(prev) : [];
        const dataTransfer = new DataTransfer();
        [...prevFiles, ...filesArray].forEach((file) =>
          dataTransfer.items.add(file)
        );
        return dataTransfer.files;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("nome", form.name);
    data.append("prazo", form.prazo);
    data.append("tipo", form.propertyType);
    data.append("dormitorios", String(form.bedrooms));
    data.append("banheiros", String(form.bathrooms));
    data.append("vagasGaragem", String(form.garages));
    data.append(
      "aluguel",
      parseFloat(
        String(form.rent).replace(/\./g, "").replace(",", ".")
      ).toString()
    );
    data.append(
      "iptu",
      parseFloat(
        String(form.tax).replace(/\./g, "").replace(",", ".")
      ).toString()
    );
    data.append("tipoReajuste", form.reajusteType);
    data.append("horarioVisita", form.horarioVisita);
    data.append("area", String(form.area));
    data.append("descricao", form.descricao);

    data.append("cep", form.cep);
    data.append("logradouro", form.street);
    data.append("numero", String(form.number));
    data.append("complemento", form.complement ?? "");
    data.append("bairro", form.neighborhood);
    data.append("cidade", form.city);
    data.append("uf", form.state);
    data.append("criadoPor", "Admin");

    if (mainImageFile) {
      data.append("imagens", mainImageFile);
    }

    if (otherImages) {
      Array.from(otherImages).forEach((file) => {
        data.append("imagens", file);
      });
    }

    if (property) {
      try {
        setIsPending(true);
        await fetch(`http://localhost:3333/property/${property._id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
          method: "PUT",
          body: data,
        });
        toast.success("Imóvel editado com sucesso");
        router.push("/admin/properties");
      } catch (error) {
        console.error(error);
        toast.error("Erro inesperado. Tente novamente mais tarde");
      } finally {
        setIsPending(false);
      }
    } else {
      try {
        setIsPending(true);
        let response = await fetch("http://localhost:3333/property", {
          headers: {
            authorization: `Bearer ${token}`,
          },
          method: "POST",
          body: data,
        });
        console.log('TESTE!!!!!');
        console.log(response);
        toast.success("Imóvel criado com sucesso");
        router.push("/admin/properties");
      } catch (error) {
        console.error(error);
        toast.error("Erro inesperado. Tente novamente mais tarde");
      } finally {
        setIsPending(false);
      }
    }
  };

  useEffect(() => {}, [mainImagePreview]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[26rem] bg-transparent">
      {/* overlay loader — filho deste container (respeita navbar/sidebar) */}
      <FullScreenLoader open={isPending} />

      {/* Header */}
      <div className="flex items-center gap-1 w-full h-fit">
        <Image
          src="/arrow-left-2-svgrepo-com.svg"
          alt="arrow-left"
          width={28}
          height={28}
          className="mb-4 hover:cursor-pointer"
          onClick={() => router.push("/admin/properties")}
        />
        <h1 className="text-[1.4rem] font-bold mb-4 text-center">
          {property ? "Editar Imóvel" : "Cadastrar Imóvel"}
        </h1>
      </div>

      {/* resto do conteúdo (form, tabs, etc.) */}
      <div
        id="active-or-inactive"
        className="flex h-[3.75rem] w-full mt-[-0.25rem] bg-white px-[1.5rem] gap-[1.5rem] mb-[1rem] rounded-lg"
      >
        <h3
          className={`${
            index === 0
              ? "font-semibold text-[#393B3C] border-b-[0.125rem] border-red-500"
              : "font-normal text-[#5C6164] border-b-[0.125rem] border-white"
          } text-sm mt-auto hover:cursor-default pb-[0.625rem]`}
        >
          Informações
        </h3>
        <h3
          className={`${
            index === 1
              ? "font-semibold text-[#393B3C] border-b-[0.125rem] border-red-500"
              : "font-normal text-[#5C6164] border-b-[0.125rem] border-white"
          } text-sm mt-auto hover:cursor-default pb-[0.625rem]`}
        >
          Endereço
        </h3>
        <h3
          className={`${
            index === 2
              ? "font-semibold text-[#393B3C] border-b-[0.125rem] border-red-500"
              : "font-normal text-[#5C6164] border-b-[0.125rem] border-white"
          } text-sm mt-auto hover:cursor-default pb-[0.625rem]`}
        >
          Fotos
        </h3>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-transparent w-full mb-[-1rem]"
      >
        {/* Informações do imóvel */}
        <PropertyForm1
          index={index}
          form={form}
          setForm={setForm}
          triedNext={triedNext}
          handleChange={handleChange}
        />

        {/* Endereço do imóvel */}
        <PropertyForm2
          index={index}
          form={form}
          setForm={setForm}
          triedNext={triedNext}
          handleChange={handleChange}
        />

        {/* Fotos do imóvel */}
        <PropertyForm3
          index={index}
          mainImagePreview={mainImagePreview}
          handleFileChange={handleFileChange}
          otherImagesPreview={otherImagesPreview}
          setOtherImagesPreview={setOtherImagesPreview}
          setMainImagePreview={setMainImagePreview}
        />

        {/* Footer */}
        <div className="w-full flex justify-end gap-3 mt-3">
          <button
            onClick={() => setIndex(index === 0 ? 0 : index - 1)}
            className={`${
              index > 0 ? "block" : "hidden"
            } w-1/6 text-red-600 bg-transparent py-2 rounded border-2 border-red-600 font-semibold hover:border-2 hover:text-red-700 hover:border-red-700 transition mr-auto`}
          >
            Voltar
          </button>

          <button
            onClick={() => router.push("/admin/properties")}
            className="w-1/6 text-red-600 bg-transparent py-2 rounded border-2 border-transparent font-semibold hover:border-2 hover:text-red-700 hover:border-red-700 transition"
          >
            Cancelar
          </button>
          {!isPending && (
            <button
              type={index < 2 ? "button" : "submit"}
              onClick={index < 2 ? handleNext : handleSubmit}
              className={
                "bg-red-600 hover:bg-red-700 w-1/6 text-white py-2 rounded border-2 border-transparent font-semibold transition"
              }
            >
              {index < 2 ? "Próximo" : "Salvar"}
            </button>
          )}
          {isPending && (
            <button
              type="button"
              disabled
              className={
                "bg-red-600 hover:bg-red-700 w-1/6 text-white py-2 rounded border-2 border-transparent font-semibold transition"
              }
            >
              Carregando...
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
