import { axiosInstance } from "@/lib/axios";
// import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

// ngefetching data menggunakan react query
export const FunctionFetchProduct = () => {
  const { data, isLoading, refetch } = useQuery({
    // queryfn akan menerima sebuah function untuk ngefatch data

    queryFn: async () => {
      const productResponse = await axiosInstance.get("/products");

      return productResponse;
    },
    queryKey: ["products"],
  });

  return {
    data,
    isLoading,
    refetch,
  };
};

// export const FunctionFetchProduct = () => {
//   // fatching data secara alami
//   const [products, setProducts] = useState([]);
//   const [isloading, setIsLoading] = useState(false);
//   const fetchProducts = async () => {
//     setIsLoading(true);
//     try {
//       setTimeout(async () => {
//         const productResponse = await axiosInstance.get("/products");

//         console.log("data", productResponse.data);
//         setProducts(productResponse.data);
//         setIsLoading(false);
//       }, 1500);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return {
//     data: products,
//     isloading,
//   };
// };
