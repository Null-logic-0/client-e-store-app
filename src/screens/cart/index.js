"use client";
import {
  DeleteIcon,
  MinusCircleIcon,
  PlusCircleIcon,
  StarIcon,
} from "@/components/icons";
import { useProductContext } from "@/components/ProductContext";
import Button from "@/components/ui/Button";
import { formatCurrency } from "@/helpers/formatCurrency";
import { BASE_URL } from "@/lib/data-services";
import Image from "next/image";
import CartSummary from "./CartSummary";

function Cart() {
  const sizeOptions = [
    { label: "S", value: "smallSize" },
    { label: "M", value: "mediumSize" },
    { label: "L", value: "largeSize" },
  ];

  const {
    cartItems,
    setCartItems,
    increaseQuantity,
    decraseQuantity,
    removeProductFromCart,
  } = useProductContext();

  return (
    <div className="my-10">
      <h1 className="text-3xl font-semibold">Cart</h1>

      <div className="grid grid-cols-4 gap-5 my-5">
        <div className="col-span-3 space-y-5">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div
                className="w-full bg-white shadow-md rounded-xl"
                key={item.id}
              >
                <div className="grid grid-cols-[auto_1fr]">
                  <Image
                    className="w-60 h-60 object-cover rounded-l-xl m-auto"
                    src={`${BASE_URL}${item?.image}`}
                    alt="product"
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                  <div className="flex flex-col p-8 justify-between">
                    <div>
                      <div className="flex justify-between">
                        <h1 className="text-2xl font-medium">{item?.name}</h1>
                        <div className="product-type-label">
                          {item?.productType?.name}
                        </div>
                      </div>
                      <div className="flex gap-x-1">
                        {[...Array(item?.rating || 0)].map((star) => (
                          <StarIcon key={star} />
                        ))}
                      </div>
                    </div>
                    <div className="text-xl flex gap-x-3 items-center">
                      <span className="text-gray-500 line-through font-medium">
                        {formatCurrency(item?.mrp)}
                      </span>
                      <span className="text-2xl font-semibold">
                        {formatCurrency(item?.sellPrice)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-x-4 items-center">
                        <Button
                          className="p-0 bg-transparent text-black"
                          onClick={() => {
                            if (item.quantity > 1) {
                              decraseQuantity(item.id);
                            }
                          }}
                          disabled={item.quantity === 1}
                        >
                          <MinusCircleIcon className="w-8 h-8" />
                        </Button>
                        <span className="text-xl font-semibold">
                          {item.quantity}
                        </span>
                        <Button
                          className="p-0 bg-transparent text-black"
                          onClick={() => increaseQuantity(item.id)}
                          disabled={item.quantity === item[item.size]}
                        >
                          <PlusCircleIcon className="w-8 h-8" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-x-4">
                        <h6 className="text-lg font-semibold">Size</h6>
                        <div className="flex flex-wrap gap-3">
                          {sizeOptions
                            .filter((size) => item[size.value] !== 0)
                            .map((size, index) => (
                              <div key={index}>
                                <input
                                  type="radio"
                                  id={`sizes-${size.value}-${item.id}`}
                                  name={"sizes-" + item.id}
                                  className="hidden peer"
                                  value={size.value}
                                  checked={item.size === size.value}
                                  onChange={() =>
                                    setCartItems((prev) =>
                                      prev.map((product) =>
                                        product.id === item.id
                                          ? {
                                              ...product,
                                              size: size.value,
                                              quantity: 1,
                                            }
                                          : product
                                      )
                                    )
                                  }
                                />
                                <label
                                  htmlFor={`sizes-${size.value}-${item.id}`}
                                  className="checkbox-button-label"
                                >
                                  {size.label}
                                </label>
                              </div>
                            ))}
                        </div>
                      </div>
                      <Button
                        className="!bg-red-500 w-fit flex gap-2 items-center"
                        onClick={() => removeProductFromCart(item.id)}
                      >
                        <DeleteIcon />
                        <span>Remove</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center col-span-2 my-5">
              <span className="text-2xl font-medium">Cart is Empty</span>
            </div>
          )}
        </div>
        <CartSummary />
      </div>
    </div>
  );
}

export default Cart;
