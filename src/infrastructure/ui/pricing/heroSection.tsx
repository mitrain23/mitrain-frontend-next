"use client";

import React from "react";
import Image from "next/image";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";

const PricingHeroSection = () => {
  return (
    <div>
      <div className="bg-[#458CCC] h-[400px] flex flex-col items-center w-full pt-16">
        <h1 className="text-[53px] text-white">
          Iklan <span className="font-bold">Bisnis</span> Anda di{" "}
          <span className="font-bold">Mitrainid.com</span>
        </h1>
        <p className="text-[32px] text-white">
          Platform mencari mitra/partner bisnis <br />
          terpercaya dan digital di Indonesia
        </p>
      </div>
      <div>
        <div className="-translate-y-[50%] mx-auto max-w-[980px]">
          <Tabs defaultValue="ig" className="w-full">
            <TabsList className="flex justify-center bg-transparent">
              <TabsTrigger
                value="ig"
                className="bg-white/30 p-2 shadow-none data-[state=active]:shadow-none rounded-b-none"
              >
                <div className="w-[32px] h-[32px]">
                  <Image
                    alt="ig-logo"
                    src="/images/instagram.png"
                    width={980}
                    height={980}
                  />
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="linkedin"
                className="bg-white/30 p-2 shadow-none data-[state=active]:shadow-none rounded-b-none"
              >
                <div className="w-[32px] h-[32px]">
                  <Image
                    alt="linkedin-logo"
                    src="/images/linkedin.png"
                    width={980}
                    height={980}
                  />
                </div>
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="ig"
              className="bg-white mt-0 p-4 rounded-md shadow-md"
            >
              <div className="flex gap-4 items-center">
                <div className="w-[120px] h-[120px]">
                  <Image
                    alt="ig-logo"
                    src="/images/instagram.png"
                    width={980}
                    height={980}
                  />
                </div>

                <div className="space-y-2">
                  <h2 className="font-bold">Instagram : @mitrain_id</h2>
                  <p className="text-black/60">
                    Kami memiliki ratusan ribu pengikut di akun instagram kami{" "}
                    <br />
                    @mitrain_id yang terus bertumbuh
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent
              value="linkedin"
              className="bg-white mt-0 p-4 rounded-md shadow-md"
            >
              Change your password here.
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PricingHeroSection;
