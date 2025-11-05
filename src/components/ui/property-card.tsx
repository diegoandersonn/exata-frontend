import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { PropertyType } from "@/types/property-type";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  property: PropertyType;
};

export default function PropertyCard({ property }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  function handleNavigation(): void {
    if (isLoading) return;
    setIsLoading(true);
    const url = `/property/${property._id}`;
    // pequeno delay para garantir que o overlay apareça antes da navegação
    setTimeout(() => {
      router.push(url);
    }, 80);
  }

  return (
    <div
      className="flex flex-col justify-between gap-2 w-full max-w-[280px] mx-auto sm:max-w-none sm:w-[160px] sm:h-[260px] md:w-[200px] md:h-[320px] lg:w-[260px] lg:h-[380px] xl:w-[300px] xl:h-[440px] rounded-lg shadow-lg border border-gray-300 hover:scale-105 transition-transform duration-300 cursor-pointer group bg-white"
      onClick={handleNavigation}
    >
      <div className="flex-1">
        <div className="flex w-full h-[120px] sm:h-[120px] md:h-[160px] lg:h-[200px] xl:h-[250px] relative">
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-1 z-10 shadow-md"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex((prev) =>
                prev === 0 ? property.imagens.length - 1 : prev - 1
              );
            }}
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <Image
            src={property.imagens[currentIndex]}
            alt={property.nome}
            width={320}
            height={250}
            className="object-cover rounded-t-lg w-full h-full"
          />
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white rounded-full p-1 z-10 shadow-md"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex((prev) =>
                prev === property.imagens.length - 1 ? 0 : prev + 1
              );
            }}
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-t-lg z-10">
              <div className="flex items-center justify-center rounded-full p-2">
                <LoadingSpinner size={36} className="w-9 h-9" />
              </div>
            </div>
          )}
        </div>
        <div className="p-2 md:p-3">
          <h4 className="font-bold text-sm sm:text-xs md:text-sm lg:text-base xl:text-lg line-clamp-1">
            {property.nome}
          </h4>
          <p className="text-xs sm:text-[10px] md:text-xs lg:text-sm text-gray-600 line-clamp-2 mt-1">
            {property.descricao}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-1 mt-auto">
        <div className="flex items-center justify-between px-2 md:px-3">
          <p className="text-sm sm:text-xs md:text-sm lg:text-base font-bold text-red-800">
            R$ {property.aluguel?.toLocaleString("pt-BR")}
          </p>
          <p className="text-xs sm:text-[10px] md:text-xs lg:text-sm font-medium text-gray-600">
            Cód. {property._id.slice(-4)}
          </p>
        </div>

        <div className="flex items-center justify-between p-2 md:p-3 font-medium text-[10px] sm:text-[9px] md:text-[10px] lg:text-xs border-t border-gray-300 text-gray-700">
          <div className="flex flex-col items-center">
            <span>{property.area} m²</span>
          </div>
          <div className="flex flex-col items-center">
            <span>
              {property.dormitorios} quarto
              {property.dormitorios !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span>
              {property.vagasGaragem} vaga
              {property.vagasGaragem !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
