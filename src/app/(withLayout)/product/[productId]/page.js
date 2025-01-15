import { getSingleProduct } from "@/lib/data-services";
import Product from "@/screens/product";

async function ProductPage({ params }) {
  const { productId } = await params;
  const product = await getSingleProduct(productId);

  return (
    <>
      <Product product={product?.data} />
    </>
  );
}

export default ProductPage;
