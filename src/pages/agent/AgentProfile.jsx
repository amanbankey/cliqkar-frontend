import React, { useEffect, useMemo, useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiGlobe,
  FiMap,
  FiHome,
  FiLock,
  FiEye,
  FiEyeOff,
  FiCheck,
  FiCheckCircle,
  FiAlertCircle,
  FiShield,
  FiFileText,
  FiBriefcase,
  FiExternalLink,
  FiCreditCard,
} from "react-icons/fi";

import api from "../../api/axios";
import { getMyAgentProfile, updateMyAgentProfile } from "../../api/agentApi";

/* Uploaded documents `/uploads/...` par serve hote hain (api base ke bahar), 
   isliye api baseURL se "/api" hata kar file origin nikal lete hain. */
const FILE_BASE_URL = (api.defaults.baseURL || "").replace(/\/api\/?$/, "");

const toFileUrl = (path) => (path ? `${FILE_BASE_URL}${path}` : null);

const PERSONAL_KEYS = [
  "fullName",
  "mobileNumber",
  "address",
  "country",
  "state",
  "city",
];

const pickPersonal = (data) =>
  PERSONAL_KEYS.reduce((acc, key) => ({ ...acc, [key]: data[key] || "" }), {});

/* Page load par ek hi orchestrated sequence */
const styles = `
@keyframes ap-rise {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: none; }
}
@keyframes ap-pop {
  from { opacity: 0; transform: translateY(4px) scale(.96); }
  to   { opacity: 1; transform: none; }
}
.ap-rise { animation: ap-rise .6s cubic-bezier(.22,1,.36,1) both; }
.ap-pop  { animation: ap-pop .28s ease-out both; }
@media (prefers-reduced-motion: reduce) {
  .ap-rise, .ap-pop { animation: none !important; }
}
`;

const getInitials = (name) => {
  if (!name?.trim()) return "";

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
};

/* 3-segment password strength bar */
const scorePassword = (password) => {
  if (!password) return { segments: 0, label: "", tone: "", bar: "" };

  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 2)
    return { segments: 1, label: "Weak Password", tone: "text-red-600", bar: "bg-red-500" };
  if (score === 3)
    return { segments: 2, label: "Fair Password", tone: "text-amber-600", bar: "bg-amber-500" };
  return { segments: 3, label: "Strong Password", tone: "text-emerald-600", bar: "bg-emerald-500" };
};

const inputClass =
  "min-w-0 flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none";

