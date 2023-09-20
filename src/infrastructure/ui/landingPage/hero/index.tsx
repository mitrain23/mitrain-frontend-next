'use client';
import HeroCarousel from '@/src/components/heroCarousel'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import FlyingHeroSearch from '../flyingHeroSearch'
import Link from 'next/link';


export const Hero = () => {

    

    return (
        <HeroCarousel>
            <FlyingHeroSearch />
        </HeroCarousel>
    )
}
