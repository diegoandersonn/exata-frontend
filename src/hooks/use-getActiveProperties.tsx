import { PropertyType } from "@/types/property-type";
import { useQuery } from "@tanstack/react-query";

const useGetActiveProperties = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const { data, isError, isLoading } = useQuery<PropertyType[]>({
    queryKey: ["get-properties"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/property/active`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Erro ao buscar dados do imóvel");
      }
      return await response.json();
    },
  });
  return { properties: data, isLoading, isError };
};

export default useGetActiveProperties;
