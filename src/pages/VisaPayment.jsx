import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard } from "lucide-react";

const VisaPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const applicationData =
    location.state || {};

  const {
    travelers = [],
    goingFrom,
    goingTo,
    visaTotal = 0,
    insuranceTotal = 0,
    totalAmount = 0,
    paymentMethod = "Online",
  } = applicationData;

  return (
    <div
      className="min-h-screen bg-[#f7f8fa]"
      style={{
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div className="mx-auto max-w-[1100px] px-4 py-8 sm:px-6 lg:px-8">

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-[14px] font-medium text-[#526174]"
        >
          <ArrowLeft size={17} />
          Back
        </button>

        <div className="grid gap-6 lg:grid-cols-[1fr_350px]">

          {/* LEFT */}

          <div className="rounded-2xl border border-[#e1e7ed] bg-white p-6">

            <div className="mb-6 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eef4ff] text-[#356ae6]">
                <CreditCard size={19} />
              </div>

              <div>
                <h1 className="text-[22px] font-semibold text-[#334155]">
                  Visa Payment
                </h1>

                <p className="mt-1 text-[13px] text-[#8793a3]">
                  Review your application and complete payment.
                </p>
              </div>

            </div>


            {/* ROUTE */}

            <div className="mb-5 rounded-xl bg-[#f8fafc] p-4">

              <p className="text-[11px] uppercase tracking-wide text-[#94a0af]">
                Travel Route
              </p>

              <p className="mt-1 text-[15px] font-medium text-[#475569]">
                {goingFrom || "India"} →{" "}
                {goingTo || "Destination"}
              </p>

            </div>


            {/* TRAVELERS */}

            <div>

              <h2 className="mb-3 text-[15px] font-semibold text-[#526174]">
                Travelers
              </h2>

              <div className="space-y-2">

                {travelers.map(
                  (traveler, index) => (
                    <div
                      key={
                        traveler.id ||
                        index
                      }
                      className="rounded-xl border border-[#e5eaf0] p-4"
                    >

                      <div className="flex items-center justify-between">

                        <span className="text-[13px] font-medium text-[#526174]">
                          Traveler {index + 1}
                        </span>

                        <span className="text-[13px] text-[#7b8796]">
                          {traveler.firstName}{" "}
                          {traveler.lastName}
                        </span>

                      </div>

                    </div>
                  )
                )}

              </div>

            </div>

          </div>


          {/* RIGHT */}

          <div className="h-fit rounded-2xl border border-[#e1e7ed] bg-white p-6">

            <h2 className="text-[17px] font-semibold text-[#334155]">
              Payment Summary
            </h2>

            <div className="mt-5 space-y-4">

              <div className="flex justify-between text-[13px]">
                <span className="text-[#7b8796]">
                  Visa Fee
                </span>

                <span className="font-medium text-[#526174]">
                  ₹{Number(
                    visaTotal
                  ).toLocaleString("en-IN")}
                </span>
              </div>


              {Number(insuranceTotal) > 0 && (
                <div className="flex justify-between text-[13px]">

                  <span className="text-[#7b8796]">
                    Insurance
                  </span>

                  <span className="font-medium text-[#526174]">
                    ₹{Number(
                      insuranceTotal
                    ).toLocaleString("en-IN")}
                  </span>

                </div>
              )}

            </div>


            <div className="my-5 h-px bg-[#e8edf2]" />


            <div className="flex items-end justify-between">

              <span className="text-[13px] text-[#7b8796]">
                Total
              </span>

              <span className="text-[26px] font-semibold text-[#263244]">
                ₹{Number(
                  totalAmount
                ).toLocaleString("en-IN")}
              </span>

            </div>


            <p className="mt-3 text-[12px] text-[#8995a5]">
              Payment method:{" "}
              <span className="font-medium text-[#526174]">
                {paymentMethod}
              </span>
            </p>


            <button
              type="button"
              className="mt-6 w-full rounded-xl bg-[#1f355e] px-5 py-3.5 text-[14px] font-medium text-white"
              onClick={() => {
                console.log(
                  "Proceeding with payment:",
                  applicationData
                );
              }}
            >
              Proceed to Payment
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default VisaPayment;