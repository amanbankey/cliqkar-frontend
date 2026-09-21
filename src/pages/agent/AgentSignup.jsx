import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Lock,
  MapPin,
  Globe,
  Building2,
  FileText,
  Upload,
  Check,
  ChevronDown,
  ChevronRight,
  Eye,
  EyeOff,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  BriefcaseBusiness,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { signupAgent } from "../../api/authApi";
import { useNavigate } from "react-router-dom";

const countries = [
  "India",
  "United States",
  "United Kingdom",
  "United Arab Emirates",
  "Canada",
  "Australia",
  "Singapore",
  "Germany",
];

const states = ["Madhya Pradesh", "Maharashtra", "Rajasthan", "Gujarat", "Delhi", "Uttar Pradesh", "Karnataka"];

const cities = ["Indore", "Bhopal", "Ujjain", "Mumbai", "Pune", "Jaipur", "Ahmedabad", "Delhi"];

const proofTypes = ["Aadhaar Card", "PAN Card", "Other"];

const steps = [
  { id: 1, title: "Personal Details", subtitle: "Who you are", icon: User },
  { id: 2, title: "Communication", subtitle: "Where you are", icon: MapPin },
  { id: 3, title: "Office Proof", subtitle: "Business address", icon: Building2 },
  { id: 4, title: "GST Details", subtitle: "Tax information", icon: FileText },
  { id: 5, title: "Security", subtitle: "Account login", icon: Lock },
];

const TOTAL_STEPS = steps.length;

