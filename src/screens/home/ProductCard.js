"use client";
import { StarIcon } from "@/components/icons";
import { useProductContext } from "@/components/ProductContext";
import Button from "@/components/ui/Button";
import { formatCurrency } from "@/helpers/formatCurrency";
import { BASE_URL } from "@/lib/data-services";
import { cn } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";

function ProductCard({ product }) {
  const {
    image,
    name,
    description,
    mrp,
    sellPrice,
    currentStock,
    rating,
    productType,
    id,
  } = product;

  const { addProductToCart, removeProductFromCart, cartItems } =
    useProductContext();

  const isProductInCart = cartItems.some((item) => item.id === product.id);

  function handleCartItems() {
    if (isProductInCart) {
      removeProductFromCart(product.id);
    } else {
      addProductToCart({
        ...product,
        quantity: 1,
        size: "smallSize",
      });
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg w-full h-full min-h-[624px]">
      <Link href={`/product/${id}`}>
        <Image
          className="w-full h-full rounded-t-xl max-h-96 object-contain"
          src={`${BASE_URL}${image}`}
          alt="product"
          width={0}
          height={0}
          sizes="100vw"
        />
        <div className="space-y-1 p-5">
          <span className="text-2xl font-semibold leading-5">{name}</span>
          <p className="text-gray-400 text-md truncate">{description}</p>
        </div>
      </Link>

      <div className="space-y-0 px-5">
        <div className="flex justify-between items-center">
          <div className="flex gap-x-3 items-center text-xl font-semibold">
            <span className="text-gray-500 line-through">
              {formatCurrency(mrp)}
            </span>
            <span className="text-2xl">{formatCurrency(sellPrice)}</span>
          </div>
          <span className="text-gray-400 text-md">{currentStock}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-x-1">
            {[...Array(rating || 0)].map((star) => (
              <StarIcon key={star.id} />
            ))}
          </div>
          <div className="product-type-label">{productType.name}</div>
        </div>
      </div>

      <div className="flex gap-x-2 p-5">
        <Button
          className={cn(
            " w-full custom-outline-btn",
            isProductInCart && "border-red-400 text-red-500"
          )}
          onClick={handleCartItems}
        >
          {isProductInCart ? "Remove" : "Add to cart"}
        </Button>
        <Button className="w-full">Buy Now</Button>
      </div>
    </div>
  );
}

export default ProductCard;
