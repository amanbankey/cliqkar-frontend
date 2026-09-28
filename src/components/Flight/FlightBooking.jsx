import React, { useMemo, useState } from "react";
import { FiArrowLeft, FiCheck, FiChevronDown, FiMail, FiPhone, FiShield } from "react-icons/fi";
import { TbPlaneDeparture } from "react-icons/tb";

const inputClass =
  "w-full h-11 rounded-xl border border-[#e1e7ef] bg-white px-3.5 text-[12px] text-[#445268] placeholder:text-[#a1acb8] outline-none transition focus:border-[#9eb8eb] focus:ring-4 focus:ring-[#356ae6]/[0.06]";

const emptyPassenger = (type) => ({
  type,
  title: "",
  firstName: "",
  lastName: "",
  gender: "",
  dob: "",
  nationality: "",
  email: "",
  mobile: "",
  passportNumber: "",
  passportIssuingCountry: "",
  passportExpiry: "",
});

const getFlightValue = (flight, ...keys) => {
  for (const key of keys) {
    if (flight?.[key] !== undefined && flight?.[key] !== null && flight?.[key] !== "") {
      return flight[key];
    }
  }
  return "";
};

const buildPassengerList = ({ adults = 1, children = 0, infants = 0 }) => [
  ...Array.from({ length: Number(adults) || 0 }, () => emptyPassenger("Adult")),
  ...Array.from({ length: Number(children) || 0 }, () => emptyPassenger("Child")),
  ...Array.from({ length: Number(infants) || 0 }, () => emptyPassenger("Infant")),
];

const AirlineLogo = ({ flight }) => {
  const logo = getFlightValue(flight, "airlineLogo", "logo");
  const code = getFlightValue(flight, "airlineCode", "Airline_Code") || "--";

  return logo ? (
    <img
      src={logo}
      alt={getFlightValue(flight, "airline", "Airline_Name") || code}
      className="w-10 h-10 rounded-xl object-contain border border-[#e7edf4] bg-white p-1.5"
    />
  ) : (
    <div className="w-10 h-10 rounded-xl bg-[#f2f6fb] border border-[#e7edf4] flex items-center justify-center text-[10px] font-bold text-[#5e6e82]">
      {code}
    </div>
  );
};

const PassengerField = ({ label, required, children }) => (
  <div>
    <label className="block mb-1.5 text-[10px] font-semibold text-[#647286]">
      {label} {required && <span className="text-[#d65d68]">*</span>}
    </label>
    {children}
  </div>
);

const SelectField = ({ value, onChange, options, placeholder }) => (
  <div className="relative">
    <select value={value} onChange={onChange} className={`${inputClass} appearance-none pr-9`}>
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
    <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8c98a8] pointer-events-none" size={14} />
  </div>
);

