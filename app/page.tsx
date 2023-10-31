import { Province } from "@/src/domain/entities/province";
import LandingPageNavbar from "@/src/infrastructure/ui/global/navbar/landingPage";
import BingungCariSupplier from "@/src/infrastructure/ui/landingPage/bingungCariSupplier";
import { Hero } from "@/src/infrastructure/ui/landingPage/hero";
import MobileHero from "@/src/infrastructure/ui/landingPage/hero/mobileHero";
import Recommendation from "@/src/infrastructure/ui/landingPage/recommendation";
import LayoutTemplate from "@/src/utils/layout";

const getProvinces = async (): Promise<Province[]> => {
  const req = await fetch(
    "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json",
  );
  const res = await req.json();

  return res;
};

export default async function Home() {
  const provinces: Province[] = await getProvinces();

  return (
    <>
      <LandingPageNavbar />
      <main>
        {/* hero */}
        <div className="hidden md:block">
          <Hero provinces={provinces} />
        </div>
        <div className="md:hidden mt-5">
          <MobileHero provinces={provinces} />
        </div>
        {/* hero */}

        <div className="md:mb-[164px]" />

        <LayoutTemplate>
          <Recommendation />
          <div className="md:mb-[80px] mb-10" />
          <BingungCariSupplier />
          <div className="md:mb-[80px]" />
          {/* <Testimoni /> */}
        </LayoutTemplate>
        {/* <div className='mb-[104px]' /> */}
      </main>
    </>
  );
}
