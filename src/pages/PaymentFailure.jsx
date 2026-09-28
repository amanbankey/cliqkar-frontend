import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  FiAlertCircle,
  FiRefreshCw,
  FiHome,
} from "react-icons/fi";

const PaymentFailure = () => {
  const [searchParams] = useSearchParams();

  const message =
    searchParams.get("message") ||
    "Your payment could not be completed.";

  const txnid = searchParams.get("txnid");

  return (
    <div className="min-h-screen bg-[#f7f9fc] flex items-center justify-center px-4">
      <div className="w-full max-w-[520px] rounded-[28px] bg-white border border-[#e8edf3] shadow-[0_20px_60px_rgba(20,35,60,0.08)] p-8 text-center">

        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#fff1f1]">
          <FiAlertCircle
            size={46}
            className="text-[#e35d6a]"
          />
        </div>

        <h1 className="text-[28px] font-semibold text-[#243142]">
          Payment Failed
        </h1>

        <p className="mt-3 text-[14px] leading-6 text-[#7a8797]">
          {message}
        </p>

        {txnid && (
          <div className="mt-6 rounded-2xl bg-[#f8fafc] border border-[#edf1f5] p-4">
            <p className="text-[12px] text-[#8a96a5]">
              Transaction ID
            </p>

            <p className="mt-1 text-[13px] font-medium text-[#344255] break-all">
              {txnid}
            </p>
          </div>
        )}

        <div className="mt-7 flex flex-col gap-3">

          <Link
            to="/traveler-details"
            className="h-[48px] rounded-xl bg-[#356ae6] text-white flex items-center justify-center gap-2 text-[14px] font-medium hover:bg-[#285bd0] transition"
          >
            <FiRefreshCw size={17} />
            Try Payment Again
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

export default PaymentFailure;