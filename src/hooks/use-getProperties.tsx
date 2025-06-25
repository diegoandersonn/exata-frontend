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

const useGetProperties = () => {
  const { data, isError, isLoading } = useQuery<PropertyType[]>({
    queryKey: ["get-properties"],
    queryFn: async () => {
      const response = await fetch(`http://localhost:5000/imoveis`, {
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
export default useGetProperties;
