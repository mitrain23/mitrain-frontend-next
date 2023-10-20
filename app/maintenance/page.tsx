import LayoutTemplate from "@/src/utils/layout";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const Page = () => {
  return (
    <LayoutTemplate>
      <div className="flex flex-col items-center text-center gap-[150px]">
        <div className="logo ">
          <Link href={"/"} className="flex flex-row gap-[16px] items-center">
            <Image
              src="/images/logoMitrain.svg"
              width={60}
              height={60}
              alt="logo-mitrain"
            />
            <h1 className="font-satoshi text-[20px] font-bold text-[#0054A5]">
              MitraIn ID
            </h1>
          </Link>
        </div>
        <div className="title flex flex-col font-satoshi max-w-3xl gap-6">
          <h1 className="text-[64px] font-semibold text-gray-700 leading-tight">
            This feature is currently down for maintenance
          </h1>
          <div className="font-inter font-light">
            <p>We aplogize for any inconvenienced caused.</p>
            <p>We've almost done.</p>
          </div>
        </div>
      </div>
    </LayoutTemplate>
  );
};

export default Page;
