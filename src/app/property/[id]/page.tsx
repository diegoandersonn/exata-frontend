"use client";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import useGetProperty from "@/hooks/use-getProperty";
import {
  Bath,
  BedSingle,
  CarFront,
  ChevronLeft,
  ChevronRight,
  Ellipsis,
  Heart,
  Share2,
  X,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function PropertyPage() {
  const { id } = useParams();
  const { property, isLoading, isError } = useGetProperty(id as string);

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalImages = property?.imagens?.length ?? 0;

  function openWith(index: number) {
    if (!property?.imagens || property.imagens.length === 0) return;
    setCurrentIndex(Math.min(Math.max(index, 0), property.imagens.length - 1));
    setIsOpen(true);
  }

  function goNext() {
    if (totalImages === 0) return;
    setCurrentIndex((i) => (i + 1) % totalImages);
  }

  function goPrev() {
    if (totalImages === 0) return;
    setCurrentIndex((i) => (i - 1 + totalImages) % totalImages);
  }

  if (isLoading) return <div>Carregando...</div>;
  if (isError) return <div>Erro</div>;
  if (!property) return <div>Imóvel não encontrado</div>;

  const handleSubmit = () => {
    window.open(
      `https://wa.me/5513974173786?text=Oi%2C%20tenho%20interesse%20no%20${property.nome}`,
      "_blank"
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <Header />
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-4xl w-[92vw]">
            <div className="flex items-center justify-between mb-3">
              <h1 className="font-bold text-xl">Fotos</h1>
              <button className="text-red-600" onClick={() => setIsOpen(false)}>
                <X size={28} />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="rounded-full p-2 shadow text-zinc-600 hover:bg-zinc-100"
                onClick={goPrev}
                aria-label="Anterior"
              >
                <ChevronLeft />
              </button>
              <div className="relative w-full h-[60vh]">
                {property.imagens[currentIndex] && (
                  <Image
                    src={property.imagens[currentIndex]}
                    alt={`Imagem ${currentIndex + 1}`}
                    width={320}
                    height={250}
                    className="object-cover w-full h-full transition-transform duration-300 cursor-pointer"
                  />
                )}
              </div>
              <button
                className="rounded-full p-2 shadow text-zinc-600 hover:bg-zinc-100"
                onClick={goNext}
                aria-label="Próxima"
              >
                <ChevronRight />
              </button>
            </div>
            <div className="mt-2 text-center text-sm text-zinc-500">
              {totalImages > 0 ? `${currentIndex + 1} / ${totalImages}` : null}
            </div>
          </div>
        </div>
      )}

      <div className="w-screen h-[50vh] grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-2 gap-1 mt-20">
        <div className="overflow-hidden  col-span-1 row-span-1 lg:col-span-2 lg:row-span-2">
          <Image
            src={property.imagens[0]}
            alt={property.nome}
            width={320}
            height={250}
            className="object-cover w-full h-full hover:brightness-50 hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={() => openWith(0)}
          />
        </div>
        {property.imagens[1] && (
          <div className="hidden lg:block overflow-hidden">
            <Image
              src={property.imagens[1]}
              alt={property.nome}
              width={320}
              height={250}
              className="object-cover w-full h-full hover:brightness-50 hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => openWith(1)}
            />
          </div>
        )}

        {property.imagens[2] && (
          <div className="hidden lg:block overflow-hidden">
            <Image
              src={property.imagens[2]}
              alt={property.nome}
              width={320}
              height={250}
              className="object-cover w-full h-full hover:brightness-50 hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => openWith(2)}
            />
          </div>
        )}

        {property.imagens[3] && (
          <div className="hidden lg:block overflow-hidden">
            <Image
              src={property.imagens[3]}
              alt={property.nome}
              width={320}
              height={250}
              className="object-cover w-full h-full hover:brightness-50 hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => openWith(3)}
            />
          </div>
        )}

        {property.imagens[4] && (
          <div className="hidden lg:block overflow-hidden relative">
            <Image
              src={property.imagens[4]}
              alt={property.nome}
              width={320}
              height={250}
              className="object-cover w-full h-full brightness-50 hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => openWith(4)}
            />
            <button
              className="absolute inset-0 flex items-center justify-center border border-white text-white rounded transition-transform duration-300 hover:scale-110"
              onClick={() => openWith(4)}
            >
              Ver mais fotos
            </button>
          </div>
        )}
      </div>

      <div className="relative w-screen flex flex-col xl:flex-row gap-10 px-2 lg:px-44">
        <div className="flex flex-col gap-8">
          <div className="flex items-start max-w-[97%]">
            <h1 className="font-bold text-base lg:text-2xl w-[70%]">
              {property.tipo} à venda na região da Baixada Santista com{" "}
              {property.area} m², {property.dormitorios} quarto(s) e{" "}
              {property.vagasGaragem} vaga(s)
            </h1>
            <div className="flex gap-2 ml-auto">
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
              onClick={handleSubmit}
              className="bg-red-600 text-white uppercase font-bold px-8 py-4 rounded-3xl shadow-lg hover:bg-red-700 hover:shadow-xl transition-all duration-300 mt-4 mb-16"
            >
              ENTRE EM CONTATO
            </button>
          </div>
        </div>
        <div className="xl:absolute right-[14.625vw] -top-[3.646vw] min-w[2.604vw] lg:min-w-[18.229vw] flex flex-col gap-4 border border-zinc-600 p-5 rounded-xl z-10 bg-white">
          <h3 className="font-medium">Valor à vista</h3>
          <h1 className="font-bold text-lg lg:text-3xl">
            R$ {property.aluguel}
          </h1>

          <div className="flex flex-col gap-4 text-zinc-500">
            <div className="flex justify-between items-center">
              <h2 className="text-sm lg:text-base">IPTU</h2>
              <p className="text-sm lg:text-base text-black">
                R$ {property.iptu}/mês
              </p>
            </div>
            <div className="flex justify-between gap-4 items-center">
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

      <Footer />
    </div>
  );
}
