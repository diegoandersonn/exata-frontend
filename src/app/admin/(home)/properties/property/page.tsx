"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export default function Propertie() {
  const searchParams = useSearchParams();
  const propertyId = searchParams.get("propertyId");
  const [index, setIndex] = useState<number>(0);
  const [form, setForm] = useState({
    mainImage: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    garages: "",
    rent: "",
    tax: "",
  });

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function formatCurrency(value: string | number) {
    const number = Number(value);
    if (isNaN(number)) return "";
    return number.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode enviar os dados para a API ou tratar como preferir
    alert("Propriedade cadastrada!");
  };

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
              className="w-1/2 border rounded px-3 py-2 mb-1"
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
                className="w-full border rounded px-3 py-2 mb-1"
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
                className="w-full border rounded px-3 py-2 mb-1"
                min={0}
                required
              />
            </div>

            {/* Banheiros */}
            <div className="w-[31.5%]">
              <label className="block text-[0.9rem] font-medium mb-1">
                Garagem(ns)
              </label>
              <input
                type="number"
                name="garages"
                value={form.garages}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mb-1"
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
                className="w-full border rounded px-3 py-2 mb-1"
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
                className="w-full border rounded px-3 py-2 mb-1"
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
                className="w-full border rounded px-3 py-2 mb-1 text-gray-500"
                min={0}
                step="0.01"
                required
              />
            </div>
          </div>
        </div>

        {/* Fotos do imóvel */}
        <div className={`${index === 1 ? "block" : "hidden"} space-y-3`}>
          {/* Tipo do imóvel */}
          <div className="bg-white rounded-lg w-full h-[11.5rem] p-6">
            <div className="w-full h-full border-dashed border-2 border-gray-300 flex items-center justify-center">
              <label className="cursor-pointer text-gray-500 hover:text-gray-600">
                <input type="file" accept="image/*" className="hidden" />
                <div className="flex gap-1 h-full">
                  <span className="">+</span>
                  <span>Adicione a foto principal</span>
                </div>
              </label>
            </div>
          </div>

          <div className="bg-white rounded-lg w-full h-[11.5rem] p-6">
            <div className="w-full h-full border-dashed border-2 border-gray-300 flex items-center justify-center">
              <label className="cursor-pointer text-gray-500 hover:text-gray-600">
                <input type="file" accept="image/*" className="hidden" />
                <div className="flex gap-1 h-full">
                  <span className="">+</span>
                  <span>Adicione as outras fotos</span>
                </div>
              </label>
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
          <button
            onClick={() => (index === 0 ? setIndex(1) : handleSubmit)}
            className="w-1/6 bg-red-600 text-white py-2 rounded border-2 border-transparent font-semibold hover:bg-red-700 transition"
          >
            {index === 0 ? "Próximo" : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
}
