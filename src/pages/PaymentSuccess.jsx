import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  FiCheckCircle,
  FiArrowRight,
  FiHome,
} from "react-icons/fi";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();

  const txnid = searchParams.get("txnid");
  const easepayid = searchParams.get("easepayid");
  const amount = searchParams.get("amount");

  return (
    <div className="min-h-screen bg-[#f7f9fc] flex items-center justify-center px-4">
      <div className="w-full max-w-[520px] rounded-[28px] bg-white border border-[#e8edf3] shadow-[0_20px_60px_rgba(20,35,60,0.08)] p-8 text-center">

        {/* SUCCESS ICON */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#eaf8ef]">
          <FiCheckCircle
            size={46}
            className="text-[#28a866]"
          />
        </div>

        {/* TITLE */}
        <h1 className="text-[28px] font-semibold text-[#243142]">
          Payment Successful
        </h1>

        <p className="mt-3 text-[14px] leading-6 text-[#7a8797]">
          Your payment has been successfully processed.
          Your visa application payment is confirmed.
        </p>

        {/* PAYMENT DETAILS */}
        <div className="mt-7 rounded-2xl bg-[#f8fafc] border border-[#edf1f5] p-5 text-left">

          <div className="flex items-center justify-between py-2">
            <span className="text-[13px] text-[#7b8795]">
              Amount
            </span>

            <span className="text-[15px] font-semibold text-[#263445]">
              ₹{amount || "0"}
            </span>
          </div>

          <div className="flex items-center justify-between py-2 border-t border-[#e9edf2]">
            <span className="text-[13px] text-[#7b8795]">
              Transaction ID
            </span>

            <span className="max-w-[250px] truncate text-[13px] font-medium text-[#263445]">
              {txnid || "-"}
            </span>
          </div>

          <div className="flex items-center justify-between py-2 border-t border-[#e9edf2]">
            <span className="text-[13px] text-[#7b8795]">
              Easebuzz ID
            </span>

            <span className="max-w-[250px] truncate text-[13px] font-medium text-[#263445]">
              {easepayid || "-"}
            </span>
          </div>

        </div>

        {/* BUTTONS */}
        <div className="mt-7 flex flex-col gap-3">

          <Link
            to="/"
            className="h-[48px] rounded-xl bg-[#356ae6] text-white flex items-center justify-center gap-2 text-[14px] font-medium hover:bg-[#285bd0] transition"
          >
            Continue
            <FiArrowRight size={17} />
          </Link>

          <Link
            to="/"
            className="h-[48px] rounded-xl border border-[#dfe5ec] text-[#526174] flex items-center justify-center gap-2 text-[14px] font-medium hover:bg-[#f8fafc] transition"
          >
            <FiHome size={17} />
            Back to Home
          </Link>

        </div>

      </div>
    </div>
  );
};

export default PaymentSuccess;