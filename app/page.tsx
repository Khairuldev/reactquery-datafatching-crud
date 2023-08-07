"use client";

import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { productstypes } from "@/datatypes";
import { NumericFormat } from "react-number-format";
import { FunctionFetchProduct } from "@/features/product/FunctionFetchProduct";
import { useFormik } from "formik";
import { FunctionCreateProduct } from "@/features/product/FunctionCreateProduct";
import { FunctionEditProduct } from "@/features/product/FunctionEditProduct";
import { FunctionDeleteProduct } from "@/features/product/FunctionDeleteProduct";

export default function Home() {
  const {
    data,
    isLoading: productIsLoading,
    refetch: refatchProducts,
  } = FunctionFetchProduct();
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      name: "",
      price: 0,
      description: "",
      image: "",
      id: 0,
    },

    // melakukan post products
    onSubmit: () => {
      const { name, price, description, image, id } = formik.values;

      if (id) {
        // melakukan PETCH /products/{id}
        editProduct({
          name,
          price,
          description,
          image,
          id,
        });

        toast({
          title: "product di Edit",
          status: "success",
        });
      } else {
        // melakukan POST product
        mutate: createProduct({
          name,
          price,
          description,
          image,
        });
        toast({
          title: "product ditambahkan",
          status: "success",
        });
      }

      formik.setFieldValue("name", "");
      formik.setFieldValue("price", 0);
      formik.setFieldValue("description", "");
      formik.setFieldValue("image", "");
      formik.setFieldValue("id", 0);
    },
  });

  // usemutation create function
  const { mutate: createProduct, isLoading: createProductIsLoading } =
    FunctionCreateProduct({
      onSuccess: () => {
        refatchProducts();
      },
    });

  // usemutation delete function
  const { mutate: deleteProduct } = FunctionDeleteProduct({
    onSuccess: () => {
      refatchProducts();
    },
  });

  // usemutation create function
  const { mutate: editProduct, isLoading: editProductIsLoading } =
    FunctionEditProduct({
      onSuccess: () => {
        refatchProducts();
      },
    });

  const handleFormInput = (event: any) => {
    formik.setFieldValue(event.target.name, event.target.value);
  };

  const confirmationDelete = (productId: any) => {
    const shouldDelete = confirm("yakin ingin menghapus data ini");

    if (shouldDelete) {
      deleteProduct(productId);
    }
  };

  const handleFormEdit = (product: any) => {
    formik.setFieldValue("id", product.id);
    formik.setFieldValue("name", product.name);
    formik.setFieldValue("price", product.price);
    formik.setFieldValue("description", product.description);
    formik.setFieldValue("image", product.image);
  };

  return (
    <Box px={2} py={4}>
      <Center py={4}>
        <Heading>Hello World</Heading>
      </Center>

      <Box>
        <TableContainer>
          <Table variant="simple" colorScheme="teal" w={"full"} size={"sm"}>
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
              <Tr>
                <Th textAlign={"center"}>No</Th>
                <Th textAlign={"center"}>Item Name</Th>
                <Th textAlign={"center"}>Price</Th>
                <Th textAlign={"center"}> Description</Th>
                <Th textAlign={"center"}>Image</Th>
                <Th textAlign={"center"} colSpan={2}>
                  Action
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.data.map((product: productstypes) => {
                return (
                  <Tr key={product.id}>
                    <Td>{product.id}</Td>
                    <Td>{product.name}</Td>
                    <Td>
                      <span className="purchase-details">
                        <NumericFormat
                          value={product.price}
                          prefix="Rp. "
                          displayType="text"
                          thousandSeparator="."
                          decimalSeparator=","
                        />
                      </span>
                    </Td>
                    <Td>{product.description}</Td>
                    <Td>
                      <Image src={product.image} boxSize={"150px"} />
                    </Td>
                    <Td>
                      <Button
                        onClick={() => handleFormEdit(product)}
                        bg={"green.500"}
                      >
                        edit
                      </Button>
                    </Td>
                    <Td>
                      <Button
                        onClick={() => confirmationDelete(product.id)}
                        bg={"red.500"}
                      >
                        delete
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
          <Box>
            <Center justifyContent={"center"} alignItems={"center"}>
              {/* {isloading && <Spinner /> } */}
              {productIsLoading ? (
                <VStack>
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                  />
                  <Text color={"blue"}>Loading . . .</Text>
                </VStack>
              ) : null}
            </Center>
          </Box>
        </TableContainer>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <VStack px={10} spacing={2} bg={"transparent brown"}>
          <FormControl>
            <FormLabel>Product id</FormLabel>
            <Input
              name="name"
              onChange={handleFormInput}
              value={formik.values.id}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Product Name</FormLabel>
            <Input
              name="name"
              onChange={handleFormInput}
              value={formik.values.name}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Price </FormLabel>
            <Input
              name="price"
              onChange={handleFormInput}
              value={formik.values.price}
              placeholder="Rp."
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input
              name="description"
              onChange={handleFormInput}
              value={formik.values.description}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Image</FormLabel>
            <Input
              name="image"
              onChange={handleFormInput}
              value={formik.values.image}
            />
          </FormControl>
          {createProductIsLoading || editProductIsLoading ? (
            <Spinner />
          ) : (
            <Button bg={"blue.500"} type="submit">
              Submit Product
            </Button>
          )}
        </VStack>
      </form>
    </Box>
  );
}
