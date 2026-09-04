import React, { useState } from "react";
import { FiCheckCircle } from "react-icons/fi";

const OTBHero = () => {
  const [activeTab, setActiveTab] = useState("check");
  const [formData, setFormData] = useState({
    airline: "Emirates (EK) - Dubai Terminal 3 Direct",
    pnr: "",
    eTicket: "",
    lastName: "",
    departureDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/otb/check-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      await response.json();
    } catch (error) {
      console.error("Failed to check PNR status", error);
    }
  };

  return (
    <section className="bg-[#0B1120]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-wide text-amber-400 bg-amber-400/10 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            AIRLINE VERIFICATION • FAST CLEARANCE • 100% AIRPORT READY
          </span>

          <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            Ready to Fly. Verified to Board.
          </h1>

          <p className="mt-4 text-sm sm:text-base text-gray-400 max-w-md">
            Ensure mandatory airline clearance before heading to the airport. Submit your PNR and visa for instant
            verification across major Gulf &amp; Asian carriers.
          </p>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {["Direct Airline API Sync", "4-6 Hour Express SLA", "Zero Airport Delays"].map((item) => (
              <span key={item} className="flex items-center gap-1.5 text-xs text-gray-300">
                <FiCheckCircle className="text-emerald-400" size={13} /> {item}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="flex gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </span>
              <span className="text-xs font-semibold text-gray-500">CLEARANCE TERMINAL V4.2</span>
            </div>
            <span className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> LIVE GDS LINK
            </span>
          </div>

          <div className="flex bg-gray-100 rounded-lg p-1 mb-5">
            <button
              onClick={() => setActiveTab("check")}
              className={`flex-1 text-xs font-semibold py-2 rounded-md ${activeTab === "check" ? "bg-blue-600 text-white" : "text-gray-500"}`}
            >
              Check Status
            </button>
            <button
              onClick={() => setActiveTab("new")}
              className={`flex-1 text-xs font-semibold py-2 rounded-md ${activeTab === "new" ? "bg-blue-600 text-white" : "text-gray-500"}`}
            >
              New OTB Request
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="text-xs text-gray-500">Airline Carrier</label>
              <select
                name="airline"
                value={formData.airline}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none"
              >
                <option>Emirates (EK) - Dubai Terminal 3 Direct</option>
                <option>Air India Express (IX)</option>
                <option>IndiGo Airlines (6E)</option>
                <option>SpiceJet (SG)</option>
                <option>Flydubai (FZ)</option>
                <option>Gulf Air (GF)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500">Booking Reference / PNR</label>
                <input
                  type="text"
                  name="pnr"
                  value={formData.pnr}
                  onChange={handleChange}
                  placeholder="CLQ8921"
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">E-Ticket Number (13 Digits)</label>
                <input
                  type="text"
                  name="eTicket"
                  value={formData.eTicket}
                  onChange={handleChange}
                  placeholder="176-2910482012"
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500">Passenger Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="MEHTA"
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 uppercase focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">Travel Departure Date</label>
                <input
                  type="date"
                  name="departureDate"
                  value={formData.departureDate}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none"
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-3 rounded-lg">
              CHECK PNR STATUS →
            </button>

            <p className="text-center text-[11px] text-gray-400">⚡ Average verification confirmation time: under 4 hours.</p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default OTBHero;
