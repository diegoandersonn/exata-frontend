"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PropertyTypeEnum } from "@/types/property-type-enum";
import { toast } from "react-toastify";
import { AdjustmentTypeEnum } from "@/types/adjustment-type-enum";

export default function Propertie() {
  // const searchParams = useSearchParams();
  // const propertyId = searchParams.get("propertyId");
  const [index, setIndex] = useState<number>(0);
  const [triedNext, setTriedNext] = useState(false);
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [otherImages, setOtherImages] = useState<FileList | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [otherImagesPreview, setOtherImagesPreview] = useState<string[]>([]);
  const [isPending, setIsPending] = useState<boolean>(false);

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
  });

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
    setIndex(1);
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
  data.append("dormitorios", form.bedrooms); // CORRETO AGORA
  data.append("banheiros", form.bathrooms);  // CORRETO AGORA
  data.append("vagasGaragem", form.garages);
  data.append("aluguel", parseFloat(form.rent.replace(/\./g, "").replace(",", ".")).toString());
  data.append("iptu", parseFloat(form.tax.replace(/\./g, "").replace(",", ".")).toString());
  data.append("tipoReajuste", form.reajusteType);
  data.append("horarioVisita", form.horarioVisita);
  data.append("area", form.area);
  data.append("descricao", form.descricao);

  if (mainImageFile) {
    data.append("imagens", mainImageFile);
  }

  if (otherImages) {
    Array.from(otherImages).forEach((file) => {
      data.append("imagens", file);
    });
  }

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
          Cadastrar Imóvel
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
                    const parseCurrency = (val) => {
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
                  placeholder="00:00 - 00:00"
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
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className={`${index === 1 ? "block" : "hidden"} space-y-3`}>
          <div className="bg-white rounded-lg w-full h-fit flex p-6 gap-4 flex-wrap">
            {/* Foto principal */}
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
            {/* Outras fotos */}
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
        </div>

        <div className="w-full flex justify-end gap-3 mt-3">
          <button
            onClick={() => setIndex(0)}
            className={`${
              index === 1 ? "block" : "hidden"
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
              type={index === 0 ? "button" : "submit"}
              onClick={index === 0 ? handleNext : handleSubmit}
              className={
                "bg-red-600 hover:bg-red-700 w-1/6 text-white py-2 rounded border-2 border-transparent font-semibold transition"
              }
            >
              {index === 0 ? "Próximo" : "Salvar"}
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
