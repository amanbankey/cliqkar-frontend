import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
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
    originalPrice: "₹2,45,000",
    price: "₹1,88,000",
    save: "₹57,000",
    fareType: "First Class",
  },
];

const CuratedDeals = () => {
  const [activeFilter, setActiveFilter] = useState("All Flights");

  return (
    <section className="bg-slate-50   py-14 ">
      <div className="max-w-7xl mx-auto ">
        <div className="w-full lg:w-4/5 mx-auto flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] text-amber-600 mb-2">CURATED LUXURY DEALS</p>
            <h2 className="text-3xl sm:text-4xl text-slate-900 leading-tight mb-2">
              Exceptional Fares.
              <br />
              Extraordinary Journeys.
            </h2>
            <p className="text-gray-500 text-sm max-w-md">Premium cabins engineered for stillness, without the booking complexity.</p>
          </div>
          {/* <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`text-xs font-semibold px-4 py-2 rounded-lg ${
                  activeFilter === filter ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"
                }`}
              >
                {filter}
              </button>
            ))}
          </div> */}
        </div>

        <div className="flex flex-col gap-5 items-center">
          {deals.map((deal) => (
            <div
              key={deal.flight}
              className="group relative w-full lg:w-4/5 bg-white border border-slate-200 rounded-2xl transition-all duration-500 hover:-translate-y-1 hover:border-slate-900 hover:shadow-[0_25px_50px_-20px_rgba(15,23,42,0.35)]"
            >
              {/* ticket notches, cut into page background */}
              <span className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-slate-50 border border-slate-200 z-10" />
              <span className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-6 h-6 rounded-full bg-slate-50 border border-slate-200 z-10" />

              <div className="flex flex-col lg:flex-row lg:items-stretch gap-0 p-6 sm:p-7">
                {/* airline + route block */}
                <div className="flex flex-col lg:flex-row lg:items-center gap-5 flex-1 pb-6 lg:pb-0 lg:pr-6 border-b border-dashed border-slate-200 lg:border-b-0">
                  <div className="flex items-center gap-3 lg:w-56 flex-shrink-0">
                    <span className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center flex-shrink-0 transition-colors duration-500 group-hover:bg-slate-900">
                      <TbPlaneDeparture className="text-slate-900 transition-colors duration-500 group-hover:text-amber-400" size={20} />
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-slate-900">{deal.airline}</p>
                        <span className="bg-slate-100 text-slate-500 text-[10px] font-semibold px-1.5 py-0.5 rounded">{deal.flight}</span>
                      </div>
                      <p className="text-xs text-slate-400">{deal.aircraft}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-1">
                    <div className="text-left flex-shrink-0">
                      <p className="text-lg font-bold text-slate-900">{deal.departTime}</p>
                      <p className="text-xs text-slate-500">{deal.departCode}</p>
                      <p className="text-[10px] text-slate-400">{deal.departAirport}</p>
                    </div>

                    <div className="flex-1 flex flex-col items-center px-2 relative">
                      <p className="text-[10px] font-semibold tracking-wide text-slate-400 mb-1.5">{deal.duration}</p>
                      <div className="relative w-full h-px bg-slate-200">
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-slate-900" />
                        <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-amber-500" />
                        <span className="absolute left-1 top-1/2 -translate-y-1/2 transition-all duration-700 ease-out group-hover:left-[calc(100%-10px)]">
                          <TbPlaneDeparture className="text-slate-900 group-hover:text-amber-500" size={13} />
                        </span>
                      </div>
                      <p className="text-[10px] text-emerald-600 mt-1.5 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-emerald-500" /> {deal.note}
                      </p>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <p className="text-lg font-bold text-slate-900">
                        {deal.arriveTime} <span className="text-xs text-slate-400">{deal.arriveDay}</span>
                      </p>
                      <p className="text-xs text-slate-500">{deal.arriveCode}</p>
                      <p className="text-[10px] text-slate-400">{deal.arriveAirport}</p>
                    </div>
                  </div>
                </div>

                {/* price + cta block */}
                <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-2 pt-6 lg:pt-0 lg:pl-6 lg:w-48 flex-shrink-0">
                  <div className="flex flex-col items-start lg:items-end gap-1">
                    <p className="text-xs text-slate-400 line-through">{deal.originalPrice}</p>
                    <p className="text-2xl font-bold text-slate-900">{deal.price}</p>
                  </div>
                  <button className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-all duration-300">
                    Select Flight
                    <FiArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
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