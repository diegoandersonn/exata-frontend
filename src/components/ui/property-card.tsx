import Image from "next/image";
import { useRouter } from "next/navigation";

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

  function handleNavigation(): void {
    const url = `/property/${id}`;
    router.push(url);
  }

  return (
    <div
      className="flex flex-col justify-between gap-2 w-full max-w-[280px] mx-auto sm:max-w-none sm:w-[180px] sm:h-[260px] md:w-[220px] md:h-[320px] lg:w-[260px] lg:h-[380px] xl:w-[320px] xl:h-[440px] rounded-lg shadow-lg border border-gray-300 hover:scale-105 transition-transform duration-300 cursor-pointer group bg-white"
      onClick={handleNavigation}
    >
      <div className="flex-1">
        <div className="w-full h-[120px] sm:h-[120px] md:h-[160px] lg:h-[200px] xl:h-[250px] relative">
          <Image
            src={image}
            alt={title}
            width={0}
            height={0}
            className="object-cover rounded-t-lg w-full h-full"
            sizes="(max-width: 640px) 90vw, (max-width: 768px) 50vw, 320px"
          />
        </div>
        <div className="p-2 md:p-3">
          <h4 className="font-bold text-sm sm:text-xs md:text-sm lg:text-base xl:text-lg line-clamp-1">
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
