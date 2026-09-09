import { useState } from "react";
import {
  User,
  Mail,
  Users,
  Lock,
  Globe,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  Phone,
  ChevronDown,
} from "lucide-react";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [signUpForm, setSignUpForm] = useState({
    firstName: "",
    countryCode: "+91 (IN)",
    phoneNumber: "",
    email: "",
    gender: "",
    password: "",
    confirmPassword: "",
    country: "",
  });

  const handleChange = (field, value) => {
    setSignUpForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signUpForm),
      });
      const data = await response.json();
      console.log("signup response", data);
    } catch (error) {
      console.log("signup error", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#eef1f8] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl shadow-blue-950/15 border border-blue-100 p-6 sm:p-10">
        <span className="inline-flex items-center gap-2 bg-orange-50 border border-slate-200 bg-slate-8000 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
          PRIVATE MEMBER ACCESS
        </span>

        <h1 className="text-blue-950 text-2xl sm:text-3xl font-extrabold mb-2">
          Create your account
        </h1>
        <p className="text-slate-500 text-sm mb-8">
          Join Cliqkar to access bespoke luxury travel arrangements
          worldwide.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="text-blue-950 text-sm font-semibold mb-1.5 block">
                Full Name <span className="text-slate-800">*</span>
              </label>
              <div className="flex items-center gap-2.5 bg-[#eef1f8] border-[1.5px] border-slate-800 hover:border-slate-800 focus-within:border-slate-800   rounded-xl px-3.5 py-3 transition-all duration-200">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white">
                  <User size={16} />
                </span>
                <input
                  value={signUpForm.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  placeholder="First Name"
                  className="text-[15px] outline-none w-full bg-transparent text-blue-950 font-medium placeholder:text-slate-400 placeholder:font-normal"
                />
              </div>
            </div>

            <div>
              <label className="text-blue-950 text-sm font-semibold mb-1.5 block">
                Phone Number <span className="text-slate-800">*</span>
              </label>
              <div className="flex items-center gap-2.5 bg-[#eef1f8] border-[1.5px] border-slate-800 hover:border-slate-800 focus-within:border-slate-800   rounded-xl px-3.5 py-3 transition-all duration-200">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white">
                  <Phone size={16} />
                </span>
                <select
                  value={signUpForm.countryCode}
                  onChange={(e) => handleChange("countryCode", e.target.value)}
                  className="text-[15px] text-blue-950 font-medium outline-none bg-transparent shrink-0 appearance-none pr-1"
                >
                  <option>+91 (IN)</option>
                  <option>+1 (US)</option>
                  <option>+44 (UK)</option>
                  <option>+971 (AE)</option>
                </select>
                <span className="h-5 w-px bg-orange-200" />
                <input
                  value={signUpForm.phoneNumber}
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                  placeholder="10-digit Phone Number"
                  className="text-[15px] outline-none w-full bg-transparent text-blue-950 font-medium placeholder:text-slate-400 placeholder:font-normal"
                />
              </div>
            </div>

            <div>
              <label className="text-blue-950 text-sm font-semibold mb-1.5 block">
                Email Address <span className="text-slate-800">*</span>
              </label>
              <div className="flex items-center gap-2.5 bg-[#eef1f8] border-[1.5px] border-slate-800 hover:border-slate-800 focus-within:border-slate-800   rounded-xl px-3.5 py-3 transition-all duration-200">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white">
                  <Mail size={16} />
                </span>
                <input
                  type="email"
                  value={signUpForm.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="Email Address"
                  className="text-[15px] outline-none w-full bg-transparent text-blue-950 font-medium placeholder:text-slate-400 placeholder:font-normal"
                />
              </div>
            </div>

            <div>
              <label className="text-blue-950 text-sm font-semibold mb-1.5 block">
                Gender <span className="text-slate-800">*</span>
              </label>
              <div className="relative flex items-center gap-2.5 bg-[#eef1f8] border-[1.5px] border-slate-800 hover:border-slate-800 focus-within:border-slate-800   rounded-xl px-3.5 py-3 transition-all duration-200">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white">
                  <Users size={16} />
                </span>
                <select
                  value={signUpForm.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  className="text-[15px] outline-none w-full bg-transparent text-blue-950 font-medium appearance-none pr-6"
                >
                  <option value="">Select Gender</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
                <ChevronDown size={16} className="absolute right-3.5 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="text-blue-950 text-sm font-semibold mb-1.5 block">
                Password <span className="text-slate-800">*</span>
              </label>
              <div className="flex items-center gap-2.5 bg-[#eef1f8] border-[1.5px] border-slate-800 hover:border-slate-800 focus-within:border-slate-800   rounded-xl px-3.5 py-3 transition-all duration-200">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white">
                  <Lock size={16} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={signUpForm.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  placeholder="Password"
                  className="text-[15px] outline-none w-full bg-transparent text-blue-950 font-medium placeholder:text-slate-400 placeholder:font-normal"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="text-slate-400 hover:text-slate-800 shrink-0 transition-colors duration-150"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-blue-950 text-sm font-semibold mb-1.5 block">
                Confirm Password <span className="text-slate-800">*</span>
              </label>
              <div className="flex items-center gap-2.5 bg-[#eef1f8] border-[1.5px] border-slate-800 hover:border-slate-800 focus-within:border-slate-800   rounded-xl px-3.5 py-3 transition-all duration-200">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white">
                  <Lock size={16} />
                </span>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={signUpForm.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  placeholder="Confirm Password"
                  className="text-[15px] outline-none w-full bg-transparent text-blue-950 font-medium placeholder:text-slate-400 placeholder:font-normal"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="text-slate-400 hover:text-slate-800 shrink-0 transition-colors duration-150"
                >
                  {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-blue-950 text-sm font-semibold mb-1.5 block">
                Country <span className="text-slate-800">*</span>
              </label>
              <div className="relative flex items-center gap-2.5 bg-[#eef1f8] border-[1.5px] border-slate-800 hover:border-slate-800 focus-within:border-slate-800   rounded-xl px-3.5 py-3 transition-all duration-200">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white">
                  <Globe size={16} />
                </span>
                <select
                  value={signUpForm.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                  className="text-[15px] outline-none w-full bg-transparent text-blue-950 font-medium appearance-none pr-6"
                >
                  <option value="">Select Country</option>
                  <option value="IN">India</option>
                  <option value="US">United States</option>
                  <option value="AE">United Arab Emirates</option>
                  <option value="UK">United Kingdom</option>
                </select>
                <ChevronDown size={16} className="absolute right-3.5 text-slate-400" />
              </div>
            </div>

         
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-slate-800 hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-slate-600/30 hover:shadow-slate-600/50 text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-all duration-200 w-full sm:w-auto"
            >
              Submit <ArrowRight size={16} />
            </button>
            <span className="flex items-center gap-1.5 text-slate-400 text-xs">
              <Lock size={13} className="text-blue-800" /> 256-bit Encrypted
              Registration
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}