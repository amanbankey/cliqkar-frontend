import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Mail,
  Phone,
  Clock3,
  Send,
  CheckCircle2,
  MapPin,
  Headphones,
  ShieldCheck,
} from "lucide-react";

import aero from "../assets/image/contactImg.png";
import flight from "../assets/image/flight.jpg";

import api from "../api/axios";

const initialForm = {
  name: "",
  email: "",
  mobileNumber: "",
  subject: "",
  message: "",
};

export default function FlightContact() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/contact", {
        name: form.name,
        email: form.email,
        mobileNumber: form.mobileNumber,
        subject: form.subject,
        message: form.message,
      });

      setTicketId(response.data?.data?.ticketId || "");

      setSubmitted(true);
      setForm(initialForm);
    } catch (err) {
      console.error("Contact form error:", err);

      setError(
        err.response?.data?.message ||
          "Could not send your message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen overflow-x-clip bg-white text-slate-900">

      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[#071426]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${flight})`,
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#071426] via-[#071426]/60 to-[#071426]/50" />

        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-blue-500/20 blur-[110px]" />

        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-amber-400/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">

            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-3.5 py-2">
                <span className="flex h-2 w-2 animate-pulse rounded-full bg-amber-300" />

                <span className="text-[10px] font-bold tracking-[0.16em] text-amber-200 sm:text-xs">
                  CONTACT · CLIQKAR
                </span>
              </div>

              <h1 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
                We're here to help.
                <span className="block bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
                  Let's talk.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                Have a question, request or need assistance? Send us a
                message and our support team will get back to you.
              </p>

              <div className="mt-7 flex flex-wrap gap-5 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={15} className="text-blue-400" />
                  Trusted Support
                </div>

                <div className="flex items-center gap-2">
                  <Clock3 size={15} className="text-amber-300" />
                  Quick Response
                </div>

                <div className="flex items-center gap-2">
                  <Headphones size={15} className="text-blue-400" />
                  Travel Assistance
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[450px]">
              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-300/10">
                  <Headphones
                    size={26}
                    className="text-amber-300"
                  />
                </div>

                <h2 className="mt-6 text-2xl font-extrabold text-white">
                  Contact Support
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Our team is ready to help with your questions and
                  requirements.
                </p>

                <div className="mt-7 space-y-5">
                  <ContactInfo
                    icon={<Phone size={17} />}
                    title="Call us"
                    value="+91 98765 43210"
                    iconClass="text-blue-400 bg-blue-400/10"
                  />

                  <ContactInfo
                    icon={<Mail size={17} />}
                    title="Email us"
                    value="flights@cliqkar.com"
                    iconClass="text-amber-300 bg-amber-300/10"
                  />

                  <ContactInfo
                    icon={<Clock3 size={17} />}
                    title="Support hours"
                    value="24/7 Travel Assistance"
                    iconClass="text-blue-400 bg-blue-400/10"
                  />

                  <ContactInfo
                    icon={<MapPin size={17} />}
                    title="Support desk"
                    value="India · Global Support"
                    iconClass="text-amber-300 bg-amber-300/10"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="relative bg-[#eef1f8] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">

        <div className="relative mx-auto max-w-4xl">

          <div className="mx-auto mb-10 max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-2">
              <Send size={13} className="text-blue-600" />

              <span className="text-[10px] font-bold tracking-[0.15em] text-blue-700 sm:text-xs">
                SEND US A MESSAGE
              </span>
            </div>

            <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              How can we{" "}
              <span className="text-blue-600">
                help you?
              </span>
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-500 sm:text-base">
              Fill in the details below and our support team will contact
              you.
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/50 sm:p-8 lg:p-10">

            {submitted ? (
              <div className="flex min-h-[450px] flex-col items-center justify-center text-center">

                <div className="relative">
                  <div className="absolute -inset-5 rounded-full bg-emerald-400/10 blur-2xl" />

                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
                    <CheckCircle2
                      size={42}
                      className="text-emerald-500"
                    />
                  </div>
                </div>

                <h3 className="mt-7 text-2xl font-black text-slate-950">
                  Message received!
                </h3>

                <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
                  Thank you for contacting Cliqkar. Our support team will
                  review your message and get back to you shortly.
                </p>

                {ticketId && (
                  <div className="mt-5 rounded-xl bg-blue-50 px-5 py-3">
                    <p className="text-xs text-slate-500">
                      Your Support ID
                    </p>

                    <p className="mt-1 text-sm font-bold text-blue-700">
                      {ticketId}
                    </p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setTicketId("");
                  }}
                  className="mt-7 rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-600"
                >
                  Send Another Message
                </button>

              </div>
            ) : (
              <form onSubmit={handleSubmit}>

                <div className="grid gap-5 sm:grid-cols-2">

                  <InputField
                    label="Full Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />

                  <InputField
                    label="Email Address"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />

                  <InputField
                    label="Mobile Number"
                    name="mobileNumber"
                    type="tel"
                    value={form.mobileNumber}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    required
                  />

                  <InputField
                    label="Subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Enter subject"
                    required
                  />

                </div>

                <div className="mt-5">
                  <label className="mb-2 block text-xs font-bold text-slate-700">
                    Message
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={7}
                    required
                    placeholder="Write your message..."
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>

                {error && (
                  <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-xs font-semibold text-red-600">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="group mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#071426] px-5 py-4 text-sm font-bold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>

                <p className="mt-3 text-center text-[10px] text-slate-400">
                  Your information will be securely submitted to our
                  support team.
                </p>

              </form>
            )}

          </div>
        </div>
      </section>
    </main>
  );
}


// =====================================================
// INPUT
// =====================================================

function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold text-slate-700">
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
      />
    </div>
  );
}


// =====================================================
// CONTACT INFO
// =====================================================

function ContactInfo({
  icon,
  title,
  value,
  iconClass = "",
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </p>

        <p className="mt-0.5 truncate text-sm font-semibold text-white">
          {value}
        </p>
      </div>
    </div>
  );
}