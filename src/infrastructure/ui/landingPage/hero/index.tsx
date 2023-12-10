"use client";

import React from "react";
import FlyingHeroSearch from "../flyingHeroSearch";
import HeroCarousel from "./heroCarousel";
import { Province } from "@/src/domain/entities/province";

type TProps = {
  provinces: Province[];
};

export const Hero: React.FC<TProps> = ({ provinces }) => {
  return (
    <HeroCarousel>
      <FlyingHeroSearch provinces={provinces} />
    </HeroCarousel>
  );
};
