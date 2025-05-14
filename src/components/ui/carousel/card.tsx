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
    <div className="flex flex-col justify-between gap-2 w-[375px] h-[450px] rounded-lg shadow-lg border border-gray-300 hover:scale-105 transition-transform duration-300 cursor-pointer group">
      <div>
        <Image
          src={image}
          alt={title}
          width={0}
          height={0}
          className="h-[250px] rounded-t-lg"
        />
        <div className="p-2">
          <h4 className="font-bold">{title}</h4>
          <p>{description}</p>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between px-2">
          <p className="font-bold text-red-800">R$ {price}</p>
          <p className="text-sm font-bold">Código. {code}</p>
        </div>
        <div className="flex items-center justify-between p-4 font-bold text-xs border-t border-gray-300 text-zinc-300 group-hover:text-black">
          <p>{area} m2</p>
          <p>{rooms} quartos</p>
          <p>{parkingSpaces} vagas</p>
        </div>
      </div>
    </div>
  );
}
