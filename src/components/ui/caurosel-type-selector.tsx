type CarouselType = "super-destaque" | "comprar" | "alugar";

interface Props {
  value: CarouselType;
  onChange: (type: CarouselType) => void;
}

export default function CarouselTypeSelector({ value, onChange }: Props) {
  const types: { label: string; value: CarouselType }[] = [
    { label: "Super Destaque", value: "super-destaque" },
    { label: "Comprar", value: "comprar" },
    { label: "Alugar", value: "alugar" },
  ];

  return (
    <div className="flex items-center gap-3 lg:gap-10 uppercase">
      {types.map((type) => (
        <div
          key={type.value}
          onClick={() => onChange(type.value)}
          className={`text-sm lg:text-lg font-medium border-red-800 ${
            value === type.value ? "border-b-[3px]" : ""
          } cursor-pointer hover:border-b-[3px]`}
        >
          {type.label}
        </div>
      ))}
    </div>
  );
}