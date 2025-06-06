"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [index, setIndex] = useState<number>(1);

  const listHeader = [
    "Imagem principal",
    "Tipo do imóvel",
    "Dormitório(s)",
    "Banheiro(s)",
    "Aluguel + IPTU",
    "Ações",
  ];

  const properties = [
    {
      mainImage: "",
      propertyType: "Apartamento",
      bedrooms: 2,
      bathrooms: 1,
      rentWithTax: 2000.0,
      actions: "Ver detalhes",
    },
    {
      mainImage: "",
      propertyType: "Casa",
      bedrooms: 3,
      bathrooms: 2,
      rentWithTax: 3500.0,
      actions: "Ver detalhes",
    },
    {
      mainImage: "",
      propertyType: "Studio",
      bedrooms: 1,
      bathrooms: 1,
      rentWithTax: 1200.0,
      actions: "Ver detalhes",
    },
    {
      mainImage: "",
      propertyType: "Kitnet",
      bedrooms: 1,
      bathrooms: 1,
      rentWithTax: 950.0,
      actions: "Ver detalhes",
    },
    {
      mainImage: "",
      propertyType: "Sobrado",
      bedrooms: 4,
      bathrooms: 3,
      rentWithTax: 4200.0,
      actions: "Ver detalhes",
    },
  ];

  return (
    <main className="mt-[0.5rem]">
      <div className="flex justify-between items-center mb-[0.75rem]">
        <h1 id="title" className="font-bold text-[#393B3C] text-lg">
          Imóveis
        </h1>
        <button className="w-[4.25rem] h-[2.5rem] rounded-lg text-white font-semibold text-sm bg-red-500">
          Novo
        </button>
      </div>

      <div
        id="active-or-inactive"
        className="flex h-[3.75rem] bg-white px-[1.5rem] gap-[1.5rem] mb-[0.75rem]"
      >
        <h3
          className={`${
            index === 1
              ? "font-semibold text-[#393B3C] border-b-[0.125rem] border-red-500"
              : "font-normal text-[#5C6164] border-b-[0.125rem] border-white"
          } text-sm mt-auto hover:cursor-pointer pb-[0.625rem]`}
          onClick={() => setIndex(1)}
        >
          Cadastrados
        </h3>
        <h3
          className={`${
            index === 2
              ? "font-semibold text-[#393B3C] border-b-[0.125rem] border-red-500"
              : "font-normal text-[#5C6164] border-b-[0.125rem] border-white"
          } text-sm mt-auto hover:cursor-pointer pb-[0.625rem]`}
          onClick={() => setIndex(2)}
        >
          Inativados
        </h3>
      </div>

      <div className="bg-white rounded-lg">
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

        {/* Linhas de propriedades */}
        {properties.map((property, idx) => (
          <div
            key={idx}
            className="grid grid-cols-6 gap-[1.5rem] items-center border-t border-gray-100 py-3 px-2 hover:bg-gray-50 transition"
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
            <div className="text-center font-normal text-sm">
              <button className="pl-2 w-[2.25rem] rounded-lg h-[2.25rem] bg-gray-50">
                <Image
                  src="/three-dots.svg"
                  alt="Ver detalhes"
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
