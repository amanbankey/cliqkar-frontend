import React, { useState } from "react";
import { FiArrowRight, FiZap, FiAward } from "react-icons/fi";

const EligibilityChecker = () => {
  const [form, setForm] = useState({
    nationality: "India (Regular Passport)",
    destination: "France (Schengen Zone)",
    purpose: "Tourism & Leisure Exploration",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/visa/eligibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      await response.json();
    } catch (error) {
      console.error("Eligibility check failed", error);
    }
  };

  return (
    <section className="bg-indigo-50/40 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F172A] rounded-3xl p-6 sm:p-10">
          <span className="inline-flex items-center gap-2 bg-slate-800 text-slate-300 text-[11px] font-bold tracking-wide px-3 py-1.5 rounded-full mb-5">
            <FiAward className="text-emerald-400" size={13} /> CONSULAR RULES ENGINE 2026
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white mb-4">Not Sure Which Visa You Need?</h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mb-8">
            Answer 3 simple questions and our consular intelligence engine maps your exact visa protocol, document
            prerequisites, and issuance timeline in under 60 seconds.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="text-xs font-medium text-slate-400 mb-2 block">1. Your Nationality / Passport</label>
                <select
                  name="nationality"
                  value={form.nationality}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-xl px-4 py-3.5 focus:outline-none"
                >
                  <option>India (Regular Passport)</option>
                  <option>USA (Regular Passport)</option>
                  <option>UK (Regular Passport)</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-400 mb-2 block">2. Destination Country</label>
                <select
                  name="destination"
                  value={form.destination}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-xl px-4 py-3.5 focus:outline-none"
                >
                  <option>France (Schengen Zone)</option>
                  <option>United Arab Emirates</option>
                  <option>Thailand</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-400 mb-2 block">3. Purpose of Travel</label>
                <select
                  name="purpose"
                  value={form.purpose}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-xl px-4 py-3.5 focus:outline-none"
                >
                  <option>Tourism & Leisure Exploration</option>
                  <option>Business Meetings</option>
                  <option>Family Visit</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="flex items-center gap-2 text-xs text-slate-400">
                <FiZap className="text-emerald-400" size={13} /> Takes less than 2 minutes · No account required · Instant document matrix
              </p>
              <button type="submit" className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-6 py-3.5 rounded-xl">
                Check Eligibility &amp; Requirements <FiArrowRight size={16} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EligibilityChecker;