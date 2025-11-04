import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { HomeType } from "@/types/home-type";

const useGetHome = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { token } = useAuth();

  const { data, isError, isLoading } = useQuery<HomeType[]>({
    queryKey: ["get-home"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/home`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error("Erro ao buscar dados da home");
      }
      return await response.json();
    },
  });
  return { home: data, isLoading, isError };
};

export default useGetHome;
