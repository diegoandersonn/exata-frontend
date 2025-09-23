"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useDeleteProperty from "@/hooks/use-deleteProperty";
import useUpdateProperty from "@/hooks/use-updateProperty";
import useSetFavoriteProperty from "@/hooks/use-setFavoriteProperty";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import useGetProperties from "@/hooks/use-getProperties";

export default function Properties() {
  const [index, setIndex] = useState<number>(0);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const { properties, isError } = useGetProperties();
  const deleteProperty = useDeleteProperty();
  const updateProperty = useUpdateProperty();
  const setFavorite = useSetFavoriteProperty();
  const router = useRouter();
  const [favoriteState, setFavoriteState] = useState<Record<string, boolean>>(
    {}
  );

  const { isSuccess: isDeleteSuccess, isError: isDeleteError } = deleteProperty;
  const { isSuccess: isUpdateSuccess, isError: isUpdateError } = updateProperty;

  const listHeader = [
    "Imagem principal",
    "Título do imóvel",
    "Dormitório(s)",
    "Banheiro(s)",
    "Aluguel + IPTU",
    "Favorito",
    "Ações",
  ];

  useEffect(() => {
    const handleClick = () => setActiveMenu(null);
    if (activeMenu !== null) {
      window.addEventListener("click", handleClick);
      return () => window.removeEventListener("click", handleClick);
    }
  }, [activeMenu]);

  useEffect(() => {
    if (isDeleteSuccess) {
      toast.success("Propriedade inativada com sucesso");
    }

    if (isDeleteError) {
      toast.error("Erro inesperado. Tente novamente mais tarde");
    }
  }, [isDeleteError, isDeleteSuccess]);

  useEffect(() => {
    if (isUpdateSuccess) {
      toast.success("Propriedade ativada com sucesso");
    }

    if (isUpdateError) {
      toast.error("Erro inesperado. Tente novamente mais tarde");
    }
  }, [isUpdateError, isUpdateSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error("Erro ao carregar imóveis");
    }
  }, [isError]);

  useEffect(() => {
    if (!properties) return;
    setFavoriteState((prev) => {
      const next = { ...prev };
      for (const p of properties) {
        const id = p._id as string;
        next[id] ??= !!p.favorito;
      }
      return next;
    });
  }, [properties]);

  if (!properties) {
    if (isLoading) return <div>Carregando...</div>;
    return <div>Imóveis não encontrados</div>;
  }

  const activeProperties = properties.filter((property) =>
    index === 0 ? property.ativo : !property.ativo
  );

  function handleEditProperty(propertyId: string) {
    router.push(`/admin/properties/property?propertyId=${propertyId}`);
  }

  return (
    <main className="mt-[0.5rem]">
      <div className="flex justify-between items-center mb-[0.75rem]">
        <h1 id="title" className="font-bold text-[#393B3C] text-lg">
          Imóveis
        </h1>
        <button
          onClick={() => router.push("/admin/properties/property")}
          className="w-[4.25rem] h-[2.5rem] rounded-lg text-white font-semibold text-sm bg-red-600 hover:bg-red-700"
        >
          Novo
        </button>
      </div>

      <div
        id="active-or-inactive"
        className="flex h-[3.75rem] bg-white px-[1.5rem] gap-[1.5rem] mb-[0.75rem]"
      >
        <h3
          className={`${
            index === 0
              ? "font-semibold text-[#393B3C] border-b-[0.125rem] border-red-500"
              : "font-normal text-[#5C6164] border-b-[0.125rem] border-white"
          } text-sm mt-auto hover:cursor-pointer pb-[0.625rem]`}
          onClick={() => setIndex(0)}
        >
          Cadastrados
        </h3>
        <h3
          className={`${
            index === 1
              ? "font-semibold text-[#393B3C] border-b-[0.125rem] border-red-500"
              : "font-normal text-[#5C6164] border-b-[0.125rem] border-white"
          } text-sm mt-auto hover:cursor-pointer pb-[0.625rem]`}
          onClick={() => setIndex(1)}
        >
          Inativados
        </h3>
      </div>

      <div className="bg-white rounded-lg min-h-[26rem]">
        {/* Cabeçalho */}
        <div className="grid grid-cols-12 gap-[1.5rem] pt-[1.125rem] px-2">
          {listHeader.map((title, idx) => {
            const spans = [
              "col-span-2", // imagem
              "col-span-2", // tipo
              "col-span-2", // dormitório
              "col-span-2", // banheiro
              "col-span-2", // aluguel
              "col-span-1", // favorito
              "col-span-1", // ações
            ];
            return (
              <h3
                key={idx}
                className={`font-semibold text-[#393B3C] text-sm text-center mb-[1.125rem] ${spans[idx]}`}
              >
                {title}
              </h3>
            );
          })}
        </div>
        {activeProperties.map((property, idx) => {
          const isFav = Boolean(
            favoriteState[property._id] ?? property.favorito
          );
          const onToggleFavorite = (e: React.MouseEvent) => {
            e.stopPropagation();
            setFavoriteState((prev) => ({
              ...prev,
              [property._id]: !isFav,
            }));
            setFavorite.mutate({ propertyId: property._id, favorito: !isFav });
          };
          return (
            <div
              key={property._id ?? idx}
              className="grid grid-cols-12 gap-[1.5rem] items-center border-t border-gray-100 py-3 px-2 hover:bg-gray-50 transition relative"
            >
              <div className="col-span-2 text-center font-normal h-14 text-sm text-[#393B3C]">
                <Image
                  src={property.imagens[0]}
                  alt={"Imagem principal"}
                  width={40}
                  height={56}
                  className="inline-block w-20 h-14 bg-gray-200 rounded"
                />
              </div>
              <div className="col-span-2 text-center font-normal text-sm text-[#393B3C]">
                {property.nome}
              </div>
              <div className="col-span-2 text-center font-normal text-sm text-[#393B3C]">
                {property.dormitorios}
              </div>
              <div className="col-span-2 text-center font-normal text-sm text-[#393B3C]">
                {property.banheiros}
              </div>
              <div className="col-span-2 text-center font-normal text-sm text-[#393B3C]">
                R${" "}
                {property.aluguel.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </div>
              <div className="col-span-1 text-center font-normal text-sm text-[#393B3C]">
                <button
                  type="button"
                  aria-label={
                    isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"
                  }
                  onClick={onToggleFavorite}
                  className="inline-flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100"
                >
                  <FontAwesomeIcon
                    icon={isFav ? faHeartSolid : faHeartRegular}
                    className={isFav ? "text-red-500" : "text-gray-400"}
                    size="lg"
                  />
                </button>
              </div>
              <div className="col-span-1 text-center font-normal text-sm relative flex justify-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveMenu(activeMenu === idx ? null : idx);
                  }}
                  className="w-[2.25rem] h-[2.25rem] bg-transparent flex items-center justify-center rounded-lg"
                >
                  <Image
                    src="/three-dots.svg"
                    alt="Ver detalhes"
                    width={20}
                    height={20}
                  />
                </button>
                {activeMenu === idx && (
                  <div className="absolute right-4 top-[2.75rem] w-fit bg-white border border-gray-200 rounded-md shadow-lg z-10 flex flex-col text-left">
                    <button
                      className="px-4 py-2 hover:bg-gray-100 text-sm text-[#393B3C] text-left"
                      onClick={() => handleEditProperty(property._id)}
                    >
                      Editar
                    </button>
                    {index === 0 ? (
                      <button
                        className="px-4 py-2 hover:bg-gray-100 text-sm text-[#393B3C] text-left"
                        onClick={() => deleteProperty.mutate(property._id)}
                      >
                        Inativar
                      </button>
                    ) : (
                      <button
                        className="px-4 py-2 hover:bg-gray-100 text-sm text-[#393B3C] text-left"
                        onClick={() =>
                          updateProperty.mutate({ ...property, ativo: true })
                        }
                      >
                        Ativar
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
