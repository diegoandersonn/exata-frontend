import { useAuth } from "@/contexts/AuthContext";
import { AvaliationType } from "@/types/avaliation-type";
import { useQuery } from "@tanstack/react-query";

const useGetAvaliations = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { token } = useAuth();

  const { data, isError, isLoading } = useQuery<AvaliationType[]>({
    queryKey: ["get-avaliations"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/avaliation/avaliacoes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
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

export default useGetAvaliations;
