"use client";
import Image from "next/image";
import santosFoto from "../../public/orla-de-santos-vemelha.png";
import Carousel from "@/components/ui/carousel";
import Header from "@/components/ui/header";
import { useRouter } from "next/navigation";
import Footer from "@/components/ui/footer";

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
        <h1 className="font-bold text-xl lg:text-4xl">Oportunidades 🔥</h1>
        <Carousel />
      </div>
      <div className="flex flex-col sm:flex-row justify-between gap-8 p-10">
        <div className="logo-area flex items-center justify-center sm:block mx-auto select-none">
          <div className="rounded-full shadow-2xl shadow-red-300/60 bg-white p-3 w-fit">
            <Image
              src="/exata-logo-v2.png"
              alt="Exata Imóveis"
              width={300}
              height={300}
              className="w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] object-contain rounded-full"
            />
          </div>
        </div>
  <div className="flex flex-col items-center sm:items-start justify-center gap-6 flex-1 text-center sm:text-left relative min-h-[220px]">
          <h1 className="text-4xl font-bold">SOBRE NÓS!</h1>
          <div className="flex flex-col gap-3 pb-8">
            <h3 className="text-2xl font-bold">Uma exata feita para você</h3>
            <p className="text-xs">
              A <span className="text-red-600 font-bold">Exata</span> é uma imobiliária e administradora de bens com sede em <span className="text-red-600 font-bold">Santos</span>, dedicada a transformar a experiência de comprar, vender ou alugar imóveis em algo simples, seguro e transparente. Com anos de atuação no mercado, nossa missão é conectar pessoas aos lugares certos, oferecendo <span className="text-red-600 font-bold">soluções personalizadas</span> e acompanhamento completo em cada etapa do processo. Valorizamos a confiança de nossos clientes e trabalhamos para que cada negociação seja tranquila e satisfatória.
            </p>
            <p className="text-xs">
              Além de facilitar a venda e locação de imóveis, a Exata é referência para quem busca <span className="text-red-600 font-bold">oportunidades justas</span> e <span className="text-red-600 font-bold">preços competitivos</span>. Nosso compromisso é ajudar você a encontrar o <span className="text-red-600 font-bold">imóvel ideal</span>, seja para morar, investir ou expandir seus negócios, garantindo sempre atendimento de qualidade e suporte especializado. Aqui, cada cliente encontra atenção, dedicação e <span className="text-red-600 font-bold">soluções que realmente fazem a diferença</span>.
            </p>
          </div>
          <button
            onClick={() => router.push("/properties")}
            className="mt-8 px-8 py-3 rounded-full bg-red-600 text-white font-bold uppercase text-sm shadow-lg hover:bg-red-700 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 sm:absolute sm:bottom-0 sm:right-0 sm:mt-0"
            style={{minWidth: 220}}
          >
            conheça nossos imóveis
          </button>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
