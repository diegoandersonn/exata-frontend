import { PropertyType } from "@/types/property-type";
import { useQuery } from "@tanstack/react-query";

const useGetProperty = (propertyId: string) => {
  const { data, isError, isLoading } = useQuery<PropertyType>({
    queryKey: ["get-property", propertyId],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3333/property/${propertyId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar dados do imóvel");
      }
      return await response.json();
    },
  });
  return { property: data, isLoading, isError };
};
export default useGetProperty;
