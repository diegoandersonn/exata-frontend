import { useAuth } from "@/contexts/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type SetFavoritePayload = { propertyId: string; favorito: boolean };

const useSetFavoriteProperty = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: async ({ propertyId, favorito }: SetFavoritePayload) => {
      const res = await fetch(
        `http://exata-backend.us-east-2.elasticbeanstalk.com/property/${propertyId}/favorite`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ favorito }),
        }
      );
      if (!res.ok) {
        throw new Error("Falha ao atualizar favorito");
      }
      return res.json();
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get-properties"] }),
  });
};

export default useSetFavoriteProperty;
