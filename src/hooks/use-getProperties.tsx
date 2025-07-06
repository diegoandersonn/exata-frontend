import { PropertyType } from "@/types/property-type";
import { useQuery } from "@tanstack/react-query";

const useGetProperties = () => {
  const { data, isError, isLoading } = useQuery<PropertyType[]>({
    queryKey: ["get-properties"],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/property`, {
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
  console.log(data);
  return { properties: data, isLoading, isError };
};
export default useGetProperties;
