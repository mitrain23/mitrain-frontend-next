import Footer from "@/src/infrastructure/ui/global/footer";
import LandingPageNavbar from "@/src/infrastructure/ui/global/navbar/landingPage";
import PricingHeroSection from "@/src/infrastructure/ui/pricing/heroSection";
import PricingListSection from "@/src/infrastructure/ui/pricing/listSection";
import { cookies } from "next/headers";
import React from "react";

const PricingPage = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  return (
    <>
      <LandingPageNavbar token={token} />
      <main className="min-h-screen">
        <PricingHeroSection />
        <PricingListSection />
      </main>
      <Footer />
    </>
  );
};

export default PricingPage;
