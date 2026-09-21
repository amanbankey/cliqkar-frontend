import React, { useEffect, useMemo, useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiMapPin,
  FiGlobe,
  FiLock,
  FiEye,
  FiEyeOff,
  FiCheck,
  FiCheckCircle,
  FiCamera,
  FiTrash2,
  FiPlus,
  FiAlertCircle,
} from "react-icons/fi";

import api from "../../api/axios";

const nationalities = [
  "India",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Singapore",
  "Qatar",
  "Oman",
];

const PERSONAL_KEYS = [
  "fullName",
  "email",
  "mobile",
  "nationality",
  "dob",
  "gender",
  "address",
];

const pickPersonal = (data) =>
  PERSONAL_KEYS.reduce((acc, key) => ({ ...acc, [key]: data[key] }), {});

/* Page load par ek hi orchestrated sequence: header -> personal card -> security card.
   Ring ka fill hona hi is page ka "memorable" moment hai. */
const styles = `
@keyframes pf-rise {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: none; }
}
@keyframes pf-pop {
  from { opacity: 0; transform: translateY(4px) scale(.96); }
  to   { opacity: 1; transform: none; }
}
@keyframes pf-live {
  0%   { box-shadow: 0 0 0 0 rgba(52, 211, 153, .55); }
  100% { box-shadow: 0 0 0 7px rgba(52, 211, 153, 0); }
}
.pf-rise { animation: pf-rise .6s cubic-bezier(.22,1,.36,1) both; }
.pf-pop  { animation: pf-pop .28s ease-out both; }
.pf-live { animation: pf-live 2s ease-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .pf-rise, .pf-pop, .pf-live { animation: none !important; }
}
`;

const getInitials = (name) => {
  if (!name.trim()) return "";

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
};

/* 3-segment strength bar (reference design ke jaisa) */
const scorePassword = (password) => {
  if (!password) {
    return {
      score: 0,
      segments: 0,
      label: "",
      entropy: "",
      tone: "",
      bar: "",
    };
  }

  let score = 0;

  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 2) {
    return {
      score,
      segments: 1,
      label: "Weak Password",
      entropy: "Low",
      tone: "text-red-600",
      bar: "bg-red-500",
    };
  }

  if (score === 3) {
    return {
      score,
      segments: 2,
      label: "Fair Password",
      entropy: "Medium",
      tone: "text-amber-600",
      bar: "bg-amber-500",
    };
  }

  if (score === 4) {
    return {
      score,
      segments: 3,
      label: "Strong Password",
      entropy: "High",
      tone: "text-emerald-600",
      bar: "bg-emerald-500",
    };
  }

  return {
    score,
    segments: 3,
    label: "Very Strong Password",
    entropy: "Very High",
    tone: "text-emerald-600",
    bar: "bg-emerald-500",
  };
};

/* Input wrapper:
   - icon ek chhote tile mein hai, focus par navy ho jaata hai
   - valid=true par right side mein green tick aata hai */
