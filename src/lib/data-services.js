import { objectToQueryString } from "@/utils/utils";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const stripeKey = process.env.NEXT_PUBLIC_STIRPE_PUBLISHABLE_KEY;

export async function getProducts(searchParams) {
  const search = await searchParams;
  const filteredParams = { ...search };
  delete filteredParams.openAccordion;

  const res = await fetch(
    `${BASE_URL}/api/products/?${objectToQueryString(filteredParams)}`
  );
  const data = await res.json();

  return data;
}

export async function getProductTypes() {
  const res = await fetch(`${BASE_URL}/api/products/products-type`);
  const data = await res.json();

  return data;
}

export async function getSingleProduct(productId) {
  const res = await fetch(`${BASE_URL}/api/products/${productId}`);
  const data = await res.json();

  return data;
}
