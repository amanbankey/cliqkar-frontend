import { FiArrowRight } from "react-icons/fi";

const routes = [
  {
    image:
      "https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmxpZ2h0JTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D",
    code: "DEL → DXB",
    frequency: "14+ Daily",
    title: "Delhi to Dubai",
    info: "Direct 3h 40m · Emirates / IndiGo",
    price: "₹12,499",
  },
  {
    image:
      "https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmxpZ2h0JTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D",
    code: "BOM → BKK",
    frequency: "8+ Daily",
    title: "Mumbai to Bangkok",
    info: "Direct 4h 25m · Thai / Vistara",
    price: "₹14,250",
  },
  {
    image:
      "https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmxpZ2h0JTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D",
    code: "DEL → SIN",
    frequency: "10+ Daily",
    title: "Delhi to Singapore",
    info: "Direct 5h 30m · Singapore Airlines",
    price: "₹18,999",
  },
  {
    image:
      "https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmxpZ2h0JTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D",
    code: "BOM → LHR",
    frequency: "6+ Daily",
    title: "Mumbai to London",
    info: "Direct 9h 40m · British Airways / AI",
    price: "₹42,500",
  },
  {
    image:
      "https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmxpZ2h0JTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D",
    code: "DEL → GOI",
    frequency: "18+ Daily",
    title: "Delhi to Goa",
    info: "Direct 2h 35m · IndiGo / Akasa",
    price: "₹4,899",
  },
  {
    image:
      "https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmxpZ2h0JTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D",
    code: "BLR → DXB",
    frequency: "9+ Daily",
    title: "Bengaluru to Dubai",
    info: "Direct 4h 10m · Emirates / Air India",
    price: "₹13,800",
  },
];

export default function PopularConnections() {
  return (
    <section className="relative overflow-hidden bg-[#eef1f8] px-4 py-14 sm:px-6 sm:py-20 lg:px-10">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="absolute left-0 top-[30%] h-px w-full bg-gradient-to-r from-transparent via-blue-300/30 to-transparent animate-[routeBeam_5s_linear_infinite]" />

        <div className="absolute left-[8%] top-[22%] h-1.5 w-1.5 rounded-full bg-blue-400/40 animate-[flightDot_6s_linear_infinite]" />

        <div className="absolute left-[45%] top-[72%] h-1 w-1 rounded-full bg-emerald-400/50 animate-[flightDot_8s_linear_infinite_reverse]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="mb-2 text-xs font-semibold tracking-wide text-blue-600 sm:text-sm animate-[sectionLabel_700ms_ease-out_both]">
            POPULAR CONNECTIONS
          </p>

          <h2 className="mb-2 text-3xl font-extrabold text-slate-900 sm:text-4xl animate-[sectionTitle_800ms_cubic-bezier(.22,1,.36,1)_both]">
            Where Are You Flying Next?
          </h2>

          <p className="text-sm text-slate-500 sm:text-base animate-[sectionText_900ms_ease-out_both]">
            High frequency premium corridors booked daily by global travelers.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {routes.map((route, index) => (
            <div
              key={route.title}
              className="group relative h-56 overflow-hidden rounded-2xl shadow-sm transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_25px_55px_rgba(15,23,42,0.22)]"
              style={{
                animation: "routeReveal 800ms cubic-bezier(.22,1,.36,1) both",
                animationDelay: `${index * 130 + 200}ms`,
              }}
            >
              <img
                src={route.image}
                alt={route.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 transition-all duration-700 group-hover:from-black/90 group-hover:via-black/30" />

              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute -left-1/2 top-0 h-full w-1/2 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/15 to-transparent animate-[imageSweep_2s_ease-in-out_infinite]" />
              </div>

              <div className="pointer-events-none absolute left-0 top-0 z-20 h-[2px] w-full overflow-hidden bg-white/10">
                <div
                  className="h-full w-1/3 bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
                  style={{
                    animation: "cardScanner 3s linear infinite",
                    animationDelay: `${index * 300}ms`,
                  }}
                />
              </div>

              <div className="relative z-10 flex h-full flex-col justify-between p-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm transition-all duration-500 group-hover:translate-x-1 group-hover:bg-blue-600/70">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    </span>

                    {route.code}
                  </span>

                  <span className="rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm transition-all duration-500 group-hover:-translate-x-1">
                    {route.frequency}
                  </span>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="translate-y-1 text-lg font-bold text-white opacity-90 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      {route.title}
                    </h3>

                    <p className="mb-1 translate-y-1 text-xs text-white/70 opacity-80 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      {route.info}
                    </p>

                    <p className="translate-y-1 text-xl font-extrabold text-amber-400 transition-all duration-500 group-hover:translate-y-0 group-hover:text-amber-300">
                      {route.price}
                    </p>

                    <div className="mt-2 h-px w-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-transparent transition-all duration-700 group-hover:w-full" />
                  </div>

                  <button className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/90 text-slate-900 transition-all duration-500 group-hover:scale-110">
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-blue-100 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                    <FiArrowRight className="relative transition-transform duration-500 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>

              <div className="pointer-events-none absolute bottom-0 left-0 z-20 h-[3px] w-full bg-white/10">
                <div className="h-full w-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 transition-all duration-[1200ms] group-hover:w-full" />
              </div>

              <div className="pointer-events-none absolute bottom-3 left-4 flex items-center gap-1 opacity-0 transition-all duration-500 group-hover:opacity-100">
                <span className="h-1 w-1 animate-pulse rounded-full bg-cyan-300" />
                <span className="h-1 w-1 animate-pulse rounded-full bg-blue-300 [animation-delay:150ms]" />
                <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-300 [animation-delay:300ms]" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes routeReveal {
          0% {
            opacity: 0;
            transform: translateY(45px) scale(.94);
            filter: blur(6px);
          }
          65% {
            opacity: 1;
            transform: translateY(-5px) scale(1.01);
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        @keyframes sectionLabel {
          0% {
            opacity: 0;
            transform: translateY(15px);
            letter-spacing: .35em;
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            letter-spacing: .05em;
          }
        }

        @keyframes sectionTitle {
          0% {
            opacity: 0;
            transform: translateY(25px) scale(.96);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes sectionText {
          0% {
            opacity: 0;
            transform: translateY(15px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes cardScanner {
          0% {
            transform: translateX(-180%);
          }
          100% {
            transform: translateX(480%);
          }
        }

        @keyframes imageSweep {
          0% {
            transform: translateX(-120%);
          }
          55% {
            transform: translateX(350%);
          }
          100% {
            transform: translateX(350%);
          }
        }

        @keyframes routeBeam {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        @keyframes flightDot {
          0% {
            transform: translateX(-20px) translateY(0);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          50% {
            transform: translateX(45vw) translateY(-20px);
            opacity: .8;
          }
          100% {
            transform: translateX(100vw) translateY(5px);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}