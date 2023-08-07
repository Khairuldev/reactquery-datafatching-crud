import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const FunctionDeleteProduct = ({ onSuccess }: any) => {
  return useMutation({
    mutationKey: ["deleteProduct"],
    mutationFn: async (id) => {
      const productResponse = await axiosInstance.delete(`/products/${id}`);
    },
    onSuccess,
  });
};
