import { useAuth } from "@/contexts/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type SetFavoritePayload = { id: string; ativa: boolean };

const useSetFavoriteNps = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: async ({ id, ativa }: SetFavoritePayload) => {
      const res = await fetch(
        `https://exata-back-serverless-production.up.railway.app/avaliation/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ativa }),
        }
      );
      if (!res.ok) {
        throw new Error("Falha ao atualizar ativa");
      }
      return res.json();
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get-avaliations"] }),
  });
};

export default useSetFavoriteNps;
