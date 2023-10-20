"use client";
import React, { useState, useEffect, useRef } from "react";

const Filter = () => {
  const [open, setOpen] = useState(false);
  const focusRef = useRef<any>();

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (focusRef.current && !focusRef.current.contains(e.target)) {
        setOpen(!open);
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [open]);

  return (
    <div className="">
      <div className="hidden lg:flex flex-row justify-between items-center mb-[36px]">
        <div className="flex flex-row items-center gap-[24px] z-10">
          <h1 className="font-inter text-[16px] font-semibold text-[#020831]">
            Harga
          </h1>
          <div className="form-control">
            <label className="input-group">
              <span>Rp</span>
              <input
                type="text"
                placeholder="Harga Minimum"
                className="input input-bordered focus:outline-none"
              />
            </label>
          </div>
          <div className="form-control">
            <label className="input-group">
              <span>Rp</span>
              <input
                type="text"
                placeholder="Harga Minimum"
                className="input input-bordered focus:outline-none"
              />
            </label>
          </div>
        </div>
        <div className="flex flex-row items-center gap-[24px]">
          <h1 className="font-inter text-[16px] font-semibold text-[#020831]">
            Urutkan
          </h1>
          <select className="select select-bordered w-full max-w-xs font-inter text-[#6F7277] font-normal text-[16px]">
            <option disabled selected>
              Paling Sesuai
            </option>
          </select>
        </div>
      </div>

      <div
        className="flex flex-row items-center py-[14px] px-[24px] gap-[42px] lg:hidden  w-[151px] h-[48px] rounded-[8px] border-[1px] border-[#D9D9D9] bg-white  mb-[32px] mt-[16px]"
        onClick={() => setOpen((open) => !open)}
      >
        <h1>Filter</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <mask
            id="mask0_264_3793"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="24"
            height="24"
          >
            <rect width="24" height="24" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_264_3793)">
            <path
              d="M4 19C3.71667 19 3.47917 18.9042 3.2875 18.7125C3.09583 18.5208 3 18.2833 3 18C3 17.7167 3.09583 17.4792 3.2875 17.2875C3.47917 17.0958 3.71667 17 4 17H8C8.28333 17 8.52083 17.0958 8.7125 17.2875C8.90417 17.4792 9 17.7167 9 18C9 18.2833 8.90417 18.5208 8.7125 18.7125C8.52083 18.9042 8.28333 19 8 19H4ZM4 7C3.71667 7 3.47917 6.90417 3.2875 6.7125C3.09583 6.52083 3 6.28333 3 6C3 5.71667 3.09583 5.47917 3.2875 5.2875C3.47917 5.09583 3.71667 5 4 5H12C12.2833 5 12.5208 5.09583 12.7125 5.2875C12.9042 5.47917 13 5.71667 13 6C13 6.28333 12.9042 6.52083 12.7125 6.7125C12.5208 6.90417 12.2833 7 12 7H4ZM12 21C11.7167 21 11.4792 20.9042 11.2875 20.7125C11.0958 20.5208 11 20.2833 11 20V16C11 15.7167 11.0958 15.4792 11.2875 15.2875C11.4792 15.0958 11.7167 15 12 15C12.2833 15 12.5208 15.0958 12.7125 15.2875C12.9042 15.4792 13 15.7167 13 16V17H20C20.2833 17 20.5208 17.0958 20.7125 17.2875C20.9042 17.4792 21 17.7167 21 18C21 18.2833 20.9042 18.5208 20.7125 18.7125C20.5208 18.9042 20.2833 19 20 19H13V20C13 20.2833 12.9042 20.5208 12.7125 20.7125C12.5208 20.9042 12.2833 21 12 21ZM8 15C7.71667 15 7.47917 14.9042 7.2875 14.7125C7.09583 14.5208 7 14.2833 7 14V13H4C3.71667 13 3.47917 12.9042 3.2875 12.7125C3.09583 12.5208 3 12.2833 3 12C3 11.7167 3.09583 11.4792 3.2875 11.2875C3.47917 11.0958 3.71667 11 4 11H7V10C7 9.71667 7.09583 9.47917 7.2875 9.2875C7.47917 9.09583 7.71667 9 8 9C8.28333 9 8.52083 9.09583 8.7125 9.2875C8.90417 9.47917 9 9.71667 9 10V14C9 14.2833 8.90417 14.5208 8.7125 14.7125C8.52083 14.9042 8.28333 15 8 15ZM12 13C11.7167 13 11.4792 12.9042 11.2875 12.7125C11.0958 12.5208 11 12.2833 11 12C11 11.7167 11.0958 11.4792 11.2875 11.2875C11.4792 11.0958 11.7167 11 12 11H20C20.2833 11 20.5208 11.0958 20.7125 11.2875C20.9042 11.4792 21 11.7167 21 12C21 12.2833 20.9042 12.5208 20.7125 12.7125C20.5208 12.9042 20.2833 13 20 13H12ZM16 9C15.7167 9 15.4792 8.90417 15.2875 8.7125C15.0958 8.52083 15 8.28333 15 8V4C15 3.71667 15.0958 3.47917 15.2875 3.2875C15.4792 3.09583 15.7167 3 16 3C16.2833 3 16.5208 3.09583 16.7125 3.2875C16.9042 3.47917 17 3.71667 17 4V5H20C20.2833 5 20.5208 5.09583 20.7125 5.2875C20.9042 5.47917 21 5.71667 21 6C21 6.28333 20.9042 6.52083 20.7125 6.7125C20.5208 6.90417 20.2833 7 20 7H17V8C17 8.28333 16.9042 8.52083 16.7125 8.7125C16.5208 8.90417 16.2833 9 16 9Z"
              fill="black"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};
// TODO: Sheet nya shadcn ui aja
/**
 *
      <BottomSheet open={open} onDismiss={() => setOpen(!open)} blocking={true}>
        <div
          className="flex flex-col px-[16px] py-[16px] gap-[12px]"
          ref={focusRef}
        >
          <div className="flex flex-row items-center justify-between gap-[24px]">
            <h1 className="font-inter text-[16px] font-semibold text-[#020831]">
              Urutkan
            </h1>
            <select className="select select-bordered max-w-[250px] font-inter text-[#6F7277] font-normal text-[16px]">
              <option disabled selected>
                Paling Sesuai
              </option>
              <option>Han Solo</option>
              <option>Greedo</option>
            </select>
          </div>
          <div className="flex flex-row items-center justify-between gap-[24px]">
            <h1 className="font-inter text-[16px] font-semibold text-[#020831]">
              Harga
            </h1>

            <div className="flex flex-col gap-[12px]">
              <div className="form-control max-w-[200px]">
                <label className="input-group">
                  <span>Rp</span>
                  <input
                    type="text"
                    placeholder="Harga Minimum"
                    className="input input-bordered focus:outline-none"
                  />
                </label>
              </div>

              <div className="form-control max-w-[200px]">
                <label className="input-group">
                  <span>Rp</span>
                  <input
                    type="text"
                    placeholder="Harga Maksimum"
                    className="input input-bordered focus:outline-none"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </BottomSheet>
 */

export default Filter;