const Field = ({ label, required, icon: Icon, valid, children }) => (
  <div className="group">
    <label className="mb-1.5 block text-sm font-medium text-gray-600 transition-colors group-focus-within:text-blue-900">
      {label}
      {required && <span className="ml-0.5 text-red-500">*</span>}
    </label>

    <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-2.5 py-2 shadow-[inset_0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-200 hover:border-gray-300 focus-within:border-blue-900 focus-within:shadow-none focus-within:ring-4 focus-within:ring-blue-900/10">
      {Icon && (
        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-colors duration-200 group-focus-within:bg-blue-900 group-focus-within:text-white">
          <Icon size={15} />
        </span>
      )}

      {children}

      {valid && (
        <FiCheckCircle
          className="pf-pop mr-1 flex-shrink-0 text-emerald-500"
          size={16}
        />
      )}
    </div>
  </div>
);

const GroupTitle = ({ title, note }) => (
  <div className="mb-4 flex items-center gap-3">
    <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
    <span className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent" />
    {note && (
      <span className="hidden text-xs text-gray-400 sm:block">{note}</span>
    )}
  </div>
);

const Spinner = () => (
  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
);

/* Progress ring settings */
const RING_RADIUS = 52;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

const MyProfile = () => {
  const [loading, setLoading] = useState(true);
  const [ringReady, setRingReady] = useState(false);

  const [photoPreview, setPhotoPreview] = useState(null);

  const [savedMessage, setSavedMessage] = useState("");
  const [savedIsError, setSavedIsError] = useState(false);
  const [savingPersonal, setSavingPersonal] = useState(false);
  const [savedSnapshot, setSavedSnapshot] = useState(null);

  const [passwordMessage, setPasswordMessage] = useState(null); // { type, text }
  const [savingPassword, setSavingPassword] = useState(false);

  const [personalData, setPersonalData] = useState({
    profilePhoto: null,
    fullName: "",
    email: "",
    mobile: "",
    nationality: "India",
    dob: "",
    gender: "Male",
    address: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [visible, setVisible] = useState({
    current: false,
    next: false,
    confirm: false,
  });

  // =====================================================
  // GET LOGGED-IN USER PROFILE
  // =====================================================

  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.log("No login token found");
          setLoading(false);
          return;
        }

        const response = await api.get("/user/profile/me");

        console.log("Profile response:", response.data);

        const user = response?.data?.user;

        if (!user) {
          console.error("User data not found in response");
          setLoading(false);
          return;
        }

        const loaded = {
          profilePhoto: user.profilePhoto || null,
          fullName: user.fullName || "",
          email: user.email || "",
          mobile: user.phoneNumber || "",
          nationality: user.country || "India",
          dob: user.dob || "",
          gender: user.gender || "Male",
          address: user.address || "",
        };

        setPersonalData(loaded);
        setSavedSnapshot(pickPersonal(loaded));

        if (user.profilePhoto) {
          setPhotoPreview(user.profilePhoto);
        }
      } catch (error) {
        console.error("Failed to fetch logged-in user:", error);
        console.error("Backend error:", error?.response?.data);
      } finally {
        setLoading(false);
      }
    };

    fetchMyProfile();
  }, []);

  // Data aane ke baad ring ko 0 se fill hone dena
  useEffect(() => {
    if (loading) return;
    const timer = setTimeout(() => setRingReady(true), 250);
    return () => clearTimeout(timer);
  }, [loading]);

  // =====================================================
  // HANDLERS
  // =====================================================

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;

    setPersonalData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleVisible = (key) => {
    setVisible((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setPersonalData((prev) => ({
      ...prev,
      profilePhoto: file,
    }));

    const imageUrl = URL.createObjectURL(file);

    setPhotoPreview(imageUrl);
  };

  const removePhoto = () => {
    setPersonalData((prev) => ({
      ...prev,
      profilePhoto: null,
    }));

    setPhotoPreview(null);
  };

  // =====================================================
  // PROFILE COMPLETION
  // =====================================================

  const completion = useMemo(() => {
    const items = [
      { label: "Full name", done: !!personalData.fullName },
      { label: "Email", done: !!personalData.email },
      { label: "Mobile number", done: !!personalData.mobile },
      { label: "Nationality", done: !!personalData.nationality },
      { label: "Date of birth", done: !!personalData.dob },
      { label: "Address", done: !!personalData.address },
      { label: "Photo", done: !!photoPreview },
    ];

    const filled = items.filter((item) => item.done).length;

    return {
      items,
      percent: Math.round((filled / items.length) * 100),
    };
  }, [personalData, photoPreview]);

  // =====================================================
  // FIELD VALIDITY + UNSAVED CHANGES
  // =====================================================

  const valid = {
    fullName: personalData.fullName.trim().length >= 2,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalData.email),
    mobile: /^\d{10}$/.test(personalData.mobile.replace(/\s/g, "")),
    dob: !!personalData.dob,
    address: personalData.address.trim().length >= 8,
  };

  const isDirty =
    !!savedSnapshot &&
    PERSONAL_KEYS.some((key) => personalData[key] !== savedSnapshot[key]);

  // =====================================================
  // PASSWORD STRENGTH
  // =====================================================

  const strength = scorePassword(passwordData.newPassword);

  const passwordRules = [
    { label: "8+ characters", ok: passwordData.newPassword.length >= 8 },
    {
      label: "Upper & lower case",
      ok:
        /[A-Z]/.test(passwordData.newPassword) &&
        /[a-z]/.test(passwordData.newPassword),
    },
    { label: "A number", ok: /\d/.test(passwordData.newPassword) },
    {
      label: "A symbol",
      ok: /[^A-Za-z0-9]/.test(passwordData.newPassword),
    },
  ];

  const passwordsMatch =
    passwordData.confirmPassword.length > 0 &&
    passwordData.newPassword === passwordData.confirmPassword;

  const passwordsMismatch =
    passwordData.confirmPassword.length > 0 &&
    passwordData.newPassword !== passwordData.confirmPassword;

  // =====================================================
  // SAVE PERSONAL DETAILS
  // =====================================================

  const showSaved = (text, isError, ms) => {
    setSavedMessage(text);
    setSavedIsError(isError);

    setTimeout(() => {
      setSavedMessage("");
    }, ms);
  };

  const handlePersonalSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        showSaved("Please log in first", true, 3000);
        return;
      }

      setSavingPersonal(true);

      const response = await api.put("/user/profile/personal", {
        fullName: personalData.fullName,
        email: personalData.email,
        mobile: personalData.mobile,
        nationality: personalData.nationality,
        dob: personalData.dob,
        gender: personalData.gender,
        address: personalData.address,
      });

      console.log("Profile update response:", response.data);

      const updatedUser = response?.data?.user;

      if (updatedUser) {
        const next = {
          fullName: updatedUser.fullName || "",
          email: updatedUser.email || "",
          mobile: updatedUser.phoneNumber || "",
          nationality: updatedUser.country || "India",
          dob: updatedUser.dob || "",
          gender: updatedUser.gender || "Male",
          address: updatedUser.address || "",
        };

        setPersonalData((prev) => ({
          ...prev,
          ...next,
          profilePhoto: updatedUser.profilePhoto || prev.profilePhoto || null,
        }));

        setSavedSnapshot(next);

        if (updatedUser.profilePhoto) {
          setPhotoPreview(updatedUser.profilePhoto);
        }
      } else {
        setSavedSnapshot(pickPersonal(personalData));
      }

      showSaved("Changes saved", false, 2500);
    } catch (error) {
      console.error("Failed to save personal details:", error);
      console.error("Backend error:", error?.response?.data);

      showSaved(
        error?.response?.data?.message || "Failed to save changes",
        true,
        3500
      );
    } finally {
      setSavingPersonal(false);
    }
  };

  // =====================================================
  // CHANGE PASSWORD
  // =====================================================

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (!passwordData.currentPassword || !passwordData.newPassword) {
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setPasswordMessage({ type: "error", text: "Please log in first" });
        return;
      }

      setSavingPassword(true);
      setPasswordMessage(null);

      const response = await api.put("/user/profile/password", {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      console.log("Password update response:", response.data);

      setPasswordMessage({
        type: "success",
        text: response?.data?.message || "Password changed successfully",
      });

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setTimeout(() => setPasswordMessage(null), 4000);
    } catch (error) {
      console.error("Failed to update password:", error);
      console.error("Backend error:", error?.response?.data);

      setPasswordMessage({
        type: "error",
        text: error?.response?.data?.message || "Failed to update password",
      });
    } finally {
      setSavingPassword(false);
    }
  };

  // =====================================================
  // LOADING (skeleton)
  // =====================================================

  if (loading) {
    return (
      <div className="max-w-4xl space-y-5 p-4 sm:p-6 lg:p-8">
        <div className="h-44 animate-pulse rounded-3xl bg-slate-200/70" />
        <div className="space-y-5 rounded-3xl border border-gray-100 bg-white p-6">
          <div className="h-5 w-48 animate-pulse rounded bg-slate-200/70" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-12 animate-pulse rounded-xl bg-slate-100"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const initials = getInitials(personalData.fullName);
  const missingItems = completion.items.filter((item) => !item.done);
  const ringOffset = ringReady
    ? RING_CIRCUMFERENCE * (1 - completion.percent / 100)
    : RING_CIRCUMFERENCE;

  const inputClass =
    "min-w-0 flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none";

  return (
    <div className="max-w-4xl space-y-5 p-4 sm:p-6 lg:p-8">
      <style>{styles}</style>

      {/* =================================================
          PROFILE HEADER
      ================================================= */}

      <div className="pf-rise relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B1120] via-[#0F1A38] to-[#0B1120] p-5 text-white shadow-xl shadow-slate-900/20 sm:p-7">
        <div className="pointer-events-none absolute -right-10 -top-20 h-64 w-64 rounded-full bg-blue-600/25 blur-3xl" />

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
          {/* AVATAR + PROGRESS RING */}
          <div className="relative h-28 w-28 flex-shrink-0">
            <svg
              viewBox="0 0 112 112"
              className="absolute inset-0 h-full w-full -rotate-90"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="pf-ring" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
              </defs>

              <circle
                cx="56"
                cy="56"
                r={RING_RADIUS}
                fill="none"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="4"
              />

              <circle
                cx="56"
                cy="56"
                r={RING_RADIUS}
                fill="none"
                stroke="url(#pf-ring)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={RING_CIRCUMFERENCE}
                strokeDashoffset={ringOffset}
                style={{
                  transition:
                    "stroke-dashoffset 1.4s cubic-bezier(.22,1,.36,1)",
                }}
              />
            </svg>

            <span className="absolute inset-3 flex items-center justify-center overflow-hidden rounded-full bg-white/10">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : initials ? (
                <span className="text-2xl font-semibold tracking-wide">
                  {initials}
                </span>
              ) : (
                <FiUser size={32} className="text-white/50" />
              )}
            </span>

            <input
              type="file"
              id="profile-photo"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />

            <label
              htmlFor="profile-photo"
              className="absolute bottom-1 right-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-[#0B1120] shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95"
              title="Upload a new photo"
            >
              <FiCamera size={14} />
            </label>

            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-emerald-400 px-2 py-0.5 text-[11px] font-bold tabular-nums text-[#0B1120] shadow-md">
              {completion.percent}%
            </span>
          </div>

          {/* NAME + STATUS */}
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-2xl font-semibold">
              {personalData.fullName || "Your profile"}
            </h1>

            <p className="mt-0.5 truncate text-sm text-slate-400">
              {personalData.email ||
                "Add your details so we can prefill your bookings"}
            </p>

            <div className="mt-4">
              {missingItems.length === 0 ? (
                <p className="flex items-center gap-1.5 text-sm text-emerald-300">
                  <FiCheck size={15} />
                  Your profile is complete. Bookings will prefill automatically.
                </p>
              ) : (
                <>
                  <p className="mb-2 text-xs text-slate-400">
                    Add these to finish your profile
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {missingItems.map((item) => (
                      <span
                        key={item.label}
                        className="pf-pop inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-1 text-xs text-slate-200"
                      >
                        <FiPlus size={11} className="text-sky-300" />
                        {item.label}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {photoPreview && (
            <button
              type="button"
              onClick={removePhoto}
              className="flex items-center gap-1.5 self-start rounded-lg px-3 py-2 text-xs text-slate-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70"
            >
              <FiTrash2 size={13} />
              Remove photo
            </button>
          )}
        </div>
      </div>

      {/* =================================================
          PERSONAL INFORMATION
      ================================================= */}

      <form
        onSubmit={handlePersonalSubmit}
        className="pf-rise overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm"
        style={{ animationDelay: "0.12s" }}
      >
        {/* top accent strip */}
        <div className="h-1.5 bg-gradient-to-r from-blue-900 via-blue-500 to-emerald-400" />

        {/* header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 bg-gradient-to-r from-blue-50/70 via-white to-white px-5 py-5 sm:px-7">
          <div className="flex items-center gap-3.5">
            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0B1120] to-blue-900 text-white shadow-md shadow-blue-900/25">
              <FiUser size={18} />
            </span>

            <div>
              <h2 className="text-base font-semibold text-gray-900">
                Personal Information
              </h2>
              <p className="mt-0.5 text-sm text-gray-500">
                Used on your tickets and visa applications.
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
            <FiAlertCircle size={13} />
            Must match your passport
          </span>
        </div>

        {/* body */}
        <div className="space-y-8 p-5 sm:p-7">
          {/* IDENTITY */}
          <section>
            <GroupTitle
              title="Identity Details"
              note="As printed on your passport"
            />

            <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
              <Field
                label="Full Name"
                required
                icon={FiUser}
                valid={valid.fullName}
              >
                <input
                  name="fullName"
                  value={personalData.fullName}
                  onChange={handlePersonalChange}
                  placeholder="As printed on your passport"
                  className={inputClass}
                />
              </Field>

              <Field label="Nationality" required icon={FiGlobe}>
                <select
                  name="nationality"
                  value={personalData.nationality}
                  onChange={handlePersonalChange}
                  className={`${inputClass} cursor-pointer`}
                >
                  {nationalities.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </Field>

              <Field
                label="Date of Birth"
                required
                icon={FiCalendar}
                valid={valid.dob}
              >
                <input
                  type="date"
                  name="dob"
                  value={personalData.dob}
                  onChange={handlePersonalChange}
                  className={inputClass}
                />
              </Field>

              {/* GENDER */}
              <div>
                <span className="mb-1.5 block text-sm font-medium text-gray-600">
                  Gender
                  <span className="ml-0.5 text-red-500">*</span>
                </span>

                <div className="grid grid-cols-3 gap-2">
                  {["Male", "Female", "Others"].map((option) => {
                    const selected = personalData.gender === option;

                    return (
                      <label
                        key={option}
                        className={`flex h-[50px] cursor-pointer items-center justify-center gap-1.5 rounded-xl border px-2 text-sm transition-all duration-200 focus-within:ring-4 focus-within:ring-blue-900/10 ${
                          selected
                            ? "border-blue-900 bg-gradient-to-br from-blue-800 to-[#0B1120] font-medium text-white shadow-md shadow-blue-900/25"
                            : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-slate-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="gender"
                          value={option}
                          checked={selected}
                          onChange={handlePersonalChange}
                          className="sr-only"
                        />

                        {selected && <FiCheck size={14} className="pf-pop" />}
                        {option}
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* CONTACT */}
          <section>
            <GroupTitle
              title="Contact Details"
              note="Tickets and updates are sent here"
            />

            <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
              <Field
                label="Email Address"
                required
                icon={FiMail}
                valid={valid.email}
              >
                <input
                  type="email"
                  name="email"
                  value={personalData.email}
                  onChange={handlePersonalChange}
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </Field>

              <Field
                label="Mobile Number"
                required
                icon={FiPhone}
                valid={valid.mobile}
              >
                <input
                  name="mobile"
                  value={personalData.mobile}
                  onChange={handlePersonalChange}
                  placeholder="10-digit number"
                  className={inputClass}
                />
              </Field>

              {/* ADDRESS */}
              <div className="group sm:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-gray-600 transition-colors group-focus-within:text-blue-900">
                  Address
                </label>

                <div className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white px-2.5 py-2 shadow-[inset_0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-200 hover:border-gray-300 focus-within:border-blue-900 focus-within:shadow-none focus-within:ring-4 focus-within:ring-blue-900/10">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-colors duration-200 group-focus-within:bg-blue-900 group-focus-within:text-white">
                    <FiMapPin size={15} />
                  </span>

                  <textarea
                    name="address"
                    value={personalData.address}
                    onChange={handlePersonalChange}
                    rows={3}
                    placeholder="House / street, city, state, pincode"
                    className={`${inputClass} resize-none py-1.5`}
                  />

                  {valid.address && (
                    <FiCheckCircle
                      className="pf-pop mr-1 mt-2 flex-shrink-0 text-emerald-500"
                      size={16}
                    />
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 bg-slate-50/70 px-5 py-4 sm:px-7">
          <div className="min-h-[20px] text-sm">
            {savedMessage ? (
              <span
                className={`pf-pop flex items-center gap-1.5 ${
                  savedIsError ? "text-red-600" : "text-emerald-600"
                }`}
              >
                {savedIsError ? (
                  <FiAlertCircle size={15} />
                ) : (
                  <FiCheck size={15} />
                )}
                {savedMessage}
              </span>
            ) : isDirty ? (
              <span className="pf-pop flex items-center gap-2 text-amber-700">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                You have unsaved changes
              </span>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={savingPersonal}
            className="inline-flex min-w-[150px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0B1120] to-blue-900 px-6 py-2.5 text-sm font-medium text-white shadow-md shadow-blue-950/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-950/30 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-900/20 active:translate-y-0 disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {savingPersonal ? (
              <>
                <Spinner />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>

      {/* =================================================
          SECURITY & PASSWORD UPDATE
      ================================================= */}

      <form
        onSubmit={handlePasswordSubmit}
        className="pf-rise overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm"
        style={{ animationDelay: "0.24s" }}
      >
        {/* header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 bg-gradient-to-r from-blue-50/70 via-white to-white px-5 py-5 sm:px-7">
          <div className="flex items-center gap-3.5">
            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0B1120] to-blue-900 text-white shadow-md shadow-blue-900/25">
              <FiLock size={18} />
            </span>

            <div>
              <h2 className="text-base font-semibold text-gray-900">
                Security & Password Update
              </h2>
              <p className="mt-0.5 text-sm text-gray-500">
                Keep your account and bookings safe with a strong password.
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            <span className="pf-live h-2 w-2 rounded-full bg-emerald-500" />
            Secure Session
          </span>
        </div>

        {/* body: 3 columns */}
        <div className="grid grid-cols-1 gap-x-5 gap-y-6 p-5 sm:p-7 md:grid-cols-3">
          {/* CURRENT PASSWORD */}
          <div>
            <Field label="Current Password" icon={FiLock}>
              <input
                type={visible.current ? "text" : "password"}
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                placeholder="Enter current password"
                className={inputClass}
              />

              <button
                type="button"
                onClick={() => toggleVisible("current")}
                className="mr-1 flex-shrink-0 text-gray-400 transition-colors hover:text-gray-700"
                aria-label={visible.current ? "Hide password" : "Show password"}
              >
                {visible.current ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </Field>
          </div>

          {/* NEW PASSWORD */}
          <div>
            <Field label="New Password" icon={FiLock}>
              <input
                type={visible.next ? "text" : "password"}
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                placeholder="Enter new password"
                className={inputClass}
              />

              <button
                type="button"
                onClick={() => toggleVisible("next")}
                className="mr-1 flex-shrink-0 text-gray-400 transition-colors hover:text-gray-700"
                aria-label={visible.next ? "Hide password" : "Show password"}
              >
                {visible.next ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </Field>

            {passwordData.newPassword ? (
              <div className="pf-pop mt-2.5">
                <div className="flex gap-1.5">
                  {[1, 2, 3].map((step) => (
                    <span
                      key={step}
                      className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                        step <= strength.segments ? strength.bar : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>

                <div className="mt-1.5 flex items-center justify-between text-xs">
                  <span className={`font-semibold ${strength.tone}`}>
                    {strength.label}
                  </span>
                  <span className="text-gray-400">
                    Entropy: {strength.entropy}
                  </span>
                </div>
              </div>
            ) : (
              <div className="mt-2.5 flex gap-1.5">
                {[1, 2, 3].map((step) => (
                  <span
                    key={step}
                    className="h-1.5 flex-1 rounded-full bg-gray-100"
                  />
                ))}
              </div>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <Field label="Confirm New Password" icon={FiLock}>
              <input
                type={visible.confirm ? "text" : "password"}
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Re-enter new password"
                className={inputClass}
              />

              {passwordsMatch && (
                <FiCheckCircle
                  className="pf-pop flex-shrink-0 text-emerald-500"
                  size={16}
                />
              )}

              <button
                type="button"
                onClick={() => toggleVisible("confirm")}
                className="mr-1 flex-shrink-0 text-gray-400 transition-colors hover:text-gray-700"
                aria-label={visible.confirm ? "Hide password" : "Show password"}
              >
                {visible.confirm ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </Field>

            {passwordsMatch && (
              <p className="pf-pop mt-2.5 flex items-center gap-1 text-xs font-semibold text-emerald-600">
                <FiCheck size={13} />
                Passwords match
              </p>
            )}

            {passwordsMismatch && (
              <p className="pf-pop mt-2.5 flex items-center gap-1 text-xs font-semibold text-red-600">
                <FiAlertCircle size={13} />
                Passwords do not match
              </p>
            )}
          </div>

          {/* RULES */}
          <div className="flex flex-wrap gap-2 md:col-span-3">
            {passwordRules.map((rule) => (
              <span
                key={rule.label}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors duration-300 ${
                  rule.ok
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-gray-200 bg-gray-50 text-gray-400"
                }`}
              >
                {rule.ok ? (
                  <FiCheck size={12} className="pf-pop" />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                )}
                {rule.label}
              </span>
            ))}
          </div>
        </div>

        {/* footer */}
        <div className="flex flex-wrap items-center justify-end gap-4 border-t border-gray-100 bg-slate-50/70 px-5 py-4 sm:px-7">
          {passwordMessage && (
            <span
              className={`pf-pop flex items-center gap-1.5 text-sm ${
                passwordMessage.type === "success"
                  ? "text-emerald-600"
                  : "text-red-600"
              }`}
            >
              {passwordMessage.type === "success" ? (
                <FiCheck size={15} />
              ) : (
                <FiAlertCircle size={15} />
              )}
              {passwordMessage.text}
            </span>
          )}

          <button
            type="submit"
            disabled={
              !passwordsMatch || !passwordData.currentPassword || savingPassword
            }
            className="inline-flex min-w-[170px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0B1120] to-blue-900 px-6 py-2.5 text-sm font-medium text-white shadow-md shadow-blue-950/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-950/30 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-900/20 active:translate-y-0 disabled:cursor-not-allowed disabled:bg-none disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none disabled:hover:translate-y-0"
          >
            {savingPassword ? (
              <>
                <Spinner />
                Updating...
              </>
            ) : (
              <>
                <FiLock size={14} />
                Update Password
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;