/* Input wrapper: icon tile focus par navy, valid=true par green tick */
const Field = ({ label, required, icon: Icon, valid, disabled, children }) => (
  <div className="group">
    <label className="mb-1.5 block text-sm font-medium text-gray-600 transition-colors group-focus-within:text-blue-900">
      {label}
      {required && <span className="ml-0.5 text-red-500">*</span>}
    </label>

    <div
      className={`flex items-center gap-3 rounded-xl border px-2.5 py-2 shadow-[inset_0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-200 ${
        disabled
          ? "border-gray-200 bg-slate-50"
          : "border-gray-200 bg-white hover:border-gray-300 focus-within:border-blue-900 focus-within:shadow-none focus-within:ring-4 focus-within:ring-blue-900/10"
      }`}
    >
      {Icon && (
        <span
          className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-colors duration-200 ${
            disabled
              ? "bg-slate-200 text-slate-400"
              : "bg-slate-100 text-slate-500 group-focus-within:bg-blue-900 group-focus-within:text-white"
          }`}
        >
          <Icon size={15} />
        </span>
      )}

      {children}

      {valid && (
        <FiCheckCircle className="ap-pop mr-1 flex-shrink-0 text-emerald-500" size={16} />
      )}
    </div>
  </div>
);

const GroupTitle = ({ title, note }) => (
  <div className="mb-4 flex items-center gap-3">
    <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
    <span className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent" />
    {note && <span className="hidden text-xs text-gray-400 sm:block">{note}</span>}
  </div>
);

const Spinner = () => (
  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
);

/* Read-only document row: type + name + "View document" link */
const DocumentRow = ({ icon: Icon, label, proofType, documentName, documentUrl }) => (
  <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-slate-50/70 p-3.5 sm:flex-row sm:items-center sm:justify-between">
    <div className="flex min-w-0 items-center gap-3">
      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white text-slate-500 ring-1 ring-gray-200">
        <Icon size={16} />
      </span>

      <div className="min-w-0">
        <p className="text-sm font-semibold text-gray-800">
          {label}
          {proofType && (
            <span className="ml-2 rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700">
              {proofType}
            </span>
          )}
        </p>
        <p className="truncate text-xs text-gray-500">
          {documentName || "No document on file"}
        </p>
      </div>
    </div>

    {documentUrl ? (
      <a
        href={documentUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex flex-shrink-0 items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50"
      >
        <FiExternalLink size={13} />
        View document
      </a>
    ) : (
      <span className="flex-shrink-0 text-xs font-medium text-gray-400">
        Not uploaded
      </span>
    )}
  </div>
);

const AgentProfile = () => {
  const [loading, setLoading] = useState(true);

  const [agent, setAgent] = useState(null);
  const [personalData, setPersonalData] = useState(pickPersonal({}));
  const [savedSnapshot, setSavedSnapshot] = useState(null);

  const [savingPersonal, setSavingPersonal] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");
  const [savedIsError, setSavedIsError] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [visible, setVisible] = useState({ current: false, next: false, confirm: false });
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState(null);

  // =====================================================
  // FETCH AGENT PROFILE
  // =====================================================

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getMyAgentProfile();
        const profile = data?.agent;

        if (profile) {
          setAgent(profile);

          const loaded = pickPersonal(profile);
          setPersonalData(loaded);
          setSavedSnapshot(loaded);
        }
      } catch (error) {
        console.error("Failed to fetch agent profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // =====================================================
  // PERSONAL DETAILS
  // =====================================================

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setPersonalData((prev) => ({ ...prev, [name]: value }));
  };

  const valid = {
    fullName: personalData.fullName.trim().length >= 2,
    mobileNumber: /^\d{10}$/.test(personalData.mobileNumber.replace(/\s/g, "")),
    address: personalData.address.trim().length >= 5,
    country: personalData.country.trim().length > 0,
    state: personalData.state.trim().length > 0,
    city: personalData.city.trim().length > 0,
  };

  const isDirty =
    !!savedSnapshot &&
    PERSONAL_KEYS.some((key) => personalData[key] !== savedSnapshot[key]);

  const showSaved = (text, isError, ms) => {
    setSavedMessage(text);
    setSavedIsError(isError);
    setTimeout(() => setSavedMessage(""), ms);
  };

  const handlePersonalSubmit = async (e) => {
    e.preventDefault();

    try {
      setSavingPersonal(true);

      const data = await updateMyAgentProfile({
        fullName: personalData.fullName,
        mobileNumber: personalData.mobileNumber,
        address: personalData.address,
        country: personalData.country,
        state: personalData.state,
        city: personalData.city,
      });

      const updatedAgent = data?.agent;

      if (updatedAgent) {
        setAgent(updatedAgent);

        const next = pickPersonal(updatedAgent);
        setPersonalData(next);
        setSavedSnapshot(next);
      } else {
        setSavedSnapshot(pickPersonal(personalData));
      }

      showSaved("Changes saved", false, 2500);
    } catch (error) {
      console.error("Failed to save agent profile:", error);

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
  // PASSWORD
  // =====================================================

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleVisible = (key) =>
    setVisible((prev) => ({ ...prev, [key]: !prev[key] }));

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
    { label: "A symbol", ok: /[^A-Za-z0-9]/.test(passwordData.newPassword) },
  ];

  const passwordsMatch =
    passwordData.confirmPassword.length > 0 &&
    passwordData.newPassword === passwordData.confirmPassword;

  const passwordsMismatch =
    passwordData.confirmPassword.length > 0 &&
    passwordData.newPassword !== passwordData.confirmPassword;

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (!passwordData.currentPassword || !passwordData.newPassword) return;
    if (passwordData.newPassword !== passwordData.confirmPassword) return;

    try {
      setSavingPassword(true);
      setPasswordMessage(null);

      const response = await api.put("/user/profile/password", {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      setPasswordMessage({
        type: "success",
        text: response?.data?.message || "Password changed successfully",
      });

      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setTimeout(() => setPasswordMessage(null), 4000);
    } catch (error) {
      console.error("Failed to update password:", error);

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
        <div className="h-40 animate-pulse rounded-3xl bg-slate-200/70" />
        <div className="space-y-5 rounded-3xl border border-gray-100 bg-white p-6">
          <div className="h-5 w-48 animate-pulse rounded bg-slate-200/70" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-12 animate-pulse rounded-xl bg-slate-100" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="max-w-4xl p-4 sm:p-6 lg:p-8">
        <div className="rounded-3xl border border-red-100 bg-red-50 p-6 text-center">
          <FiAlertCircle className="mx-auto mb-2 text-red-500" size={22} />
          <p className="text-sm font-semibold text-red-600">
            We couldn't load your agent profile
          </p>
          <p className="mt-1 text-xs text-red-500">
            Please refresh the page, or sign in again.
          </p>
        </div>
      </div>
    );
  }

  const initials = getInitials(agent.fullName);
  const memberSince = agent.createdAt
    ? new Date(agent.createdAt).toLocaleDateString("en-IN", {
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <div className="max-w-4xl space-y-5 p-4 sm:p-6 lg:p-8">
      <style>{styles}</style>

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="ap-rise relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B1120] via-[#0F1A38] to-[#0B1120] p-5 text-white shadow-xl shadow-slate-900/20 sm:p-7">
        <div className="pointer-events-none absolute -right-10 -top-20 h-64 w-64 rounded-full bg-blue-600/25 blur-3xl" />

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
            {initials ? (
              <span className="text-2xl font-semibold tracking-wide">{initials}</span>
            ) : (
              <FiUser size={30} className="text-white/50" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="truncate text-2xl font-semibold">
              {agent.fullName || "Your profile"}
            </h1>

            <p className="mt-0.5 truncate text-sm text-slate-400">
              {agent.email} · {agent.mobileNumber}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-slate-200 ring-1 ring-white/15">
                <FiBriefcase size={12} />
                Registered Agent
              </span>

              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${
                  agent.havingGST
                    ? "bg-emerald-400/15 text-emerald-300 ring-emerald-400/20"
                    : "bg-white/10 text-slate-300 ring-white/15"
                }`}
              >
                <FiCreditCard size={12} />
                {agent.havingGST ? "GST Registered" : "Individual Agent"}
              </span>

              {memberSince && (
                <span className="text-xs text-slate-400">
                  Partner since {memberSince}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* =================================================
          PERSONAL + COMMUNICATION DETAILS
      ================================================= */}

      <form
        onSubmit={handlePersonalSubmit}
        className="ap-rise overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm"
        style={{ animationDelay: "0.12s" }}
      >
        <div className="h-1.5 bg-gradient-to-r from-blue-900 via-blue-500 to-emerald-400" />

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 bg-gradient-to-r from-blue-50/70 via-white to-white px-5 py-5 sm:px-7">
          <div className="flex items-center gap-3.5">
            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0B1120] to-blue-900 text-white shadow-md shadow-blue-900/25">
              <FiUser size={18} />
            </span>

            <div>
              <h2 className="text-base font-semibold text-gray-900">
                Personal &amp; Communication Details
              </h2>
              <p className="mt-0.5 text-sm text-gray-500">
                This is the information you submitted when you registered.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8 p-5 sm:p-7">
          {/* PERSONAL */}
          <section>
            <GroupTitle title="Personal Details" />

            <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
              <Field label="Full Name" required icon={FiUser} valid={valid.fullName}>
                <input
                  name="fullName"
                  value={personalData.fullName}
                  onChange={handlePersonalChange}
                  placeholder="As per your ID proof"
                  className={inputClass}
                />
              </Field>

              <Field
                label="Mobile No."
                required
                icon={FiPhone}
                valid={valid.mobileNumber}
              >
                <input
                  name="mobileNumber"
                  value={personalData.mobileNumber}
                  onChange={handlePersonalChange}
                  placeholder="10-digit number"
                  className={inputClass}
                />
              </Field>

              <div className="sm:col-span-2">
                <Field label="Email Id" icon={FiMail} disabled>
                  <input
                    value={agent.email}
                    disabled
                    className={`${inputClass} cursor-not-allowed text-gray-500`}
                  />
                </Field>
                <p className="mt-1.5 text-xs text-gray-400">
                  Your email is used to sign in and can't be changed here.
                </p>
              </div>
            </div>
          </section>

          {/* COMMUNICATION */}
          <section>
            <GroupTitle title="Communication Details" />

            <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
              <div className="sm:col-span-2 group">
                <label className="mb-1.5 block text-sm font-medium text-gray-600 transition-colors group-focus-within:text-blue-900">
                  Address<span className="ml-0.5 text-red-500">*</span>
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
                    placeholder="Office no. / street, area, landmark, pincode"
                    className={`${inputClass} resize-none py-1.5`}
                  />

                  {valid.address && (
                    <FiCheckCircle className="ap-pop mr-1 mt-2 flex-shrink-0 text-emerald-500" size={16} />
                  )}
                </div>
              </div>

              <Field label="Country" required icon={FiGlobe} valid={valid.country}>
                <input
                  name="country"
                  value={personalData.country}
                  onChange={handlePersonalChange}
                  placeholder="Country"
                  className={inputClass}
                />
              </Field>

              <Field label="State" required icon={FiMap} valid={valid.state}>
                <input
                  name="state"
                  value={personalData.state}
                  onChange={handlePersonalChange}
                  placeholder="State"
                  className={inputClass}
                />
              </Field>

              <div className="sm:col-span-2">
                <Field label="City" required icon={FiMapPin} valid={valid.city}>
                  <input
                    name="city"
                    value={personalData.city}
                    onChange={handlePersonalChange}
                    placeholder="City"
                    className={inputClass}
                  />
                </Field>
              </div>
            </div>
          </section>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 bg-slate-50/70 px-5 py-4 sm:px-7">
          <div className="min-h-[20px] text-sm">
            {savedMessage ? (
              <span
                className={`ap-pop flex items-center gap-1.5 ${
                  savedIsError ? "text-red-600" : "text-emerald-600"
                }`}
              >
                {savedIsError ? <FiAlertCircle size={15} /> : <FiCheck size={15} />}
                {savedMessage}
              </span>
            ) : isDirty ? (
              <span className="ap-pop flex items-center gap-2 text-amber-700">
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
          DOCUMENTS & VERIFICATION (read-only)
      ================================================= */}

      <div
        className="ap-rise overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm"
        style={{ animationDelay: "0.2s" }}
      >
        <div className="flex items-center gap-3.5 border-b border-gray-100 bg-gradient-to-r from-blue-50/70 via-white to-white px-5 py-5 sm:px-7">
          <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0B1120] to-blue-900 text-white shadow-md shadow-blue-900/25">
            <FiShield size={18} />
          </span>

          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Documents &amp; Verification
            </h2>
            <p className="mt-0.5 text-sm text-gray-500">
              Documents you uploaded during registration.
            </p>
          </div>
        </div>

        <div className="space-y-4 p-5 sm:p-7">
          <DocumentRow
            icon={FiFileText}
            label="Identity Proof"
            proofType={agent.identityProof?.proofType}
            documentName={agent.identityProof?.documentName}
            documentUrl={toFileUrl(agent.identityProof?.documentUrl)}
          />

          <DocumentRow
            icon={FiHome}
            label="Office Proof"
            documentName={agent.officeProof?.documentName}
            documentUrl={toFileUrl(agent.officeProof?.documentUrl)}
          />
        </div>
      </div>

      {/* =================================================
          GST DETAILS (read-only)
      ================================================= */}

      <div
        className="ap-rise overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm"
        style={{ animationDelay: "0.28s" }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 bg-gradient-to-r from-blue-50/70 via-white to-white px-5 py-5 sm:px-7">
          <div className="flex items-center gap-3.5">
            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0B1120] to-blue-900 text-white shadow-md shadow-blue-900/25">
              <FiCreditCard size={18} />
            </span>

            <div>
              <h2 className="text-base font-semibold text-gray-900">GST Details</h2>
              <p className="mt-0.5 text-sm text-gray-500">
                Tax registration details, if applicable.
              </p>
            </div>
          </div>

          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
              agent.havingGST
                ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
                : "bg-gray-100 text-gray-600 ring-1 ring-gray-200"
            }`}
          >
            {agent.havingGST ? "GST Registered" : "Not GST Registered"}
          </span>
        </div>

        <div className="p-5 sm:p-7">
          {agent.havingGST ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
                <div>
                  <p className="text-[11px] font-medium text-gray-400">GST Name</p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    {agent.gstName || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-medium text-gray-400">Company Name</p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    {agent.companyName || "—"}
                  </p>
                </div>
              </div>

              <DocumentRow
                icon={FiFileText}
                label="GST Certificate"
                documentName={agent.gstDocument?.documentName}
                documentUrl={toFileUrl(agent.gstDocument?.documentUrl)}
              />
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              You registered as an individual agent without GST. If your GST
              status changes, please contact support to update it.
            </p>
          )}
        </div>
      </div>

      {/* =================================================
          PASSWORD
      ================================================= */}

      <form
        onSubmit={handlePasswordSubmit}
        className="ap-rise overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm"
        style={{ animationDelay: "0.36s" }}
      >
        <div className="flex items-center gap-3.5 border-b border-gray-100 bg-gradient-to-r from-blue-50/70 via-white to-white px-5 py-5 sm:px-7">
          <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0B1120] to-blue-900 text-white shadow-md shadow-blue-900/25">
            <FiLock size={18} />
          </span>

          <div>
            <h2 className="text-base font-semibold text-gray-900">Password</h2>
            <p className="mt-0.5 text-sm text-gray-500">
              Use at least 8 characters with a mix of letters, numbers and symbols.
            </p>
          </div>
        </div>

        <div className="max-w-md space-y-5 p-5 sm:p-7">
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

            {passwordData.newPassword && (
              <div className="ap-pop mt-2.5">
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

                <p className={`mt-1.5 text-xs font-semibold ${strength.tone}`}>
                  {strength.label}
                </p>

                <ul className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1">
                  {passwordRules.map((rule) => (
                    <li
                      key={rule.label}
                      className={`flex items-center gap-1.5 text-xs transition-colors duration-200 ${
                        rule.ok ? "text-emerald-600" : "text-gray-400"
                      }`}
                    >
                      <span
                        className={`flex h-3.5 w-3.5 items-center justify-center rounded-full transition-colors duration-200 ${
                          rule.ok ? "bg-emerald-500 text-white" : "bg-gray-200 text-transparent"
                        }`}
                      >
                        <FiCheck size={9} />
                      </span>
                      {rule.label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

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
                <FiCheck className="ap-pop text-emerald-500 flex-shrink-0" size={16} />
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

            {passwordsMismatch && (
              <p className="ap-pop mt-1.5 text-xs text-red-600">
                Both passwords need to match.
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 border-t border-gray-100 bg-slate-50/70 px-5 py-4 sm:px-7">
          <button
            type="submit"
            disabled={!passwordsMatch || !passwordData.currentPassword || savingPassword}
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

          {passwordMessage && (
            <span
              className={`ap-pop flex items-center gap-1.5 text-sm ${
                passwordMessage.type === "success" ? "text-emerald-600" : "text-red-600"
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
        </div>
      </form>
    </div>
  );
};

export default AgentProfile;
