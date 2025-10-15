import { useMutation, useQueryClient } from "@tanstack/react-query";

const useSendNPS = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (nps: { score: number; comment: string }) => {
      const response = await fetch(`${API_URL}/avaliation/avaliar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            avaliacao: nps.score,
            comentario: nps.comment,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
      }
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get-properties"] }),
  });
};

export default useSendNPS;
