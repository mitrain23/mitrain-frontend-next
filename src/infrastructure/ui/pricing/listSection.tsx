"use client";

import React from "react";
import EmoteApiIcon from "@/public/svg/emote_api.svg";
import PricingCard from "./card";

const pricings = [
  {
    bg: "bg-[#657270]",
    type: "Free",
    typeDesc: "Paket super efektif ",
  },
  {
    bg: "bg-[#605349]",
    type: "Bronze",
    typeDesc: "Paket super efektif ",
  },
  {
    bg: "bg-[#858990]",
    type: "Silver",
    typeDesc: "Paket super efektif ",
  },
  {
    bg: "bg-[#FFA70E]",
    type: "Gold",
    typeDesc: "Paket super efektif ",
  },
];

const PricingListSection = () => {
  return (
    <div className="px-8 xl:px-[240px] md:px-[100px] pb-20">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-3xl font-bold text-center uppercase">
          Paket <span className="font-normal">Pasang</span> Iklan
        </h1>
        <div className="p-4 rounded-full bg-blue-700 text-white flex items-center gap-2">
          <EmoteApiIcon />
          <p>
            Diskon spesial <span className="font-bold">sebesar 20%</span> untuk
            pasang iklan hari ini{" "}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
        {pricings.map((pricing, idx) => (
          <PricingCard {...pricing} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default PricingListSection;
