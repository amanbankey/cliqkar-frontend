 
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Plane,
  MapPin,
  Mail,
  Phone,
  Clock3,
  Send,
  CheckCircle2,
  Luggage,
  CalendarDays,
  Users,
  Globe2,
  Headphones,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import aero from "../assets/image/contactImg.png";

const flightImage =
  "https://images.unsplash.com/photo-1763455892848-39bbc7ca90a0?fm=jpg&q=80&w=1800&auto=format&fit=crop";

const popularRoutes = [
  {
    from: "DEL",
    to: "DXB",
    fromCity: "New Delhi",
    toCity: "Dubai",
    price: "₹12,499",
  },
  {
    from: "BOM",
    to: "LHR",
    fromCity: "Mumbai",
    toCity: "London",
    price: "₹39,999",
  },
  {
    from: "DEL",
    to: "SIN",
    fromCity: "New Delhi",
    toCity: "Singapore",
    price: "₹18,499",
  },
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  from: "",
  to: "",
  travelDate: "",
  returnDate: "",
  travelers: "1",
  cabinClass: "Economy",
  tripType: "Round Trip",
  subject: "Flight Enquiry",
  message: "",
};

export default function FlightContact() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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

    // Replace this with your actual API call.
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Flight enquiry:", form);

    setLoading(false);
    setSubmitted(true);

    setForm(initialForm);
  };

  return (
    <main className="min-h-screen overflow-x-clip bg-white text-slate-900">
      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative isolate overflow-hidden bg-[#071426]">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${aero})`,
          }}
        />

        {/* Dark aviation overlay */}
        {/* <div className="absolute inset-0 bg-[#071426]/90" /> */}

        <div className="absolute inset-0 bg-gradient-to-r from-[#071426] via-[#071426]/45 to-[#071426]/55" />

        {/* Blue glow */}
        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-blue-500/20 blur-[110px]" />

        {/* Amber glow */}
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-amber-400/10 blur-[120px]" />

        {/* Decorative grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        Animated plane
        <div className="pointer-events-none absolute right-[-80px] top-[25%] hidden md:block animate-[flightAcross_12s_linear_infinite]">
          <div className="relative">
            <div className="absolute -inset-8 rounded-full bg-amber-300/20 blur-2xl" />

            <div className="absolute right-8 top-1/2 h-px w-32 -translate-y-1/2 bg-gradient-to-r from-transparent via-amber-300/50 to-amber-300/80" />

            <Plane
              size={28}
              className="relative rotate-[-15deg] text-amber-300 drop-shadow-[0_5px_12px_rgba(251,191,36,0.35)]"
            />
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            {/* Hero content */}
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-3.5 py-2 backdrop-blur-md">
                <span className="flex h-2 w-2 animate-pulse rounded-full bg-amber-300" />

                <span className="text-[10px] font-bold tracking-[0.16em] text-amber-200 sm:text-xs">
                  FLIGHT ASSISTANCE · CLIQKAR
                </span>
              </div>

              <h1 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Your next journey
                <span className="block bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
                  starts here.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                Tell us where you want to go. Our travel experts will help
                you find the right flights, fares, baggage options and travel
                solutions for your journey.
              </p>

              {/* Hero buttons */}
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => navigate("/flight")}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/10"
                >
                  Search Flights
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>

                <a
                  href="#flight-enquiry"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/10"
                >
                  Talk to an Expert
                  <Headphones size={16} />
                </a>
              </div>

              {/* Trust */}
              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={15} className="text-blue-400" />
                  Verified Travel Partners
                </div>

                <div className="flex items-center gap-2">
                  <Clock3 size={15} className="text-amber-300" />
                  24/7 Travel Support
                </div>

                <div className="flex items-center gap-2">
                  <Globe2 size={15} className="text-blue-400" />
                  Global Destinations
                </div>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative mx-auto w-full max-w-[480px]">
              <div className="relative aspect-square">
                {/* Outer orbit */}
                <div className="absolute inset-4 rounded-full border border-dashed border-blue-400/20 animate-[spinSlow_24s_linear_infinite]" />

                <div className="absolute inset-12 rounded-full border border-amber-300/10 animate-[spinReverse_18s_linear_infinite]" />

                {/* Glow */}
                <div className="absolute inset-24 rounded-full bg-blue-500/20 blur-[70px] animate-pulse" />

                {/* Main circle
                <div className="absolute inset-[22%] flex items-center justify-center rounded-full border border-white/10 bg-slate-950/70 shadow-2xl shadow-blue-950/40 backdrop-blur-xl">
                  <div className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-300/20 bg-amber-300/10">
                      <Plane
                        size={30}
                        className="rotate-[-20deg] text-amber-300"
                      />
                    </div>

                    <p className="mt-4 text-[10px] font-bold tracking-[0.2em] text-slate-500">
                      READY FOR TAKEOFF
                    </p>

                    <p className="mt-1 text-lg font-extrabold text-white">
                      DEL → DXB
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Premium flight assistance
                    </p>
                  </div>
                </div> */}

                {/* Orbit plane */}
                {/* <div className="absolute inset-0 animate-[spinSlow_10s_linear_infinite]">
                  <div className="absolute left-1/2 top-[-2px] -translate-x-1/2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-300/30 bg-amber-400/15 shadow-lg shadow-amber-400/20 backdrop-blur">
                      <Plane
                        size={16}
                        className="rotate-45 text-amber-300"
                      />
                    </div>
                  </div>
                </div> */}

                {/* Floating route chips
                <div className="absolute left-0 top-[18%] animate-[floatSoft_4s_ease-in-out_infinite] rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-xl">
                  <p className="text-[9px] font-bold tracking-wider text-slate-500">
                    FROM
                  </p>
                  <p className="mt-0.5 text-sm font-extrabold text-white">
                    DEL
                  </p>
                </div> */}
{/* 
                <div className="absolute right-0 top-[38%] animate-[floatSoft_4.5s_ease-in-out_infinite_0.5s] rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-xl">
                  <p className="text-[9px] font-bold tracking-wider text-slate-500">
                    TO
                  </p>
                  <p className="mt-0.5 text-sm font-extrabold text-white">
                    DXB
                  </p>
                </div>

                <div className="absolute bottom-[12%] left-[12%] animate-[floatSoft_5s_ease-in-out_infinite_1s] rounded-xl border border-amber-300/20 bg-amber-300/10 px-3 py-2 backdrop-blur-xl">
                  <div className="flex items-center gap-2">
                    <Sparkles size={13} className="text-amber-300" />

                    <span className="text-xs font-bold text-amber-100">
                      Curated Fares
                    </span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes flightAcross {
            0% {
              transform: translateX(0) translateY(30px) rotate(-8deg);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            50% {
              transform: translateX(-45vw) translateY(-20px) rotate(-3deg);
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              transform: translateX(-100vw) translateY(-80px) rotate(4deg);
              opacity: 0;
            }
          }

          @keyframes spinSlow {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          @keyframes spinReverse {
            from {
              transform: rotate(360deg);
            }
            to {
              transform: rotate(0deg);
            }
          }

          @keyframes floatSoft {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-9px);
            }
          }
        `}</style>
      </section>

      {/* =========================================================
          CONTACT / ENQUIRY
      ========================================================== */}
      <section
        id="flight-enquiry"
        className="relative bg-[#eef1f8] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
      >
        <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-400/10 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl">
          {/* Section heading */}
          <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-2">
              <Send size={13} className="text-blue-600" />

              <span className="text-[10px] font-bold tracking-[0.15em] text-blue-700 sm:text-xs">
                SEND A FLIGHT ENQUIRY
              </span>
            </div>

            <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Let's plan your
              <span className="text-blue-600"> next flight.</span>
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-500 sm:text-base">
              Share your travel requirements and our team will get back to
              you with suitable flight options.
            </p>
          </div>

          <div className="grid items-start gap-6 lg:grid-cols-[0.72fr_1.28fr]">
            {/* LEFT INFO */}
            <div className="relative overflow-hidden rounded-[2rem] bg-[#071426] p-6 shadow-2xl sm:p-8 lg:p-10 lg:sticky lg:top-24 self-start">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-15"
                style={{
                  backgroundImage: `url(${flightImage})`,
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-b from-[#071426]/80 via-[#071426]/90 to-[#071426]" />

              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-300/20 bg-amber-300/10">
                  <Headphones size={22} className="text-amber-300" />
                </div>

                <h3 className="mt-6 text-2xl font-extrabold text-white">
                  Flight Concierge
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Not sure which flight or fare is right for you? Let our
                  travel experts handle the details.
                </p>

                <div className="mt-8 space-y-4">
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
                    title="Travel desk"
                    value="India · Global Support"
                    iconClass="text-amber-300 bg-amber-300/10"
                  />
                </div>

                {/* Promise */}
                <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <div className="flex items-start gap-3">
                    <ShieldCheck
                      size={19}
                      className="mt-0.5 shrink-0 text-emerald-400"
                    />

                    <div>
                      <p className="text-sm font-bold text-white">
                        Trusted assistance
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Your travel requirements are handled with care by our
                        verified travel partners.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FORM */}
            <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/50 sm:p-7 lg:p-9">
              {submitted ? (
                <SuccessMessage
                  onReset={() => setSubmitted(false)}
                  onFlights={() => navigate("/flight")}
                />
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Personal info */}
                  <div>
                    <div className="mb-5 flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-xs font-bold text-white">
                        01
                      </span>

                      <div>
                        <h3 className="text-sm font-extrabold text-slate-900">
                          Your details
                        </h3>

                        <p className="text-xs text-slate-400">
                          How can we reach you?
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
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
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        required
                      />

                      <SelectField
                        label="Travellers"
                        name="travelers"
                        value={form.travelers}
                        onChange={handleChange}
                        options={[
                          ["1", "1 Traveller"],
                          ["2", "2 Travellers"],
                          ["3", "3 Travellers"],
                          ["4", "4 Travellers"],
                          ["5+", "5+ Travellers"],
                        ]}
                      />
                    </div>
                  </div>

                  {/* Journey */}
                  <div className="my-8 border-t border-slate-100 pt-8">
                    <div className="mb-5 flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-xs font-bold text-white">
                        02
                      </span>

                      <div>
                        <h3 className="text-sm font-extrabold text-slate-900">
                          Journey details
                        </h3>

                        <p className="text-xs text-slate-400">
                          Tell us about your trip
                        </p>
                      </div>
                    </div>

                    {/* Trip type */}
                    <div className="mb-4 grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">
                      {["Round Trip", "One Way"].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() =>
                            setForm((prev) => ({
                              ...prev,
                              tripType: type,
                            }))
                          }
                          className={`rounded-lg px-3 py-2.5 text-xs font-bold transition ${
                            form.tripType === type
                              ? "bg-white text-slate-900 shadow-sm"
                              : "text-slate-500 hover:text-slate-800"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <InputField
                        label="From"
                        name="from"
                        value={form.from}
                        onChange={handleChange}
                        placeholder="Delhi (DEL)"
                        icon={<MapPin size={15} />}
                        required
                      />

                      <InputField
                        label="To"
                        name="to"
                        value={form.to}
                        onChange={handleChange}
                        placeholder="Dubai (DXB)"
                        icon={<MapPin size={15} />}
                        required
                      />

                      <InputField
                        label="Departure Date"
                        name="travelDate"
                        type="date"
                        value={form.travelDate}
                        onChange={handleChange}
                        icon={<CalendarDays size={15} />}
                        required
                      />

                      {form.tripType === "Round Trip" && (
                        <InputField
                          label="Return Date"
                          name="returnDate"
                          type="date"
                          value={form.returnDate}
                          onChange={handleChange}
                          icon={<CalendarDays size={15} />}
                        />
                      )}

                      <SelectField
                        label="Cabin Class"
                        name="cabinClass"
                        value={form.cabinClass}
                        onChange={handleChange}
                        options={[
                          ["Economy", "Economy"],
                          ["Premium Economy", "Premium Economy"],
                          ["Business", "Business"],
                          ["First", "First Class"],
                        ]}
                      />

                      <SelectField
                        label="Enquiry Type"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        options={[
                          ["Flight Enquiry", "Flight Enquiry"],
                          ["Best Fare", "Best Fare"],
                          ["Baggage Assistance", "Baggage Assistance"],
                          ["Group Booking", "Group Booking"],
                          ["Corporate Travel", "Corporate Travel"],
                        ]}
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="border-t border-slate-100 pt-8">
                    <div className="mb-5 flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-xs font-bold text-white">
                        03
                      </span>

                      <div>
                        <h3 className="text-sm font-extrabold text-slate-900">
                          Additional information
                        </h3>

                        <p className="text-xs text-slate-400">
                          Anything else we should know?
                        </p>
                      </div>
                    </div>

                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell us about your travel plans, preferred timings, baggage requirements or any special assistance..."
                      className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    />

                    <button
                      type="submit"
                      disabled={loading}
                      className="group mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#071426] px-5 py-3.5 text-sm font-bold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-slate-900 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Sending Enquiry...
                        </>
                      ) : (
                        <>
                          Send Flight Enquiry
                          <ArrowRight
                            size={16}
                            className="transition-transform group-hover:translate-x-1"
                          />
                        </>
                      )}
                    </button>

                    <p className="mt-3 text-center text-[10px] text-slate-400">
                      Our travel team will review your request and get back to
                      you.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

   

    

    
    </main>
  );
}

/* =============================================================
   INPUT COMPONENT
============================================================= */

function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  icon,
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold text-slate-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </span>
        )}

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 ${
            icon ? "pl-10" : ""
          }`}
        />
      </div>
    </div>
  );
}

/* =============================================================
   SELECT COMPONENT
============================================================= */

function SelectField({
  label,
  name,
  value,
  onChange,
  options = [],
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold text-slate-700">
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition hover:border-slate-300 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
      >
        {options.map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

/* =============================================================
   CONTACT INFO
============================================================= */

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

/* =============================================================
   FEATURE CARD
============================================================= */

function FeatureCard({
  icon,
  title,
  description,
  iconClass,
}) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
      >
        {icon}
      </div>

      <h3 className="mt-5 text-sm font-extrabold text-slate-950">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-5 text-slate-500">
        {description}
      </p>
    </div>
  );
}

/* =============================================================
   SUCCESS MESSAGE
============================================================= */

function SuccessMessage({
  onReset,
  onFlights,
}) {
  return (
    <div className="flex min-h-[580px] flex-col items-center justify-center text-center">
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
        Enquiry received!
      </h3>

      <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
        Thanks for contacting Cliqkar. Our travel team will review your
        requirements and get back to you with suitable options.
      </p>

      <div className="mt-7 flex w-full max-w-sm flex-col gap-3 sm:flex-row">
        <button
          onClick={onFlights}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-600"
        >
          Browse Flights
          <ArrowRight size={15} />
        </button>

        <button
          onClick={onReset}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
        >
          New Enquiry
        </button>
      </div>
    </div>
  );
} 