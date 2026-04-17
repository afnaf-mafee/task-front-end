import React from "react";

const OfferCard = ({ offer }) => {

  return (
    <div className="w-full flex justify-center items-center p-4">
      <div
        className="
        relative
        w-full
        max-w-md
        overflow-hidden
        rounded-3xl
       
      "
      >
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br bg-gradient-to-r  bg-white/5   " />

        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={offer?.image}
            alt={offer?.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/20" />

          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r  via-pink-500 to-purple-600    shadow-[0_0_12px_rgba(236,72,153,0.8)]  backdrop-blur-md  text-white text-xs font-semibold">
            Special Offer
          </div>
        </div>

        {/* Content */}
        <div className="relative p-6 space-y-4">
          <div>
            <h2 className="text-white text-2xl font-bold">{offer?.title}</h2>

            <p className="text-white/70 text-sm mt-2 leading-relaxed">
              {offer?.description}
            </p>
          </div>

          {/* <div className="flex items-center justify-between text-sm text-white/60">
            <span>Show On: {offer?.showOn}</span>
            <span>{new Date(offer?.createdAt).toLocaleDateString()}</span>
          </div> */}

          <button
            className="w-full py-4 bg-gradient-to-r  via-pink-500 to-purple-600  
    text-white text-[10px] font-extrabold tracking-wide 
    shadow-[0_0_12px_rgba(236,72,153,0.8)]  text-white font-bold rounded-2xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            {" "}
            {offer?.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
