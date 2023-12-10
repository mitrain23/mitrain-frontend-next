"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import { PostDetailResponse } from "@/src/infrastructure/models/getPostDetailResponse";

const DescriptionDetails = ({ data }: { data?: PostDetailResponse | null }) => {
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
            {data?.description}
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
