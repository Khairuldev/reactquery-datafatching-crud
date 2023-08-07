import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const FunctionEditProduct = ({ onSuccess }: any) => {
  return useMutation({
    mutationKey: ["Edit-Product"],
    mutationFn: async (body) => {
      const productResponse = await axiosInstance.patch(
        `/products/${body.id}`,
        body
      );
      return productResponse;
    },
    onSuccess,
  });
};
