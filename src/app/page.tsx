"use client";
import Image from "next/image";
import santosFoto from "../../public/orla-de-santos-vemelha.png";
import Header from "@/components/ui/header";
import Carousel from "@/components/ui/carousel";
import { useState } from "react";

export default function Home() {
  const [carouselType, setCarouselType] = useState<
    "super-destaque" | "comprar" | "alugar"
  >("super-destaque");
  return (
    <div className="flex flex-col">
      <Header />
      <div className="w-screen h-screen flex">
        <div className="z-10 text-white m-10 md:m-16 lg:m-24 w-1/2 flex flex-col items-start justify-center gap-6 lg:gap-12">
          <div className="flex flex-col lg:gap-5">
            <h4 className="text-sm md:text-lg lg:text-3xl font-extralight">
              como ajudamos nossos clientes?
            </h4>
            <h1 className="text-3xl md:text-4xl lg:text-7xl">
              Criamos soluções <br />
              digitais que geram <br /> resultados
            </h1>
          </div>
          <button className="p-4 w-18 h-6 text-xs md:p-6 md:w-30 md:h-8 md:text-lg lg:p-8 lg:w-48 lg:h-8 rounded-3xl border-none font-bold bg-white text-zinc-400 flex items-center justify-center hover:bg-red-800 hover:text-white transition-colors duration-300 hover:scale-110">
            Saiba mais!
          </button>
        </div>
        <Image
          src={santosFoto}
          alt="Santos"
          className="absolute top-0 left-0 object-cover w-full h-full z-0"
        />
      </div>
      <div className="w-screen h-screen flex flex-col items-center justify-center gap-8">
        <h1 className="font-bold text-xl lg:text-4xl">Oportunidades</h1>
        <div className="flex items-center gap-3 lg:gap-10 uppercase">
          <div
            onClick={() => setCarouselType("super-destaque")}
            className={`text-sm lg:text-lg font-medium border-red-800 ${
              carouselType === "super-destaque"
                ? "border-b-[3px]"
                : ""
            } cursor-pointer hover:border-b-[3px]`}
          >
            Super Destaque
          </div>
          <div
            onClick={() => setCarouselType("comprar")}
            className={`text-sm lg:text-lg font-medium border-red-800 ${
              carouselType === "comprar"
                ? "border-b-[3px]"
                : ""
            } cursor-pointer hover:border-b-[3px]`}
          >
            Comprar
          </div>
          <div
            onClick={() => setCarouselType("alugar")}
            className={`text-sm lg:text-lg font-medium border-red-800 ${
              carouselType === "alugar"
                ? "border-b-[3px]"
                : ""
            } cursor-pointer hover:border-b-[3px]`}
          >
            Alugar
          </div>
        </div>
        <Carousel />
      </div>
    </div>
  );
}
