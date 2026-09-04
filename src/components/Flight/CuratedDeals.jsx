import React, { useState } from "react";
import { FiArrowRight, FiStar } from "react-icons/fi";
import { TbPlaneDeparture } from "react-icons/tb";

const filters = ["All Flights", "Business Class", "First Class", "Long Haul", "Under ₹1,00,000"];

const deals = [
  {
    airline: "Emirates",
    flight: "EK 512",
    aircraft: "Airbus A380-800 · Upper Deck",
    departTime: "10:15 PM",
    departCode: "DEL",
    departAirport: "Indira Gandhi T3",
    duration: "4H 20M · NON-STOP",
    note: "98% On-time Index",
    arriveTime: "01:05 AM",
    arriveDay: "+1D",
    arriveCode: "DXB",
    arriveAirport: "Dubai Int'l T3",
    amenities: ["Lie-flat 180° Bed", "40kg Checked + Lounge"],
    originalPrice: "₹98,500",
    price: "₹74,900",
    save: "₹23,600",
    fareType: "One Way",
  },
  {
    airline: "Qatar Airways",
    flight: "QR 571",
    aircraft: "Boeing 777-300ER · Qsuite Door",
    departTime: "04:30 AM",
    departCode: "BOM",
    departAirport: "Mumbai T2",
    duration: "4H 10M · NON-STOP",
    note: "World's Best Business Class",
    arriveTime: "06:10 AM",
    arriveDay: "",
    arriveCode: "DOH",
    arriveAirport: "Hamad Int'l",
    amenities: ["Private Sliding Door", "Dine-on-Demand Menu"],
    originalPrice: "₹1,12,000",
    price: "₹86,100",
    save: "₹25,600",
    fareType: "One Way",
  },
  {
    airline: "Singapore Airlines",
    flight: "SQ 403",
    aircraft: "Airbus A380-800 · Private Suite",
    departTime: "09:50 AM",
    departCode: "DEL",
    departAirport: "Indira Gandhi T3",
    duration: "5H 50M · NON-STOP",
    note: "Dom Pérignon 2013 Service",
    arriveTime: "18:10 PM",
    arriveDay: "",
    arriveCode: "SIN",
    arriveAirport: "Changi Terminal 3",
    amenities: ["First Class Suite", "Book-the-Cook Dining"],
    originalPrice: "₹2,45,000",
    price: "₹1,88,000",
    save: "₹57,000",
    fareType: "First Class",
  },
];

const CuratedDeals = () => {
  const [activeFilter, setActiveFilter] = useState("All Flights");

  return (
    <section className="bg-white px-4 sm:px-8 lg:px-16 py-14">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] text-amber-500 mb-2">CURATED LUXURY DEALS</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#0A1628] leading-tight mb-2">
              Exceptional Fares. Extraordinary
              <br />
              Journeys.
            </h2>
            <p className="text-gray-500 text-sm">Premium cabins engineered for stillness, without the booking complexity.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`text-xs font-semibold px-4 py-2 rounded-lg ${
                  activeFilter === filter ? "bg-blue-600 text-white" : "bg-[#0A1628] text-slate-200"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {deals.map((deal) => (
            <div key={deal.flight} className="bg-[#0A1628] rounded-2xl p-4 sm:p-5">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex items-center gap-3 lg:w-56 flex-shrink-0">
                  <span className="w-11 h-11 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                    <TbPlaneDeparture className="text-amber-400" size={18} />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-white">{deal.airline}</p>
                      <span className="bg-slate-700 text-slate-200 text-[10px] font-semibold px-1.5 py-0.5 rounded">{deal.flight}</span>
                    </div>
                    <p className="text-xs text-slate-400">{deal.aircraft}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-1">
                  <div className="text-left flex-shrink-0">
                    <p className="text-base font-bold text-white">{deal.departTime}</p>
                    <p className="text-xs text-slate-400">{deal.departCode}</p>
                    <p className="text-[10px] text-slate-500">{deal.departAirport}</p>
                  </div>
                  <div className="flex-1 flex flex-col items-center px-2">
                    <p className="text-[10px] font-semibold tracking-wide text-slate-400 mb-1">{deal.duration}</p>
                    <div className="w-full h-px bg-slate-700 relative flex items-center">
                      <span className="absolute left-0 w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <TbPlaneDeparture className="text-amber-400 mx-auto" size={14} />
                      <span className="absolute right-0 w-1.5 h-1.5 rounded-full bg-amber-400" />
                    </div>
                    <p className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-emerald-400" /> {deal.note}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-base font-bold text-white">
                      {deal.arriveTime} <span className="text-xs text-slate-400">{deal.arriveDay}</span>
                    </p>
                    <p className="text-xs text-slate-400">{deal.arriveCode}</p>
                    <p className="text-[10px] text-slate-500">{deal.arriveAirport}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-1 lg:w-44 flex-shrink-0">
                  {deal.amenities.map((a) => (
                    <p key={a} className="flex items-center gap-1.5 text-xs text-slate-300">
                      <FiStar className="text-amber-400 flex-shrink-0" size={11} /> {a}
                    </p>
                  ))}
                </div>

                <div className="flex flex-col items-start lg:items-end gap-1 lg:w-44 flex-shrink-0">
                  <p className="text-xs text-slate-500 line-through">{deal.originalPrice}</p>
                  <p className="text-xl font-bold text-amber-400">{deal.price}</p>
                  <p className="text-[10px] text-emerald-400">Save {deal.save} · {deal.fareType}</p>
                  <button className="mt-1 flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg">
                    Select Flight <FiArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CuratedDeals;