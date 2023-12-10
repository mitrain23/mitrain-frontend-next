import { Province } from "@/src/domain/entities/province";
import Footer from "@/src/infrastructure/ui/global/footer";
import LandingPageNavbar from "@/src/infrastructure/ui/global/navbar/landingPage";
import BingungCariSupplier from "@/src/infrastructure/ui/landingPage/bingungCariSupplier";
import { Hero } from "@/src/infrastructure/ui/landingPage/hero";
import MobileHero from "@/src/infrastructure/ui/landingPage/hero/mobileHero";
import Recommendation from "@/src/infrastructure/ui/landingPage/recommendation";
import LayoutTemplate from "@/src/utils/layout";
import axios from "axios";
import { cookies } from "next/headers";

const getProvinces = async (): Promise<Province[]> => {
  const response = await axios.get(
    "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json",
  );

  return response.data;
};

export default async function Home() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  const provinces: Province[] = await getProvinces();

  return (
    <>
      <LandingPageNavbar token={token} />
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
      <Footer />
    </>
  );
}
