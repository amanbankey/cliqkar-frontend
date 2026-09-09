import { useState } from "react";
import {
  X,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Cloud,
  Plane,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function SignInPage({ onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
   const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
    rememberDevice: false,
  });

  const handleChange = (field, value) => {
    setSignInForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signInForm),
      });
      const data = await response.json();
      console.log("signin response", data);
    } catch (error) {
      console.log("signin error", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-[#eef1f8]">
      <div className="fixed inset-0  backdrop-blur-md z-0" />
      <div className="relative z-10 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl shadow-blue-950/15 grid grid-cols-1 lg:grid-cols-2 border border-blue-100">
        <div className="relative p-8 sm:p-10 hidden lg:flex flex-col justify-between bg-blue-950 overflow-hidden">
          <div className="absolute -right-14 -top-14 h-48 w-48 rounded-full bg-orange-500/20 blur-3xl" />
          <div className="absolute -bottom-16 left-6 h-36 w-36 rounded-full bg-blue-400/10 blur-3xl" />

          <div className="relative">
            <h2 className="text-white text-xl font-extrabold mb-1">
              Cliqkar
            </h2>

            <span className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-400/40 text-orange-300 text-[11px] font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
              SOVEREIGN TRAVELER PASS
            </span>

            <h3 className="text-white text-3xl font-extrabold leading-tight mb-4">
              The Intelligent Global Mobility Suite.
            </h3>
            <p className="text-blue-200 text-sm leading-relaxed mb-8">
              Access exclusive consolidator fares, real-time e-visas,
              verified Ok-To-Board desks, and private concierge liaisons
              across 120+ destinations.
            </p>

            <div className="space-y-3">
              {[
                { icon: Cloud, text: "Google Cloud Verified Infrastructure" },
                { icon: ShieldCheck, text: "256-Bit Bank-Grade Passport Vault" },
                { icon: Plane, text: "Automated Airline DCS Gate Sync" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-orange-400">
                    <item.icon size={15} />
                  </span>
                  <span className="text-blue-100 text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative p-6 sm:p-10 bg-white">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#eef1f8] hover:bg-blue-100 flex items-center justify-center text-blue-900 border border-blue-100 transition-colors duration-200"
          >
            <X size={16} />
          </button>

          <p className="text-blue-900 text-xs font-bold tracking-wide mb-2">
            AUTHENTICATION CONSOLE
          </p>
          <h2 className="text-blue-950 text-2xl sm:text-3xl font-extrabold mb-6">
            Welcome to Cliqkar
          </h2>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="bg-slate-800 hover:-translate-y-0.5   hover:bg-white text-white hover:border-2 hover:text-slate-800  hover:border-slate-800 font-semibold text-sm py-3 rounded-lg transition-all duration-200">
              Sign In
            </button>
            <button onClick={() => navigate("/signup")} className="bg-white border-2 border-slate-800 hover:text-white hover:bg-slate-800 hover:border-slate-800 text-slate-800 font-semibold text-sm py-3 rounded-lg transition-colors duration-200">
              Create Account
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="flex-1 h-px bg-blue-100" />
            <span className="text-slate-400 text-[11px] font-semibold tracking-wide whitespace-nowrap">
              OR CONTINUE WITH EMAIL
            </span>
            <span className="flex-1 h-px bg-blue-100" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-blue-950 text-sm font-semibold mb-1.5 block">
                Work or Personal Email
              </label>
              <div className="flex items-center gap-2.5 bg-[#eef1f8] border-[1.5px] border-slate-800 hover:border-slate-800 focus-within:border-slate-800   rounded-xl px-3.5 py-3 transition-all duration-200">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-900 text-white">
                  <Mail size={16} />
                </span>
                <input
                  type="email"
                  value={signInForm.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="alexander.ross@aviation.io"
                  className="text-[15px] outline-none w-full bg-transparent bg-[#eef1f8] text-blue-950 font-medium placeholder:text-slate-400 placeholder:font-normal"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-blue-950 text-sm font-semibold">
                  Password
                </label>
                <a href="#" className="text-slate-800 text-xs font-semibold hover:text-slate-800">
                  Forgot Password?
                </a>
              </div>
              <div className="flex items-center gap-2.5 bg-[#eef1f8] border-[1.5px] border-slate-800 hover:border-slate-800 focus-within:border-slate-800   rounded-xl px-3.5 py-3 transition-all duration-200">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-900 text-white">
                  <Lock size={16} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={signInForm.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  placeholder="Enter your password"
                  className="text-[15px] outline-none w-full bg-transparent bg-[#eef1f8] text-blue-950 font-medium placeholder:text-slate-400 placeholder:font-normal"
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

            <label className="flex items-center gap-2.5 cursor-pointer">
              <span
                onClick={() => handleChange("rememberDevice", !signInForm.rememberDevice)}
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all duration-200 ${
                  signInForm.rememberDevice
                    ? "border-slate-800 bg-slate-800"
                    : "border-blue-200 bg-white hover:border-slate-800"
                }`}
              >
                {signInForm.rememberDevice && (
                  <span className="h-2 w-2 rounded-sm bg-white" />
                )}
              </span>
              <span className="text-slate-600 text-sm">
                Remember this device for 30 days
              </span>
            </label>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-slate-800 hover:shadow-slate-800 text-white font-bold py-3.5 rounded-xl text-sm transition-all duration-200"
            >
              Sign In to Cliqkar <ArrowRight size={16} />
            </button>
          </form>

          <p className="flex items-center justify-center gap-1.5 text-slate-400 text-xs mt-6">
            <ShieldCheck size={13} className="text-blue-800" />
            Protected by enterprise-grade aviation SSL &amp; biometric
            clearance encryption.
          </p>
        </div>
      </div>
    </div>
  );
}