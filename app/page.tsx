import HeroCarousel from '@/src/components/heroCarousel'
import BingungCariSupplier from '@/src/infrastructure/ui/landingPage/bingungCariSupplier'
import FlyingHeroSearch from '@/src/infrastructure/ui/landingPage/flyingHeroSearch'
import Recommendation from '@/src/infrastructure/ui/landingPage/recommendation'
import Testimoni from '@/src/infrastructure/ui/landingPage/testimoni'
import LayoutTemplate from '@/src/utils/layout'



export default function Home() {
  return (
    <main>
      <HeroCarousel>
        <FlyingHeroSearch />
      </HeroCarousel>
      <div className='mb-[164px]' />
      <LayoutTemplate>
        <Recommendation />
        <div className='mb-[80px]' />
        <BingungCariSupplier />
        <div className='mb-[80px]' />
        {/* <Testimoni /> */}
      </LayoutTemplate>
      {/* <div className='mb-[104px]' /> */}
    </main>
  )
}
