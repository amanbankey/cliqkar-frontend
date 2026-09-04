import { Star, Play, BadgeCheck } from "lucide-react";

// import ananya from "../assets/images/reviewer-ananya.jpg";
// import vikram from "../assets/images/reviewer-vikram.jpg";
// import david from "../assets/images/reviewer-david.jpg";

// import swiss from "../assets/images/diary-swiss.jpg";
// import honeymoon from "../assets/images/diary-honeymoon.jpg";
// import business from "../assets/images/diary-business.jpg";

// import venice from "../assets/images/moment-venice.jpg";
// import bali from "../assets/images/moment-bali.jpg";
// import kyoto from "../assets/images/moment-kyoto.jpg";
// import sydney from "../assets/images/moment-sydney.jpg";
// import dubai from "../assets/images/moment-dubai.jpg";
// import newyork from "../assets/images/moment-newyork.jpg";

const reviews = [
  {
    // image: ananya,
    name: "Ananya Sen",
    role: "DEL → DXB · Tech Founder",
    quote:
      "Getting an emergency Ok-to-Board certificate 4 hours before my evening flight to Dubai seemed impossible until Cliqkar handled it within 40 minutes flat. Truly lifesavers.",
    featured: false,
  },
  {
    // image: vikram,
    name: "Vikram Malhotra",
    role: "BOM → LHR → CDG · Managing Director",
    quote:
      "We planned our family European summer holiday across 4 countries. The Schengen appointment booking and consolidated flight reservation was completely seamless. Cliqkar gave us complete peace of mind.",
    featured: true,
  },
  {
    // image: david,
    name: "David Tan",
    role: "BLR → SIN · Principal Consultant",
    quote:
      "As a frequent consultant traveling across Southeast Asia, having flight deals combined with immediate verified e-visa status in one single dashboard saves me hours every month.",
    featured: false,
  },
];

const diaries = [
  {
    // image: swiss,
    duration: "1:42 MIN",
    title: "Rohan's Swiss Odyssey",
    quote: "Embassy visa cleared in 6 business days.",
  },
  {
    // image: honeymoon,
    duration: "2:15 MIN",
    title: "Pooja & Kabir's Honeymoon",
    quote: "Direct flight discount + luxury agent support.",
  },
  {
    // image: business,
    duration: "1:18 MIN",
    title: "Arjun's Business Expansion",
    quote: "Multi-city business class routed effortlessly.",
  },
];

const moments = [
  { 
    // image: venice,
     place: "Venice, Italy" },
  { 
    // image: bali,
     place: "Bali, Indonesia" },
  { 
    // image: kyoto,
     place: "Kyoto, Japan" },
  { 
    // image: sydney,
     place: "Sydney, Australia" },
  { 
    // image: dubai,
     place: "Dubai, UAE" },
  { 
    // image: newyork,
     place: "New York City, USA" },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-14 sm:py-20 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-blue-600 text-xs sm:text-sm font-semibold tracking-wide mb-2">
            CLIENT EXPERIENCES
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">
            Loved by Travelers. Trusted for Journeys.
          </h2>
          <p className="text-slate-500 text-sm sm:text-base">
            Hear how high-frequency business travelers and families
            experience Cliqkar.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-16">
          {reviews.map((review) => (
            <div
              key={review.name}
              className={`rounded-2xl p-6 flex flex-col ${
                review.featured
                  ? "bg-[#0a1628] lg:-translate-y-4 shadow-xl"
                  : "bg-slate-50 border border-slate-200"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={14}
                      className="text-amber-400"
                      fill="currentColor"
                    />
                  ))}
                </div>
                {review.featured && (
                  <span className="bg-white/10 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                    VERIFIED FLIGHT PASS
                  </span>
                )}
              </div>

              <p
                className={`text-sm leading-relaxed mb-6 flex-1 ${
                  review.featured ? "text-slate-200" : "text-slate-600"
                }`}
              >
                &ldquo;{review.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p
                    className={`font-bold text-sm ${
                      review.featured ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {review.name}
                  </p>
                  <p
                    className={`text-xs ${
                      review.featured ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    {review.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-slate-900 text-xl font-bold mb-5">
          Visual Journey Diaries
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14">
          {diaries.map((diary) => (
            <div
              key={diary.title}
              className="relative rounded-2xl overflow-hidden h-56"
            >
              <img
                src={diary.image}
                alt={diary.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20" />

              <span className="absolute top-3 right-3 bg-black/60 text-white text-[10px] font-semibold px-2 py-1 rounded">
                {diary.duration}
              </span>

              <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-blue-600">
                <Play size={18} fill="currentColor" className="ml-0.5" />
              </button>

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-bold text-sm">{diary.title}</p>
                <p className="text-white/70 text-xs">
                  &ldquo;{diary.quote}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-5">
          <h3 className="text-slate-900 text-xl font-bold">
            Moments Captured Across the Globe
          </h3>
          <span className="text-blue-600 text-sm font-semibold">
            #CliqkarMoments
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {moments.map((moment, index) => (
            <div
              key={moment.place}
              className={`relative rounded-xl overflow-hidden h-52 ${
                index === 1 ? "row-span-2 h-full" : ""
              }`}
            >
              <img
                src={moment.image}
                alt={moment.place}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <p className="absolute bottom-3 left-3 text-white text-xs font-semibold">
                {moment.place}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}