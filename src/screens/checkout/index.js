"use client";
import { useProductContext } from "@/components/ProductContext";
import { stripeKey } from "@/lib/data-services";
import { createCheckoutSession } from "@/lib/stripeActions";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

function Checkout() {
  const router = useRouter();
  const StripePromise = loadStripe(stripeKey);
  const [options, setOptions] = useState();
  const { cartItems, customerData } = useProductContext();

  const fetchClientSecret = useCallback(async () => {
    const session = await createCheckoutSession(cartItems, customerData);
    setOptions({ clientSecret: session.clientSecret });
  }, [cartItems, customerData]);

  useEffect(() => {
    if (cartItems.length === 0 || !customerData?.id) {
      router.push("/");
    } else {
      fetchClientSecret();
    }
  }, [cartItems, customerData, router, fetchClientSecret]);

  return (
    <div>
      {options?.clientSecret && (
        <EmbeddedCheckoutProvider stripe={StripePromise} options={options}>
          <div className="my-10">
            <EmbeddedCheckout />
          </div>
        </EmbeddedCheckoutProvider>
      )}
    </div>
  );
}

export default Checkout;
