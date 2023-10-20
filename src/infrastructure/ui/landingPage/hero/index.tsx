"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import FlyingHeroSearch from "../flyingHeroSearch";
import Link from "next/link";
import HeroCarousel from "./heroCarousel";

export const Hero = () => {
  return (
    <HeroCarousel>
      <FlyingHeroSearch />
    </HeroCarousel>
  );
};
