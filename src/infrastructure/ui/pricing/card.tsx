import React from "react";

type Props = {
  bg: string;
  type: string;
  typeDesc: string;
};

const PricingCard = ({ bg, type, typeDesc }: Props) => {
  return (
    <div className="shadow-md rounded-lg overflow-hidden">
      <div
        className={`${bg} text-white flex justify-center items-center flex-col p-4`}
      >
        <h1 className="text-lg lg:text-xl font-bold">{type}</h1>
        <p>{typeDesc}</p>
      </div>
      <div className="w-full h-[700px]"></div>
    </div>
  );
};

export default PricingCard;
