import { FiArrowRight } from "react-icons/fi";

// import delhiDubai from "../assets/images/delhi-dubai.jpg";
// import mumbaiBangkok from "../assets/images/mumbai-bangkok.jpg";
// import delhiSingapore from "../assets/images/delhi-singapore.jpg";
// import mumbaiLondon from "../assets/images/mumbai-london.jpg";
// import delhiGoa from "../assets/images/delhi-goa.jpg";
// import bengaluruDubai from "../assets/images/bengaluru-dubai.jpg";

const routes = [
  {
    // image: delhiDubai,
    code: "DEL → DXB",
    frequency: "14+ Daily",
    title: "Delhi to Dubai",
    info: "Direct 3h 40m · Emirates / IndiGo",
    price: "₹12,499",
  },
  {
    // image: mumbaiBangkok,
    code: "BOM → BKK",
    frequency: "8+ Daily",
    title: "Mumbai to Bangkok",
    info: "Direct 4h 25m · Thai / Vistara",
    price: "₹14,250",
  },
  {
    // image: delhiSingapore,
    code: "DEL → SIN",
    frequency: "10+ Daily",
    title: "Delhi to Singapore",
    info: "Direct 5h 30m · Singapore Airlines",
    price: "₹18,999",
  },
  {
    // image: mumbaiLondon,
    code: "BOM → LHR",
    frequency: "6+ Daily",
    title: "Mumbai to London",
    info: "Direct 9h 40m · British Airways / AI",
    price: "₹42,500",
  },
  {
    // image: delhiGoa,
    code: "DEL → GOI",
    frequency: "18+ Daily",
    title: "Delhi to Goa",
    info: "Direct 2h 35m · IndiGo / Akasa",
    price: "₹4,899",
  },
  {
    // image: bengaluruDubai,
    code: "BLR → DXB",
    frequency: "9+ Daily",
    title: "Bengaluru to Dubai",
    info: "Direct 4h 10m · Emirates / Air India",
    price: "₹13,800",
  },
];

export default function PopularConnections() {
  return (
    <section className="bg-[#eef1f8] py-14 sm:py-20 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-blue-600 text-xs sm:text-sm font-semibold tracking-wide mb-2">
            POPULAR CONNECTIONS
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">
            Where Are You Flying Next?
          </h2>
          <p className="text-slate-500 text-sm sm:text-base">
            High frequency premium corridors booked daily by global
            travelers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {routes.map((route) => (
            <div
              key={route.title}
              className="relative rounded-2xl overflow-hidden h-56 group"
            >
              {/* <img
                src={route.image}
                alt={route.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              /> */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30" />

              <div className="relative h-full flex flex-col justify-between p-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {route.code}
                  </span>
                  <span className="bg-black/50 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                    {route.frequency}
                  </span>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="text-white text-lg font-bold">
                      {route.title}
                    </h3>
                    <p className="text-white/70 text-xs mb-1">
                      {route.info}
                    </p>
                    <p className="text-amber-400 text-xl font-extrabold">
                      {route.price}
                    </p>
                  </div>
                  <button className="w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-slate-900 shrink-0 transition-colors">
                    <FiArrowRight />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}