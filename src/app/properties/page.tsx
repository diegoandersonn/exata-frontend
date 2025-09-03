"use client";
import { useEffect, useState } from "react";
import FilterDropdown from "@/components/ui/filter-dropdown";
import Header from "@/components/ui/header";
import { useGetActiveProperties } from "@/hooks/use-getProperties";
import PropertyCard from "@/components/ui/property-card";
import { PropertyType } from "@/types/property-type";
import Footer from "@/components/ui/footer";

export default function PropertiesPage() {
  const [isActive, setIsActive] = useState<boolean>(false);
  const { properties, isLoading, isError } = useGetActiveProperties();
  const [propertiesFiltered, setPropertiesFiltered] = useState<PropertyType[]>(
    []
  );

  useEffect(() => {
    if (properties) {
      setPropertiesFiltered(properties);
    }
  }, [properties]);

  const handleFilter = (filters: { tipo?: string; quartos?: number }) => {
    if (!properties) return;

    let filtered = [...properties];

    if (filters.tipo) {
      filtered = filtered.filter((p) => p.tipo === filters.tipo);
    }

    if (filters.quartos !== undefined) {
      filtered = filtered.filter(
        (p) => Number(p.dormitorios) === filters.quartos
      );
    }

    setPropertiesFiltered(filtered);
  };

  if (isLoading) return <div>Carregando...</div>;
  if (isError) return <div>Erro</div>;
  if (!properties) return <div>Imóveis não encontrados</div>;

  return (
    <div className="flex flex-col gap-6">
      <Header />
      <div className="w-screen mt-24">
        <div className="flex items-center justify-between top-0 z-10 p-6">
          <h1 className="font-bold text-2xl">
            {`${propertiesFiltered.length} ${
              propertiesFiltered.length === 1 ? "Imóvel" : "Imóveis"
            } à venda na região da Baixada
            Santista`}
          </h1>
          <div className="flex flex-col items-end gap-2">
            <button
              onClick={() => setIsActive(!isActive)}
              className="flex items-center gap-2 bg-red-800 text-white px-4 py-2 rounded-md hover:scale-110 transition-transform duration-300 mr-2"
            >
              + Filtros
              <img
                src="/new-filter-icon.svg"
                alt="Filtro"
                className="w-5 h-5 invert"
              />
            </button>
            <FilterDropdown
              isActive={isActive}
              setIsActive={setIsActive}
              onFilter={handleFilter}
            />
          </div>
        </div>
        {propertiesFiltered.length <= 0 && (
          <div className="grid grid-cols-4 gap-12 px-10 h-[66vh]">
            <div className="col-span-4 flex items-center justify-center h-full">
              <span className="text-lg text-gray-500 text-center">
                Nenhum imóvel encontrado com o filtro selecionado.
              </span>
            </div>
          </div>
        )}
        {propertiesFiltered.length > 0 && (
          <div className="grid grid-cols-4 gap-12 px-10">
            {propertiesFiltered.map((property) => (
              <PropertyCard
                key={property._id}
                id={property._id}
                image={property.imagens?.[0] || ""}
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
        )}
      </div>
      <Footer />
    </div>
  );
}
