import { getCheckoutSession, updateCheckoutData } from "@/lib/stripeActions";
import PaymentStatus from "@/screens/paymentStatus";

async function PaymentSatusPage({ searchParams }) {
  const { session_id } = await searchParams;
  const session = await getCheckoutSession(session_id);

  const updatedResObj = {
    adress: session?.shipping_details?.address?.line1,
    city: session?.shipping_details?.address?.city,
    customerId: session?.metadata?.customerId,
    customerEmail: session?.customer_email,
    SODateTime: session?.created,
    grandTotalPrice: session?.amount_total / 100,
    paymentMode: session?.payment_method_types[0],
    products: JSON.parse(session?.metadata?.products),
  };

  const response = await updateCheckoutData(updatedResObj);

  return <PaymentStatus status={response?.message} />;
}

export default PaymentSatusPage;
