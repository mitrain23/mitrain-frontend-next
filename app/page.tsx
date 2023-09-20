import HeroCarousel from '@/src/components/heroCarousel'
import BingungCariSupplier from '@/src/infrastructure/ui/landingPage/bingungCariSupplier'
import FlyingHeroSearch from '@/src/infrastructure/ui/landingPage/flyingHeroSearch'
import { Hero } from '@/src/infrastructure/ui/landingPage/hero'
import MobileHero from '@/src/infrastructure/ui/landingPage/hero/mobileHero'
import Recommendation from '@/src/infrastructure/ui/landingPage/recommendation'
import Testimoni from '@/src/infrastructure/ui/landingPage/testimoni'
import LayoutTemplate from '@/src/utils/layout'


export default function Home() {

  return (
    <main>
      <div className='hidden md:block'>
        <Hero />
      </div>
      <div className='md:hidden mt-5'>
        <MobileHero />
      </div>
      <div className='md:mb-[164px]' />
      <LayoutTemplate>
        <Recommendation />
        <div className='md:mb-[80px] mb-10' />
        <BingungCariSupplier />
        <div className='md:mb-[80px]' />
        {/* <Testimoni /> */}
      </LayoutTemplate>
      {/* <div className='mb-[104px]' /> */}
    </main>
  )
}
