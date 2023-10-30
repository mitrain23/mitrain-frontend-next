import React from "react";
import Image from "next/image";
import logo from "../../../../../public/images/logo-mitrain.png";

const Logo = () => {
  return (
    <div className="flex flex-row items-center gap-[16px]">
      <Image src={logo} alt="" />
      <h1 className="font-satoshi text-[20px] text-white font-bold">
        Mitrain ID
      </h1>
    </div>
  );
};

export default Logo;
