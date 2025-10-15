"use client";
import { useEffect, useState } from "react";
import FilterDropdown from "@/components/ui/filter-dropdown";
import Header from "@/components/ui/header";
import PropertyCard from "@/components/ui/property-card";
import { PropertyType } from "@/types/property-type";
import Footer from "@/components/ui/footer";
import Image from "next/image";
import useGetActiveProperties from "@/hooks/use-getActiveProperties";

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

  const handleFilter = (filters: {
    tipo?: string;
    quartos?: number;
    bairro?: string;
  }) => {
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

    if (filters.bairro !== undefined) {
      filtered = filtered.filter((p) => p.bairro === filters.bairro);
    }

    setPropertiesFiltered(filtered);
  };

  const bairros = properties
    ? Array.from(
        new Set(
          properties
            .filter((property) => property.bairro && property.bairro !== "")
            .map((property) => property.bairro)
        )
      )
    : [];

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        Carregando...
      </div>
    );
  if (isError)
    return (
      <div className="flex items-center justify-center h-screen">Erro</div>
    );
  if (!properties)
    return (
      <div className="flex items-center justify-center h-screen">
        Imóveis não encontrados
      </div>
    );

  return (
    <div className="flex flex-col gap-6">
      <Header />
      <div className="w-full mt-16 sm:mt-20 lg:mt-24">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-6">
          <h1 className="font-bold text-lg sm:text-xl md:text-2xl leading-tight">
            {`${propertiesFiltered.length} ${
              propertiesFiltered.length === 1 ? "Imóvel" : "Imóveis"
            } à venda na região da Baixada Santista`}
          </h1>

          <div className="flex flex-col items-end gap-2 w-full sm:w-auto">
            <button
              onClick={() => setIsActive(!isActive)}
              className="flex items-center gap-2 bg-red-800 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-md hover:scale-110 transition-transform duration-300 text-sm sm:text-base self-end"
            >
              + Filtros
              <Image
                src="/new-filter-icon.svg"
                alt="Filtro"
                className="w-4 h-4 sm:w-5 sm:h-5 invert"
                width={0}
                height={0}
              />
            </button>
            <FilterDropdown
              isActive={isActive}
              setIsActive={setIsActive}
              onFilter={handleFilter}
              bairros={bairros}
            />
          </div>
        </div>

        {propertiesFiltered.length <= 0 && (
          <div className="grid grid-cols-1 gap-4 p-4 sm:p-6 lg:p-10 min-h-[50vh]">
            <div className="flex items-center justify-center h-full">
              <span className="text-base sm:text-lg text-gray-500 text-center">
                Nenhum imóvel encontrado com o filtro selecionado.
              </span>
            </div>
          </div>
        )}

        {propertiesFiltered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-12 p-4 sm:p-6 lg:p-10">
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
                rooms={property.dormitorios}
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
