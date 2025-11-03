import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoadingSpinner from "@/components/ui/loading-spinner";

type Props = {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
  code: string;
  area: number;
  rooms: number;
  parkingSpaces: number;
};

export default function PropertyCard({
  id,
  image,
  title,
  description,
  price,
  code,
  area,
  rooms,
  parkingSpaces,
}: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  function handleNavigation(): void {
    if (isLoading) return;
    setIsLoading(true);
    const url = `/property/${id}`;
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
        <div className="w-full h-[120px] sm:h-[120px] md:h-[160px] lg:h-[200px] xl:h-[250px] relative">
          <Image
            src={image}
            alt={title}
            width={320}
            height={250}
            className="object-cover rounded-t-lg w-full h-full"
          />
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-t-lg z-10">
              <div className="flex items-center justify-center rounded-full p-2">
                <LoadingSpinner size={36} className="w-9 h-9" />
              </div>
            </div>
          )}
        </div>
        <div className="p-2 md:p-3">
          <h4 className="font-bold text-sm sm:te\xxt-xs md:text-sm lg:text-base xl:text-lg line-clamp-1">
            {title}
          </h4>
          <p className="text-xs sm:text-[10px] md:text-xs lg:text-sm text-gray-600 line-clamp-2 mt-1">
            {description}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-1 mt-auto">
        <div className="flex items-center justify-between px-2 md:px-3">
          <p className="text-sm sm:text-xs md:text-sm lg:text-base font-bold text-red-800">
            R$ {price?.toLocaleString("pt-BR")}
          </p>
          <p className="text-xs sm:text-[10px] md:text-xs lg:text-sm font-medium text-gray-600">
            Cód. {code.slice(-4)}
          </p>
        </div>

        <div className="flex items-center justify-between p-2 md:p-3 font-medium text-[10px] sm:text-[9px] md:text-[10px] lg:text-xs border-t border-gray-300 text-gray-700">
          <div className="flex flex-col items-center">
            <span>{area} m²</span>
          </div>
          <div className="flex flex-col items-center">
            <span>
              {rooms} quarto{rooms !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span>
              {parkingSpaces} vaga{parkingSpaces !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
