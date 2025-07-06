"use client";
import { useState } from "react";
import FilterDropdown from "@/components/ui/filter-dropdown";
import Header from "@/components/ui/header";
import useGetProperties from "@/hooks/use-getProperties";
import { Plus } from "lucide-react";
import PropertyCard from "@/components/ui/property-card";

export default function PropertiesPage() {
  const [isActive, setIsActive] = useState<boolean>(false);
  const { properties, isLoading, isError } = useGetProperties();

  if (!properties) {
    return <div>Imóveis não encontrados</div>;
  }
  if (isLoading) {
    return <div>Carregando...</div>;
  }
  if (isError) {
    return <div>Erro</div>;
  }
  console.log(properties[0].imagens[0]);
  return (
    <div className="flex flex-col gap-6">
      <Header />
      <div className="w-screen mt-24">
        <div className="flex items-center justify-between top-0 z-10 p-6">
          <h1 className="font-bold text-2xl">
            {properties.length} Imóveis à venda na Região da Baixada Santista
          </h1>
          <div className="flex flex-col items-end gap-2">
            <button
              onClick={() => setIsActive(!isActive)}
              className="flex items-center gap-2 bg-red-800 text-white px-4 py-2 rounded-md hover:scale-110 transition-transform duration-300"
            >
              Mais Filtros <Plus />
            </button>
            <FilterDropdown isActive={isActive} setIsActive={setIsActive} />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-12 px-10">
          {properties.map((property) => (
            <PropertyCard
              key={property._id}
              id={property._id}
              image={property.imagens[0]}
              title={property.nome}
              description={property.descricao}
              price={property.aluguel}
              code={property._id}
              area={property.area}
              rooms={property.banheiros}
              parkingSpaces={property.vagasGaragem}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
