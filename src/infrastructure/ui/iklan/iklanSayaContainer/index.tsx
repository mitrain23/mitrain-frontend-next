import React from "react";
import IklanSayaCard from "../iklanSayaCard";
import Link from "next/link";
import { GetPostByAuthorResponse } from "@/src/infrastructure/models/getPostByAuthorResponse";

const IklanSayaContainer = ({
  data,
}: {
  data: GetPostByAuthorResponse | null | undefined;
}) => {
  return (
    <div className="flex flex-col gap-[12px]">
      {data?.data.map((item, index) => {
        return (
          <>
            <IklanSayaCard data={item} index={index + 1} />
          </>
        );
      })}
      <Link href={"/create"}>
        <div className="w-full h-[112px] flex items-center justify-center gap-[12px] border-dashed border-2 border-[#DFDFDF] hover:border-color2 rounded-[8px] cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M9 11V14C9 14.2833 9.09583 14.5208 9.2875 14.7125C9.47917 14.9042 9.71667 15 10 15C10.2833 15 10.5208 14.9042 10.7125 14.7125C10.9042 14.5208 11 14.2833 11 14V11H14C14.2833 11 14.5208 10.9042 14.7125 10.7125C14.9042 10.5208 15 10.2833 15 10C15 9.71667 14.9042 9.47917 14.7125 9.2875C14.5208 9.09583 14.2833 9 14 9H11V6C11 5.71667 10.9042 5.47917 10.7125 5.2875C10.5208 5.09583 10.2833 5 10 5C9.71667 5 9.47917 5.09583 9.2875 5.2875C9.09583 5.47917 9 5.71667 9 6V9H6C5.71667 9 5.47917 9.09583 5.2875 9.2875C5.09583 9.47917 5 9.71667 5 10C5 10.2833 5.09583 10.5208 5.2875 10.7125C5.47917 10.9042 5.71667 11 6 11H9ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20Z"
              fill="#AFAFAF"
            />
          </svg>
          <h1 className="font-satoshi text-[#AFAFAF] font-bold text-[18px]">
            Tambahkan Iklan
          </h1>
        </div>
      </Link>
    </div>
  );
};

export default IklanSayaContainer;