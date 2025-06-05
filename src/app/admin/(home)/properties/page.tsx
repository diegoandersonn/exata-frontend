import React from "react";

export default function Home() {
  return (
    <main className="mt-[0.5rem]">
      <h1 className="font-bold text-[#393B3C] text-lg mb-[1.188rem]">
        Imóveis
      </h1>

      <div className="flex h-[3.75rem] bg-white px-[1.5rem] gap-[1.5rem] mb-[0.75rem]">
        <h3
          className={`${
            true
              ? "font-semibold text-[#393B3C] border-b-[0.125rem] border-red-500"
              : "font-normal text-[#5C6164] border-b-[0.125rem] border-white"
          } text-sm mt-auto hover:cursor-pointer pb-[0.625rem]`}
        >
          Cadastrados
        </h3>
        <h3
          className={`${
            false
              ? "font-semibold text-[#393B3C] border-b-[0.125rem] border-red-500"
              : "font-normal text-[#5C6164] border-b-[0.125rem] border-white"
          } text-sm mt-auto hover:cursor-pointer pb-[0.625rem]`}
        >
          Inativados
        </h3>
      </div>

      <div className="min-h-[65vh] bg-white rounded-lg"></div>
    </main>
  );
}
