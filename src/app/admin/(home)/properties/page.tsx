"use client";
import React, { useState } from "react";

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
    {
      mainImage: "",
      propertyType: "Apartamento",
      bedrooms: 2,
      bathrooms: 2,
      rentWithTax: 2800.0,
      actions: "Ver detalhes",
    },
    {
      mainImage: "",
      propertyType: "Casa térrea",
      bedrooms: 3,
      bathrooms: 2,
      rentWithTax: 3000.0,
      actions: "Ver detalhes",
    },
  ];

  return (
    <main className="mt-[0.5rem]">
      <h1 id="title" className="font-bold text-[#393B3C] text-lg mb-[1.188rem]">
        Imóveis
      </h1>
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

      <div
        id="list-header"
        className="grid grid-cols-6 gap-[1.5rem] pt-[1.125rem] min-h-[64.5vh] bg-white rounded-lg"
      >
        {listHeader.map((title, idx) => (
          <h3
            key={idx}
            className="font-semibold text-[#393B3C] text-sm text-center mb-[1.125rem]"
          >
            {title}
          </h3>
        ))}
      </div>
    </main>
  );
}
