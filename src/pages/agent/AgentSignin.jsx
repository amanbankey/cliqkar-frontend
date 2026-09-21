import React, { useState } from "react";
import {
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  AlertCircle,
  CheckCircle2,
  BriefcaseBusiness,
  X,
  Plane,
  ShieldCheck,
  Users,
} from "lucide-react";

import { signinAgent } from "../../api/authApi";
import { useNavigate } from "react-router-dom";

export default function AgentSigninPage({ onClose }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setMessage({ type: "", text: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.identifier.trim() || !form.password) {
      setMessage({ type: "error", text: "Please enter email/mobile and password." });
      return;
    }

    try {
      setLoading(true);

      const data = await signinAgent({
        identifier: form.identifier.trim(),
        password: form.password,
      });

      if (data?.success === false) {
        setMessage({ type: "error", text: data?.message || "Invalid agent credentials." });
        return;
      }

      if (data?.token) localStorage.setItem("token", data.token);
      if (data?.user) localStorage.setItem("user", JSON.stringify(data.user));

      setMessage({ type: "success", text: data?.message || "Agent signed in successfully!" });

      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      setMessage({
        type: "error",
        text: error?.response?.data?.message || error?.message || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#edf2f9] px-4 py-8">
      <div className="pointer-events-none absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-blue-300/25 blur-[120px] animate-blob-a" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[450px] w-[450px] rounded-full bg-indigo-300/25 blur-[120px] animate-blob-b" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200/10 blur-[100px]" />

      <div className="agent-card-in relative w-full max-w-[950px] overflow-hidden rounded-[26px] bg-[#fcfdff] shadow-[0_25px_80px_rgba(15,23,42,0.16)] lg:flex">
        <div className="relative hidden min-h-[570px] w-[44%] overflow-hidden bg-gradient-to-br from-[#07182f] via-[#0b2850] to-[#0e3a6b] lg:block">
          <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "22px 22px" }} />

          <div className="pointer-events-none absolute -right-16 top-10 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl animate-blob-a" />
          <div className="pointer-events-none absolute -left-10 bottom-24 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl animate-blob-b" />

          <div className="absolute left-9 top-9 z-20">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-xl">
                <BriefcaseBusiness size={21} />
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-blue-200">Cliqkar</p>
                <p className="text-sm font-semibold text-white">Agent Portal</p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto mt-32 h-[190px] w-[300px]">
            <div className="absolute left-4 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-blue-300 shadow-[0_0_10px_3px_rgba(147,197,253,0.6)]" />
            <div className="absolute right-4 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_10px_3px_rgba(103,232,249,0.6)]" />
            <div className="absolute left-4 right-4 top-1/2 h-px -translate-y-1/2 border-t border-dashed border-white/25" />
            <div className="plane-fly absolute top-1/2 -translate-y-1/2 text-cyan-200">
              <Plane size={20} className="rotate-90 drop-shadow-[0_0_6px_rgba(103,232,249,0.7)]" />
            </div>

            <div className="floaty-1 absolute left-2 top-4 flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 backdrop-blur-sm">
              <Users size={12} className="text-cyan-200" />
              <span className="text-[10px] font-semibold text-white">50K+ Agents</span>
            </div>
            <div className="floaty-2 absolute bottom-2 right-0 flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 backdrop-blur-sm">
              <ShieldCheck size={12} className="text-emerald-300" />
              <span className="text-[10px] font-semibold text-white">Verified Payouts</span>
            </div>
          </div>

          <div className="absolute bottom-9 left-9 right-10 z-20">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-200">Partner With Us</p>
            <h2 className="text-[34px] font-bold leading-[1.08] text-white">
              Manage your travel
              <span className="block bg-gradient-to-r from-blue-200 to-cyan-100 bg-clip-text text-transparent">
                business smarter.
              </span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-blue-100/80">
              Sign in to access your Cliqkar agent account and manage your travel services.
            </p>
          </div>
        </div>

        <div className="relative flex flex-1 items-center px-6 py-9 sm:px-10 lg:px-12">
          <button
            type="button"
            onClick={() => (onClose ? onClose() : navigate("/"))}
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-[#dce7f5] bg-white text-[#315789] shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-md"
          >
            <X size={16} />
          </button>

          <div className="relative z-10 mx-auto w-full max-w-[440px]">
            <div className="field-in mb-5 inline-flex items-center gap-2 rounded-full border border-[#3b72bd]/15 bg-[#3b72bd]/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#3b72bd]">
              <BriefcaseBusiness size={13} />
              Agent Login
            </div>

            <h1 className="field-in field-in-1 text-[29px] font-bold tracking-tight text-[#17243a]">
              Welcome back
            </h1>

            <p className="field-in field-in-1 mt-1.5 text-[13px] leading-relaxed text-slate-500">
              Sign in to continue to your Cliqkar agent account.
            </p>

            {message.text && (
              <div
                className={`msg-in mt-5 flex items-start gap-2 rounded-xl border px-4 py-3 text-[12px] font-medium ${
                  message.type === "success"
                    ? "border-green-100 bg-green-50 text-green-600"
                    : "border-red-100 bg-red-50 text-red-600"
                }`}
              >
                {message.type === "success" ? <CheckCircle2 size={15} /> : <AlertCircle size={15} />}
                <span>{message.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
              <div className="field-in field-in-2">
                <label className="mb-1.5 block text-[11px] font-semibold text-[#526176]">
                  Email / Mobile Number
                  <span className="ml-1 text-[#3b72bd]">*</span>
                </label>

                <div className="flex h-[50px] items-center gap-3 rounded-[15px] border border-[#e0e7f0] bg-white px-3 shadow-[0_3px_10px_rgba(15,23,42,0.025)] transition-all duration-300 focus-within:border-[#5d88bd] focus-within:shadow-[0_0_0_4px_rgba(59,114,189,0.1)]">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border border-[#e0eaf5] bg-gradient-to-br from-[#f8fbff] to-[#eaf3fc] text-[#315f99]">
                    {form.identifier.includes("@") ? <Mail size={16} /> : <Phone size={16} />}
                  </span>
                  <input
                    type="text"
                    name="identifier"
                    value={form.identifier}
                    onChange={handleChange}
                    placeholder="Enter email or mobile number"
                    autoComplete="username"
                    className="w-full border-none bg-transparent text-[13px] font-medium text-[#253247] outline-none placeholder:font-normal placeholder:text-[#a0aec0]"
                  />
                </div>
              </div>

              <div className="field-in field-in-3">
                <label className="mb-1.5 block text-[11px] font-semibold text-[#526176]">
                  Password
                  <span className="ml-1 text-[#3b72bd]">*</span>
                </label>

                <div className="flex h-[50px] items-center gap-3 rounded-[15px] border border-[#e0e7f0] bg-white px-3 shadow-[0_3px_10px_rgba(15,23,42,0.025)] transition-all duration-300 focus-within:border-[#5d88bd] focus-within:shadow-[0_0_0_4px_rgba(59,114,189,0.1)]">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border border-[#e0eaf5] bg-gradient-to-br from-[#f8fbff] to-[#eaf3fc] text-[#315f99]">
                    <Lock size={16} />
                  </span>
                  <div className="relative flex min-w-0 flex-1">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Enter password"
                      autoComplete="current-password"
                      className="w-full border-none bg-transparent pr-9 text-[13px] font-medium text-[#253247] outline-none placeholder:font-normal placeholder:text-[#a0aec0]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-0 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="field-in field-in-4 shine-btn group relative flex h-[50px] w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-[#102a4c] via-[#173d6c] to-[#2b619f] text-sm font-bold text-white shadow-[0_12px_28px_rgba(23,61,108,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(23,61,108,0.32)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 size={17} className="animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={17} className="transition group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            <div className="field-in field-in-5 mt-6 border-t border-slate-100 pt-5 text-center">
              <p className="text-[12px] text-slate-400">Don't have an agent account?</p>
              <button
                type="button"
                onClick={() => navigate("/agent/signup")}
                className="mt-1 text-[13px] font-bold text-[#2457d6] hover:underline"
              >
                Create Agent Account
              </button>
            </div>

            <div className="field-in field-in-5 mt-6 flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <CheckCircle2 size={14} className="text-[#3b72bd]" />
              Your account information is protected securely.
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(18px) scale(0.985); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .agent-card-in { animation: cardIn 0.55s cubic-bezier(0.16,1,0.3,1) both; }

        @keyframes fieldIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .field-in { animation: fieldIn 0.5s ease both; }
        .field-in-1 { animation-delay: 0.05s; }
        .field-in-2 { animation-delay: 0.12s; }
        .field-in-3 { animation-delay: 0.18s; }
        .field-in-4 { animation-delay: 0.24s; }
        .field-in-5 { animation-delay: 0.3s; }

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

        @keyframes planeFly {
          0% { left: 4px; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: calc(100% - 24px); opacity: 0; }
        }
        .plane-fly { animation: planeFly 4s ease-in-out infinite; }

        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .floaty-1 { animation: floatY 3.4s ease-in-out infinite; }
        .floaty-2 { animation: floatY 3.8s ease-in-out infinite; animation-delay: 0.6s; }

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
        .shine-btn:hover::after {
          animation: shine 0.9s ease;
        }
        @keyframes shine {
          from { left: -75%; }
          to { left: 130%; }
        }
      `}</style>
    </div>
  );
}