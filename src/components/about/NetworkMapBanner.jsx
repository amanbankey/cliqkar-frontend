import React from "react"
import image from "../../assets/image.jpg"
/*const markers = [
  { label: "DUBAI", sub: "DXB", position: "left-[6%] top-[45%]" },
  { label: "SINGAPORE", sub: "SIN", position: "left-[38%] top-[30%]" },
  { label: "LONDON", sub: "LHR", position: "left-[62%] top-[25%]" },
  { label: "TOKYO", sub: "NRT", position: "right-[4%] top-[40%]" },
];*/

const NetworkMapBanner = () => {
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="relative rounded-3xl overflow-hidden">
          <img
            src={image}
            alt="Global network map"
            className="w-full h-64 sm:h-80 md:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          {/*markers.map((m) => (
            <div key={m.label} className={`absolute ${m.position} text-white`}>
              <p className="text-xs sm:text-sm font-bold tracking-wide">{m.label}</p>
              <p className="text-[10px] text-gray-300">{m.sub}</p>
            </div>
          ))*/}
        </div>
      </div>
    </section>
  );
};

export default NetworkMapBanner;
