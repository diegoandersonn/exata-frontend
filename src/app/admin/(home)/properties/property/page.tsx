"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Propertie() {
  // const searchParams = useSearchParams();
  // const propertyId = searchParams.get("propertyId");
  const [index, setIndex] = useState<number>(0);
  const [mainImagePreview] = useState<string | null>(null);
  const [triedNext, setTriedNext] = useState(false);

  const [form, setForm] = useState({
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

  const handleNext = (e: React.MouseEvent) => {
    if (!isStepOneValid()) {
      setTriedNext(true);
      e.preventDefault();
      return;
    }
    setTriedNext(false);
    setIndex(1);
  };

  // const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  // const [otherImages, setOtherImages] = useState<FileList | null>(null);
  // const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  // const [otherImagesPreview, setOtherImagesPreview] = useState<string[]>([]);

  // useEffect(() => {
  //   if (mainImageFile) {
  //     setMainImagePreview(URL.createObjectURL(mainImageFile));
  //   } else {
  //     setMainImagePreview(null);
  //   }
  // }, [mainImageFile]);

  // useEffect(() => {
  //   if (otherImages && otherImages.length > 0) {
  //     setOtherImagesPreview(
  //       Array.from(otherImages).map((file) => URL.createObjectURL(file))
  //     );
  //   } else {
  //     setOtherImagesPreview([]);
  //   }
  // }, [otherImages]);

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

  // function formatCurrency(value: string | number) {
  //   const number = Number(value);
  //   if (isNaN(number)) return "";
  //   return number.toLocaleString("pt-BR", {
  //     style: "currency",
  //     currency: "BRL",
  //   });
  // }

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.name === "mainImage" && e.target.files && e.target.files[0]) {
  //     setMainImageFile(e.target.files[0]);
  //   }
  //   if (e.target.name === "otherImages" && e.target.files) {
  //     setOtherImages(e.target.files);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("propertyType", form.propertyType);
    data.append("bedrooms", form.bedrooms);
    data.append("bathrooms", form.bathrooms);
    data.append("garages", form.garages);
    data.append("rent", form.rent);
    data.append("tax", form.tax);
    data.append("reajusteType", form.reajusteType);
    data.append("horarioVisita", form.horarioVisita);
    data.append("area", form.area);
    data.append("descricao", form.descricao);

    // if (mainImageFile) {
    //   data.append("mainImage", mainImageFile);
    // }
    // if (otherImages) {
    //   Array.from(otherImages).forEach((file, idx) => {
    //     data.append("otherImages", file);
    //   });
    // }

    await fetch("http://localhost:3000/properties", {
      method: "POST",
      body: data,
    });

    alert("Propriedade cadastrada!");
  };

  useEffect(() => {
    console.log(mainImagePreview);
  }, [mainImagePreview]);

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
            <label className="block text-[0.9rem] font-medium mb-1">
              Tipo do imóvel
            </label>
            <select
              name="propertyType"
              value={form.propertyType}
              onChange={handleChange}
              className={`${
                triedNext && !form.propertyType ? "border-red-500" : ""
              } w-1/2 border rounded px-3 py-2 mb-1`}
              required
            >
              <option value="">Selecione</option>
              <option value="Apartamento">Apartamento</option>
              <option value="Casa">Casa</option>
              <option value="Studio">Studio</option>
              <option value="Kitnet">Kitnet</option>
            </select>
          </div>

          <div className="bg-white rounded-lg w-full h-fit flex p-6 justify-between">
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
                required
              />
            </div>
          </div>

          <div className="bg-white rounded-lg w-full h-fit p-6 flex justify-between">
            {/* Aluguel */}
            <div className="w-[31.5%]">
              <label className="block text-[0.9rem] font-medium mb-1">
                Aluguel (R$)
              </label>
              <input
                type="number"
                name="rent"
                value={form.rent}
                onChange={handleChange}
                className={`${
                  triedNext && !form.rent ? "border-red-500" : ""
                } w-full border rounded px-3 py-2 mb-1`}
                min={0}
                step="0.01"
                required
              />
            </div>

            {/* Taxa */}
            <div className="w-[31.5%]">
              <label className="block text-[0.9rem] font-medium mb-1">
                IPTU (R$)
              </label>
              <input
                type="number"
                name="tax"
                value={form.tax}
                onChange={handleChange}
                className={`${
                  triedNext && !form.tax ? "border-red-500" : ""
                } w-full border rounded px-3 py-2 mb-1`}
                min={0}
                step="0.01"
                required
              />
            </div>

            {/* Aluguel + IPTU */}
            <div className="w-[31.5%]">
              <label className="block text-[0.9rem] font-medium mb-1">
                Aluguel + IPTU (R$)
              </label>
              <input
                type="number"
                name="rentWithTax"
                value={String(parseFloat(form.rent) + parseFloat(form.tax))}
                onChange={handleChange}
                disabled
                className={`${
                  triedNext && !form.rent && !form.tax ? "border-red-500" : ""
                } w-full border rounded px-3 py-2 mb-1 text-gray-500`}
                min={0}
                step="0.01"
                required
              />
            </div>
          </div>

          <div className="bg-white rounded-lg w-full h-fit flex p-6 justify-between gap-4 flex-wrap">
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
                } w-full border rounded px-3 py-2 mb-1 text-gray-500`}
                required
              >
                <option value="">Selecione</option>
                <option value="anual">Anual</option>
                <option value="semestral">Semestral</option>
                <option value="bianual">Bianual</option>
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
                placeholder="09:00 - 18:00"
                className={`${
                  triedNext && !form.horarioVisita ? "border-red-500" : ""
                } w-full border rounded px-3 py-2 mb-1 text-gray-500`}
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
                } w-full border rounded px-3 py-2 mb-1 text-gray-500`}
                min={0}
                required
              />
            </div>
            <div className="w-full mt-4">
              <label className="block text-[0.9rem] font-medium mb-1">
                Descrição
              </label>
              <textarea
                name="descricao"
                value={form.descricao}
                onChange={() => handleChange}
                className={`${
                  triedNext && !form.descricao ? "border-red-500" : ""
                } w-full border rounded px-3 py-2 mb-1 text-gray-500`}
                required
              />
            </div>
          </div>
          {/* 
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
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
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
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
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
          </div> */}
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
          <button
            type="button"
            onClick={index === 0 ? handleNext : handleSubmit}
            className="bg-red-600 hover:bg-red-700 w-1/6 text-white py-2 rounded border-2 border-transparent font-semibold transition"
          >
            {index === 0 ? "Próximo" : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
}
