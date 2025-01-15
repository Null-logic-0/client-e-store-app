import { getProducts, getProductTypes } from "@/lib/data-services";
import HomeScreen from "@/screens/home";

export default async function Home({ searchParams }) {
  const search = await searchParams;
  const products = await getProducts(searchParams);

  const productTypesRes = await getProductTypes();
  const productTypes = [
    { label: "All", value: "all" },
    ...productTypesRes?.data?.map((item) => ({
      label: item.name,
      value: item.id,
    })),
  ];

  return (
    <>
      <HomeScreen
        searchParams={search}
        products={products}
        productTypes={productTypes}
      />
    </>
  );
}
