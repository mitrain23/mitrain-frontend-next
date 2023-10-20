"use client";

import { useRegisterUser } from "@/src/application/hooks/userAuth/useRegisterUser";
import LayoutTemplate from "@/src/utils/layout";
import React, { useState } from "react";

interface IFormState {
  [key: string]: string;
  name: string;
  email: string;
  password: string;
  address: string;
  phoneIntContact: string;
  phoneIntWhatsapp: string;
}

const Page = () => {
  const [formState, setFormState] = useState<IFormState>({
    name: "",
    email: "",
    password: "",
    address: "",
    phoneIntContact: "",
    phoneIntWhatsapp: "",
  });
  const [coverImages, setCoverImages] = useState(Array(5).fill(null));

  const formData = new FormData();
  const registerUser = useRegisterUser();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(formState);

    for (const key in formState) {
      if (formState.hasOwnProperty(key)) {
        formData.append(key, formState[key]);
      }
    }

    try {
      const response = await registerUser(formData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LayoutTemplate>
      <>
        <h1 className="font-inter text-[30px] font-semibold mb-[32px] mt-[42px]">
          Buat Akun
        </h1>
        <form
          className="flex flex-col max-md:items-center md:gap-[42px]"
          onSubmit={handleSubmit}
        >
          <label className="flex flex-col md:flex-row items-start justify-start md:justify-between gap-10 py-2 w-full">
            <div className="flex flex-col items-start justify-center gap-2 lg:w-[550px]">
              <h2 className="text-black font-satoshi font-bold text-[22px]">
                Nama Lengkap
              </h2>
              <div className="font-inter text-[#425379] text-[16px] flex flex-col gap-[12px]">
                Pastikan nama Anda diawali dengan huruf kapital dan <br /> tidak
                menggunakan karakter khusus.
              </div>
            </div>
            <input
              type="text"
              name="name"
              placeholder="Adit Saputra"
              value={formState.name}
              onChange={(e) =>
                setFormState((prevState: any) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }))
              }
              className="border border-gray-300 px-[24px] py-[16px] w-[648px] h-[56px] rounded-[8px] outline-none"
            />
          </label>

          <label className="flex flex-col md:flex-row items-start justify-start md:justify-between gap-10 py-2 w-full">
            <div className="flex flex-col items-start justify-center gap-2 md:w-[550px]">
              <h2 className="text-black font-satoshi font-bold text-[22px]">
                Email Aktif
              </h2>
              <div className="font-inter text-[#425379] text-[16px] flex flex-col gap-[12px]">
                Email Anda yang aktif (cth: john.doe@mitrain.id)
              </div>
            </div>
            <input
              type="text"
              name="email"
              placeholder="john.doe@mitrain.id"
              value={formState.email}
              onChange={(e) =>
                setFormState((prevState: any) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }))
              }
              className="border border-gray-300 px-[24px] py-[16px] w-[648px] h-[56px] rounded-[8px] outline-none"
            />
          </label>

          <label className="flex flex-col md:flex-row items-start justify-start md:justify-between gap-10 py-2 w-full">
            <div className="flex flex-col items-start justify-center gap-2 md:w-[550px]">
              <h2 className="text-black font-satoshi font-bold text-[22px]">
                Buat Password
              </h2>
              <div className="font-inter text-[#425379] text-[16px] flex flex-col gap-[12px]">
                Pastikan password yang Anda buat tergolong kuat.
              </div>
            </div>
            <input
              type="text"
              name="password"
              placeholder="john.doe@mitrain.id"
              value={formState.password}
              onChange={(e) =>
                setFormState((prevState: any) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }))
              }
              className="border border-gray-300 px-[24px] py-[16px] w-[648px] h-[56px] rounded-[8px] outline-none"
            />
          </label>

          <div className="flex flex-col md:flex-row items-start justify-start md:justify-between gap-10 py-2 w-full">
            <div className="flex flex-col items-start justify-center gap-2 md:w-[550px]">
              <h2 className="text-black font-satoshi font-bold text-[22px]">
                Foto Profil
              </h2>
              <div className="font-inter w-[420px] text-[#425379] text-[16px] flex flex-col gap-[12px]">
                <p>
                  Format gambar berupa .jpg .jpeg .png dengan ukuran minimum
                  adalah 300x300px (untuk gambar dengan kualitas optimal
                  disarankan menggunakan 700x700px).
                </p>
                <p>
                  Pilih foto produk dengan cara mengklik gambar atau tarik dan
                  letakkan hingga 5 foto sekaligus. Upload minimal 2 foto yang
                  menarik dan berbeda-beda untuk menarik perhatian pembeli.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-5"></div>
          </div>

          <label className="flex flex-col md:flex-row items-start justify-start md:justify-between gap-10 py-2 w-full">
            <div className="flex flex-col items-start justify-center gap-2 md:w-[550px]">
              <h2 className="text-black font-satoshi font-bold text-[22px]">
                Alamat
              </h2>
              <div className="font-inter text-[#425379] text-[16px] flex flex-col gap-[12px]">
                Pastikan setiap produk yang diiklankan tidak melanggar <br />{" "}
                Hak Kekayaan Intelektual merek lain.
              </div>
            </div>
            <input
              type="text"
              name="address"
              placeholder="Alamat"
              value={formState.address}
              onChange={(e) =>
                setFormState((prevState: any) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }))
              }
              className="border border-gray-300 px-[24px] py-[16px] w-[648px] h-[56px] rounded-[8px] outline-none"
            />
          </label>

          <label className="flex flex-col md:flex-row items-start justify-start md:justify-between gap-10 py-2 w-full">
            <div className="flex flex-col items-start justify-center gap-2 lg:w-[550px]">
              <h2 className="text-black font-satoshi font-bold text-[22px]">
                Kontak*
              </h2>
              <div className="font-inter text-[#425379] text-[16px] flex flex-col gap-[12px]">
                Silahkan isi alamat kontak berikut agar pembeli dapat <br />{" "}
                menghubungi Anda.
              </div>
            </div>
            <div className="flex flex-col gap-[24px] w-[648px]">
              <input
                type="text"
                name="phoneIntContact"
                placeholder="Nomor HP Pribadi*"
                value={formState.phoneIntContact}
                onChange={(e) =>
                  setFormState((prevState: any) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                  }))
                }
                className="border border-gray-300 px-[24px] py-[16px] w-full h-[56px] rounded-[8px] outline-none"
              />
              <input
                type="text"
                name="phoneIntWhatsapp"
                placeholder="Nomor WhatsApp*"
                value={formState.phoneIntWhatsapp}
                onChange={(e) =>
                  setFormState((prevState: any) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                  }))
                }
                className="border border-gray-300 px-[24px] py-[16px] w-full h-[56px] rounded-[8px] outline-none"
              />
            </div>
          </label>

          <div className="my-5"></div>

          <button className="btn mb-5" type="submit">
            Gabung
          </button>
        </form>
      </>
    </LayoutTemplate>
  );
};

export default Page;
