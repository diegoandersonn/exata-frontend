"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import useGetActiveProperties from "@/hooks/use-getActiveProperties";
import PropertyCard from "@/components/ui/property-card";
import { useLocalization } from "@/contexts/LocalizationContext";

export default function PropertiesCarousel() {
  const { coords } = useLocalization();
  const [maxVisible, setMaxVisible] = useState(4);
  const [position, setPosition] = useState<number[]>([0, 4]);
  const { properties, isLoading, isError } = useGetActiveProperties();
  const hasFavorites = properties?.some((p) => Boolean(p.favorito)) ?? false;
  const displayProps = hasFavorites
    ? (properties ?? []).filter((p) => Boolean(p.favorito))
    : properties ?? [];

  const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371; 
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c); 
  }

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
    const total = displayProps.length;
    const end = Math.min(maxVisible, total);
    setPosition(() => [0, end]);
  }, [maxVisible, displayProps.length]);

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
      const total = displayProps.length;
      if (direction === "add" && end < total) {
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
        {displayProps.slice(position[0], position[1]).map((property) => (
          <div key={property._id} className="relative group">
            {coords &&
              coords.latitude &&
              coords.longitude &&
              property.latitude &&
              property.longitude && (
                <div className="absolute top-0 left-0 bg-green-500 text-white px-4 py-1 z-10 transform origin-top-left shadow-xl border-2 border-green-900 rounded-sm font-bold text-sm -translate-y-1 group-hover:scale-110 group-hover:-translate-y-3 group-hover:shadow-2xl transition-all duration-200">
                  {getDistance(property.latitude, property.longitude, coords.latitude, coords.longitude)} km de você
                </div>
              )}
            <PropertyCard
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
          </div>
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
