"use client";
import React, { useState } from "react";

const Accordion = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleAccordion = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      className={`${
        expanded ? "h-[396px]" : "h-fit"
      } expandable-card w-full border-[1px] border-[#E7E7E7] p-[24px] mb-[8px]`}
      onClick={toggleAccordion}
    >
      <div className="flex justify-between mb-[12px]">
        <h1 className="font-inter text-[18px] font-medium text-[#031C32]">
          Product Description
        </h1>
        <span
          className={`transform ${
            expanded ? "rotate-180" : "rotate-0"
          } transition-transform duration-300`}
        >
          &#x25BE;
        </span>
      </div>

      {expanded && (
        <div
          dangerouslySetInnerHTML={{
            __html: `KONDISI ISTIMEWAH MOBIL SECOND RASA BARU<br>
                LEXUS RX270 2012 HK VERSION<br>
                Pajak 03/2024 (Pajak SUPER PANJANG)<br>
                Km: 89.xxx<br>
                NIK 2012<br>
                Plat B (Ganjil)<br>
                Interior black full original<br>
                2700 cc<br>
                Electric seat depan with memory<br>
                Power back door<br>
                No malfunction`,
          }}
        />
      )}
    </div>
  );
};

export default Accordion;
