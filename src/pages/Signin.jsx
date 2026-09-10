import { useState } from "react";

import {
  X,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Plane,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
export default function SignInPage({ onClose }) {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
    rememberDevice: false,
  });

  const handleChange = (field, value) => {
    setSignInForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signInForm),
      });

      const data = await response.json();

      console.log("signin response", data);
    } catch (error) {
      console.log("signin error", error);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#edf2f9]">
      {/* =====================================================
          BACKGROUND DECORATION
      ===================================================== */}

      <div className="pointer-events-none absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-blue-300/20 blur-[120px]" />

      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[450px] w-[450px] rounded-full bg-indigo-300/20 blur-[120px]" />

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div className="relative mx-auto flex min-h-screen max-w-[1500px] items-center justify-center px-4 py-5 sm:px-6 lg:px-10">
        <div className="relative flex w-full max-w-[1320px] overflow-hidden rounded-[30px] bg-white shadow-[0_25px_80px_rgba(15,23,42,0.16)]">
          
          {/* =====================================================
              LEFT SIGN IN FORM
          ===================================================== */}

          <div className="relative flex min-h-[700px] flex-1 items-center bg-[#fcfdff] px-6 py-8 sm:px-10 lg:px-12 xl:px-14">

            {/* BACKGROUND GLOW */}

            <div className="pointer-events-none absolute left-0 top-0 h-[320px] w-[320px] rounded-full bg-blue-100/50 blur-[110px]" />

            <div className="pointer-events-none absolute bottom-[-180px] right-[20%] h-[280px] w-[280px] rounded-full bg-indigo-100/30 blur-[100px]" />

            {/* CLOSE BUTTON */}

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="
                  absolute
                  right-7
                  top-7
                  z-30
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#dce7f5]
                  bg-white
                  text-[#315789]
                  shadow-sm
                  transition-all
                  duration-200
                  hover:scale-105
                  hover:bg-blue-50
                "
              >
                <X size={17} />
              </button>
            )}

            <div className="relative z-10 mx-auto w-full max-w-[580px]">

              {/* =====================================================
                  BADGE
              ===================================================== */}

              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#dce7f5] bg-white/80 px-3 py-1.5 shadow-sm backdrop-blur-md">

                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#173d6c] to-[#3269aa] text-white shadow-sm">
                  <ShieldCheck size={13} />
                </span>

                <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#315789]">
                  Private Member Access
                </span>

              </div>

              {/* =====================================================
                  TITLE
              ===================================================== */}

              <h1 className="text-[32px] font-bold tracking-tight text-[#17243a] sm:text-[38px]">
                Welcome back
              </h1>

              <p className="mt-2 max-w-[520px] text-[13px] leading-relaxed text-slate-500">
                Sign in to continue your journey and access your
                personalized travel experience.
              </p>

              {/* =====================================================
                  TABS
              ===================================================== */}

              <div className="mt-6 grid grid-cols-2 gap-3">

                <button
                  type="button"
                  className="
                    rounded-xl
                    bg-gradient-to-r
                    from-[#102a4c]
                    via-[#173d6c]
                    to-[#2b619f]
                    px-5
                    py-3
                    text-sm
                    font-bold
                    text-white
                    shadow-[0_10px_22px_rgba(23,61,108,0.18)]
                  "
                >
                  Sign In
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/signup")}
                  className="
                    rounded-xl
                    border
                    border-[#cbd9e8]
                    bg-white
                    px-5
                    py-3
                    text-sm
                    font-bold
                    text-[#315789]
                    transition-all
                    duration-200
                    hover:border-[#315789]
                    hover:bg-blue-50
                  "
                >
                  Create Account
                </button>

              </div>

              {/* =====================================================
                  DIVIDER
              ===================================================== */}

              <div className="my-6 flex items-center gap-3">

                <span className="h-px flex-1 bg-slate-100" />

                <span className="whitespace-nowrap text-[10px] font-bold tracking-[0.12em] text-slate-400">
                  OR CONTINUE WITH EMAIL
                </span>

                <span className="h-px flex-1 bg-slate-100" />

              </div>

              {/* =====================================================
                  FORM
              ===================================================== */}

              <form onSubmit={handleSubmit} className="space-y-4">

                {/* EMAIL */}

                <PremiumField
                  label="Email Address"
                  required
                  icon={<Mail size={16} />}
                >
                  <input
                    type="email"
                    value={signInForm.email}
                    onChange={(e) =>
                      handleChange("email", e.target.value)
                    }
                    placeholder="Enter your email"
                    className="premium-input"
                  />
                </PremiumField>

                {/* PASSWORD */}

                <div>

                  <div className="mb-1.5 flex items-center justify-between">

                    <label className="flex items-center gap-1 text-[11px] font-semibold tracking-[0.01em] text-[#526176]">
                      Password

                      <span className="text-[#3b72bd]">
                        *
                      </span>
                    </label>

                    <button
                      type="button"
                      className="
                        text-[11px]
                        font-semibold
                        text-[#315789]
                        transition-colors
                        hover:text-[#173d6c]
                      "
                    >
                      Forgot Password?
                    </button>

                  </div>

                  <div
                    className="
                      group
                      relative
                      flex
                      h-[56px]
                      items-center
                      gap-3
                      rounded-[16px]
                      border
                      border-[#e0e7f0]
                      bg-white
                      px-3
                      shadow-[0_3px_10px_rgba(15,23,42,0.025)]
                      transition-all
                      duration-300
                      hover:border-[#bfd0e4]
                      hover:bg-[#fdfefe]
                      hover:shadow-[0_8px_18px_rgba(37,85,154,0.05)]
                      focus-within:border-[#5d88bd]
                      focus-within:shadow-[0_0_0_4px_rgba(59,114,189,0.08)]
                    "
                  >

                    {/* ICON */}

                    <span
                      className="
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-[10px]
                        border
                        border-[#e0eaf5]
                        bg-gradient-to-br
                        from-[#f8fbff]
                        to-[#eaf3fc]
                        text-[#315f99]
                      "
                    >
                      <Lock size={16} />
                    </span>

                    {/* INPUT */}

                    <input
                      type={showPassword ? "text" : "password"}
                      value={signInForm.password}
                      onChange={(e) =>
                        handleChange("password", e.target.value)
                      }
                      placeholder="Enter your password"
                      className="premium-input pr-10"
                    />

                    {/* EYE */}

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => !prev)
                      }
                      className="premium-eye"
                    >
                      {showPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>

                  </div>

                </div>

                {/* REMEMBER DEVICE */}

                <label className="mt-1 flex cursor-pointer items-center gap-2.5">

                  <input
                    type="checkbox"
                    checked={signInForm.rememberDevice}
                    onChange={(e) =>
                      handleChange(
                        "rememberDevice",
                        e.target.checked
                      )
                    }
                    className="
                      h-4
                      w-4
                      cursor-pointer
                      rounded
                      border-slate-300
                      text-[#315789]
                      focus:ring-[#315789]
                    "
                  />

                  <span className="text-[12px] text-slate-500">
                    Remember this device for 30 days
                  </span>

                </label>

                {/* =====================================================
                    SUBMIT
                ===================================================== */}

                <button
                  type="submit"
                  className="
                    group
                    mt-3
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-3
                    rounded-xl
                    bg-gradient-to-r
                    from-[#102a4c]
                    via-[#173d6c]
                    to-[#2b619f]
                    px-7
                    py-3.5
                    text-sm
                    font-bold
                    text-white
                    shadow-[0_12px_28px_rgba(23,61,108,0.22)]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-[0_20px_35px_rgba(23,61,108,0.30)]
                  "
                >
                  Sign In to Cliqkar

                  <ArrowRight
                    size={16}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />

                </button>

              </form>

              {/* =====================================================
                  FOOTER
              ===================================================== */}

              <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-4 text-[11px] text-slate-400">

                <CheckCircle2
                  size={14}
                  className="text-[#3b72bd]"
                />

                Your travel information is protected securely.

              </div>

            </div>

          </div>


          {/* =====================================================
              RIGHT IMAGE SECTION
          ===================================================== */}

          <div className="relative hidden min-h-[700px] w-[46%] overflow-hidden lg:block">

            {/* BACKGROUND IMAGE */}

            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('/cloud.jpeg')",
              }}
            />

            {/* DARK OVERLAY */}

            <div className="absolute inset-0 bg-gradient-to-bl from-[#07182f]/50 via-[#0b2850]/30 to-[#07101f]/60" />


            {/* =====================================================
                BLUE CURVE - OPPOSITE SIDE
                LEFT SIDE OF IMAGE
            ===================================================== */}

            <div
              className="
                pointer-events-none
                absolute
                -left-[-410px]
                
                top-[-180px]
                z-10
                h-[1080px]
                w-[610px]
                rounded-[50%]
                bg-gradient-to-b
                from-[#4f7df3]
                via-[#2457d6]
                to-[#173fba]
                opacity-95
              "
            />


            {/* =====================================================
                WHITE CURVE - OPPOSITE SIDE

                Blue aur white overlap kar rahe hain
                isliye beech mein white gap nahi aayega.
            ===================================================== */}

            <div
              className="
                pointer-events-none
                absolute
                left-[-435px]
                top-[-200px]
                z-20
                h-[1120px]
                w-[620px]
                rounded-[50%]
                bg-[#fcfdff]
              "
            />


            {/* =====================================================
                LOGO
            ===================================================== */}

            <div className="absolute right-9 top-9 z-30 flex items-center gap-3">

              <div>
                <img src={logo} className="object-contain w-36" />

                <p className="text-right text-[9px] font-bold uppercase tracking-[0.18em] text-blue-200">
                  Travel Beyond
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-900/30">
                <Plane
                  size={21}
                  className="-rotate-45"
                />
              </div>

            </div>


            {/* =====================================================
                FOREGROUND PLANE
            ===================================================== */}

            <img
              src="/planebg2.png"
              alt="Travel Plane"
              className="
                pointer-events-none
                absolute
                -left-[70px]
                top-[100px]
                z-30
                w-[600px]
                max-w-none
                object-contain
                drop-shadow-[0_28px_32px_rgba(0,0,0,0.32)]
              "
            />


            {/* =====================================================
                FLOATING TEXT
            ===================================================== */}

            <div className="absolute bottom-9 right-9 left-16 z-30 text-right">

              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-xl">

                <Sparkles
                  size={13}
                  className="text-blue-200"
                />

                <span className="text-[11px] font-semibold text-white">
                  Travel without limits
                </span>

              </div>


              <h2 className="ml-auto max-w-md text-[38px] font-bold leading-[1.08] text-white xl:text-[46px]">

                Your journey

                <span className="block bg-gradient-to-l from-blue-200 to-cyan-100 bg-clip-text text-transparent">
                  continues here.
                </span>

              </h2>


              <p className="mt-3 ml-auto max-w-md text-[13px] leading-relaxed text-blue-100/80">
                Sign in and continue exploring a seamless
                travel experience designed around you.
              </p>

            </div>

          </div>


          {/* =====================================================
              MOBILE IMAGE
          ===================================================== */}

          <div className="relative h-[240px] overflow-hidden lg:hidden">

            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('/cloud.jpeg')",
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#07182f]/80 via-[#0b2850]/50 to-transparent" />

            <div className="absolute left-6 top-6 z-20 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">

                <Plane
                  size={20}
                  className="-rotate-45"
                />

              </div>

              <div>

                <p className="font-bold text-white">
                  cliqkar
                </p>

                <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-blue-200">
                  Travel Beyond
                </p>

              </div>

            </div>


            <div className="absolute bottom-7 left-6 right-6 z-20">

              <h2 className="text-3xl font-bold text-white">
                Welcome back to Cliqkar.
              </h2>

            </div>

          </div>

        </div>
      </div>


      {/* =====================================================
          CUSTOM CSS
      ===================================================== */}

      <style>{`

        .premium-input {
          width: 100%;
          min-width: 0;
          border: none;
          outline: none;
          background: transparent;
          color: #253247;
          font-size: 13px;
          font-weight: 500;
        }

        .premium-input::placeholder {
          color: #a0aec0;
          font-weight: 400;
        }


        .premium-eye {
          position: absolute;
          right: 11px;
          display: flex;
          height: 30px;
          width: 30px;
          align-items: center;
          justify-content: center;
          border-radius: 9px;
          color: #94a3b8;
          transition: all 0.2s ease;
        }

        .premium-eye:hover {
          background: #eff6ff;
          color: #2563eb;
        }

      `}</style>

    </div>
  );
}


/* =========================================================
    PREMIUM FORM FIELD
========================================================= */

function PremiumField({
  label,
  icon,
  children,
  required,
}) {
  return (
    <div>

      <label className="mb-1.5 flex items-center gap-1 text-[11px] font-semibold tracking-[0.01em] text-[#526176]">

        {label}

        {required && (
          <span className="text-[#3b72bd]">
            *
          </span>
        )}

      </label>


      <div
        className="
          group
          relative
          flex
          h-[56px]
          items-center
          gap-3
          rounded-[16px]
          border
          border-[#e0e7f0]
          bg-white
          px-3
          shadow-[0_3px_10px_rgba(15,23,42,0.025)]
          transition-all
          duration-300
          hover:border-[#bfd0e4]
          hover:bg-[#fdfefe]
          hover:shadow-[0_8px_18px_rgba(37,85,154,0.05)]
          focus-within:border-[#5d88bd]
          focus-within:shadow-[0_0_0_4px_rgba(59,114,189,0.08)]
        "
      >

        {/* ICON */}

        <span
          className="
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-[10px]
            border
            border-[#e0eaf5]
            bg-gradient-to-br
            from-[#f8fbff]
            to-[#eaf3fc]
            text-[#315f99]
            transition-all
            duration-300
            group-hover:scale-105
            group-focus-within:border-[#a9c5e3]
            group-focus-within:text-[#173d6c]
          "
        >
          {icon}
        </span>


        {/* FIELD */}

        <div className="flex min-w-0 flex-1 items-center">
          {children}
        </div>

      </div>

    </div>
  );
}