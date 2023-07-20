import FlyingHero from '@/src/components/flyingHero'
import HeroCarousel from '@/src/components/heroCarousel'
import Navbar from '@/src/components/navbar'
import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <HeroCarousel>
        <FlyingHero />
      </HeroCarousel>
      <div className='mb-[300px]' />
                
      
    </main>
  )
}