export default function AgentSignupPage({ onClose }) {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState("forward");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [dropdown, setDropdown] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [touchedStep, setTouchedStep] = useState({});

  const [form, setForm] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    identityProofType: "",
    identityProof: null,
    address: "",
    country: "",
    state: "",
    city: "",
    officeProof: null,
    havingGST: false,
    gstDocument: null,
    gstName: "",
    companyName: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setMessage({ type: "", text: "" });
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: "error", text: "File size must be less than 5MB." });
      return;
    }

    setForm((prev) => ({ ...prev, [field]: file }));
    setMessage({ type: "", text: "" });
  };

  const handleSelect = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setDropdown("");
  };

  const handleGST = (value) => {
    setForm((prev) => ({
      ...prev,
      havingGST: value,
      gstDocument: value ? prev.gstDocument : null,
      gstName: value ? prev.gstName : "",
      companyName: value ? prev.companyName : "",
    }));
    setMessage({ type: "", text: "" });
  };

  /* =========================================================
     PER-STEP VALIDATION
  ========================================================= */

  function stepError(step) {
    if (step === 1) {
      if (!form.fullName.trim()) return "Full name is required.";
      if (!/^\d{10}$/.test(form.mobileNumber.trim())) return "Enter a valid 10-digit mobile number.";
      if (!form.email.trim()) return "Email is required.";
      if (!form.identityProofType) return "Select a proof type.";
      if (!form.identityProof) return "Upload your identity proof.";
    }
    if (step === 2) {
      if (!form.address.trim()) return "Address is required.";
      if (!form.country) return "Select a country.";
      if (!form.state) return "Select a state.";
      if (!form.city) return "Select a city.";
    }
    if (step === 3) {
      if (!form.officeProof) return "Upload your office proof.";
    }
    if (step === 4) {
      if (form.havingGST) {
        if (!form.gstDocument) return "Upload your GST document.";
        if (!form.gstName.trim()) return "Enter your GST name.";
        if (!form.companyName.trim()) return "Enter your company name.";
      }
    }
    if (step === 5) {
      if (!form.password) return "Create a password.";
      if (form.password.length < 6) return "Password must be at least 6 characters.";
      if (form.password !== form.confirmPassword) return "Passwords do not match.";
    }
    return "";
  }

  const isStepComplete = (step) => touchedStep[step] && !stepError(step);

  function goNext() {
    const error = stepError(currentStep);
    setTouchedStep((prev) => ({ ...prev, [currentStep]: true }));

    if (error) {
      setMessage({ type: "error", text: error });
      return;
    }

    setMessage({ type: "", text: "" });
    setDirection("forward");
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goBack() {
    setMessage({ type: "", text: "" });
    setDirection("backward");
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goToStep(step) {
    if (step >= currentStep || Object.keys(touchedStep).length >= step - 1) {
      setDirection(step > currentStep ? "forward" : "backward");
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (let s = 1; s <= TOTAL_STEPS; s++) {
      const error = stepError(s);
      if (error) {
        setTouchedStep((prev) => ({ ...prev, [s]: true }));
        setCurrentStep(s);
        setMessage({ type: "error", text: error });
        return;
      }
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("fullName", form.fullName.trim());
      formData.append("mobileNumber", form.mobileNumber.trim());
      formData.append("email", form.email.trim());
      formData.append("identityProofType", form.identityProofType);
      formData.append("identityProof", form.identityProof);
      formData.append("address", form.address.trim());
      formData.append("country", form.country);
      formData.append("state", form.state);
      formData.append("city", form.city);
      formData.append("officeProof", form.officeProof);
      formData.append("havingGST", form.havingGST);

      if (form.havingGST) {
        formData.append("gstDocument", form.gstDocument);
        formData.append("gstName", form.gstName.trim());
        formData.append("companyName", form.companyName.trim());
      }

      formData.append("password", form.password);
      formData.append("confirmPassword", form.confirmPassword);

      const data = await signupAgent(formData);

      if (data?.success === false) {
        setMessage({ type: "error", text: data?.message || "Unable to create agent account." });
        return;
      }

      if (data?.token) localStorage.setItem("token", data.token);
      if (data?.user) localStorage.setItem("user", JSON.stringify(data.user));

      setMessage({ type: "success", text: data?.message || "Agent account created successfully!" });

      setTimeout(() => navigate("/"), 1200);
    } catch (error) {
      setMessage({
        type: "error",
        text: error?.response?.data?.message || error?.message || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  const isSuccess = message.type === "success";

  return (
    <div className="min-h-screen bg-[#edf2f9] px-4 py-7 sm:px-6 lg:px-10">
      <div className="pointer-events-none fixed -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-blue-300/20 blur-[120px] animate-blob-a" />
      <div className="pointer-events-none fixed -bottom-40 -right-40 h-[420px] w-[420px] rounded-full bg-indigo-300/20 blur-[120px] animate-blob-b" />

      <div className="relative mx-auto max-w-[1100px]">
        <div className="section-in mb-6 flex items-start justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#3b72bd]/15 bg-[#3b72bd]/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#3b72bd]">
              <BriefcaseBusiness size={13} />
              Agent Registration
            </div>

            <h1 className="text-[28px] font-bold tracking-tight text-[#17243a] sm:text-[34px]">
              Create Agent Account
            </h1>

            <p className="mt-1.5 text-sm text-slate-500">
              Register as a Cliqkar travel agent and manage your business with ease.
            </p>
          </div>

          <button
            type="button"
            onClick={() => (onClose ? onClose() : navigate("/"))}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#dce7f5] bg-white text-[#315789] shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-md"
          >
            <X size={17} />
          </button>
        </div>

        {/* STEPPER */}

        <div className="section-in mb-6 rounded-[22px] border border-[#e0e7f0] bg-white px-4 py-5 shadow-[0_12px_35px_rgba(15,23,42,0.05)] sm:px-8">
          <div className="mx-auto flex max-w-3xl items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const completed = currentStep > step.id || isStepComplete(step.id);
              const active = currentStep === step.id;

              return (
                <React.Fragment key={step.id}>
                  <button
                    type="button"
                    onClick={() => goToStep(step.id)}
                    className="group flex flex-col items-center"
                  >
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl transition-all duration-300 ${
                        active
                          ? "scale-110 bg-gradient-to-br from-[#173d6c] to-[#2b619f] text-white shadow-lg shadow-blue-200"
                          : completed
                          ? "bg-[#2457d6] text-white"
                          : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                      }`}
                    >
                      {completed && !active ? <Check size={18} /> : <Icon size={18} />}
                    </div>

                    <p
                      className={`mt-2 hidden text-[10px] font-bold sm:block ${
                        active ? "text-[#2457d6]" : completed ? "text-[#2457d6]" : "text-slate-400"
                      }`}
                    >
                      {step.title}
                    </p>
                  </button>

                  {index !== steps.length - 1 && (
                    <div className="mx-1.5 h-[2px] flex-1 overflow-hidden rounded-full bg-slate-100 sm:mx-2">
                      <div
                        className={`h-full bg-gradient-to-r from-[#3b72bd] to-[#2457d6] transition-all duration-500 ${
                          currentStep > step.id ? "w-full" : "w-0"
                        }`}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {message.text && !isSuccess && (
          <div className="msg-in mb-5 flex items-start gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-[12px] font-medium text-red-600">
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            <span>{message.text}</span>
          </div>
        )}

        {isSuccess ? (
          <div className="section-in flex flex-col items-center justify-center rounded-[26px] border border-[#e0e7f0] bg-white px-6 py-20 text-center shadow-[0_12px_35px_rgba(15,23,42,0.05)]">
            <div className="relative">
              <div className="absolute -inset-5 rounded-full bg-emerald-400/10 blur-2xl" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
                <CheckCircle2 size={42} className="text-emerald-500" />
              </div>
            </div>
            <h2 className="mt-7 text-2xl font-black text-[#17243a]">Account created!</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">{message.text}</p>
            <p className="mt-2 text-xs text-slate-400">Redirecting you to Cliqkar...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_280px]">
              {/* STEP CONTENT */}

              <div key={currentStep} className={direction === "forward" ? "step-in-forward" : "step-in-backward"}>
                {currentStep === 1 && (
                  <Section icon={<User size={18} />} title="Personal Details" subtitle="Enter your personal and identity information.">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <InputField label="Full Name" required icon={<User size={16} />}>
                        <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Enter full name" className="agent-input" />
                      </InputField>

                      <InputField label="Mob. No" required icon={<Phone size={16} />}>
                        <input
                          type="tel"
                          name="mobileNumber"
                          value={form.mobileNumber}
                          onChange={handleChange}
                          placeholder="Enter 10-digit mobile number"
                          maxLength={10}
                          inputMode="numeric"
                          className="agent-input"
                        />
                      </InputField>

                      <InputField label="Email Id" required icon={<Mail size={16} />}>
                        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter email address" className="agent-input" />
                      </InputField>

                      <DropdownField
                        label="Proof Type"
                        required
                        icon={<FileText size={16} />}
                        value={form.identityProofType}
                        placeholder="Select proof type"
                        open={dropdown === "proof"}
                        onClick={() => setDropdown(dropdown === "proof" ? "" : "proof")}
                        options={proofTypes}
                        onSelect={(value) => handleSelect("identityProofType", value)}
                      />
                    </div>

                    <div className="mt-4">
                      <FileUpload label="Identity Proof" required file={form.identityProof} onChange={(e) => handleFileChange(e, "identityProof")} />
                    </div>
                  </Section>
                )}

                {currentStep === 2 && (
                  <Section icon={<MapPin size={18} />} title="Communication Details" subtitle="Enter your complete communication address.">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="md:col-span-2">
                        <InputField label="Address" required icon={<MapPin size={16} />}>
                          <textarea
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            placeholder="Enter complete address"
                            rows={3}
                            className="agent-input resize-none py-2"
                          />
                        </InputField>
                      </div>

                      <DropdownField
                        label="Country"
                        required
                        icon={<Globe size={16} />}
                        value={form.country}
                        placeholder="Select country"
                        open={dropdown === "country"}
                        onClick={() => setDropdown(dropdown === "country" ? "" : "country")}
                        options={countries}
                        onSelect={(value) => handleSelect("country", value)}
                      />

                      <DropdownField
                        label="State"
                        required
                        icon={<MapPin size={16} />}
                        value={form.state}
                        placeholder="Select state"
                        open={dropdown === "state"}
                        onClick={() => setDropdown(dropdown === "state" ? "" : "state")}
                        options={states}
                        onSelect={(value) => handleSelect("state", value)}
                      />

                      <DropdownField
                        label="City"
                        required
                        icon={<MapPin size={16} />}
                        value={form.city}
                        placeholder="Select city"
                        open={dropdown === "city"}
                        onClick={() => setDropdown(dropdown === "city" ? "" : "city")}
                        options={cities}
                        onSelect={(value) => handleSelect("city", value)}
                      />
                    </div>
                  </Section>
                )}

                {currentStep === 3 && (
                  <Section icon={<Building2 size={18} />} title="Office Proof" subtitle="Upload your office or business address proof.">
                    <FileUpload label="Office Proof" required file={form.officeProof} onChange={(e) => handleFileChange(e, "officeProof")} />
                  </Section>
                )}

                {currentStep === 4 && (
                  <Section icon={<FileText size={18} />} title="GST Details" subtitle="Provide GST information if your business has GST.">
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => handleGST(true)}
                        className={`flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold transition-all duration-300 ${
                          form.havingGST
                            ? "border-[#3b72bd] bg-blue-50 text-[#2457d6] shadow-[0_4px_14px_rgba(59,114,189,0.15)]"
                            : "border-slate-200 bg-white text-slate-500 hover:border-blue-200"
                        }`}
                      >
                        <span
                          className={`flex h-5 w-5 items-center justify-center rounded-md border transition-all duration-300 ${
                            form.havingGST ? "border-[#3b72bd] bg-[#3b72bd] text-white scale-100" : "border-slate-300 bg-white scale-95"
                          }`}
                        >
                          {form.havingGST && <Check size={13} />}
                        </span>
                        Having GST
                      </button>

                      <button
                        type="button"
                        onClick={() => handleGST(false)}
                        className={`flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold transition-all duration-300 ${
                          !form.havingGST
                            ? "border-[#3b72bd] bg-blue-50 text-[#2457d6] shadow-[0_4px_14px_rgba(59,114,189,0.15)]"
                            : "border-slate-200 bg-white text-slate-500 hover:border-blue-200"
                        }`}
                      >
                        <span
                          className={`flex h-5 w-5 items-center justify-center rounded-md border transition-all duration-300 ${
                            !form.havingGST ? "border-[#3b72bd] bg-[#3b72bd] text-white scale-100" : "border-slate-300 bg-white scale-95"
                          }`}
                        >
                          {!form.havingGST && <Check size={13} />}
                        </span>
                        No GST
                      </button>
                    </div>

                    <div
                      className={`grid overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                        form.havingGST ? "mt-5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="min-h-0">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <FileUpload label="GST Document" required file={form.gstDocument} onChange={(e) => handleFileChange(e, "gstDocument")} />
                          <InputField label="GST Name" required icon={<FileText size={16} />}>
                            <input name="gstName" value={form.gstName} onChange={handleChange} placeholder="Enter GST name" className="agent-input" />
                          </InputField>
                          <InputField label="Company Name" required icon={<Building2 size={16} />}>
                            <input name="companyName" value={form.companyName} onChange={handleChange} placeholder="Enter company name" className="agent-input" />
                          </InputField>
                        </div>
                      </div>
                    </div>
                  </Section>
                )}

                {currentStep === 5 && (
                  <Section icon={<Lock size={18} />} title="Account Security" subtitle="Create login credentials for your agent account.">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <InputField label="Password" required icon={<Lock size={16} />}>
                        <div className="relative w-full">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Create password"
                            className="agent-input pr-9"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-0 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </InputField>

                      <InputField label="Confirm Password" required icon={<Lock size={16} />}>
                        <div className="relative w-full">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm password"
                            className="agent-input pr-9"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-0 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                          >
                            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </InputField>
                    </div>

                    <div className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
                      <ShieldCheck size={18} className="mt-0.5 shrink-0 text-emerald-600" />
                      <p className="text-xs leading-relaxed text-emerald-700">
                        You're on the last step. Review your details on the left, then create your account.
                      </p>
                    </div>
                  </Section>
                )}

                {/* NAVIGATION */}

                <div className="mt-6 flex flex-col-reverse items-center justify-between gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={goBack}
                    disabled={currentStep === 1}
                    className={`flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition ${
                      currentStep === 1 ? "cursor-not-allowed text-slate-300" : "text-slate-600 hover:bg-white"
                    }`}
                  >
                    <ArrowLeft size={16} />
                    Back
                  </button>

                  {currentStep < TOTAL_STEPS ? (
                    <button
                      type="button"
                      onClick={goNext}
                      className="shine-btn group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#102a4c] via-[#173d6c] to-[#2b619f] px-7 py-3.5 text-sm font-bold text-white shadow-[0_12px_28px_rgba(23,61,108,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(23,61,108,0.32)] sm:w-auto"
                    >
                      Continue
                      <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading}
                      className="shine-btn group relative flex w-full min-w-[220px] items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-[#102a4c] via-[#173d6c] to-[#2b619f] px-7 py-3.5 text-sm font-bold text-white shadow-[0_12px_28px_rgba(23,61,108,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(23,61,108,0.32)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={17} className="animate-spin" />
                          Creating Account...
                        </>
                      ) : (
                        <>
                          Create Agent Account
                          <ArrowRight size={17} className="transition group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  )}
                </div>

                <p className="mt-5 text-center text-xs text-slate-400 sm:text-left">
                  Already have an agent account?
                  <button type="button" onClick={() => navigate("/agent/signin")} className="ml-1 font-bold text-[#2457d6] hover:underline">
                    Sign In
                  </button>
                </p>
              </div>

              {/* RIGHT SUMMARY */}

              <aside className="hidden lg:block">
                <div className="sticky top-6 space-y-5">
                  <div className="section-in overflow-hidden rounded-[24px] bg-[#0d1d35] p-6 text-white shadow-2xl">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300">Registration</p>
                        <h3 className="mt-2 text-lg font-bold">Your Progress</h3>
                      </div>
                      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
                        <Sparkles size={17} className="text-cyan-300" />
                      </span>
                    </div>

                    <div className="mt-5">
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Step {currentStep} of {TOTAL_STEPS}</span>
                        <span className="font-bold text-white">{Math.round((currentStep / TOTAL_STEPS) * 100)}%</span>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-400 to-cyan-300 transition-all duration-500"
                          style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="mt-5 space-y-2.5 border-t border-white/10 pt-5">
                      {steps.map((step) => (
                        <div key={step.id} className="flex items-center gap-2.5 text-xs">
                          <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                              currentStep > step.id
                                ? "bg-emerald-400 text-[#0d1d35]"
                                : currentStep === step.id
                                ? "bg-cyan-300 text-[#0d1d35]"
                                : "bg-white/10 text-slate-400"
                            }`}
                          >
                            {currentStep > step.id ? <Check size={11} /> : step.id}
                          </span>
                          <span className={currentStep >= step.id ? "text-white" : "text-slate-500"}>{step.title}</span>
                        </div>
                      ))}
                    </div>

                    {form.fullName && (
                      <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-3.5">
                        <p className="text-[10px] text-slate-400">Registering as</p>
                        <p className="mt-0.5 truncate text-sm font-bold text-white">{form.fullName}</p>
                        {form.email && <p className="truncate text-[11px] text-slate-400">{form.email}</p>}
                      </div>
                    )}
                  </div>

                  <div className="rounded-[20px] border border-blue-100 bg-blue-50/70 p-4">
                    <div className="flex gap-3">
                      <ShieldCheck size={17} className="mt-0.5 shrink-0 text-[#2457d6]" />
                      <p className="text-xs leading-relaxed text-slate-500">
                        Your documents and details are encrypted and only used for KYC verification.
                      </p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </form>
        )}
      </div>

      <style>{`
        .agent-input {
          width: 100%;
          min-width: 0;
          border: none;
          outline: none;
          background: transparent;
          color: #253247;
          font-size: 13px;
          font-weight: 500;
        }
        .agent-input::placeholder { color: #a0aec0; font-weight: 400; }

        @keyframes sectionIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .section-in { animation: sectionIn 0.55s cubic-bezier(0.16,1,0.3,1) both; }

        @keyframes stepInForward {
          from { opacity: 0; transform: translateX(24px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes stepInBackward {
          from { opacity: 0; transform: translateX(-24px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .step-in-forward { animation: stepInForward 0.4s cubic-bezier(0.16,1,0.3,1) both; }
        .step-in-backward { animation: stepInBackward 0.4s cubic-bezier(0.16,1,0.3,1) both; }

        @keyframes msgIn {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .msg-in { animation: msgIn 0.35s ease both; }

        @keyframes blobA {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -15px) scale(1.08); }
        }
        @keyframes blobB {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-18px, 18px) scale(1.06); }
        }
        .animate-blob-a { animation: blobA 9s ease-in-out infinite; }
        .animate-blob-b { animation: blobB 11s ease-in-out infinite; }

        .shine-btn::after {
          content: "";
          position: absolute;
          top: 0;
          left: -75%;
          width: 50%;
          height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.25), transparent);
          transform: skewX(-20deg);
        }
        .shine-btn:hover::after { animation: shine 0.9s ease; }
        @keyframes shine {
          from { left: -75%; }
          to { left: 130%; }
        }
      `}</style>
    </div>
  );
}

function Section({ icon, title, subtitle, children }) {
  return (
    <section className="rounded-[22px] border border-[#e0e7f0] bg-[#fcfdff] p-5 shadow-[0_12px_35px_rgba(15,23,42,0.05)] transition-shadow duration-300 hover:shadow-[0_16px_45px_rgba(15,23,42,0.08)] sm:p-7">
      <div className="mb-6 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#f8fbff] to-[#eaf3fc] text-[#315f99]">
          {icon}
        </div>
        <div>
          <h2 className="text-base font-bold text-[#17243a]">{title}</h2>
          <p className="mt-0.5 text-xs text-slate-400">{subtitle}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function InputField({ label, required, icon, children }) {
  return (
    <div>
      <label className="mb-1.5 flex items-center gap-1 text-[11px] font-semibold text-[#526176]">
        {label}
        {required && <span className="text-[#3b72bd]">*</span>}
      </label>
      <div className="group flex min-h-[48px] items-center gap-3 rounded-[15px] border border-[#e0e7f0] bg-white px-3 shadow-[0_3px_10px_rgba(15,23,42,0.025)] transition-all duration-300 focus-within:border-[#5d88bd] focus-within:shadow-[0_0_0_4px_rgba(59,114,189,0.1)]">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border border-[#e0eaf5] bg-gradient-to-br from-[#f8fbff] to-[#eaf3fc] text-[#315f99]">
          {icon}
        </span>
        <div className="flex min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}

function DropdownField({ label, required, icon, value, placeholder, open, onClick, options, onSelect }) {
  return (
    <div className="relative">
      <label className="mb-1.5 flex items-center gap-1 text-[11px] font-semibold text-[#526176]">
        {label}
        {required && <span className="text-[#3b72bd]">*</span>}
      </label>

      <button
        type="button"
        onClick={onClick}
        className="flex h-[48px] w-full items-center gap-3 rounded-[15px] border border-[#e0e7f0] bg-white px-3 text-left shadow-[0_3px_10px_rgba(15,23,42,0.025)] transition-all duration-300 hover:border-[#c3d6ec]"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border border-[#e0eaf5] bg-gradient-to-br from-[#f8fbff] to-[#eaf3fc] text-[#315f99]">
          {icon}
        </span>
        <span className={`flex-1 text-[13px] font-medium ${value ? "text-slate-600" : "text-slate-400"}`}>
          {value || placeholder}
        </span>
        <ChevronDown size={16} className={`text-slate-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      <div
        className={`absolute left-0 top-[75px] z-[100] w-full origin-top overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-[0_18px_45px_rgba(15,23,42,0.16)] transition-all duration-200 ${
          open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <div className="max-h-52 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(option)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm text-slate-600 transition hover:bg-blue-50 hover:text-[#2457d6]"
            >
              {option}
              {value === option && <Check size={15} className="text-[#3b72bd]" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function FileUpload({ label, required, file, onChange }) {
  return (
    <div>
      <label className="mb-1.5 flex items-center gap-1 text-[11px] font-semibold text-[#526176]">
        {label}
        {required && <span className="text-[#3b72bd]">*</span>}
      </label>

      <label className="flex min-h-[78px] cursor-pointer items-center gap-4 rounded-[15px] border border-dashed border-[#bfd0e4] bg-[#f9fbfe] px-4 transition-all duration-300 hover:border-[#5d88bd] hover:bg-blue-50/40 hover:shadow-[0_4px_16px_rgba(59,114,189,0.1)]">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#315f99] shadow-sm transition-transform duration-300">
          <Upload size={18} />
        </div>

        <div className="min-w-0 flex-1">
          {file ? (
            <>
              <p className="truncate text-sm font-semibold text-slate-700">{file.name}</p>
              <p className="mt-0.5 flex items-center gap-1 text-[11px] text-green-600">
                <CheckCircle2 size={12} /> Document selected successfully
              </p>
            </>
          ) : (
            <>
              <p className="text-sm font-semibold text-slate-600">Upload document</p>
              <p className="mt-0.5 text-[11px] text-slate-400">PDF, JPG, JPEG or PNG · Max 5MB</p>
            </>
          )}
        </div>

        <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={onChange} />
      </label>
    </div>
  );
}