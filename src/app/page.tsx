"use client";
import Image from "next/image";
import santosFoto from "../../public/orla-de-santos-vemelha.png";
import Carousel from "@/components/ui/carousel";
import Header from "@/components/ui/header";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col">
      <Header />
      <div className="w-screen h-screen flex">
        <div className="z-10 text-white ml-10 md:ml-16 lg:ml-24 flex flex-col items-start justify-center gap-6 lg:gap-12">
          <div className="flex flex-col lg:gap-5">
            <h4 className="text-sm md:text-lg lg:text-3xl font-extralight">
              como ajudamos nossos clientes?
            </h4>
            <h1 className="text-3xl md:text-4xl lg:text-7xl">
              Oferecemos gestão <br />
              de imóveis com <br /> proximidade real
            </h1>
          </div>
          <button onClick={() => router.push("/properties")} className="p-4 w-18 h-6 text-xs md:p-6 md:w-30 md:h-8 md:text-lg lg:p-8 lg:w-50 lg:h-8 rounded-3xl border-none font-bold bg-white text-red-500 flex items-center justify-center hover:bg-red-800 hover:text-white hover:scale-110 transition-transform duration-300">
            Ver apartamentos
          </button>
        </div>
        <Image
          src={santosFoto}
          alt="Santos"
          className="absolute top-0 left-0 object-cover w-full h-full z-0"
        />
      </div>
      <div className="w-full h-full flex flex-col items-center mt-12 gap-8">
        <h1 className="font-bold text-xl lg:text-4xl">Oportunidades</h1>
        <Carousel />
      </div>
      <div className="flex flex-col sm:flex-row justify-between gap-8 p-10">
        <Image
          id="exata-logo-v2"
          src="/exata-logo-v2.png"
          alt="Logo da Exata administradora de bens, um E vermelho representando a inicial da empresa, com um fundo branco."
          title="Logo da Exata"
          width={60}
          height={60}
          className="w-[400px] h-[400px] rounded-full bg-black hover:scale-110 transition-transform duration-300 hidden sm:block mx-auto select-none"
        />
        <div className="flex flex-col items-center sm:items-start justify-center gap-6 flex-1 relative text-center sm:text-left">
          <h1 className="text-4xl font-bold">SOBRE NÓS!</h1>
          <div className="flex flex-col gap-3">
            <h3 className="text-2xl font-bold">Uma exata feita para você</h3>
            <p className="text-xs">
              A Exata, desde 2014, se destaca em Santos-SP pela excelência e
              compromisso em oferecer produtos de impressão e comunicação visual
              de alta qualidade a preços justos. Atendendo desde pequenas a
              grandes empresas, a exata oferece uma ampla gama de produtos, como
              papelaria personalizada e materiais de comunicação visual, sempre
              com rigoroso controle de qualidade. A missão da empresa é
              satisfazer as necessidades específicas de cada cliente, fornecendo
              soluções personalizadas que reforçam a identidade visual e
              comunicação dos parceiros.
            </p>
          </div>
          <button className="lg:absolute bottom-0 right-0 bg-red-700 text-white p-4 font-bold uppercase text-xs hover:scale-110 transition-transform duration-300">
            conheça nossos imóveis!
          </button>
        </div>
      </div>
    </div>
  );
}
