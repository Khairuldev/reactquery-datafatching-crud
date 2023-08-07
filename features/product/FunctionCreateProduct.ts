import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const FunctionCreateProduct = ({ onSuccess }: any) => {
  return useMutation({
    mutationKey: ["Create-Product"],
    mutationFn: async (body) => {
      const productResponse = await axiosInstance.post("/products", body);
      return productResponse;
    },
    onSuccess,
  });
};
