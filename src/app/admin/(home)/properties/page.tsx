"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Properties() {
  const [index, setIndex] = useState<number>(0);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const router = useRouter();

  const listHeader = [
    "Imagem principal",
    "Tipo do imóvel",
    "Dormitório(s)",
    "Banheiro(s)",
    "Aluguel + IPTU",
    "Ações",
  ];

  const [properties, setProperties] = useState([
    {
      mainImage: "",
      propertyType: "Apartamento",
      bedrooms: 2,
      bathrooms: 1,
      rentWithTax: 2000.0,
      actions: "Ver detalhes",
      isItActive: true,
    },
    {
      mainImage: "",
      propertyType: "Casa",
      bedrooms: 3,
      bathrooms: 2,
      rentWithTax: 3500.0,
      actions: "Ver detalhes",
      isItActive: true,
    },
    {
      mainImage: "",
      propertyType: "Studio",
      bedrooms: 1,
      bathrooms: 1,
      rentWithTax: 1200.0,
      actions: "Ver detalhes",
      isItActive: true,
    },
    {
      mainImage: "",
      propertyType: "Kitnet",
      bedrooms: 1,
      bathrooms: 1,
      rentWithTax: 950.0,
      actions: "Ver detalhes",
      isItActive: true,
    },
  ]);

  useEffect(() => {
    const handleClick = () => setActiveMenu(null);
    if (activeMenu !== null) {
      window.addEventListener("click", handleClick);
      return () => window.removeEventListener("click", handleClick);
    }
  }, [activeMenu]);

  // Filtra os imóveis conforme o tab selecionado
  const filteredProperties = properties.filter((property) =>
    index === 0 ? property.isItActive : !property.isItActive
  );

  // Função para inativar imóvel
  const handleInactivate = (idx: number) => {
    setProperties((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, isItActive: false } : item))
    );
    setActiveMenu(null);
  };

  // Função para ativar imóvel
  const handleActivate = (idx: number) => {
    setProperties((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, isItActive: true } : item))
    );
    setActiveMenu(null);
  };

  return (
    <main className="mt-[0.5rem]">
      <div className="flex justify-between items-center mb-[0.75rem]">
        <h1 id="title" className="font-bold text-[#393B3C] text-lg">
          Imóveis
        </h1>
        <button
          onClick={() => router.push("/admin/properties/propertie")}
          className="w-[4.25rem] h-[2.5rem] rounded-lg text-white font-semibold text-sm bg-red-600 hover:bg-red-700"
        >
          Novo
        </button>
      </div>

      <div
        id="active-or-inactive"
        className="flex h-[3.75rem] bg-white px-[1.5rem] gap-[1.5rem] mb-[0.75rem]"
      >
        <h3
          className={`${
            index === 0
              ? "font-semibold text-[#393B3C] border-b-[0.125rem] border-red-500"
              : "font-normal text-[#5C6164] border-b-[0.125rem] border-white"
          } text-sm mt-auto hover:cursor-pointer pb-[0.625rem]`}
          onClick={() => setIndex(0)}
        >
          Cadastrados
        </h3>
        <h3
          className={`${
            index === 1
              ? "font-semibold text-[#393B3C] border-b-[0.125rem] border-red-500"
              : "font-normal text-[#5C6164] border-b-[0.125rem] border-white"
          } text-sm mt-auto hover:cursor-pointer pb-[0.625rem]`}
          onClick={() => setIndex(1)}
        >
          Inativados
        </h3>
      </div>

      <div className="bg-white rounded-lg min-h-[26rem]">
        {/* Cabeçalho */}
        <div className="grid grid-cols-6 gap-[1.5rem] pt-[1.125rem] px-2">
          {listHeader.map((title, idx) => (
            <h3
              key={idx}
              className="font-semibold text-[#393B3C] text-sm text-center mb-[1.125rem]"
            >
              {title}
            </h3>
          ))}
        </div>
        {filteredProperties.map((property, idx) => (
          <div
            key={idx}
            className="grid grid-cols-6 gap-[1.5rem] items-center border-t border-gray-100 py-3 px-2 hover:bg-gray-50 transition relative"
          >
            <div className="text-center font-normal h-14 text-sm text-[#393B3C]">
              <span className="inline-block w-10 h-14 bg-gray-200 rounded" />
            </div>
            <div className="text-center font-normal text-sm text-[#393B3C]">
              {property.propertyType}
            </div>
            <div className="text-center font-normal text-sm text-[#393B3C]">
              {property.bedrooms}
            </div>
            <div className="text-center font-normal text-sm text-[#393B3C]">
              {property.bathrooms}
            </div>
            <div className="text-center font-normal text-sm text-[#393B3C]">
              R${" "}
              {property.rentWithTax.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </div>
            <div className="text-center font-normal text-sm relative flex justify-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveMenu(activeMenu === idx ? null : idx);
                }}
                className="w-[2.25rem] h-[2.25rem] bg-transparent flex items-center justify-center rounded-lg"
              >
                <Image
                  src="/three-dots.svg"
                  alt="Ver detalhes"
                  width={20}
                  height={20}
                />
              </button>
              {activeMenu === idx && (
                <div className="absolute right-4 top-[2.75rem] w-fit bg-white border border-gray-200 rounded-md shadow-lg z-10 flex flex-col text-left">
                  <button className="px-4 py-2 hover:bg-gray-100 text-sm text-[#393B3C] text-left">
                    Editar
                  </button>
                  {index === 0 ? (
                    <button
                      className="px-4 py-2 hover:bg-gray-100 text-sm text-[#393B3C] text-left"
                      onClick={() =>
                        handleInactivate(
                          properties.findIndex((p) => p === property)
                        )
                      }
                    >
                      Inativar
                    </button>
                  ) : (
                    <button
                      className="px-4 py-2 hover:bg-gray-100 text-sm text-[#393B3C] text-left"
                      onClick={() =>
                        handleActivate(
                          properties.findIndex((p) => p === property)
                        )
                      }
                    >
                      Ativar
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
