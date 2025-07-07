import { PropertyType } from "@/types/property-type";
import { useQuery } from "@tanstack/react-query";

export const useGetProperties = () => {
  const { data, isError, isLoading } = useQuery<PropertyType[]>({
    queryKey: ["get-properties"],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3333/property`, {
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

export const useGetActiveProperties = () => {
  const { data, isError, isLoading } = useQuery<PropertyType[]>({
    queryKey: ["get-properties"],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3333/property/active`, {
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