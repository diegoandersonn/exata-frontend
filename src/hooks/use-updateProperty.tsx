import { useAuth } from "@/contexts/AuthContext";
import { PropertyType } from "@/types/property-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateProperty = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const queryClient = useQueryClient();
  const { token } = useAuth();

  return useMutation({
    mutationFn: async (newProperty: PropertyType) => {
      await fetch(`${API_URL}/property/${newProperty._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProperty),
      });
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get-properties"] }),
  });
};

export default useUpdateProperty;
