import React from "react";

const destinations = [
  {
    label: "MIDDLE EAST GATEWAY",
    city: "Dubai, United Arab Emirates",
    info: "4h 20m · 8 Daily Non-stop Business Flights",
    price: "₹74,900",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1000&q=80",
    size: "large",
  },
  {
    label: "TRANSATLANTIC HUB",
    city: "London (LHR), UK",
    info: "9h 45m · Non-stop Daily",
    price: "₹1,24,900",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1000&q=80",
    size: "large",
  },
  {
    label: "",
    city: "Paris (CDG)",
    info: "France · 9h 10m",
    price: "₹1,18,500",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    size: "small",
  },
  {
    label: "",
    city: "Tokyo (HND)",
    info: "Japan · 9h 25m",
    price: "₹1,42,000",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
    size: "small",
  },
  {
    label: "",
    city: "Malé (MLE)",
    info: "Maldives · 4h 15m",
    price: "₹64,200",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    size: "small",
  },
];

const DestinationCurations = () => {
  return (
    <section className="bg-white px-4 sm:px-8 lg:px-16 py-14">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] text-amber-500 mb-2">GLOBAL SANCTUARY NETWORK</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#0A1628]">Destination Curations</h2>
          </div>
          <p className="text-gray-400 text-xs sm:text-right">Real-time benchmarked Business Class departure rates</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {destinations.slice(0, 2).map((d) => (
            <div key={d.city} className="relative rounded-2xl overflow-hidden h-64">
              <img src={d.image} alt={d.city} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-semibold tracking-widest text-amber-300 mb-1">{d.label}</p>
                  <p className="text-lg font-serif text-white mb-1">{d.city}</p>
                  <p className="text-xs text-slate-300">{d.info}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-300">From</p>
                  <p className="text-lg font-bold text-amber-300">{d.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {destinations.slice(2).map((d) => (
            <div key={d.city} className="relative rounded-2xl overflow-hidden h-48">
              <img src={d.image} alt={d.city} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                <div>
                  <p className="text-sm font-serif text-white mb-0.5">{d.city}</p>
                  <p className="text-[11px] text-slate-300">{d.info}</p>
                </div>
                <p className="text-sm font-bold text-amber-300">{d.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationCurations;