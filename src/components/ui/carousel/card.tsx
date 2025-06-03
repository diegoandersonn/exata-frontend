import Image, { StaticImageData } from "next/image";

type Props = {
  image: StaticImageData;
  title: string;
  description: string;
  price: string;
  code: string;
  area: string;
  rooms: string;
  parkingSpaces: string;
};

export default function Card({
  image,
  title,
  description,
  price,
  code,
  area,
  rooms,
  parkingSpaces,
}: Props) {
  return (
    <div className="flex flex-col justify-between gap-2 sm:w-[180px] sm:h-[260px] md:w-[220px] md:h-[320px] lg:w-[260px] lg:h-[380px] xl:w-[320px] xl:h-[440px] rounded-lg shadow-lg border border-gray-300 hover:scale-105 transition-transform duration-300 cursor-pointer group bg-white">
      <div>
        <div className="w-full h-[100px] sm:h-[120px] md:h-[160px] lg:h-[250px] relative">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover rounded-t-lg"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 375px"
          />
        </div>
        <div className="p-2">
          <h4 className="font-bold text-sm md:text-base lg:text-lg">{title}</h4>
          <p className="text-xs md:text-sm">{description}</p>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between px-2">
          <p className="text-xs md:text-sm font-bold text-red-800">R$ {price}</p>
          <p className="text-xs md:text-sm font-bold">Código. {code}</p>
        </div>
        <div className="flex items-center justify-between px-2 py-2 md:p-4 font-bold text-[10px] md:text-xs border-t border-gray-300 text-zinc-300 group-hover:text-black">
          <p>{area} m²</p>
          <p>{rooms} quartos</p>
          <p>{parkingSpaces} vagas</p>
        </div>
      </div>
    </div>
  );
}