const FlightBooking = ({
  flight,
  adults = 1,
  childrenCount = 0,
  infants = 0,
  onBack,
  onContinue,
}) => {
  const isInternational = String(getFlightValue(flight, "travelType", "tripTraveltype") || "")
    .toUpperCase()
    .includes("INTERNATIONAL") || Boolean(flight?.isInternational);

  const initialPassengers = useMemo(
    () => buildPassengerList({ adults, children: childrenCount, infants }),
    [adults, childrenCount, infants]
  );

  const [passengers, setPassengers] = useState(initialPassengers);
  const [contactEmail, setContactEmail] = useState("");
  const [contactMobile, setContactMobile] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [errors, setErrors] = useState({});

  const updatePassenger = (index, field, value) => {
    setPassengers((current) =>
      current.map((passenger, i) =>
        i === index ? { ...passenger, [field]: value } : passenger
      )
    );
  };

  const validate = () => {
    const nextErrors = {};

    passengers.forEach((passenger, index) => {
      const requiredFields = ["title", "firstName", "lastName", "gender", "dob", "nationality"];
      requiredFields.forEach((field) => {
        if (!String(passenger[field] || "").trim()) {
          nextErrors[`p${index}_${field}`] = true;
        }
      });

      if (isInternational) {
        ["passportNumber", "passportIssuingCountry", "passportExpiry"].forEach((field) => {
          if (!String(passenger[field] || "").trim()) {
            nextErrors[`p${index}_${field}`] = true;
          }
        });
      }
    });

    if (!contactEmail.trim()) nextErrors.contactEmail = true;
    if (!contactMobile.trim()) nextErrors.contactMobile = true;
    if (!confirmed) nextErrors.confirmed = true;

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleContinue = () => {
    if (!validate()) return;

    const bookingPayload = {
      selectedFlight: flight,
      passengers,
      contact: {
        email: contactEmail.trim(),
        mobile: contactMobile.trim(),
      },
      counts: {
        adults: Number(adults),
        children: Number(childrenCount),
        infants: Number(infants),
      },
    };

    onContinue?.(bookingPayload);
  };

  return (
    <div className="mt-6 w-full">
      <div className="rounded-[24px] border border-[#e4eaf1] bg-white shadow-[0_12px_38px_rgba(26,43,65,0.06)] overflow-hidden">
        <div className="px-5 sm:px-7 py-5 border-b border-[#edf1f5] flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#8d99a8]">Step 2</p>
            <h2 className="text-[20px] font-semibold text-[#1f2d3d] mt-1">Passenger details</h2>
            <p className="text-[11px] text-[#8e9aaa] mt-1">
              Enter the passenger information exactly as it appears on the travel document.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-[#f1f6ff] px-3 py-1.5 text-[10px] font-semibold text-[#356ae6]">
            <FiCheck size={12} /> Flight selected
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_330px]">
          <div className="p-5 sm:p-7">
            {passengers.map((passenger, index) => (
              <div key={`${passenger.type}-${index}`} className="mb-6 rounded-[20px] border border-[#e7edf4] bg-[#fcfdff] p-4 sm:p-5 last:mb-0">
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div>
                    <p className="text-[14px] font-bold text-[#263445]">
                      {passenger.type} {passenger.type === "Adult" ? index + 1 : index + 1 - Number(adults)}
                    </p>
                    <p className="text-[10px] text-[#929eac] mt-1">Passenger information</p>
                  </div>
                  <span className="rounded-full bg-white border border-[#e5ebf2] px-3 py-1 text-[9px] font-semibold text-[#758294]">
                    {passenger.type}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <PassengerField label="Title" required>
                    <SelectField
                      value={passenger.title}
                      onChange={(e) => updatePassenger(index, "title", e.target.value)}
                      options={["Mr", "Mrs", "Ms", "Master"]}
                      placeholder="Select title"
                    />
                  </PassengerField>

                  <PassengerField label="Gender" required>
                    <SelectField
                      value={passenger.gender}
                      onChange={(e) => updatePassenger(index, "gender", e.target.value)}
                      options={["Male", "Female", "Other"]}
                      placeholder="Select gender"
                    />
                  </PassengerField>

                  <PassengerField label="First Name" required>
                    <input className={`${inputClass} ${errors[`p${index}_firstName`] ? "border-[#e36b75]" : ""}`} value={passenger.firstName} onChange={(e) => updatePassenger(index, "firstName", e.target.value)} placeholder="First name" />
                  </PassengerField>

                  <PassengerField label="Last Name" required>
                    <input className={`${inputClass} ${errors[`p${index}_lastName`] ? "border-[#e36b75]" : ""}`} value={passenger.lastName} onChange={(e) => updatePassenger(index, "lastName", e.target.value)} placeholder="Last name" />
                  </PassengerField>

                  <PassengerField label="Date of Birth" required>
                    <input type="date" className={`${inputClass} ${errors[`p${index}_dob`] ? "border-[#e36b75]" : ""}`} value={passenger.dob} onChange={(e) => updatePassenger(index, "dob", e.target.value)} />
                  </PassengerField>

                  <PassengerField label="Nationality" required>
                    <input className={`${inputClass} ${errors[`p${index}_nationality`] ? "border-[#e36b75]" : ""}`} value={passenger.nationality} onChange={(e) => updatePassenger(index, "nationality", e.target.value)} placeholder="Nationality" />
                  </PassengerField>

                  {isInternational && (
                    <>
                      <PassengerField label="Passport Number" required>
                        <input className={`${inputClass} ${errors[`p${index}_passportNumber`] ? "border-[#e36b75]" : ""}`} value={passenger.passportNumber} onChange={(e) => updatePassenger(index, "passportNumber", e.target.value)} placeholder="Passport number" />
                      </PassengerField>

                      <PassengerField label="Passport Issuing Country" required>
                        <input className={`${inputClass} ${errors[`p${index}_passportIssuingCountry`] ? "border-[#e36b75]" : ""}`} value={passenger.passportIssuingCountry} onChange={(e) => updatePassenger(index, "passportIssuingCountry", e.target.value)} placeholder="Issuing country" />
                      </PassengerField>

                      <PassengerField label="Passport Expiry" required>
                        <input type="date" className={`${inputClass} ${errors[`p${index}_passportExpiry`] ? "border-[#e36b75]" : ""}`} value={passenger.passportExpiry} onChange={(e) => updatePassenger(index, "passportExpiry", e.target.value)} />
                      </PassengerField>
                    </>
                  )}
                </div>
              </div>
            ))}

            <div className="mt-6 rounded-[20px] border border-[#e7edf4] bg-[#fbfcfe] p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-4">
                <FiPhone className="text-[#356ae6]" size={15} />
                <div>
                  <p className="text-[13px] font-bold text-[#344255]">Contact details</p>
                  <p className="text-[10px] text-[#929eac] mt-0.5">Booking updates and ticket information will be sent here.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <PassengerField label="Email" required>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#98a4b3]" size={14} />
                    <input type="email" className={`${inputClass} pl-9 ${errors.contactEmail ? "border-[#e36b75]" : ""}`} value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="Email address" />
                  </div>
                </PassengerField>

                <PassengerField label="Mobile Number" required>
                  <input type="tel" className={`${inputClass} ${errors.contactMobile ? "border-[#e36b75]" : ""}`} value={contactMobile} onChange={(e) => setContactMobile(e.target.value)} placeholder="Mobile number" />
                </PassengerField>
              </div>
            </div>

            <label className="mt-6 flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} className="mt-0.5 h-4 w-4 accent-[#356ae6]" />
              <span className="text-[11px] leading-5 text-[#667487]">
                I confirm that the passenger information is correct and matches the travel document.
              </span>
            </label>
            {errors.confirmed && <p className="mt-2 text-[10px] text-[#d65d68]">Please confirm the passenger information before continuing.</p>}

            <div className="mt-7 pt-5 border-t border-[#edf1f5] flex flex-col sm:flex-row gap-3 sm:justify-between">
              <button onClick={onBack} type="button" className="rounded-xl border border-[#dfe6ee] bg-white hover:bg-[#f7f9fc] text-[#657388] text-[11px] font-bold px-5 py-3 transition inline-flex items-center justify-center gap-2">
                <FiArrowLeft size={14} /> Back to flight
              </button>
              <button onClick={handleContinue} type="button" className="rounded-xl bg-[#102a43] hover:bg-[#183b5d] text-white text-[12px] font-bold px-7 py-3.5 shadow-[0_10px_24px_rgba(16,42,67,0.14)] transition inline-flex items-center justify-center gap-2">
                Continue <FiCheck size={14} />
              </button>
            </div>
          </div>

          <aside className="bg-[#fbfcfe] border-t xl:border-t-0 xl:border-l border-[#edf1f5] p-5 sm:p-6">
            <div className="rounded-[20px] bg-white border border-[#e5ebf2] p-5 sticky top-5">
              <div className="flex items-center gap-3">
                <AirlineLogo flight={flight} />
                <div className="min-w-0">
                  <p className="text-[13px] font-bold text-[#263445] truncate">{getFlightValue(flight, "airline", "Airline_Name") || "Airline"}</p>
                  <p className="text-[10px] text-[#929eac] mt-1">{getFlightValue(flight, "flightNo", "flightNumber", "Flight_Numbers", "airlineCode")}</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                <div>
                  <p className="text-[9px] text-[#9aa5b3]">Departure</p>
                  <p className="text-[19px] font-bold text-[#263445] mt-1">{getFlightValue(flight, "depTime", "departureTime") || "--"}</p>
                  <p className="text-[11px] font-semibold text-[#617087]">{getFlightValue(flight, "depCode", "origin") || "---"}</p>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[9px] text-[#9aa5b3]">{getFlightValue(flight, "duration") || "--"}</span>
                  <div className="flex items-center gap-1 w-14 my-2">
                    <span className="flex-1 border-t border-dashed border-[#cbd5e1]" />
                    <TbPlaneDeparture className="text-[#356ae6] -rotate-45" size={12} />
                    <span className="flex-1 border-t border-dashed border-[#cbd5e1]" />
                  </div>
                  <span className="text-[9px] font-bold text-[#4a9868]">{getFlightValue(flight, "stops") || "Flight"}</span>
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-[#9aa5b3]">Arrival</p>
                  <p className="text-[19px] font-bold text-[#263445] mt-1">{getFlightValue(flight, "arrTime", "arrivalTime") || "--"}</p>
                  <p className="text-[11px] font-semibold text-[#617087]">{getFlightValue(flight, "arrCode", "destination") || "---"}</p>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-[#edf1f5]">
                <div className="flex justify-between text-[10px] text-[#758294]">
                  <span>Passengers</span>
                  <span className="font-semibold text-[#526174]">{passengers.length}</span>
                </div>
                <div className="flex justify-between text-[10px] text-[#758294] mt-2">
                  <span>Fare</span>
                  <span className="font-semibold text-[#526174]">₹{Number(getFlightValue(flight, "price", "totalFare", "amount") || 0).toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="mt-5 rounded-xl bg-[#f4f8ff] border border-[#e2ebfb] p-3 flex gap-2">
                <FiShield className="text-[#356ae6] mt-0.5" size={14} />
                <p className="text-[9px] leading-4 text-[#708096]">Your passenger details will be sent to the booking flow after validation.</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default FlightBooking;