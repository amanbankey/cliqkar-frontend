import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Lock,
  Globe,
  X,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  Plane,
  Sparkles,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Check,
} from "lucide-react";
import { signupUser } from "../api/authApi";
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

export default function SignUpPage({ onClose }) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const [signUpForm, setSignUpForm] = useState({
    fullName: "",
    identifier: "",
    phoneNumber: "",
    country: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSignUpForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (message.text) {
      setMessage({
        type: "",
        text: "",
      });
    }
  };

  const handleCountrySelect = (country) => {
    setSignUpForm((prev) => ({
      ...prev,
      country,
    }));

    setCountryDropdownOpen(false);

    if (message.text) {
      setMessage({
        type: "",
        text: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!signUpForm.fullName.trim()) {
      setMessage({
        type: "error",
        text: "Please enter your full name.",
      });
      return;
    }

    if (!signUpForm.identifier.trim()) {
      setMessage({
        type: "error",
        text: "Please enter your email or mobile number.",
      });
      return;
    }

    if (!signUpForm.country) {
      setMessage({
        type: "error",
        text: "Please select your country.",
      });
      return;
    }

    if (!signUpForm.password) {
      setMessage({
        type: "error",
        text: "Please enter your password.",
      });
      return;
    }

    if (signUpForm.password !== signUpForm.confirmPassword) {
      setMessage({
        type: "error",
        text: "Passwords do not match.",
      });
      return;
    }

    setLoading(true);

    setMessage({
      type: "",
      text: "",
    });

    try {
      const data = await signupUser({
        fullName: signUpForm.fullName.trim(),
        identifier: signUpForm.identifier.trim(),
        phoneNumber: signUpForm.phoneNumber.trim(),
        country: signUpForm.country,
        password: signUpForm.password,
        confirmPassword: signUpForm.confirmPassword,
      });

      if (data?.success === false) {
        setMessage({
          type: "error",
          text: data?.message || "Unable to create your account.",
        });
        return;
      }

      if (data?.token) {
        localStorage.setItem("token", data.token);
      }

      if (data?.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      setMessage({
        type: "success",
        text: data?.message || "Account created successfully!",
      });

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong while creating your account.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#edf2f9]">
      <div className="pointer-events-none absolute -left-40 -top-40 h-[380px] w-[450px] rounded-full bg-blue-300/20 blur-[120px]" />

      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[380px] w-[450px] rounded-full bg-indigo-300/20 blur-[120px]" />

      <div className="relative mx-auto flex min-h-screen max-w-[1100px] items-center justify-center px-4 py-5 sm:px-6 lg:px-10">
        <div className="relative my-auto flex w-full max-w-[1080px] flex-col overflow-hidden rounded-[26px] bg-[#fcfdff] shadow-[0_25px_80px_rgba(15,23,42,0.16)] lg:flex-row">

          <button
            type="button"
            onClick={() => (onClose ? onClose() : navigate("/"))}
            aria-label="Close"
            className="
              absolute
              right-4
              top-4
              z-40
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
              active:scale-95
              sm:right-6
              sm:top-6
            "
          >
            <X size={17} />
          </button>

          <div className="relative hidden min-h-[560px] w-[44%] overflow-hidden lg:block">

            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('/cloud.jpeg')",
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-br from-[#07182f]/50 via-[#0b2850]/30 to-[#07101f]/60" />

            <div className="absolute left-9 top-9 z-30 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-900/30">
                <Plane
                  size={21}
                  className="-rotate-45"
                />
              </div>

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-blue-200">
                  Travel Beyond
                </p>
              </div>
            </div>

            <img
              src="/planebg2.png"
              alt="Travel Plane"
              className="
                pointer-events-none
                absolute
                -right-[20px]
                top-[75px]
                z-30
                w-[470px]
                max-w-none
                object-contain
                drop-shadow-[0_28px_32px_rgba(0,0,0,0.32)]
              "
            />

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

              <h2 className="max-w-md text-[30px] font-bold leading-[1.08] text-white xl:text-[36px]">
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

          <div className="relative h-[200px] w-full overflow-hidden sm:h-[220px] lg:hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('/planeimage.jpg')",
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#07182f]/80 via-[#0b2850]/50 to-transparent" />

            <div className="absolute bottom-7 left-6 right-6 z-20">
              <h2 className="text-3xl font-bold text-white">
                Your journey starts here.
              </h2>
            </div>
          </div>

          <div className="relative top-0 flex flex-1 items-center bg-[#fcfdff] px-6 py-6 sm:px-9 lg:px-10 xl:px-12">

            <div className="pointer-events-none absolute right-0 top-0 h-[300px] w-[300px] rounded-full bg-blue-100/50 blur-[110px]" />

            <div className="pointer-events-none absolute bottom-[-180px] left-[20%] h-[280px] w-[280px] rounded-full bg-indigo-100/30 blur-[100px]" />

            <div className="relative z-10 mx-auto w-full">

               
              <h1 className="pr-10 text-[26px] font-bold tracking-tight text-[#17243a] sm:text-[30px]">
                Create your account
              </h1>

              <p className="mt-1.5 max-w-[520px] text-[13px] leading-relaxed text-slate-500">
                Join Cliqkar and unlock a smarter, seamless
                and more personalized travel experience.
              </p>

              <div className="mb-4 mt-4 flex w-full rounded-xl bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => navigate("/signin")}
                  className="flex-1 rounded-lg px-4 py-2.5 text-xs font-semibold text-slate-500 transition hover:text-slate-800"
                >
                  Sign In
                </button>

                <button
                  type="button"
                  className="flex-1 rounded-lg bg-white px-4 py-2.5 text-xs font-bold text-[#2457d6] shadow-sm"
                >
                  Create Account
                </button>
              </div>

              {message.text && (
                <div
                  className={`mb-4 flex items-start gap-2 rounded-xl border px-4 py-3 text-[12px] font-medium ${
                    message.type === "success"
                      ? "border-green-100 bg-green-50 text-green-600"
                      : "border-red-100 bg-red-50 text-red-600"
                  }`}
                >
                  {message.type === "success" ? (
                    <CheckCircle2
                      size={15}
                      className="mt-0.5 shrink-0"
                    />
                  ) : (
                    <AlertCircle
                      size={15}
                      className="mt-0.5 shrink-0"
                    />
                  )}

                  <span>{message.text}</span>
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="mt-5"
              >
                <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">

                  <PremiumField
                    label="Full Name"
                    required
                    icon={<User size={16} />}
                  >
                    <input
                      type="text"
                      name="fullName"
                      value={signUpForm.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      autoComplete="name"
                      className="premium-input"
                    />
                  </PremiumField>

                  <PremiumField
                    label="Email Address"
                    required
                    icon={<Mail size={16} />}
                  >
                    <input
                      type="text"
                      name="identifier"
                      value={signUpForm.identifier}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      autoComplete="username"
                      className="premium-input"
                    />
                  </PremiumField>

                  {/* PHONE NUMBER */} 
                  <PremiumField label="Phone Number" 
                  required icon={<Phone size={16} />} > 
                  <input type="tel" 
                  name="phoneNumber" 
                  value={signUpForm.phoneNumber} 
                  onChange={handleChange} 
                  placeholder="Enter 10-digit phone number" 
                  autoComplete="tel" 
                  maxLength={10}
                  inputMode="numeric" 
                  className="premium-input" /> 
                  </PremiumField>

                  <PremiumField
                    label="Password"
                    required
                    icon={<Lock size={16} />}
                  >
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={signUpForm.password}
                      onChange={handleChange}
                      placeholder="Create password"
                      autoComplete="new-password"
                      className="premium-input pr-10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => !prev)
                      }
                      className="premium-eye"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </PremiumField>

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
                      name="confirmPassword"
                      value={signUpForm.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm password"
                      autoComplete="new-password"
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
                      aria-label={
                        showConfirmPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </PremiumField>

                  <div className="sm:col-span-2">
                    <PremiumField
                      label="Country"
                      required
                      icon={<Globe size={16} />}
                    >
                      <div className="relative w-full">
                        <button
                          type="button"
                          onClick={() =>
                            setCountryDropdownOpen(
                              (prev) => !prev
                            )
                          }
                          className="flex w-full items-center justify-between bg-transparent text-left outline-none"
                        >
                          <span
                            className={
                              signUpForm.country
                                ? "text-[13px] font-medium text-slate-600"
                                : "text-[13px] font-medium text-slate-400"
                            }
                          >
                            {signUpForm.country ||
                              "Select country"}
                          </span>

                          <Globe
                            size={15}
                            className="mr-1 text-[#5c7da5]"
                          />
                        </button>

                        {countryDropdownOpen && (
                          <div className="absolute left-0 top-[42px] z-[150] w-full overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-[0_15px_40px_rgba(15,23,42,0.14)]">
                            <div className="premium-country-scroll max-h-48 overflow-y-auto">
                              {countries.map((country) => (
                                <button
                                  type="button"
                                  key={country}
                                  onClick={() =>
                                    handleCountrySelect(
                                      country
                                    )
                                  }
                                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm text-slate-600 transition hover:bg-[#3b72bd]/5 hover:text-[#2457d6]"
                                >
                                  <span>{country}</span>

                                  {signUpForm.country ===
                                    country && (
                                    <Check
                                      size={15}
                                      className="text-[#3b72bd]"
                                    />
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </PremiumField>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    disabled={loading}
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
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  >
                    {loading ? (
                      <>
                        <Loader2
                          size={16}
                          className="animate-spin"
                        />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Create Account

                        <ArrowRight
                          size={16}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </button>
                </div>
              </form>

             
            </div>
          </div>

          <div className="relative block min-h-[360px] w-full overflow-hidden lg:hidden">
            <img
              src="/cloud.jpeg"
              alt="Travel clouds"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-br from-[#0c1f4a]/10 via-[#173fba]/10 to-[#07142f]/55" />

            <img
              src="/planebg2.png"
              alt="Airplane"
              className="absolute -left-[30px] top-[45px] z-10 w-[430px] max-w-none object-contain"
            />

            <div className="absolute bottom-7 left-7 z-20 text-white">
              <div className="mb-2 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white/75">
                <Sparkles size={12} />
                Start your journey
              </div>

              <h2 className="text-2xl font-bold leading-tight">
                Travel smarter.
                <br />
                Travel better.
              </h2>
            </div>
          </div>
        </div>
      </div>

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

        .premium-country-scroll::-webkit-scrollbar {
          width: 5px;
        }

        .premium-country-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .premium-country-scroll::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 999px;
        }
      `}</style>
    </div>
  );
}

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
          h-[48px]
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

        <div className="flex min-w-0 flex-1 items-center">
          {children}
        </div>
      </div>
    </div>
  );
}