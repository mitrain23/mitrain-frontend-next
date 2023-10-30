import React from "react";
import Image from "next/image";
import Logo from "../logo";

const Footer = () => {
  return (
    <div className="h-fit py-[24px] md:px-[240px] text-white w-full bg-[#020831] flex flex-col md:flex-row md:justify-between items-center">
      <div>
        <Logo />
      </div>
      <div>
        <ul className="hidden md:flex md:flex-row md:items-center gap-[16px] font-inter">
          <li>index</li>
          <li>index</li>
          <li>index</li>
          <li>index</li>
        </ul>
      </div>
      <div className="hidden md:flex">social icon</div>
    </div>
  );
};

export default Footer;
