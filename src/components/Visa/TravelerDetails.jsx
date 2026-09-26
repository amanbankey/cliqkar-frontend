import React, { useState } from "react";
import {
  X,
  Plane,
  ArrowLeft,
  User,
  UserPlus,
  Globe2,
  CalendarDays,
  MapPin,
  Users,
  VenusAndMars,
  FileText,
  CreditCard,
  BriefcaseBusiness,
  CheckCircle2,
  UploadCloud,
  ShieldCheck,
  Clock3,
  Ban,
  WalletCards,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const TravelerDetails = () => {
  const navigate = useNavigate();
  const [travelers, setTravelers] = useState([
    {
      id: Date.now(),
      firstName: "",
      lastName: "",
      passportNumber: "",
      nationality: "",
      passengerType: "Adult",
      sex: "",
      dateOfBirth: "",
      placeOfBirth: "",
      spouseName: "",
      motherName: "",
      fatherName: "",
      travelDate: "",
      panNumber: "",
      occupation: "",
      files: {
        travelerPhoto: null,
        passportFront: null,
        passportBack: null,
        panCard: null,
        hotelVoucher: null,
        ticketFiles: null,
      },
    },
  ]);

  const [insurance, setInsurance] = useState(false);

  const addTraveler = () => {
    const newTraveler = {
      id: Date.now() + Math.random(),
      firstName: "",
      lastName: "",
      passportNumber: "",
      nationality: "",
      passengerType: "Adult",
      sex: "",
      dateOfBirth: "",
      placeOfBirth: "",
      spouseName: "",
      motherName: "",
      fatherName: "",
      travelDate: "",
      panNumber: "",
      occupation: "",
      files: {
        travelerPhoto: null,
        passportFront: null,
        passportBack: null,
        panCard: null,
        hotelVoucher: null,
        ticketFiles: null,
      },
    };

    setTravelers((prev) => [...prev, newTraveler]);
  };

  const removeTraveler = (id) => {
    if (travelers.length === 1) return;
    setTravelers((prev) => prev.filter((traveler) => traveler.id !== id));
  };

  const updateTraveler = (id, field, value) => {
    setTravelers((prev) =>
      prev.map((traveler) =>
        traveler.id === id ? { ...traveler, [field]: value } : traveler
      )
    );
  };

  const updateFile = (id, field, file) => {
    if (!file) return;
    setTravelers((prev) =>
      prev.map((traveler) =>
        traveler.id === id
          ? { ...traveler, files: { ...traveler.files, [field]: file } }
          : traveler
      )
    );
  };

  const removeFile = (id, field) => {
    setTravelers((prev) =>
      prev.map((traveler) =>
        traveler.id === id
          ? { ...traveler, files: { ...traveler.files, [field]: null } }
          : traveler
      )
    );
  };

  const visaFeePerTraveler = 7650;
  const insurancePerTraveler = 19;

  const visaTotal = travelers.length * visaFeePerTraveler;
  const insuranceTotal = insurance ? travelers.length * insurancePerTraveler : 0;
  const totalAmount = visaTotal + insuranceTotal;

  const handleSave = () => {
    console.log("Travelers:", travelers);
    console.log("Insurance:", insurance);
    console.log("Total:", totalAmount);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className=" z-20 border-b border-slate-200 bg-white/95 backdrop-blur-xl ">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8 lg:py-5">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-all hover:border-slate-900 hover:bg-slate-900 hover:text-white sm:h-10 sm:w-10"
            >
              <ArrowLeft size={18} />
            </button>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-lg sm:h-11 sm:w-11">
              <Plane size={20} className="rotate-[25deg]" />
            </div>

            <div>
              <h1 className="text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl lg:text-2xl">
                Traveler Details
              </h1>
              <p className="text-[10px] text-slate-500 sm:text-xs">
                Complete passenger information for your visa application
              </p>
            </div>
          </div>

          {/* <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all hover:bg-slate-900 hover:text-white sm:h-10 sm:w-10"
          >
            <X size={18} />
          </button> */}
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-2 sm:px-6 lg:px-8 ">
        <div className="space-y-6">
          {travelers.map((traveler, index) => (
            <TravelerCard
              key={traveler.id}
              traveler={traveler}
              index={index}
              updateTraveler={updateTraveler}
              updateFile={updateFile}
              removeFile={removeFile}
              removeTraveler={removeTraveler}
              totalTravelers={travelers.length}
            />
          ))}
        </div>

        <div className="my-4 flex justify-end">
          <button
            type="button"
            onClick={addTraveler}
            className="group flex items-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-white px-5 py-3 text-sm font-extrabold text-slate-900 shadow-sm transition-all duration-300 hover:border-slate-900 hover:bg-slate-900 hover:text-white hover:shadow-xl"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-900 transition-all group-hover:bg-white">
              <UserPlus size={17} />
            </span>
            Add Another Traveler
          </button>
        </div>

        {/* <div className="my-2 h-px bg-slate-200" /> */}

        <VisaInformation />

        <div className="mt-5">
          <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-900">
            <input
              type="checkbox"
              checked={insurance}
              onChange={(e) => setInsurance(e.target.checked)}
              className="h-4 w-4 cursor-pointer accent-slate-900"
            />
            I want to buy insurance
          </label>
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-xl font-extrabold text-slate-900">Price Details</h3>

            {insurance && (
              <div className="mt-5 flex items-center justify-between text-sm font-bold text-slate-900">
                <span>Insurance Fees</span>
                <span>
                  {travelers.length} X 19 = ₹{insuranceTotal}
                </span>
              </div>
            )}

            <div className="mt-4 flex items-center justify-between text-sm font-bold text-slate-900">
              <span>Visa fees Adult</span>
              <span>
                {travelers.length} X 7650 = ₹{visaTotal}
              </span>
            </div>

            <div className="my-5 h-px bg-slate-200" />

            <div className="flex items-center justify-between text-base font-extrabold text-slate-900">
              <span>Total Amount</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>

          <div className="border-t border-slate-200 px-4 py-5 sm:px-6">
            <p className="mb-3 text-sm font-semibold text-slate-900">
              Choose Payment Method
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border-2 border-slate-900 bg-white px-5 text-sm font-bold text-slate-900 transition-all hover:bg-slate-900 hover:text-white sm:w-[220px]"
              >
                <Plane size={19} className="rotate-[-25deg]" />
                Online
              </button>

              <button
                type="button"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-slate-100 px-5 text-sm font-bold text-slate-900 transition-all hover:border-slate-900 hover:bg-white sm:w-[220px]"
              >
                <WalletCards size={19} />
                Wallet
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className=" z-30 border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl flex-col gap-3 px-4 py-2 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <p className="text-xs font-extrabold text-slate-900">
              {travelers.length} Traveler{travelers.length > 1 ? "s" : ""}
            </p>
            <p className="text-[10px] text-slate-500">
              Review all traveler information before continuing.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs font-bold text-slate-700 transition-all hover:border-slate-900 hover:bg-slate-50"
            >
              Back
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-slate-900/20 transition-all hover:-translate-y-0.5 hover:bg-slate-800"
            >
              <CheckCircle2 size={16} />
              Save Travelers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TravelerCard = ({
  traveler,
  index,
  updateTraveler,
  updateFile,
  removeFile,
  removeTraveler,
}) => {
  return (
    <div className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-[0_12px_35px_rgba(15,23,42,0.07)] sm:rounded-[26px] sm:p-5 lg:p-6">
      <div className=" flex items-center justify-between  border-slate-100 pb-1">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-xs font-extrabold text-white">
            {index + 1}
          </div>

          <div>
            <h3 className="text-sm font-extrabold text-slate-900">
              Traveler {index + 1}
            </h3>
            <p className="text-[10px] text-slate-500">
              Passenger details & documents
            </p>
          </div>
        </div>

        {index > 0 && (
          <button
            type="button"
            onClick={() => removeTraveler(traveler.id)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-500 transition-all duration-300 hover:bg-red-500 hover:text-white"
          >
            <X size={16} />
          </button>
        )}
      </div>

        

      <h4 className="text-sm font-extrabold text-slate-900">Required Documents</h4>
      <p className="mt-1 text-[10px] text-slate-500">
        Upload clear and readable documents.
      </p>
      
          <div className="my-2  grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
         <UploadBox
          label="Traveler's Photo"
          required
          file={traveler.files.travelerPhoto}
          onFile={(file) => updateFile(traveler.id, "travelerPhoto", file)}
          onRemove={() => removeFile(traveler.id, "travelerPhoto")}
        />
        <UploadBox
          label="Front Passport Image"
          required
          file={traveler.files.passportFront}
          onFile={(file) => updateFile(traveler.id, "passportFront", file)}
          onRemove={() => removeFile(traveler.id, "passportFront")}
        />

        <UploadBox
          label="Back Passport Image"
          required
          file={traveler.files.passportBack}
          onFile={(file) => updateFile(traveler.id, "passportBack", file)}
          onRemove={() => removeFile(traveler.id, "passportBack")}
        />
          </div>

    <div className="my-1 h-px" />

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
        <InputField
          label="Traveler First Name"
          required
          icon={<User size={16} />}
          placeholder="Enter first name"
          value={traveler.firstName}
          onChange={(e) => updateTraveler(traveler.id, "firstName", e.target.value)}
        />

        <InputField
          label="Last Name"
          icon={<User size={16} />}
          placeholder="Enter last name"
          value={traveler.lastName}
          onChange={(e) => updateTraveler(traveler.id, "lastName", e.target.value)}
        />

        <InputField
          label="Passport Number"
          required
          icon={<FileText size={16} />}
          placeholder="A1234567"
          value={traveler.passportNumber}
          onChange={(e) => updateTraveler(traveler.id, "passportNumber", e.target.value)}
        />

        <SelectField
          label="Nationality"
          required
          icon={<Globe2 size={16} />}
          placeholder="Nationality"
          value={traveler.nationality}
          onChange={(e) => updateTraveler(traveler.id, "nationality", e.target.value)}
          options={[
            "Indian",
            "United Arab Emirates",
            "United States",
            "United Kingdom",
            "Canada",
            "Australia",
            "Other",
          ]}
        />

        <SelectField
          label="Passenger Type"
          required
          icon={<User size={16} />}
          value={traveler.passengerType}
          onChange={(e) => updateTraveler(traveler.id, "passengerType", e.target.value)}
          options={["Adult", "Child", "Infant"]}
        />

        <SelectField
          label="Sex"
          required
          icon={<VenusAndMars size={16} />}
          placeholder="Select Gender"
          value={traveler.sex}
          onChange={(e) => updateTraveler(traveler.id, "sex", e.target.value)}
          options={["Male", "Female", "Other"]}
        />

        <InputField
          label="Date of Birth"
          required
          type="date"
          icon={<CalendarDays size={16} />}
          value={traveler.dateOfBirth}
          onChange={(e) => updateTraveler(traveler.id, "dateOfBirth", e.target.value)}
        />

        <InputField
          label="Place of Birth"
          required
          icon={<MapPin size={16} />}
          placeholder="Enter Place of Birth"
          value={traveler.placeOfBirth}
          onChange={(e) => updateTraveler(traveler.id, "placeOfBirth", e.target.value)}
        />

        <InputField
          label="Spouse Name"
          icon={<Users size={16} />}
          placeholder="Enter Spouse Name"
          value={traveler.spouseName}
          onChange={(e) => updateTraveler(traveler.id, "spouseName", e.target.value)}
        />

        <InputField
          label="Mother Name"
          icon={<User size={16} />}
          placeholder="Enter Mother Name"
          value={traveler.motherName}
          onChange={(e) => updateTraveler(traveler.id, "motherName", e.target.value)}
        />

        <InputField
          label="Father Name"
          required
          icon={<User size={16} />}
          placeholder="Enter Father Name"
          value={traveler.fatherName}
          onChange={(e) => updateTraveler(traveler.id, "fatherName", e.target.value)}
        />

        <InputField
          label="Travel Date"
          type="date"
          icon={<CalendarDays size={16} />}
          value={traveler.travelDate}
          onChange={(e) => updateTraveler(traveler.id, "travelDate", e.target.value)}
        />
      </div>

      


      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <UploadBox
          label="Traveler's PAN Card"
          required
          file={traveler.files.panCard}
          onFile={(file) => updateFile(traveler.id, "panCard", file)}
          onRemove={() => removeFile(traveler.id, "panCard")}
        />

        <UploadBox
          label="Hotel Voucher"
          required
          file={traveler.files.hotelVoucher}
          onFile={(file) => updateFile(traveler.id, "hotelVoucher", file)}
          onRemove={() => removeFile(traveler.id, "hotelVoucher")}
        />

        <UploadBox
          label="Ticket Voucher / Additional Files"
          required
          file={traveler.files.ticketFiles}
          onFile={(file) => updateFile(traveler.id, "ticketFiles", file)}
          onRemove={() => removeFile(traveler.id, "ticketFiles")}
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <InputField
          label="India PAN Card Number"
          required
          icon={<CreditCard size={16} />}
          placeholder="ABCDE1234F"
          value={traveler.panNumber}
          onChange={(e) =>
            updateTraveler(traveler.id, "panNumber", e.target.value.toUpperCase())
          }
        />

        <SelectField
          label="What is the traveler's occupation?"
          icon={<BriefcaseBusiness size={16} />}
          placeholder="Select an item"
          value={traveler.occupation}
          onChange={(e) => updateTraveler(traveler.id, "occupation", e.target.value)}
          options={[
            "Business",
            "Salaried Employee",
            "Self Employed",
            "Student",
            "Government Employee",
            "Retired",
            "Homemaker",
            "Professional",
            "Other",
          ]}
        />
      </div>
    </div>
  );
};

const VisaInformation = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <h3 className="text-xl font-extrabold text-slate-900">Visa Information</h3>

      <p className="mt-1 text-sm font-medium text-slate-900">
        Dubai Visa 30 Days Single Entry
      </p>

      <p className="mt-1 text-sm text-slate-900">
        Travel city: India - United Arab Emirates
      </p>

      <div className="mt-7">
        <h4 className="text-lg font-extrabold text-slate-900">
          Expected Visa Approval
        </h4>

        <div className="mt-2 flex items-center gap-2 text-sm font-medium text-slate-900">
          <CalendarDays size={17} />
          <span>2-5 Business Days , if submitted now!</span>
        </div>
      </div>

      <div className="mt-7">
        <h4 className="text-lg font-extrabold text-slate-900">Know Before You Pay</h4>

        <div className="mt-4 space-y-4">
          <InfoPoint
            icon={<ShieldCheck size={17} />}
            title="Auto-validation upon submission"
            description="performs automated validation after submission. We will let you know if there are any problems with the application."
            type="green"
          />

          <InfoPoint
            icon={<Clock3 size={17} />}
            title="Visa processed within 30 seconds"
            description="automatically processes your visa."
            type="green"
          />

          <InfoPoint
            icon={<Ban size={17} />}
            title="Non-refundable after you pay"
            description="If canceled after payment, you will not be refunded."
            type="orange"
          />
        </div>
      </div>
    </div>
  );
};

const InfoPoint = ({ icon, title, description, type }) => {
  return (
    <div className="flex items-start gap-3">
      <div
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
          type === "orange"
            ? "border-slate-900 text-slate-900"
            : "border-emerald-500 text-emerald-600"
        }`}
      >
        {icon}
      </div>

      <div>
        <p className="text-xs font-bold text-slate-900 sm:text-sm">{title}</p>
        <p className="mt-0.5 text-[11px] leading-5 text-slate-600 sm:text-xs">
          .. {description}
        </p>
      </div>
    </div>
  );
};

const InputField = ({
  label,
  required,
  icon,
  type = "text",
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-slate-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <div className="group relative">
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-slate-900">
          {icon}
        </div>

        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="h-[46px] w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400 transition-all duration-200 hover:border-slate-300 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"
        />
      </div>
    </div>
  );
};

const SelectField = ({
  label,
  required,
  icon,
  value,
  onChange,
  options,
  placeholder = "Select an item",
}) => {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-slate-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <div className="group relative">
        <div className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-slate-400">
          {icon}
        </div>

        <select
          value={value}
          onChange={onChange}
          className="h-[46px] w-full appearance-none rounded-xl border border-slate-200 bg-white pl-10 pr-10 text-sm font-medium text-slate-900 outline-none transition-all duration-200 hover:border-slate-300 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"
        >
          {!value && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}

          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const UploadBox = ({ label, required, file, onFile, onRemove }) => {
  const inputId = `upload-${label.replace(/\s/g, "-").toLowerCase()}`;

  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-slate-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <input
        id={inputId}
        type="file"
        accept="image/*,.pdf"
        className="hidden"
        onChange={(e) => onFile(e.target.files?.[0])}
      />

      <label
        htmlFor={inputId}
        className="group flex h-[60px] w-full max-w-[310px] cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-3 transition-all duration-300 hover:border-slate-900 hover:bg-slate-100"
      >
        {!file ? (
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white transition-transform group-hover:-translate-y-0.5">
              <UploadCloud size={17} />
            </div>

            <div>
              <p className="text-xs font-bold text-slate-800">Drag & Drop</p>
              <p className="text-[9px] text-slate-500">or click to browse</p>
              <p className="text-[8px] text-slate-400">JPG, PNG or PDF</p>
            </div>
          </div>
        ) : (
          <div className="flex w-full items-center gap-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white">
              <FileText size={16} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-[10px] font-bold text-slate-900">
                {file.name}
              </p>
              <p className="text-[8px] text-slate-500">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onRemove();
              }}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500 transition-all hover:bg-red-500 hover:text-white"
            >
              <X size={13} />
            </button>
          </div>
        )}
      </label>
    </div>
  );
};

export default TravelerDetails;