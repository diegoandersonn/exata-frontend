"use client";
import Image from "next/image";
import santosFoto from "../../public/orla-de-santos-vemelha.png";
import Header from "@/components/ui/header";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="w-screen h-screen flex">
        <div className="z-10 text-white m-[6rem] w-1/2 flex flex-col items-start justify-center gap-12">
          <div className="flex flex-col gap-5">
            <h4 className="text-3xl font-extralight">
              como ajudamos nossos clientes?
            </h4>
            <h1 className="text-7xl">
              Criamos soluções <br />
              digitais que geram <br /> resultados
            </h1>
          </div>
          <button className="p-8 w-48 h-8 rounded-3xl border-none font-bold bg-white text-zinc-400 flex items-center justify-center hover:bg-red-900 hover:text-white transition-colors duration-300 hover:scale-110">
            Saiba mais!
          </button>
        </div>
        <Image
          src={santosFoto}
          alt="Santos"
          className="absolute top-0 left-0 object-cover w-full h-full z-0"
        />
      </div>
      <div className="w-screen h-screen">s</div>
    </div>
  );
}
