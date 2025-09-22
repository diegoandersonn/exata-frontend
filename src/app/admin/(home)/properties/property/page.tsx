"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { PropertyTypeEnum } from "@/types/property-type-enum";
import { toast } from "react-toastify";
import { AdjustmentTypeEnum } from "@/types/adjustment-type-enum";
import useGetProperty from "@/hooks/use-getProperty";

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
  const [cepError, setCepError] = useState<boolean>(false);

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

  function formatCurrency(value: string | number): string {
    const num =
      typeof value === "number"
        ? value
        : parseFloat(String(value).replace(",", "."));
    if (isNaN(num)) return "";
    return num.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

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
        cep: property?.address?.cep,
        street: property?.address?.logradouro,
        number: String(property?.address?.numero),
        complement: property?.address?.complemento,
        neighborhood: property?.address?.bairro,
        city: property?.address?.cidade,
        state: property?.address?.uf,
      });
    }
  }, [property]);

  useEffect(() => {
    if (mainImageFile) {
      setMainImagePreview(URL.createObjectURL(mainImageFile));
    } else {
      setMainImagePreview(null);
    }
  }, [mainImageFile]);

  useEffect(() => {
    if (otherImages && otherImages.length > 0) {
      setOtherImagesPreview(
        Array.from(otherImages).map((file) => URL.createObjectURL(file))
      );
    } else {
      setOtherImagesPreview([]);
    }
  }, [otherImages]);

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
      setOtherImages(e.target.files);
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

    data.append("address[cep]", form.cep);
    data.append("address[logradouro]", form.street);
    data.append("address[numero]", String(form.number));
    data.append("address[complemento]", form.complement);
    data.append("address[bairro]", form.neighborhood);
    data.append("address[cidade]", form.city);

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
        await fetch("http://localhost:3333/property", {
          method: "POST",
          body: data,
        });
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
    <div className="flex flex-col items-center justify-center min-h-[26rem] bg-transparent">
      <div className="flex items-center gap-1 w-full h-fit">
        <Image
          src="/arrow-left-2-svgrepo-com.svg"
          alt="arrow-left"
          width={28}
          height={28}
          className="mb-4 hover:cursor-pointer"
          onClick={() => router.push("/admin/properties")}
        ></Image>
        <h1 className="text-[1.4rem] font-bold mb-4 text-center">
          {property ? "Editar Imóvel" : "Cadastrar Imóvel"}
        </h1>
      </div>

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
        <div className={`${index === 0 ? "block" : "hidden"} space-y-3`}>
          {/* Tipo do imóvel */}
          <div className="bg-white rounded-lg w-full h-fit p-6">
            <h2 className="text-base font-medium">Dados principais</h2>
            <div className="flex justify-between mt-4">
              <div className="w-[31.5%]">
                <label className="block text-[0.9rem] font-medium mb-1">
                  Título do imóvel
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Digite aqui"
                  className={`${
                    triedNext && !form.name ? "border-red-500" : ""
                  } w-full border rounded px-3 py-2 mb-1 text-black`}
                  required
                />
              </div>

              <div className="w-[31.5%]">
                <label className="block text-[0.9rem] font-medium mb-1">
                  Tipo do imóvel
                </label>
                <select
                  name="propertyType"
                  value={form.propertyType}
                  onChange={handleChange}
                  className={`${
                    triedNext && !form.propertyType ? "border-red-500" : ""
                  } w-full border rounded px-3 py-2 mb-1`}
                  required
                >
                  <option value="">Selecione</option>
                  <option value={PropertyTypeEnum.apartment}>
                    Apartamento
                  </option>
                  <option value={PropertyTypeEnum.house}>Casa</option>
                </select>
              </div>

              <div className="w-[31.5%]">
                <label className="block text-[0.9rem] font-medium mb-1">
                  Prazo do contrato
                </label>
                <input
                  type="text"
                  name="prazo"
                  value={form.prazo}
                  onChange={handleChange}
                  onBlur={(e) => {
                    const rawValue = e.target.value.trim().toLowerCase();

                    // Se já estiver no formato correto (ex: "12 meses")
                    if (/^\d+\s*meses$/.test(rawValue)) return;

                    // Tenta extrair só o número
                    const numberOnly = rawValue.match(/\d+/)?.[0] || "";

                    if (numberOnly) {
                      setForm((prev) => ({
                        ...prev,
                        prazo: `${numberOnly} meses`,
                      }));
                    } else {
                      // Se não tiver número válido, limpa
                      setForm((prev) => ({
                        ...prev,
                        prazo: "",
                      }));
                    }
                  }}
                  placeholder="0 meses"
                  className={`${
                    triedNext && !form.prazo ? "border-red-500" : ""
                  } w-full border rounded px-3 py-2 mb-1 text-black`}
                  required
                />
              </div>
            </div>

            <div className="flex justify-between mt-4">
              {/* Dormitórios */}
              <div className="w-[31.5%]">
                <label className="block text-[0.9rem] font-medium mb-1">
                  Dormitório(s)
                </label>
                <input
                  type="number"
                  name="bedrooms"
                  value={form.bedrooms}
                  onChange={handleChange}
                  className={`${
                    triedNext && !form.bedrooms ? "border-red-500" : ""
                  } w-full border rounded px-3 py-2 mb-1`}
                  min={0}
                  placeholder="0"
                  required
                />
              </div>

              {/* Banheiros */}
              <div className="w-[31.5%]">
                <label className="block text-[0.9rem] font-medium mb-1">
                  Banheiro(s)
                </label>
                <input
                  type="number"
                  name="bathrooms"
                  value={form.bathrooms}
                  onChange={handleChange}
                  className={`${
                    triedNext && !form.bathrooms ? "border-red-500" : ""
                  } w-full border rounded px-3 py-2 mb-1`}
                  min={0}
                  placeholder="0"
                  required
                />
              </div>

              {/* Garagens */}
              <div className="w-[31.5%]">
                <label className="block text-[0.9rem] font-medium mb-1">
                  Garagem(ns)
                </label>
                <input
                  type="number"
                  name="garages"
                  value={form.garages}
                  onChange={handleChange}
                  className={`${
                    triedNext && !form.garages ? "border-red-500" : ""
                  } w-full border rounded px-3 py-2 mb-1`}
                  min={0}
                  placeholder="0"
                  required
                />
              </div>
            </div>
          </div>

          {/* <div className="bg-white rounded-lg w-full h-fit flex p-6 justify-between"></div> */}

          <div className="bg-white rounded-lg w-full h-fit p-6">
            <h2 className="text-base font-medium">Valores</h2>
            {/* Aluguel */}
            <div className="flex justify-between mt-4">
              <div className="w-[31.5%]">
                <label className="block text-[0.9rem] font-medium mb-1">
                  Aluguel (R$)
                </label>
                <input
                  type="text"
                  name="rent"
                  value={form.rent}
                  onChange={handleChange}
                  onBlur={(e) => {
                    const value = e.target.value.trim();

                    // Substitui ponto por nada e vírgula por ponto temporariamente para parseFloat
                    const normalized = value
                      .replace(/\./g, "")
                      .replace(",", ".");

                    const parsed = parseFloat(normalized);

                    if (isNaN(parsed)) {
                      setForm((prev) => ({ ...prev, rent: "" }));
                      return;
                    }

                    // Formata no padrão pt-BR com separador de milhar (.) e decimal (,)
                    const formatted = parsed.toLocaleString("pt-BR", {
                      minimumFractionDigits: value.includes(",") ? 2 : 2,
                      maximumFractionDigits: 2,
                    });

                    setForm((prev) => ({
                      ...prev,
                      rent: formatted,
                    }));
                  }}
                  placeholder="0,00"
                  className={`${
                    triedNext && !form.rent ? "border-red-500" : ""
                  } w-full border rounded px-3 py-2 mb-1`}
                  required
                />
              </div>

              {/* Taxa */}
              <div className="w-[31.5%]">
                <label className="block text-[0.9rem] font-medium mb-1">
                  IPTU (R$)
                </label>
                <input
                  type="text"
                  name="tax"
                  value={form.tax}
                  onChange={handleChange}
                  onBlur={(e) => {
                    const value = e.target.value.trim();

                    // Substitui milhar e decimal para permitir o parseFloat
                    const normalized = value
                      .replace(/\./g, "")
                      .replace(",", ".");

                    const parsed = parseFloat(normalized);

                    if (isNaN(parsed)) {
                      setForm((prev) => ({ ...prev, tax: "" }));
                      return;
                    }

                    const formatted = parsed.toLocaleString("pt-BR", {
                      minimumFractionDigits: value.includes(",") ? 2 : 2,
                      maximumFractionDigits: 2,
                    });

                    setForm((prev) => ({
                      ...prev,
                      tax: formatted,
                    }));
                  }}
                  placeholder="0,00"
                  className={`${
                    triedNext && !form.tax ? "border-red-500" : ""
                  } w-full border rounded px-3 py-2 mb-1`}
                  required
                />
              </div>

              {/* Aluguel + IPTU */}
              <div className="w-[31.5%]">
                <label className="block text-[0.9rem] font-medium mb-1">
                  Aluguel + IPTU (R$)
                </label>
                <input
                  type="text"
                  name="rentWithTax"
                  value={(() => {
                    const parseCurrency = (val: string) => {
                      if (!val) return 0;
                      const normalized = val
                        .replace(/\./g, "")
                        .replace(",", ".");
                      const parsed = parseFloat(normalized);
                      return isNaN(parsed) ? 0 : parsed;
                    };

                    const total =
                      parseCurrency(form.rent) + parseCurrency(form.tax);

                    return total.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    });
                  })()}
                  disabled
                  placeholder="0,00"
                  className={`${
                    triedNext && (!form.rent || !form.tax)
                      ? "border-red-500"
                      : ""
                  } w-full border rounded px-3 py-2 mb-1 text-gray-500`}
                  required
                  min={0}
                  step="0.01"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg w-full h-fit p-6 gap-4">
            <h2 className="text-base font-medium mb-4">Extras</h2>
            <div className="flex justify-between flex-wrap">
              <div className="w-[31.5%]">
                <label className="block text-[0.9rem] font-medium mb-1">
                  Tipo de Reajuste
                </label>
                <select
                  name="reajusteType"
                  value={form.reajusteType}
                  onChange={handleChange}
                  className={`${
                    triedNext && !form.reajusteType ? "border-red-500" : ""
                  } w-full border rounded px-3 py-2 mb-1 text-black`}
                  required
                >
                  <option value="">Selecione</option>
                  <option value={AdjustmentTypeEnum.annual}>Anual</option>
                  <option value={AdjustmentTypeEnum.semiannual}>
                    Semestral
                  </option>
                  <option value={AdjustmentTypeEnum.biennial}>Bianual</option>
                </select>
              </div>
              <div className="w-[31.5%]">
                <label className="block text-[0.9rem] font-medium mb-1">
                  Horário de Visita
                </label>
                <input
                  type="text"
                  name="horarioVisita"
                  value={form.horarioVisita}
                  onChange={handleChange}
                  onBlur={(e) => {
                    const val = e.target.value.trim();

                    // Expressão regular para capturar até 4 horários (HHMM ou HH:MM)
                    const timeRegex = /(\d{1,2}):?(\d{2})?/g;

                    const matches: { hour: string; minute: string }[] = [];
                    let match;
                    while ((match = timeRegex.exec(val)) !== null) {
                      matches.push({
                        hour: match[1],
                        minute: match[2] || "00",
                      });
                      if (matches.length === 4) break;
                    }

                    // Se não conseguir 2 ou 4 horários, tenta fallback com grupos de 3-4 dígitos
                    if (matches.length !== 2 && matches.length !== 4) {
                      const digits = val.match(/\d{3,4}/g);
                      if (
                        !digits ||
                        (digits.length !== 2 && digits.length !== 4)
                      ) {
                        setForm((prev) => ({ ...prev, horarioVisita: "" }));
                        return;
                      }

                      matches.length = 0; // limpa
                      digits.forEach((d) => {
                        matches.push({
                          hour: d.slice(0, 2),
                          minute: d.slice(2) || "00",
                        });
                      });
                    }

                    function formatTime(hm: { hour: string; minute: string }) {
                      const h = hm.hour.padStart(2, "0");
                      const m = hm.minute.padEnd(2, "0");

                      const hourNum = parseInt(h, 10);
                      const minNum = parseInt(m, 10);

                      if (
                        hourNum < 0 ||
                        hourNum > 23 ||
                        minNum < 0 ||
                        minNum > 59
                      ) {
                        return null;
                      }

                      return `${h}:${m}`;
                    }

                    const formattedTimes = matches.map(formatTime);

                    if (formattedTimes.some((t) => t === null)) {
                      setForm((prev) => ({ ...prev, horarioVisita: "" }));
                      return;
                    }

                    let final = `${formattedTimes[0]} - ${formattedTimes[1]}`;
                    if (formattedTimes.length === 4) {
                      final += ` | ${formattedTimes[2]} - ${formattedTimes[3]}`;
                    }

                    setForm((prev) => ({ ...prev, horarioVisita: final }));
                  }}
                  placeholder="00:00 - 00:00 | 00:00 - 00:00"
                  className={`${
                    triedNext && !form.horarioVisita ? "border-red-500" : ""
                  } w-full border rounded px-3 py-2 mb-1 text-black`}
                  required
                />
              </div>

              <div className="w-[31.5%]">
                <label className="block text-[0.9rem] font-medium mb-1">
                  Área (m²)
                </label>
                <input
                  type="number"
                  name="area"
                  value={form.area}
                  onChange={handleChange}
                  className={`${
                    triedNext && !form.area ? "border-red-500" : ""
                  } w-full border rounded px-3 py-2 mb-1 text-black`}
                  placeholder="0"
                  min={0}
                  required
                />
              </div>
              <div className="w-full mt-3">
                <label className="block text-[0.9rem] font-medium mb-1">
                  Descrição
                </label>
                <input
                  type="text"
                  name="descricao"
                  value={form.descricao}
                  onChange={handleChange}
                  className={`${
                    triedNext && !form.descricao ? "border-red-500" : ""
                  } w-full border rounded px-3 py-2 mb-1 text-black`}
                  placeholder="Digite aqui"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className={`${index === 1 ? "block" : "hidden"} space-y-3`}>
          {/* Tipo do imóvel */}
          <div className="bg-white rounded-lg w-full h-fit p-6">
            <div className="flex justify-between mt-4">
              <div className="w-[31.5%]">
                <label className="block text-[0.9rem] font-medium mb-1">
                  CEP
                </label>
                <input
                  type="text"
                  name="cep"
                  value={form.cep}
                  onChange={async (e) => {
                    let value = e.target.value.replace(/\D/g, ""); // só números

                    // limita a 8 dígitos
                    if (value.length > 8) value = value.substring(0, 8);

                    // aplica máscara 99999-999
                    if (value.length > 5) {
                      value = value.replace(/(\d{5})(\d{1,3})/, "$1-$2");
                    }

                    // atualiza o form
                    setForm((prev) => ({ ...prev, cep: value }));

                    // dispara busca se tiver 8 dígitos
                    const numericCep = value.replace(/\D/g, "");
                    if (numericCep.length === 8) {
                      try {
                        const response = await fetch(
                          `https://viacep.com.br/ws/${numericCep}/json/`
                        );
                        const data = await response.json();

                        if (data.erro) {
                          toast.error("CEP não encontrado.");
                          setCepError(true);
                          return;
                        } else {
                          setCepError(false);
                        }

                        setForm((prev) => ({
                          ...prev,
                          street: data.logradouro,
                          neighborhood: data.bairro,
                          city: data.localidade,
                          state: data.uf,
                        }));
                      } catch (error) {
                        console.error("Erro ao buscar CEP:", error);
                      }
                    }
                  }}
                  placeholder="00000-000"
                  maxLength={9} // 8 dígitos + o "-"
                  className={`${
                    (triedNext && !form.cep) || cepError ? "border-red-500" : ""
                  } w-full border rounded px-3 py-2 mb-1 text-black`}
                  required
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg w-full h-fit p-6">
            <div className="flex justify-between mt-4">
              <div className="w-[31.5%]">
                <label className="block text-[0.9rem] font-medium mb-1">
                  Logradouro
                </label>
                <input
                  type="text"
                  name="street"
                  value={form.street}
                  onChange={handleChange}
                  disabled
                  className={`${
                    triedNext && !form.street ? "border-red-500" : ""
                  } w-full border rounded px-3 py-2 mb-1 text-gray-500`}
                />
              </div>

              <div className="w-[31.5%]">
                <label className="block text-[0.9rem] font-medium mb-1">
                  Número
                </label>
                <input
                  type="number"
                  name="number"
                  value={form.number}
                  onChange={handleChange}
                  className={`${
                    triedNext && !form.number ? "border-red-500" : ""
                  } w-full border rounded px-3 py-2 mb-1`}
                  min={0}
                  placeholder="0"
                  required
                />
              </div>

              <div className="w-[31.5%]">
                <label className="block text-[0.9rem] font-medium mb-1">
                  Complemento
                </label>
                <input
                  type="text"
                  name="complement"
                  value={form.complement}
                  onChange={handleChange}
                  placeholder="Digite aqui"
                  className={`${
                    triedNext && !form.complement ? "border-red-500" : ""
                  } w-full border rounded px-3 py-2 mb-1 text-black`}
                />
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <div className="w-[31.5%]">
                <label className="block text-[0.9rem] font-medium mb-1">
                  Bairro
                </label>
                <input
                  type="text"
                  name="neighborhood"
                  value={form.neighborhood}
                  onChange={handleChange}
                  disabled
                  className={`${
                    triedNext && !form.neighborhood ? "border-red-500" : ""
                  } w-full border rounded px-3 py-2 mb-1 text-gray-500`}
                />
              </div>

              <div className="w-[31.5%]">
                <label className="block text-[0.9rem] font-medium mb-1">
                  Cidade
                </label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  disabled
                  className={`${
                    triedNext && !form.city ? "border-red-500" : ""
                  } w-full border rounded px-3 py-2 mb-1 text-gray-500`}
                />
              </div>

              <div className="w-[31.5%]">
                <label className="block text-[0.9rem] font-medium mb-1">
                  UF
                </label>
                <input
                  type="text"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  disabled
                  className={`${
                    triedNext && !form.state ? "border-red-500" : ""
                  } w-full border rounded px-3 py-2 mb-1 text-gray-500`}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={`${index === 2 ? "block" : "hidden"} space-y-3`}>
          {/* Foto Principal */}
          <div className="bg-white rounded-lg w-full h-[11.5rem] p-6">
            <div
              className={`w-full h-full flex flex-col items-center justify-center transition-all ${
                mainImagePreview ? "" : "border-dashed border-2 border-gray-300"
              }`}
            >
              <label
                htmlFor="mainImage"
                className="cursor-pointer text-gray-500 hover:text-gray-600 flex flex-col items-center gap-2"
              >
                {!mainImagePreview && <span>+ Adicione a foto principal</span>}
                <input
                  id="mainImage"
                  type="file"
                  accept="image/*"
                  name="mainImage"
                  onChange={handleFileChange}
                  required
                  className="hidden"
                />
              </label>

              {mainImagePreview && (
                <Image
                  src={mainImagePreview}
                  alt="Pré-visualização da foto principal"
                  className="mt-3 rounded max-h-36 object-contain border border-gray-300"
                />
              )}
            </div>
          </div>

          {/* Outras Fotos */}
          <div className="bg-white rounded-lg w-full h-[11.5rem] p-6">
            <div
              className={`w-full h-full flex flex-col items-center justify-center transition-all ${
                otherImagesPreview.length > 0
                  ? ""
                  : "border-dashed border-2 border-gray-300"
              }`}
            >
              <label
                htmlFor="otherImages"
                className="cursor-pointer text-gray-500 hover:text-gray-600 flex flex-col items-center gap-2"
              >
                {otherImagesPreview.length === 0 && (
                  <span>+ Adicione as outras fotos</span>
                )}
                <input
                  id="otherImages"
                  type="file"
                  accept="image/*"
                  name="otherImages"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {otherImagesPreview.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3 max-h-36 overflow-auto">
                  {otherImagesPreview.map((src, idx) => (
                    <Image
                      key={idx}
                      src={src}
                      alt={`Pré-visualização ${idx + 1}`}
                      className="rounded max-h-24 object-contain border border-gray-300"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* <div className={`hidden space-y-3`}>
          <div className="bg-white rounded-lg w-full h-fit flex p-6 gap-4 flex-wrap">
            <div className="w-1/2 min-w-[200px] flex flex-col items-center">
              <label className="block text-[0.9rem] font-medium mb-2">
                Foto principal
              </label>
              <input
                type="file"
                accept="image/*"
                name="mainImage"
                onChange={handleFileChange}
                required
                className="block w-full text-sm text-black file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
              />
              {mainImagePreview && (
                <img
                  src={mainImagePreview}
                  alt="Pré-visualização da foto principal"
                  className="mt-2 rounded max-h-40 object-contain border"
                />
              )}
            </div>
            <div className="w-1/2 min-w-[200px] flex flex-col items-center">
              <label className="block text-[0.9rem] font-medium mb-2">
                Outras fotos
              </label>
              <input
                type="file"
                accept="image/*"
                name="otherImages"
                onChange={handleFileChange}
                multiple
                className="block w-full text-sm text-black file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {otherImagesPreview.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`Pré-visualização ${idx + 1}`}
                    className="rounded max-h-24 object-contain border"
                  />
                ))}
              </div>
            </div>
          </div>
        </div> */}

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
