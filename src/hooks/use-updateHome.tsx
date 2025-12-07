import { useAuth } from "@/contexts/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdateHomePayload = {
  distancia: number;
  endereco: string;
  instagram: string;
  telefone: string;
  email: string;
};

const useUpdateHome = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: async (data: UpdateHomePayload) => {
      const res = await fetch(
        `http://localhost:3333/home/68f01dff51081853e2c49df7`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) {
        throw new Error("Falha ao atualizar configurações");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-home"] });
    },
  });
};

export default useUpdateHome;