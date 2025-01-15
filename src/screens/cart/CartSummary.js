"use client";
import { useProductContext } from "@/components/ProductContext";
import Button from "@/components/ui/Button";
import { formatCurrency } from "@/helpers/formatCurrency";
import { useRouter } from "next/navigation";

function CartSummary() {
  const router = useRouter();
  const { cartItems, totalAmount, customerData } = useProductContext();
  const handleCheckout = () => {
    if (customerData?.id) {
      router.push("/checkout");
    } else {
      router.push("/login");
    }
  };
  return (
    <div className="sticky top-5 h-fit">
      <div className="bg-white shadow-md rounded-xl p-5 flex flex-col justify-between gap-y-5">
        <h1 className="text-2xl font-semibold border-b">Cart Summary</h1>

        <div className="space-y-3">
          {cartItems.map((item, index) => (
            <div className="grid grid-cols-2 gap-2 text-xl" key={index}>
              <span className="truncate">{item.name}</span>
              <span className="text-end">
                {formatCurrency(
                  Number(item?.sellPrice * item?.quantity).toFixed(2)
                )}
              </span>
            </div>
          ))}
        </div>
        <div className="border-t">
          <div className="grid grid-cols-2 gap-2 text-xl font-semibold mt-2">
            <span>Total Amount</span>
            <span className="text-end">
              {formatCurrency(totalAmount.toFixed(2))}
            </span>
          </div>
        </div>
      </div>
      <Button
        className="w-full mt-2"
        onClick={handleCheckout}
        disabled={cartItems.length === 0}
      >
        {customerData?.id ? "Checkout" : "Login to Checkout"}
      </Button>
    </div>
  );
}

export default CartSummary;
