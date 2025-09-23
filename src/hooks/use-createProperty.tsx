import { useAuth } from "@/contexts/AuthContext";
import { PropertyType } from "@/types/property-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateProperty = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: async (property: PropertyType) => {
      await fetch(`${API_URL}/property`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          imagens: property.imagens,
          tipo: property.tipo,
          dormitorios: property.dormitorios,
          banheiros: property.banheiros,
          vagasGaragem: property.vagasGaragem,
          others: property.others,
          ativo: true,
          aluguel: property.aluguel,
          iptu: property.iptu,
          prazo: property.prazo,
          tipoReajuste: property.tipoReajuste,
          horarioVisita: property.horarioVisita,
          area: property.area,
        }),
      });
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get-properties"] }),
  });
};

export default useCreateProperty;
