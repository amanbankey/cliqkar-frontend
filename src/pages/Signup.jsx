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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm p-6 sm:p-10">
        <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
          ★ PRIVATE MEMBER ACCESS
        </span>

        <h1 className="text-slate-900 text-2xl sm:text-3xl font-extrabold mb-2">
          Create your account
        </h1>
        <p className="text-slate-500 text-sm mb-8">
          Join Cliqkar to access bespoke luxury travel arrangements
          worldwide.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="text-slate-700 text-sm font-semibold mb-1.5 block">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3.5 py-3">
                <User className="text-slate-400 shrink-0" size={17} />
                <input
                  value={signUpForm.firstName}
                  onChange={(e) =>
                    handleChange("firstName", e.target.value)
                  }
                  placeholder="First Name"
                  className="text-sm outline-none w-full text-slate-900 placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-700 text-sm font-semibold mb-1.5 block">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3.5 py-3">
                <select
                  value={signUpForm.countryCode}
                  onChange={(e) =>
                    handleChange("countryCode", e.target.value)
                  }
                  className="text-sm text-slate-700 outline-none bg-transparent shrink-0"
                >
                  <option>+91 (IN)</option>
                  <option>+1 (US)</option>
                  <option>+44 (UK)</option>
                  <option>+971 (AE)</option>
                </select>
                <span className="h-5 w-px bg-slate-200" />
                <input
                  value={signUpForm.phoneNumber}
                  onChange={(e) =>
                    handleChange("phoneNumber", e.target.value)
                  }
                  placeholder="10-digit Phone Number"
                  className="text-sm outline-none w-full text-slate-900 placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-700 text-sm font-semibold mb-1.5 block">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3.5 py-3">
                <Mail className="text-slate-400 shrink-0" size={17} />
                <input
                  type="email"
                  value={signUpForm.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="Email Address"
                  className="text-sm outline-none w-full text-slate-900 placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-700 text-sm font-semibold mb-1.5 block">
                Gender <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3.5 py-3">
                <Users className="text-slate-400 shrink-0" size={17} />
                <select
                  value={signUpForm.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  className="text-sm outline-none w-full bg-transparent text-slate-900"
                >
                  <option value="">Select Gender</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-slate-700 text-sm font-semibold mb-1.5 block">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3.5 py-3">
                <Lock className="text-slate-400 shrink-0" size={17} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={signUpForm.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  placeholder="Password"
                  className="text-sm outline-none w-full text-slate-900 placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="text-slate-400 shrink-0"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-slate-700 text-sm font-semibold mb-1.5 block">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3.5 py-3">
                <Lock className="text-slate-400 shrink-0" size={17} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={signUpForm.confirmPassword}
                  onChange={(e) =>
                    handleChange("confirmPassword", e.target.value)
                  }
                  placeholder="Confirm Password"
                  className="text-sm outline-none w-full text-slate-900 placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="text-slate-400 shrink-0"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="text-slate-700 text-sm font-semibold mb-1.5 block">
                Country <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3.5 py-3">
                <Globe className="text-slate-400 shrink-0" size={17} />
                <select
                  value={signUpForm.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                  className="text-sm outline-none w-full bg-transparent text-slate-900"
                >
                  <option value="">Select Country</option>
                  <option value="IN">India</option>
                  <option value="US">United States</option>
                  <option value="AE">United Arab Emirates</option>
                  <option value="UK">United Kingdom</option>
                </select>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-lg p-4">
              <ShieldCheck className="text-blue-600 shrink-0 mt-0.5" size={18} />
              <div>
                <p className="text-slate-900 text-sm font-bold">
                  Concierge Vetting Protocol
                </p>
                <p className="text-slate-500 text-xs">
                  Credentials are verified under strict global banking
                  privacy standards.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-3 rounded-lg text-sm transition-colors w-full sm:w-auto"
            >
              Submit <ArrowRight size={16} />
            </button>
            <span className="flex items-center gap-1.5 text-slate-400 text-xs">
              <Lock size={13} /> 256-bit Encrypted Registration
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}