import { Checked } from "@/components/icons";
import Link from "next/link";

function PaymentStatus({ status }) {
  return (
    <div className="flex justify-center items-center">
      <div
        className="my-20 bg-white rounded-xl 
      shadow-lg w-[768px] px-10 py-20"
      >
        <div className="flex flex-col justify-center items-center gap-y-6 ">
          <Checked className="w-20 h-20 text-green-500" />
          <p className="font-semibold text-2xl ">{status}</p>
          <Link href={"/"} className="custom-btn w-fit self-center">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PaymentStatus;
