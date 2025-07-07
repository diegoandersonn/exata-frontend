"use client";
import Header from "@/components/ui/header";
import useGetProperty from "@/hooks/use-getProperty";
import {
  Bath,
  BedSingle,
  CarFront,
  Ellipsis,
  Heart,
  Share2,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function PropertyPage() {
  const { id } = useParams();
  const { property, isLoading, isError } = useGetProperty(id as string);
  if (!property) {
    return <div>Imóvel não encontrado</div>;
  }
  if (isLoading) {
    return <div>Carregando...</div>;
  }
  if (isError) {
    return <div>Erro</div>;
  }

  const handleSubmit = () => {
    window.open(
      `https://wa.me/5513974173786?text=Oi%2C%20tenho%20interesse%20no%20${property.nome}`,
      "_blank"
    );
  };
  console.log("Imóvel:", property);
  return (
    <div className="flex flex-col gap-6">
      <Header />
      <div className="w-screen h-[50vh] grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-2 gap-1 mt-16">
        <div className="overflow-hidden col-span-1 row-span-1 lg:col-span-2 lg:row-span-2">
          <Image
            src={property.imagens[0]}
            alt={property.nome}
            width={0}
            height={0}
            className="object-cover w-full h-full hover:brightness-50 hover:scale-105 transition-transform duration-300 cursor-pointer"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 375px"
          />
        </div>
        <div className="hidden lg:block overflow-hidden">
          <Image
            src={property.imagens[1]}
            alt={property.nome}
            width={0}
            height={0}
            className="object-cover w-full h-full hover:brightness-50 hover:scale-105 transition-transform duration-300 cursor-pointer"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 375px"
          />
        </div>
        <div className="hidden lg:block overflow-hidden">
          <Image
            src={property.imagens[2]}
            alt={property.nome}
            width={0}
            height={0}
            className="object-cover w-full h-full hover:brightness-50 hover:scale-105 transition-transform duration-300 cursor-pointer"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 375px"
          />
        </div>
        <div className="hidden lg:block overflow-hidden">
          <Image
            src={property.imagens[3]}
            alt={property.nome}
            width={0}
            height={0}
            className="object-cover w-full h-full hover:brightness-50 hover:scale-105 transition-transform duration-300 cursor-pointer"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 375px"
          />
        </div>
        <div className="hidden lg:block overflow-hidden relative">
          <Image
            src={property.imagens[4]}
            alt={property.nome}
            width={0}
            height={0}
            className="object-cover w-full h-full brightness-50 hover:scale-105 transition-transform duration-300 cursor-pointer"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 375px"
          />
          <button className="absolute inset-0 flex items-center justify-center border border-white text-white rounded transition-transform duration-300 hover:scale-110">
            Ver mais fotos
          </button>
        </div>
      </div>
      <div className="relative w-screen flex flex-col xl:flex-row gap-10 px-2 lg:px-44">
        <div className="flex flex-col gap-8">
          <div className="flex items-start justify-between">
            <h1 className="font-bold text-base lg:text-2xl w-[70%]">
              {property.tipo} à venda em {property.nome} com {property.area} m²,{" "}
              {property.dormitorios} quartos e {property.vagasGaragem} vagas
            </h1>
            <div className="flex gap-2">
              <button className="p-1 rounded-lg hover:bg-zinc-200 transition-colors duration-300">
                <Heart className="w-4 h-4 lg:w-6 lg:h-6" />
              </button>
              <button className="p-1 rounded-lg hover:bg-zinc-200 transition-colors duration-300">
                <Share2 className="w-4 h-4 lg:w-6 lg:h-6" />
              </button>
              <button className="p-1 rounded-lg hover:bg-zinc-200 transition-colors duration-300">
                <Ellipsis className="w-4 h-4 lg:w-6 lg:h-6" />
              </button>
            </div>
          </div>
          <div className="flex gap-4 lg:gap-8">
            <div className="flex gap-1 lg:gap-3 items-center">
              <CarFront className="w-4 h-4 lg:w-6 lg:h-6" />
              <h3 className="text-xs lg:text-base font-semibold">
                {property.vagasGaragem} vagas
              </h3>
            </div>
            <div className="flex gap-1 lg:gap-3 items-center">
              <BedSingle className="w-4 h-4 lg:w-6 lg:h-6" />
              <h3 className="text-xs lg:text-base font-semibold">
                {property.dormitorios} quartos
              </h3>
            </div>
            <div className="flex gap-1 lg:gap-3 items-center">
              <Bath className="w-4 h-4 lg:w-6 lg:h-6" />
              <h3 className="text-xs lg:text-base font-semibold">
                {property.banheiros} banheiros
              </h3>
            </div>
          </div>
          <div className="w-full flex justify-start">
            <button
              onClick={() => handleSubmit()}
              className="bg-red-600 text-white uppercase font-bold px-8 py-4 rounded-3xl shadow-lg hover:bg-red-700 hover:shadow-xl transition-all duration-300"
            >
              ENTRE EM CONTATO
            </button>
          </div>
        </div>
        <div className="xl:absolute right-[300px] -top-[70px] min-w[50px] lg:min-w-[350px] flex flex-col gap-4 border border-zinc-600 p-5 rounded-xl z-10 bg-white">
          <h3 className="font-medium">Valor à vista</h3>
          <h1 className="font-bold text-lg lg:text-3xl">
            R$ {property.aluguel}
          </h1>
          <h3 className="text-red-800 underline cursor-pointer">
            Entenda este valor
          </h3>
          <div className="flex flex-col gap-4 text-zinc-500">
            <div className="flex justify-between items-center">
              <h2 className="text-sm lg:text-base">IPTU</h2>
              <p className="text-sm lg:text-base text-black">
                R$ {property.iptu}/mês
              </p>
            </div>
            <div className="flex justify-between items-center">
              <h2 className="text-sm lg:text-base">Horários de Visita</h2>
              <p className="text-sm lg:text-base text-black">
                {property.horarioVisita}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <h2 className="text-sm lg:text-base">Prazo do contrato</h2>
              <p className="text-sm lg:text-base text-black">
                {property.prazo}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <h2 className="text-sm lg:text-base">Tipo Reajuste</h2>
              <p className="text-sm lg:text-base text-black">
                {property.tipoReajuste}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
