import { useState } from "react";
import {
  Mail,
  ArrowRight,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Download,
} from "lucide-react";

const auditTrail = [
  {
    title: "Biometric Documentation Dossier Verified",
    description:
      "Passenger passport digital copy and approved GCC e-Visa validated.",
  },
  {
    title: "Carrier PNR & Manifest Cross-Check",
    description:
      "Confirmed live seat inventory on Air India Express AIX 192.",
  },
  {
    title: "Civil Aviation Desk Clearance Stamped",
    description:
      "Official Gulf aviation board clearance code issued to airline terminal.",
  },
];

export default function OTBClearance() {
  const [clearanceForm, setClearanceForm] = useState({
    carrier: "Air India Express",
    portOfEntry: "United Arab Emirates (DXB)",
    travelDate: "2026-10-28",
    pnr: "CKR89921DEL",
    passportId: "Z6492019",
  });

  const [cleared, setCleared] = useState(true);

  const handleChange = (field, value) => {
    setClearanceForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleClearanceCheck = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/otb/clearance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clearanceForm),
      });
      const data = await response.json();
      setCleared(Boolean(data.cleared));
    } catch (error) {
      console.log("clearance check error", error);
    }
  };

  return (
    <section className="bg-[#0a1628] py-14 sm:py-20 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-amber-300 text-[11px] font-semibold tracking-wide">
              AIRLINE DEPARTURE CONTROL SYSTEM · DCS TIER 1
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Ready to Fly. Verified to Board.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Automated pre-flight clearance synchronized with civil aviation
            desks and airline DCS networks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Mail className="text-blue-400" size={18} />
                <h3 className="text-white font-bold text-sm sm:text-base">
                  OTB Clearance Engine
                </h3>
              </div>
              <span className="flex items-center gap-1.5 bg-emerald-400/10 text-emerald-300 text-[10px] font-semibold px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                GATE LINK ACTIVE
              </span>
            </div>
            <p className="text-slate-400 text-xs mb-6">
              Direct GCC Aviation Protocol Synchronization
            </p>

            <form onSubmit={handleClearanceCheck} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <p className="text-slate-400 text-[10px] font-semibold tracking-wide mb-1">
                    SELECT CARRIER
                  </p>
                  <input
                    value={clearanceForm.carrier}
                    onChange={(e) => handleChange("carrier", e.target.value)}
                    className="text-white text-sm font-semibold outline-none w-full bg-transparent"
                  />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <p className="text-slate-400 text-[10px] font-semibold tracking-wide mb-1">
                    PORT OF ENTRY
                  </p>
                  <input
                    value={clearanceForm.portOfEntry}
                    onChange={(e) =>
                      handleChange("portOfEntry", e.target.value)
                    }
                    className="text-white text-sm font-semibold outline-none w-full bg-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <p className="text-slate-400 text-[10px] font-semibold tracking-wide mb-1">
                    TRAVEL DATE
                  </p>
                  <input
                    type="date"
                    value={clearanceForm.travelDate}
                    onChange={(e) =>
                      handleChange("travelDate", e.target.value)
                    }
                    className="text-white text-sm font-semibold outline-none w-full bg-transparent"
                  />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <p className="text-slate-400 text-[10px] font-semibold tracking-wide mb-1">
                    AIRLINE PNR / BOOKING REF
                  </p>
                  <input
                    value={clearanceForm.pnr}
                    onChange={(e) => handleChange("pnr", e.target.value)}
                    className="text-white text-sm font-semibold outline-none w-full bg-transparent"
                  />
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                <p className="text-slate-400 text-[10px] font-semibold tracking-wide mb-1">
                  BIOMETRIC PASSPORT ID
                </p>
                <input
                  value={clearanceForm.passportId}
                  onChange={(e) =>
                    handleChange("passportId", e.target.value)
                  }
                  className="text-white text-sm font-semibold outline-none w-full bg-transparent"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-sm transition-colors"
                >
                  Execute Clearance Check <ArrowRight size={16} />
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white font-semibold py-3 px-5 rounded-xl text-sm"
                >
                  <FileText size={16} /> Audit Log
                </button>
              </div>
            </form>
          </div>

          <div className="flex flex-col gap-5">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 flex-1">
              <div className="flex items-center justify-between mb-5">
                <p className="text-amber-300 text-[11px] font-semibold tracking-wide">
                  LIVE VERIFICATION AUDIT TRAIL · PNR: {clearanceForm.pnr}
                </p>
                <span className="text-emerald-400 text-[10px] font-semibold">
                  DCS SYNC OK
                </span>
              </div>

              <div className="space-y-5">
                {auditTrail.map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <CheckCircle2
                      className="text-emerald-400 shrink-0 mt-0.5"
                      size={18}
                    />
                    <div>
                      <p className="text-white text-sm font-semibold">
                        {item.title}
                      </p>
                      <p className="text-slate-400 text-xs">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {cleared && (
              <div className="bg-emerald-950/40 border border-emerald-400/30 rounded-2xl p-5 sm:p-6 flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-400 flex items-center justify-center shrink-0">
                    <ShieldCheck className="text-emerald-950" size={22} />
                  </div>
                  <div>
                    <span className="inline-block bg-emerald-400/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded mb-1">
                      CLEARED & STAMPED
                    </span>
                    <p className="text-white font-bold text-sm sm:text-base leading-snug">
                      OK TO BOARD — Clearance Approved
                    </p>
                    <p className="text-slate-400 text-xs">
                      Flight AIX 192 · Gate clearance verified in carrier
                      DCS database
                    </p>
                  </div>
                </div>
                <button className="flex items-center gap-2 bg-white text-slate-900 font-semibold text-sm px-4 py-2.5 rounded-lg shrink-0">
                  <Download size={16} /> Download Slip
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}