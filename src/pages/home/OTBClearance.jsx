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
 
  <section className="relative overflow-hidden bg-slate-50 px-4 py-14 sm:px-6 sm:py-20 lg:px-10">

  {/* Radar Grid */}
  <div
    className="pointer-events-none absolute inset-0 opacity-[0.05]"
    style={{
      backgroundImage:
        "linear-gradient(#0284c7 1px, transparent 1px), linear-gradient(90deg, #0284c7 1px, transparent 1px)",
      backgroundSize: "36px 36px",
    }}
  />

  {/* Ambient Lights */}
  <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 animate-[dcsGlow_8s_ease-in-out_infinite] rounded-full bg-blue-400/15 blur-[120px]" />

  <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 animate-[dcsGlow_10s_ease-in-out_infinite_reverse] rounded-full bg-emerald-400/15 blur-[120px]" />

 

  <div className="relative mx-auto max-w-7xl">

    {/* Heading */}
    <div className="mb-10 text-center">

      <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-3 py-1.5">

        <span className="relative flex h-2 w-2">
          <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500" />
          <span className="relative block h-2 w-2 rounded-full bg-emerald-500" />
        </span>

        <span className="text-[10px] font-bold tracking-[0.16em] text-cyan-700">
          AIRLINE DEPARTURE CONTROL SYSTEM · DCS TIER 1
        </span>
      </div>

           
      <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        Ready to Fly.{" "}
        <span className="text-blue-600 ">
          Verified to Board.
        </span>
      </h2>

      <p className="mx-auto max-w-2xl text-sm text-slate-500 sm:text-base">
        Automated pre-flight clearance synchronized with civil aviation
        desks and airline DCS networks.
      </p>
    </div>

    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

   
      <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm backdrop-blur-sm transition-all duration-500 hover:border-cyan-400/50 sm:p-6">

        {/* Corner Brackets */}
        <span className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-cyan-500/60 transition-all duration-500 group-hover:h-12 group-hover:w-12" />

        <span className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-cyan-500/30 transition-all duration-500 group-hover:h-12 group-hover:w-12" />

        <span className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-cyan-500/30 transition-all duration-500 group-hover:h-12 group-hover:w-12" />

        <span className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-cyan-500/60 transition-all duration-500 group-hover:h-12 group-hover:w-12" />

        {/* Horizontal Scanner */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute left-0 h-px w-full animate-[terminalScan_3s_linear_infinite] bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
        </div>

        {/* Header */}
        <div className="relative z-10 mb-5 flex items-center justify-between">

          <div className="flex items-center gap-2">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-400/30 bg-blue-500/10">
              <Mail
                className="text-blue-600 transition-transform duration-500 group-hover:scale-110"
                size={18}
              />
            </div>

            <h3 className="text-sm font-bold text-slate-900 sm:text-base">
              OTB Clearance Engine
            </h3>
          </div>

          <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">

            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500" />
              <span className="relative block h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>

            GATE LINK ACTIVE
          </span>
        </div>

        <p className="relative z-10 mb-6 text-xs text-slate-500">
          Direct GCC Aviation Protocol Synchronization
        </p>

        <form
          onSubmit={handleClearanceCheck}
          className="relative z-10 space-y-4"
        >

          {/* Input helper */}
          {[
            ["carrier", "SELECT CARRIER", clearanceForm.carrier],
            ["portOfEntry", "PORT OF ENTRY", clearanceForm.portOfEntry],
          ].map(([field, label, value]) => (
            <div
              key={field}
              className="group/input relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition-all duration-300 focus-within:border-cyan-400/60 focus-within:bg-cyan-50"
            >
              <div className="absolute bottom-0 left-0 h-px w-0 bg-cyan-500 transition-all duration-500 group-focus-within/input:w-full" />

              <p className="mb-1 text-[10px] font-semibold tracking-wide text-slate-400">
                {label}
              </p>

              <input
                value={value}
                onChange={(e) => handleChange(field, e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-slate-900 outline-none"
              />
            </div>
          ))}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            {[
              ["travelDate", "TRAVEL DATE", "date"],
              ["pnr", "AIRLINE PNR / BOOKING REF", "text"],
            ].map(([field, label, type]) => (
              <div
                key={field}
                className="group/input relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition-all duration-300 focus-within:border-cyan-400/60"
              >
                <div className="absolute bottom-0 left-0 h-px w-0 bg-cyan-500 transition-all duration-500 group-focus-within/input:w-full" />

                <p className="mb-1 text-[10px] font-semibold tracking-wide text-slate-400">
                  {label}
                </p>

                <input
                  type={type}
                  value={clearanceForm[field]}
                  onChange={(e) =>
                    handleChange(field, e.target.value)
                  }
                  className="w-full bg-transparent text-sm font-semibold text-slate-900 outline-none"
                />
              </div>
            ))}
          </div>

          <div className="group/input relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition-all duration-300 focus-within:border-cyan-400/60">

            <div className="absolute bottom-0 left-0 h-px w-0 bg-cyan-500 transition-all duration-500 group-focus-within/input:w-full" />

            <p className="mb-1 text-[10px] font-semibold tracking-wide text-slate-400">
              BIOMETRIC PASSPORT ID
            </p>

            <input
              value={clearanceForm.passportId}
              onChange={(e) =>
                handleChange("passportId", e.target.value)
              }
              className="w-full bg-transparent text-sm font-semibold text-slate-900 outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 pt-1 sm:flex-row">

            <button
              type="submit"
              className="group/check relative flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_0_35px_rgba(37,99,235,0.25)]"
            >

              <span className="absolute -left-20 top-0 h-full w-12 rotate-[20deg] bg-white/30 transition-all duration-700 group-hover/check:left-[130%]" />

              <span className="relative">
                Execute Clearance Check
              </span>

              <ArrowRight
                size={16}
                className="relative transition-transform duration-300 group-hover/check:translate-x-1.5"
              />
            </button>

            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-900 transition-all duration-300 hover:border-cyan-400/50 hover:bg-cyan-50"
            >
              <FileText size={16} />
              Audit Log
            </button>

          </div>
        </form>
      </div>

      {/* ================= RIGHT SIDE ================= */}

      <div className="flex flex-col gap-5">

        {/* Audit Trail */}
        <div className="group relative flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm backdrop-blur-sm transition-all duration-500 hover:border-emerald-400/40 sm:p-6">

          {/* Data Stream */}
          <div className="pointer-events-none absolute left-[27px] top-20 bottom-8 w-px overflow-hidden bg-slate-200">
            <div className="absolute left-0 top-0 h-20 w-px animate-[dataStream_2.5s_linear_infinite] bg-gradient-to-b from-transparent via-emerald-500 to-transparent" />
          </div>

        <div> 
          <div className="relative z-10 mb-5 flex items-center justify-between gap-3">

            <p className="text-[10px] font-semibold tracking-wide text-amber-600 sm:text-[11px]">
              LIVE VERIFICATION AUDIT TRAIL · PNR:{" "}
              {clearanceForm.pnr}
            </p>

            <span className="flex flex-shrink-0 items-center gap-1.5 text-[10px] font-semibold text-emerald-600">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              DCS SYNC OK
            </span>
          </div> 
 

          </div>

          <div className="relative z-10 space-y-14">

            {auditTrail.map((item, index) => (
              <div
                key={item.title}
                className="group/audit flex gap-3  animate-[auditReveal_700ms_ease-out_forwards]"
                style={{
                  animationDelay: `${index * 500}ms`,
                }}
              >

                <div className="relative flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 transition-all duration-500 group-hover/audit:border-emerald-400/70 group-hover/audit:bg-emerald-400/15">

                  <CheckCircle2
                    className="text-emerald-600 transition-transform duration-300 group-hover/audit:scale-125"
                    size={16}
                  />

                </div>

                <div>
                  <p className="text-slate-900 text-sm font-semibold">
                        {item.title}
                      </p>
                      <p className="text-slate-500 text-xs">
                        {item.description}
                      </p>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* Clearance Result */}
        {cleared && (
          <div className="group/result relative overflow-hidden rounded-2xl border border-emerald-400/40 bg-emerald-50 p-5 shadow-sm transition-all duration-500 hover:border-emerald-400/70 hover:shadow-[0_0_45px_rgba(16,185,129,0.12)] sm:p-6">

            {/* Approval Scanner */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-1/3 -translate-x-full bg-gradient-to-r from-transparent via-emerald-300/20 to-transparent skew-x-12 animate-[approvalScan_3.5s_ease-in-out_infinite]" />

            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">

              <div className="flex items-center gap-4">

                <div className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-500 shadow-[0_0_25px_rgba(52,211,153,0.3)] transition-transform duration-500 group-hover/result:scale-110">

                  <div className="absolute inset-0 animate-ping rounded-xl bg-emerald-400/30" />

                  <ShieldCheck
                    className="relative text-white"
                    size={22}
                  />
                </div>

                <div>
                  <span className="mb-1 inline-block rounded bg-emerald-400/20 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                    CLEARED & STAMPED
                  </span>

                  <p className="text-sm font-bold leading-snug text-slate-900 sm:text-base">
                    OK TO BOARD — Clearance Approved
                  </p>

                  <p className="text-xs text-slate-500">
                    Flight AIX 192 · Gate clearance verified in carrier DCS database
                  </p>
                </div>
              </div>

              <button className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                <Download size={16} />
                Download Slip
              </button>

            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  </section>
  );
}