import { useQuery } from "@tanstack/react-query";

type PropertyType = {
  id: string;
  image: string;
  title: string;
  description: string;
  price: string;
  code: string;
  area: string;
  rooms: string;
  parkingSpaces: string;
};

const useGetProperty = (propertyId: string) => {
  const { data, isError, isLoading } = useQuery<PropertyType>({
    queryKey: ["get-property", propertyId],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:5000/imoveis/${propertyId}`,
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
