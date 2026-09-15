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
    // <section className="bg-[#0a1628] py-14 sm:py-20 px-4 sm:px-6 lg:px-10">
    //   <div className="max-w-7xl mx-auto">
    //     <div className="text-center mb-10">
    //       <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 mb-4">
    //         <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
    //         <span className="text-amber-300 text-[11px] font-semibold tracking-wide">
    //           AIRLINE DEPARTURE CONTROL SYSTEM · DCS TIER 1
    //         </span>
    //       </div>
    //       <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
    //         Ready to Fly. Verified to Board.
    //       </h2>
    //       <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
    //         Automated pre-flight clearance synchronized with civil aviation
    //         desks and airline DCS networks.
    //       </p>
    //     </div>

    //     <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
    //       <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
    //         <div className="flex items-center justify-between mb-5">
    //           <div className="flex items-center gap-2">
    //             <Mail className="text-blue-400" size={18} />
    //             <h3 className="text-white font-bold text-sm sm:text-base">
    //               OTB Clearance Engine
    //             </h3>
    //           </div>
    //           <span className="flex items-center gap-1.5 bg-emerald-400/10 text-emerald-300 text-[10px] font-semibold px-2.5 py-1 rounded-full">
    //             <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
    //             GATE LINK ACTIVE
    //           </span>
    //         </div>
    //         <p className="text-slate-400 text-xs mb-6">
    //           Direct GCC Aviation Protocol Synchronization
    //         </p>

    //         <form onSubmit={handleClearanceCheck} className="space-y-4">
    //           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    //             <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
    //               <p className="text-slate-400 text-[10px] font-semibold tracking-wide mb-1">
    //                 SELECT CARRIER
    //               </p>
    //               <input
    //                 value={clearanceForm.carrier}
    //                 onChange={(e) => handleChange("carrier", e.target.value)}
    //                 className="text-white text-sm font-semibold outline-none w-full bg-transparent"
    //               />
    //             </div>
    //             <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
    //               <p className="text-slate-400 text-[10px] font-semibold tracking-wide mb-1">
    //                 PORT OF ENTRY
    //               </p>
    //               <input
    //                 value={clearanceForm.portOfEntry}
    //                 onChange={(e) =>
    //                   handleChange("portOfEntry", e.target.value)
    //                 }
    //                 className="text-white text-sm font-semibold outline-none w-full bg-transparent"
    //               />
    //             </div>
    //           </div>

    //           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    //             <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
    //               <p className="text-slate-400 text-[10px] font-semibold tracking-wide mb-1">
    //                 TRAVEL DATE
    //               </p>
    //               <input
    //                 type="date"
    //                 value={clearanceForm.travelDate}
    //                 onChange={(e) =>
    //                   handleChange("travelDate", e.target.value)
    //                 }
    //                 className="text-white text-sm font-semibold outline-none w-full bg-transparent"
    //               />
    //             </div>
    //             <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
    //               <p className="text-slate-400 text-[10px] font-semibold tracking-wide mb-1">
    //                 AIRLINE PNR / BOOKING REF
    //               </p>
    //               <input
    //                 value={clearanceForm.pnr}
    //                 onChange={(e) => handleChange("pnr", e.target.value)}
    //                 className="text-white text-sm font-semibold outline-none w-full bg-transparent"
    //               />
    //             </div>
    //           </div>

    //           <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
    //             <p className="text-slate-400 text-[10px] font-semibold tracking-wide mb-1">
    //               BIOMETRIC PASSPORT ID
    //             </p>
    //             <input
    //               value={clearanceForm.passportId}
    //               onChange={(e) =>
    //                 handleChange("passportId", e.target.value)
    //               }
    //               className="text-white text-sm font-semibold outline-none w-full bg-transparent"
    //             />
    //           </div>

    //           <div className="flex flex-col sm:flex-row gap-3 pt-1">
    //             <button
    //               type="submit"
    //               className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-sm transition-colors"
    //             >
    //               Execute Clearance Check <ArrowRight size={16} />
    //             </button>
    //             <button
    //               type="button"
    //               className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white font-semibold py-3 px-5 rounded-xl text-sm"
    //             >
    //               <FileText size={16} /> Audit Log
    //             </button>
    //           </div>
    //         </form>
    //       </div>

    //       <div className="flex flex-col gap-5">
    //         <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 flex-1">
    //           <div className="flex items-center justify-between mb-5">
    //             <p className="text-amber-300 text-[11px] font-semibold tracking-wide">
    //               LIVE VERIFICATION AUDIT TRAIL · PNR: {clearanceForm.pnr}
    //             </p>
    //             <span className="text-emerald-400 text-[10px] font-semibold">
    //               DCS SYNC OK
    //             </span>
    //           </div>

    //           <div className="space-y-5">
    //             {auditTrail.map((item) => (
    //               <div key={item.title} className="flex gap-3">
    //                 <CheckCircle2
    //                   className="text-emerald-400 shrink-0 mt-0.5"
    //                   size={18}
    //                 />
    //                 <div>
    //                   <p className="text-white text-sm font-semibold">
    //                     {item.title}
    //                   </p>
    //                   <p className="text-slate-400 text-xs">
    //                     {item.description}
    //                   </p>
    //                 </div>
    //               </div>
    //             ))}
    //           </div>
    //         </div>

    //         {cleared && (
    //           <div className="bg-emerald-950/40 border border-emerald-400/30 rounded-2xl p-5 sm:p-6 flex items-center justify-between gap-4 flex-wrap">
    //             <div className="flex items-center gap-4">
    //               <div className="w-12 h-12 rounded-xl bg-emerald-400 flex items-center justify-center shrink-0">
    //                 <ShieldCheck className="text-emerald-950" size={22} />
    //               </div>
    //               <div>
    //                 <span className="inline-block bg-emerald-400/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded mb-1">
    //                   CLEARED & STAMPED
    //                 </span>
    //                 <p className="text-white font-bold text-sm sm:text-base leading-snug">
    //                   OK TO BOARD — Clearance Approved
    //                 </p>
    //                 <p className="text-slate-400 text-xs">
    //                   Flight AIX 192 · Gate clearance verified in carrier
    //                   DCS database
    //                 </p>
    //               </div>
    //             </div>
    //             <button className="flex items-center gap-2 bg-white text-slate-900 font-semibold text-sm px-4 py-2.5 rounded-lg shrink-0">
    //               <Download size={16} /> Download Slip
    //             </button>
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </section>

    <section className="relative overflow-hidden bg-[#06111f] px-4 py-14 sm:px-6 sm:py-20 lg:px-10">

  {/* Radar Grid */}
  <div
    className="pointer-events-none absolute inset-0 opacity-[0.045]"
    style={{
      backgroundImage:
        "linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)",
      backgroundSize: "36px 36px",
    }}
  />

  {/* Ambient Lights */}
  <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 animate-[dcsGlow_8s_ease-in-out_infinite] rounded-full bg-blue-600/10 blur-[120px]" />

  <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 animate-[dcsGlow_10s_ease-in-out_infinite_reverse] rounded-full bg-emerald-500/10 blur-[120px]" />

  {/* Vertical Scanner */}
  <div className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden">
    <div className="absolute left-0 top-0 h-24 w-full animate-[dcsScanner_7s_linear_infinite] bg-gradient-to-b from-transparent via-cyan-400/[0.06] to-transparent" />
  </div>

  <div className="relative mx-auto max-w-7xl">

    {/* Heading */}
    <div className="mb-10 text-center">

      <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1.5">

        <span className="relative flex h-2 w-2">
          <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400" />
          <span className="relative block h-2 w-2 rounded-full bg-emerald-400" />
        </span>

        <span className="text-[10px] font-bold tracking-[0.16em] text-cyan-300">
          AIRLINE DEPARTURE CONTROL SYSTEM · DCS TIER 1
        </span>
      </div>

           
      <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        Ready to Fly.{" "}
        <span className="text-cyan-300">
          Verified to Board.
        </span>
      </h2>

      <p className="mx-auto max-w-2xl text-sm text-slate-400 sm:text-base">
        Automated pre-flight clearance synchronized with civil aviation
        desks and airline DCS networks.
      </p>
    </div>

    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

      {/* ================= LEFT ENGINE ================= */}

      <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-sm transition-all duration-500 hover:border-cyan-400/30 sm:p-6">

        {/* Corner Brackets */}
        <span className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-cyan-400/60 transition-all duration-500 group-hover:h-12 group-hover:w-12" />

        <span className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-cyan-400/30 transition-all duration-500 group-hover:h-12 group-hover:w-12" />

        <span className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-cyan-400/30 transition-all duration-500 group-hover:h-12 group-hover:w-12" />

        <span className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-cyan-400/60 transition-all duration-500 group-hover:h-12 group-hover:w-12" />

        {/* Horizontal Scanner */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute left-0 h-px w-full animate-[terminalScan_3s_linear_infinite] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
        </div>

        {/* Header */}
        <div className="relative z-10 mb-5 flex items-center justify-between">

          <div className="flex items-center gap-2">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-400/20 bg-blue-500/10">
              <Mail
                className="text-blue-400 transition-transform duration-500 group-hover:scale-110"
                size={18}
              />
            </div>

            <h3 className="text-sm font-bold text-white sm:text-base">
              OTB Clearance Engine
            </h3>
          </div>

          <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">

            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400" />
              <span className="relative block h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>

            GATE LINK ACTIVE
          </span>
        </div>

        <p className="relative z-10 mb-6 text-xs text-slate-400">
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
              className="group/input relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 transition-all duration-300 focus-within:border-cyan-400/50 focus-within:bg-cyan-400/[0.03]"
            >
              <div className="absolute bottom-0 left-0 h-px w-0 bg-cyan-400 transition-all duration-500 group-focus-within/input:w-full" />

              <p className="mb-1 text-[10px] font-semibold tracking-wide text-slate-500">
                {label}
              </p>

              <input
                value={value}
                onChange={(e) => handleChange(field, e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-white outline-none"
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
                className="group/input relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 transition-all duration-300 focus-within:border-cyan-400/50"
              >
                <div className="absolute bottom-0 left-0 h-px w-0 bg-cyan-400 transition-all duration-500 group-focus-within/input:w-full" />

                <p className="mb-1 text-[10px] font-semibold tracking-wide text-slate-500">
                  {label}
                </p>

                <input
                  type={type}
                  value={clearanceForm[field]}
                  onChange={(e) =>
                    handleChange(field, e.target.value)
                  }
                  className="w-full bg-transparent text-sm font-semibold text-white outline-none"
                />
              </div>
            ))}
          </div>

          <div className="group/input relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 transition-all duration-300 focus-within:border-cyan-400/50">

            <div className="absolute bottom-0 left-0 h-px w-0 bg-cyan-400 transition-all duration-500 group-focus-within/input:w-full" />

            <p className="mb-1 text-[10px] font-semibold tracking-wide text-slate-500">
              BIOMETRIC PASSPORT ID
            </p>

            <input
              value={clearanceForm.passportId}
              onChange={(e) =>
                handleChange("passportId", e.target.value)
              }
              className="w-full bg-transparent text-sm font-semibold text-white outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 pt-1 sm:flex-row">

            <button
              type="submit"
              className="group/check relative flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_0_35px_rgba(37,99,235,0.35)]"
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
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/5"
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
        <div className="group relative flex-1 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-sm transition-all duration-500 hover:border-emerald-400/20 sm:p-6">

          {/* Data Stream */}
          <div className="pointer-events-none absolute left-[27px] top-20 bottom-8 w-px overflow-hidden bg-white/5">
            <div className="absolute left-0 top-0 h-20 w-px animate-[dataStream_2.5s_linear_infinite] bg-gradient-to-b from-transparent via-emerald-400 to-transparent" />
          </div>

        <div> 
          <div className="relative z-10 mb-5 flex items-center justify-between gap-3">

            <p className="text-[10px] font-semibold tracking-wide text-amber-300 sm:text-[11px]">
              LIVE VERIFICATION AUDIT TRAIL · PNR:{" "}
              {clearanceForm.pnr}
            </p>

            <span className="flex flex-shrink-0 items-center gap-1.5 text-[10px] font-semibold text-emerald-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
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

                <div className="relative flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/5 transition-all duration-500 group-hover/audit:border-emerald-400/60 group-hover/audit:bg-emerald-400/10">

                  <CheckCircle2
                    className="text-emerald-400 transition-transform duration-300 group-hover/audit:scale-125"
                    size={16}
                  />

                </div>

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

        {/* Clearance Result */}
        {cleared && (
          <div className="group/result relative overflow-hidden rounded-2xl border border-emerald-400/30 bg-emerald-950/40 p-5 transition-all duration-500 hover:border-emerald-400/60 hover:shadow-[0_0_45px_rgba(16,185,129,0.12)] sm:p-6">

            {/* Approval Scanner */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-1/3 -translate-x-full bg-gradient-to-r from-transparent via-emerald-300/10 to-transparent skew-x-12 animate-[approvalScan_3.5s_ease-in-out_infinite]" />

            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">

              <div className="flex items-center gap-4">

                <div className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-400 shadow-[0_0_25px_rgba(52,211,153,0.25)] transition-transform duration-500 group-hover/result:scale-110">

                  <div className="absolute inset-0 animate-ping rounded-xl bg-emerald-400/20" />

                  <ShieldCheck
                    className="relative text-emerald-950"
                    size={22}
                  />
                </div>

                <div>
                  <span className="mb-1 inline-block rounded bg-emerald-400/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                    CLEARED & STAMPED
                  </span>

                  <p className="text-sm font-bold leading-snug text-white sm:text-base">
                    OK TO BOARD — Clearance Approved
                  </p>

                  <p className="text-xs text-slate-400">
                    Flight AIX 192 · Gate clearance verified in carrier DCS database
                  </p>
                </div>
              </div>

              <button className="flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
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