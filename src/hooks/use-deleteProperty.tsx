import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteProperty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (propertyId: string) => {
      await fetch(`http://localhost:3000/property/${propertyId}`, {
        method: "DELETE",
      });
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get-properties"] }),
  });
};

export default useDeleteProperty;
