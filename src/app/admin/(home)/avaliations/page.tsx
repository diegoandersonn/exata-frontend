"use client";

import useGetAvaliations from "@/hooks/use-getAvaliations";
import FullScreenLoaderPortal from "@/components/ui/full-screen-loader-portal";
import FeedbackCard from "@/components/ui/feedback/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { useState, useEffect } from "react";
import useSetFavoriteNps from "@/hooks/use-setFavoriteNps";
import { toast } from "react-toastify";

export default function Avaliations() {
  const { avaliations, isLoading, isError } = useGetAvaliations();
  const [activeState, setActiveState] = useState<Record<string, boolean>>({});
  const favorite = useSetFavoriteNps();

  useEffect(() => {
    if (!avaliations) return;
    setActiveState((prev) => {
      const next = { ...prev };
      for (const a of avaliations) {
        next[a._id] ??= !!a.ativa;
      }
      return next;
    });
  }, [avaliations]);

  if (isLoading) {
    return <FullScreenLoaderPortal open={true} />;
  }

  if (isError) {
    return <div>Erro ao carregar avaliações.</div>;
  }

  return (
    <div className="p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Avaliações
        </h1>
        <p className="text-gray-600">Gerencie as avaliações dos usuários</p>
      </div>
      {avaliations && avaliations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {avaliations.map((avaliation) => {
            const isActive = Boolean(
              activeState[avaliation._id] ?? avaliation.ativa
            );
            const onToggleActive = () => {
              setActiveState((prev) => ({
                ...prev,
                [avaliation._id]: !isActive,
              }));
              try {
                favorite.mutate({ id: avaliation._id, ativa: !isActive });
                toast.success(
                  `Avaliação ${
                    isActive ? "desativada" : "ativada"
                  } com sucesso!`
                );
              } catch (error) {
                toast.error(
                  "Erro ao atualizar avaliação. Tente novamente mais tarde."
                );
                console.error("Erro ao atualizar avaliação:", error);
              }
            };
            return (
              <div key={avaliation._id} className="relative">
                <FeedbackCard
                  feedback={avaliation.comentario}
                  rating={avaliation.avaliacao}
                />
                <button
                  type="button"
                  aria-label={
                    isActive ? "Desativar avaliação" : "Ativar avaliação"
                  }
                  onClick={onToggleActive}
                  className="absolute top-2 right-2 inline-flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100 bg-white/80"
                >
                  <FontAwesomeIcon
                    icon={isActive ? faHeartSolid : faHeartRegular}
                    className={isActive ? "text-red-500" : "text-gray-400"}
                    size="lg"
                  />
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <p>Nenhuma avaliação encontrada.</p>
      )}
    </div>
  );
}
