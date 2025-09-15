import { useAuth } from "@/contexts/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteProperty = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();
  return useMutation({
    mutationFn: async (propertyId: string) => {
      await fetch(`http://localhost:3333/property/${propertyId}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get-properties"] }),
  });
};

export default useDeleteProperty;
