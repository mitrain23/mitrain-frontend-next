"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";

const DescriptionDetails = ({ data }: { data: any }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleAccordion = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <h1 className="font-inter text-[30px] text-[#031C32] font-semibold mb-[18px]">
        Description
      </h1>
      <Accordion type="single" collapsible className="border p-4 rounded-[8px]">
        <AccordionItem value="item-1" className="border-none">
          <AccordionTrigger className="text-[18px] text-[#031C32] font-bold font-inter">
            Product Description
          </AccordionTrigger>
          <AccordionContent className="text-[16px] text-[#425379]">
            KONDISI ISTIMEWAH MOBIL SECOND RASA BARU LEXUS RX270 2012 HK VERSION
            Pajak 03/2024 (Pajak SUPER PANJANG) Km: 89.xxx NIK 2012 Plat B
            (Ganjil) Interior black full original 2700 cc Electric seat depan
            with memory Power back door No malfunction
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/**
      <h1 className="font-inter text-[30px] text-[#031C32] font-semibold mb-[18px]">
        Frequently Asked Questions
      </h1>
      <Accordion />
      <Accordion />
      <Accordion />
         */}
    </div>
  );
};

export default DescriptionDetails;
