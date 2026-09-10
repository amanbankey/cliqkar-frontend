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
  Plane,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import logo from "../assets/logo.png";
export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [signUpForm, setSignUpForm] = useState({
    firstName: "",
    countryCode: "+91",
    phoneNumber: "",
    email: "",
    gender: "",
    password: "",
    confirmPassword: "",
    country: "",
  });

  const handleChange = (field, value) => {
    setSignUpForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpForm),
      });

      const data = await response.json();

      console.log("signup response", data);
    } catch (error) {
      console.log("signup error", error);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#edf2f9]">

      {/* BACKGROUND DECORATION */}

      <div className="pointer-events-none absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-blue-300/20 blur-[120px]" />

      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[450px] w-[450px] rounded-full bg-indigo-300/20 blur-[120px]" />


      {/* MAIN CONTAINER */}

      <div className="relative mx-auto flex min-h-screen max-w-[1500px] items-center justify-center px-4 py-5 sm:px-6 lg:px-10">

        <div className="relative flex w-full max-w-[1320px] overflow-hidden rounded-[30px] bg-[#fcfdff] shadow-[0_25px_80px_rgba(15,23,42,0.16)]">


          {/* =====================================================
              LEFT IMAGE SECTION
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

            <div className="absolute inset-0 bg-gradient-to-br from-[#07182f]/50 via-[#0b2850]/30 to-[#07101f]/60" />


            {/* =====================================================
                BLUE CURVE ACCENT
                Curve opens toward LEFT
            ===================================================== */}

          {/* =====================================================
    BLUE CURVE ACCENT
===================================================== */}

<div
  className="
    pointer-events-none
    absolute
    -right-[145px]
    top-[-80px]
    z-10
    h-[860px]
    w-[300px]
    rounded-full
    bg-gradient-to-b
    from-[#4f7df3]
    via-[#2457d6]
    to-[#173fba]
  "
/>


{/* =====================================================
    MAIN WHITE CURVE
===================================================== */}

<div
  className="
    pointer-events-none
    absolute
    -right-[205px]
    top-[-100px]
    z-20
    h-[900px]
    w-[330px]
    rounded-full
    bg-[#fcfdff]
  "
/>


            {/* LOGO */}

            <div className="absolute left-9 top-9 z-30 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-900/30">

                <Plane
                  size={21}
                  className="-rotate-45"
                />

              </div>

              <div>

                <img src={logo} className="object-contain w-36" />

                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-blue-200">
                  Travel Beyond
                </p>

              </div>

            </div>


            {/* FOREGROUND PLANE IMAGE */}

            <img
              src="/planebg2.png"
              alt="Travel Plane"
              className="
                pointer-events-none
                absolute
                -right-[30px]
                top-[100px]
                z-30
                w-[600px]
                max-w-none
                object-contain
                drop-shadow-[0_28px_32px_rgba(0,0,0,0.32)]
              "
            />


            {/* FLOATING TEXT */}

            <div className="absolute bottom-9 left-9 right-16 z-30">

              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-xl">

                <Sparkles
                  size={13}
                  className="text-blue-200"
                />

                <span className="text-[11px] font-semibold text-white">
                  Travel without limits
                </span>

              </div>


              <h2 className="max-w-md text-[38px] font-bold leading-[1.08] text-white xl:text-[46px]">

                Your journey starts

                <span className="block bg-gradient-to-r from-blue-200 to-cyan-100 bg-clip-text text-transparent">
                  with Cliqkar.
                </span>

              </h2>


              <p className="mt-3 max-w-md text-[13px] leading-relaxed text-blue-100/80">

                Create your account and unlock a seamless
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
                backgroundImage: "url('/planeimage.jpg')",
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
                Your journey starts here.
              </h2>

            </div>

          </div>


          {/* =====================================================
              RIGHT FORM SECTION
          ===================================================== */}

          <div className="relative flex flex-1 items-center bg-[#fcfdff] px-6 py-8 sm:px-10 lg:px-12 xl:px-14">


            {/* BACKGROUND GLOW */}

            <div className="pointer-events-none absolute right-0 top-0 h-[320px] w-[320px] rounded-full bg-blue-100/50 blur-[110px]" />

            <div className="pointer-events-none absolute bottom-[-180px] left-[20%] h-[280px] w-[280px] rounded-full bg-indigo-100/30 blur-[100px]" />


            <div className="relative z-10 mx-auto w-full max-w-[650px]">


              {/* BADGE */}

              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#dce7f5] bg-white/80 px-3 py-1.5 shadow-sm backdrop-blur-md">

                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#173d6c] to-[#3269aa] text-white shadow-sm">

                  <ShieldCheck size={13} />

                </span>


                <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#315789]">
                  Private Member Access
                </span>

              </div>


              {/* TITLE */}

              <h1 className="text-[32px] font-bold tracking-tight text-[#17243a] sm:text-[38px]">
                Create your account
              </h1>


              <p className="mt-2 max-w-[580px] text-[13px] leading-relaxed text-slate-500">

                Join Cliqkar and unlock a smarter, seamless
                and more personalized travel experience.

              </p>


              {/* FORM */}

              <form
                onSubmit={handleSubmit}
                className="mt-6"
              >

                <div className="grid grid-cols-1 gap-x-5 gap-y-3.5 sm:grid-cols-2">


                  {/* FULL NAME */}

                  <PremiumField
                    label="Full Name"
                    required
                    icon={<User size={16} />}
                  >

                    <input
                      value={signUpForm.firstName}
                      onChange={(e) =>
                        handleChange(
                          "firstName",
                          e.target.value
                        )
                      }
                      placeholder="Enter your full name"
                      className="premium-input"
                    />

                  </PremiumField>


                  {/* PHONE */}

                  <PremiumField
                    label="Phone Number"
                    required
                    icon={<Phone size={16} />}
                  >

                    <div className="flex w-full items-center">

                      <div className="relative">

                        <select
                          value={signUpForm.countryCode}
                          onChange={(e) =>
                            handleChange(
                              "countryCode",
                              e.target.value
                            )
                          }
                          className="phone-select"
                        >

                          <option value="+91">+91</option>
                          <option value="+1">+1</option>
                          <option value="+44">+44</option>
                          <option value="+971">+971</option>

                        </select>


                        <ChevronDown
                          size={13}
                          className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                      </div>


                      <div className="mx-3 h-6 w-px bg-slate-200" />


                      <input
                        value={signUpForm.phoneNumber}
                        onChange={(e) =>
                          handleChange(
                            "phoneNumber",
                            e.target.value
                          )
                        }
                        placeholder="Phone number"
                        className="premium-input"
                      />

                    </div>

                  </PremiumField>


                  {/* EMAIL */}

                  <PremiumField
                    label="Email Address"
                    required
                    icon={<Mail size={16} />}
                  >

                    <input
                      type="email"
                      value={signUpForm.email}
                      onChange={(e) =>
                        handleChange(
                          "email",
                          e.target.value
                        )
                      }
                      placeholder="Enter your email"
                      className="premium-input"
                    />

                  </PremiumField>


                  {/* GENDER */}

                  <PremiumField
                    label="Gender"
                    required
                    icon={<Users size={16} />}
                  >

                    <select
                      value={signUpForm.gender}
                      onChange={(e) =>
                        handleChange(
                          "gender",
                          e.target.value
                        )
                      }
                      className="premium-select"
                    >

                      <option value="">
                        Select gender
                      </option>

                      <option value="female">
                        Female
                      </option>

                      <option value="male">
                        Male
                      </option>

                      <option value="other">
                        Other
                      </option>

                    </select>


                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-4 text-[#5c7da5]"
                    />

                  </PremiumField>


                  {/* PASSWORD */}

                  <PremiumField
                    label="Password"
                    required
                    icon={<Lock size={16} />}
                  >

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={signUpForm.password}
                      onChange={(e) =>
                        handleChange(
                          "password",
                          e.target.value
                        )
                      }
                      placeholder="Create password"
                      className="premium-input pr-10"
                    />


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

                  </PremiumField>


                  {/* CONFIRM PASSWORD */}

                  <PremiumField
                    label="Confirm Password"
                    required
                    icon={<Lock size={16} />}
                  >

                    <input
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      value={signUpForm.confirmPassword}
                      onChange={(e) =>
                        handleChange(
                          "confirmPassword",
                          e.target.value
                        )
                      }
                      placeholder="Confirm password"
                      className="premium-input pr-10"
                    />


                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          (prev) => !prev
                        )
                      }
                      className="premium-eye"
                    >

                      {showConfirmPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}

                    </button>

                  </PremiumField>


                  {/* COUNTRY */}

                  <PremiumField
                    label="Country"
                    required
                    icon={<Globe size={16} />}
                  >

                    <select
                      value={signUpForm.country}
                      onChange={(e) =>
                        handleChange(
                          "country",
                          e.target.value
                        )
                      }
                      className="premium-select"
                    >

                      <option value="">
                        Select country
                      </option>

                      <option value="IN">
                        India
                      </option>

                      <option value="US">
                        United States
                      </option>

                      <option value="AE">
                        United Arab Emirates
                      </option>

                      <option value="UK">
                        United Kingdom
                      </option>

                    </select>


                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-4 text-[#5c7da5]"
                    />

                  </PremiumField>

                </div>


                {/* SUBMIT */}

                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  <button
                    type="submit"
                    className="
                      group
                      flex
                      min-w-[180px]
                      items-center
                      justify-center
                      gap-3
                      rounded-xl
                      bg-gradient-to-r
                      from-[#102a4c]
                      via-[#173d6c]
                      to-[#2b619f]
                      px-7
                      py-3
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

                    Create Account

                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />

                  </button>


                  <div className="flex items-center gap-2 text-[11px] text-slate-400">

                    <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-blue-100 bg-white text-[#2c619f] shadow-sm">

                      <ShieldCheck size={14} />

                    </span>

                    <span>
                      Secure & encrypted registration
                    </span>

                  </div>

                </div>

              </form>


              {/* FOOTER */}

              <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4 text-[11px] text-slate-400">

                <CheckCircle2
                  size={14}
                  className="text-[#3b72bd]"
                />

                Your travel information is protected securely.

              </div>

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


        .premium-select {
          width: 100%;
          appearance: none;
          -webkit-appearance: none;
          border: none;
          outline: none;
          background: transparent;
          color: #475569;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          padding-right: 30px;
        }


        .premium-select option {
          background: white;
          color: #334155;
          padding: 12px;
        }


        .phone-select {
          width: 56px;
          appearance: none;
          -webkit-appearance: none;
          border: none;
          outline: none;
          background: #f1f6fc;
          border-radius: 8px;
          padding: 7px 18px 7px 8px;
          color: #315789;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
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