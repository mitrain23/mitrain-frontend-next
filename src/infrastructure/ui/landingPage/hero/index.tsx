"use client";
import React from "react";
import FlyingHeroSearch from "../flyingHeroSearch";
import HeroCarousel from "./heroCarousel";

export const Hero = () => {
  return (
    <HeroCarousel>
      <FlyingHeroSearch />
    </HeroCarousel>
  );
};
