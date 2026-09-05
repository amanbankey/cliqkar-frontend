import React from "react";
import { FiStar } from "react-icons/fi";

const testimonials = [
  {
    initials: "PK",
    avatarColor: "bg-blue-100 text-blue-700",
    name: "Priya Kulkarni",
    visa: "France (Schengen) Tourist Visa",
    quote:
      "\"I was stressing over my Schengen tourist visa for France since appointment slots were completely booked in Mumbai. VISAORA's team caught a cancellation slot within 48 hours and checked my bank statements thoroughly. Approved in 11 days flat!\"",
  },
  {
    initials: "AM",
    avatarColor: "bg-emerald-100 text-emerald-700",
    name: "Amit Mehta",
    visa: "UAE 30-Day Family Tourist Visa",
    quote:
      "\"Needed UAE visas for my family of four on very short notice before our vacation. Applied at 11 PM, got a ping on WhatsApp the next afternoon that our eVisas were issued. The transparent pricing with zero surprise charges is genuinely refreshing.\"",
  },
  {
    initials: "SV",
    avatarColor: "bg-amber-100 text-amber-700",
    name: "Siddharth Varma",
    visa: "US 10-Year B1/B2 Visa",
    quote:
      "\"The US B1/B2 interview prep was unbelievable. My consular mock advisor pinpointed two critical flaws in my DS-160 work history explanation that would have resulted in an administrative 221(g) delay. 10-year visa approved on first attempt!\"",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-indigo-50/40 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-bold tracking-wide text-blue-600 mb-2">❞❞ VERIFIED TRAVELER VOICES</p>
        <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">Approved. On Time. Every Time.</h2>
        <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto mb-10">
          Real feedback from leisure travelers, families, and business executives worldwide.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 text-left">
          {testimonials.map(({ initials, avatarColor, name, visa, quote }) => (
            <div key={name} className="bg-white rounded-2xl p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="text-amber-400 fill-amber-400" size={16} />
                ))}
              </div>
              <p className="text-sm text-gray-600 italic leading-relaxed mb-6">{quote}</p>
              <div className="flex items-center gap-3">
                <span className={`w-10 h-10 rounded-full ${avatarColor} text-sm font-bold flex items-center justify-center flex-shrink-0`}>
                  {initials}
                </span>
                <div>
                  <p className="text-sm font-bold text-gray-900">{name}</p>
                  <p className="text-xs text-gray-500">{visa}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;