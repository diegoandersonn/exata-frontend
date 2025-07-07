"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import {useGetActiveProperties} from "@/hooks/use-getProperties";
import PropertyCard from "@/components/ui/property-card";

export default function Carousel() {
  const [maxVisible, setMaxVisible] = useState(4);
  const [position, setPosition] = useState<number[]>([0, 4]);
  const { properties, isLoading, isError } = useGetActiveProperties();

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) {
        setMaxVisible(1);
      } else if (window.innerWidth < 768) {
        setMaxVisible(2);
      } else if (window.innerWidth < 1280) {
        setMaxVisible(3);
      } else {
        setMaxVisible(4);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setPosition(() => [0, maxVisible]);
  }, [maxVisible]);

  if (!properties) {
    return <div>Imóveis não encontrados</div>;
  }
  if (isLoading) {
    return <div>Carregando...</div>;
  }
  if (isError) {
    return <div>Erro</div>;
  }

  function switchCards(direction: "add" | "minus") {
    setPosition(([start, end]) => {
      if (direction === "add" && end < (properties?.length ?? 0)) {
        return [start + 1, end + 1];
      } else if (direction === "minus" && start > 0) {
        return [start - 1, end - 1];
      }
      return [start, end];
    });
  }

  return (
    <div className="flex flex-col items-center justify-between w-full p-4 transition-transform duration-500 ease-in-out">
      <div className="flex gap-4">
        {properties.slice(position[0], position[1]).map((property) => (
          <PropertyCard
            key={property._id}
            id={property._id}
            image={property.imagens[0]}
            title={property.nome}
            description={property.descricao}
            price={property.aluguel}
            code={property._id}
            area={property.area}
            rooms={property.dormitorios}
            parkingSpaces={property.vagasGaragem}
          />
        ))}
      </div>
      <div className="flex gap-4 mt-10">
        <div
          className="rounded-full p-2 shadow-xl text-zinc-400 w-10 h-10 lg:w-12 lg:h-12 flex justify-center items-center hover:scale-125 cursor-pointer hover:text-zinc-600 transition-transform duration-300"
          onClick={() => switchCards("minus")}
        >
          <ChevronLeft />
        </div>
        <div
          className="rounded-full p-2 shadow-xl text-zinc-400 w-10 h-10 lg:w-12 lg:h-12 flex justify-center items-center hover:scale-125 cursor-pointer hover:text-zinc-600 transition-transform duration-300"
          onClick={() => switchCards("add")}
        >
          <ChevronRight />
        </div>
      </div>
    </div>
  );
}
