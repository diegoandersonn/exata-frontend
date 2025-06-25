"use client";
import Header from "@/components/ui/header";
import useGetProperties from "@/hooks/use-getProperties";
import Image from "next/image";

export default function PropertiesPage() {
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
  return (
    <div className="flex flex-col gap-6">
      <Header />
      <div className="w-screen mt-24">
        <h1 className="font-bold text-2xl p-6">{properties.length} Imóveis à venda na Região da Baixada Santista</h1>
        <div className="grid grid-cols-4 gap-12 px-10">
          {properties.map((property) => (
            <div
              key={property.id}
              className="flex flex-col justify-between gap-2 sm:w-[180px] sm:h-[260px] md:w-[220px] md:h-[320px] lg:w-[260px] lg:h-[380px] xl:w-[420px] xl:h-[440px] rounded-lg shadow-lg border border-gray-300 hover:scale-105 transition-transform duration-300 cursor-pointer group bg-white"
            >
              <div>
                <div className="w-full h-[100px] sm:h-[120px] md:h-[160px] lg:h-[250px] relative">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover rounded-t-lg"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 375px"
                  />
                </div>
                <div className="p-2">
                  <h4 className="font-bold text-sm md:text-base lg:text-lg">
                    {property.title}
                  </h4>
                  <p className="text-xs md:text-sm">{property.description}</p>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between px-2">
                  <p className="text-xs md:text-sm font-bold text-red-800">
                    R$ {property.price}
                  </p>
                  <p className="text-xs md:text-sm font-bold">
                    Código. {property.code}
                  </p>
                </div>
                <div className="flex items-center justify-between px-2 py-2 md:p-4 font-bold text-[10px] md:text-xs border-t border-gray-300 text-zinc-300 group-hover:text-black">
                  <p>{property.area} m²</p>
                  <p>{property.rooms} quartos</p>
                  <p>{property.parkingSpaces} vagas</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
