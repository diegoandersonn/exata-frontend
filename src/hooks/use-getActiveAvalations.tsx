import { AvaliationType } from "@/types/avaliation-type";
import { useQuery } from "@tanstack/react-query";

const useGetActiveAvaliations = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const { data, isError, isLoading } = useQuery<AvaliationType[]>({
    queryKey: ["get-avaliations"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/avaliation/avaliacoesHome`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Erro ao buscar dados das avaliações");
      }
      return await response.json();
    },
  });
  return { avaliations: data, isLoading, isError };
};

export default useGetActiveAvaliations;
