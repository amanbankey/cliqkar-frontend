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

export default function SignInPage({ onClose }) {
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="min-h-screen bg-slate-900/60 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl bg-[#0a1628] rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2">
        <div className="relative p-8 sm:p-10 hidden lg:flex flex-col justify-between bg-gradient-to-br from-[#0d1f33] to-[#0a1628]">
          <div>
            <h2 className="text-white text-xl font-extrabold mb-1">
              Cliqkar
            </h2>
            <p className="text-amber-300 text-[11px] font-semibold tracking-wide mb-6">
              STITCHED WITH GOOGLE
            </p>

            <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-emerald-300 text-[11px] font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              SOVEREIGN TRAVELER PASS
            </span>

            <h3 className="text-white text-3xl font-extrabold leading-tight mb-4">
              The Intelligent Global Mobility Suite.
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
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
                  <item.icon className="text-emerald-400 shrink-0" size={16} />
                  <span className="text-slate-300 text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative p-6 sm:p-10 bg-[#0d1f33]">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 transition-colors"
          >
            <X size={16} />
          </button>

          <p className="text-amber-300 text-xs font-semibold tracking-wide mb-2">
            AUTHENTICATION CONSOLE
          </p>
          <h2 className="text-white text-2xl sm:text-3xl font-extrabold mb-6">
            Welcome to Cliqkar
          </h2>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-3 rounded-lg transition-colors">
              Sign In
            </button>
            <button className="bg-white/5 border border-white/10 text-slate-300 font-semibold text-sm py-3 rounded-lg">
              Create Account
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="flex-1 h-px bg-white/10" />
            <span className="text-slate-500 text-[11px] font-semibold tracking-wide whitespace-nowrap">
              OR CONTINUE WITH EMAIL
            </span>
            <span className="flex-1 h-px bg-white/10" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-white text-sm font-semibold mb-1.5 block">
                Work or Personal Email
              </label>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3.5 py-3">
                <Mail className="text-slate-400 shrink-0" size={17} />
                <input
                  type="email"
                  value={signInForm.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="alexander.ross@aviation.io"
                  className="text-sm outline-none w-full bg-transparent text-white placeholder:text-slate-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-white text-sm font-semibold">
                  Password
                </label>
                <a href="#" className="text-blue-400 text-xs font-semibold">
                  Forgot Password?
                </a>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3.5 py-3">
                <Lock className="text-slate-400 shrink-0" size={17} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={signInForm.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  placeholder="Enter your password"
                  className="text-sm outline-none w-full bg-transparent text-white placeholder:text-slate-500"
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

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={signInForm.rememberDevice}
                onChange={(e) =>
                  handleChange("rememberDevice", e.target.checked)
                }
                className="accent-blue-600 w-4 h-4"
              />
              <span className="text-slate-300 text-sm">
                Remember this device for 30 days
              </span>
            </label>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl text-sm transition-colors"
            >
              Sign In to Cliqkar <ArrowRight size={16} />
            </button>
          </form>

          <p className="flex items-center justify-center gap-1.5 text-slate-500 text-xs mt-6">
            <Lock size={12} />
            Protected by enterprise-grade aviation SSL &amp; biometric
            clearance encryption.
          </p>
        </div>
      </div>
    </div>
  );
}