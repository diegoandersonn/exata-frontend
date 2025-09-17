import { PropertyType } from "@/types/property-type";
import { useQuery } from "@tanstack/react-query";

const useGetProperty = (propertyId: string | null) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const { data, isError, isLoading } = useQuery<PropertyType>({
    queryKey: ["get-property", propertyId],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/property/${propertyId}`, {
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
  return { property: data, isLoading, isError };
};
export default useGetProperty;
