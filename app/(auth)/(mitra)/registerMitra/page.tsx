"use client";

import { useRegisterMitra } from "@/src/application/hooks/mitraAuth/useRegisterMitra";
import LayoutTemplate from "@/src/utils/layout";
import React, { useState } from "react";

interface IFormState {
  [key: string]: string;
  name: string;
  email: string;
  password: string;
  categoryName: string;
  description: string;
  address: string;
  phoneIntContact: string;
  phoneIntWhatsapp: string;
}

const Page = () => {
  const [formState, setFormState] = useState<IFormState>({
    name: "",
    email: "",
    password: "",
    categoryName: "",
    description: "",
    address: "",
    phoneIntContact: "",
    phoneIntWhatsapp: "",
    experience: "10",
  });
  const [coverImages, setCoverImages] = useState(Array(5).fill(null));
  const [selectedFile, setSelectedFile] = useState(null);

  const formData = new FormData();
  const registerMitra = useRegisterMitra();

  // Handle the file input's onChange event
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(formState);

    for (const key in formState) {
      if (formState.hasOwnProperty(key)) {
        formData.append(key, formState[key]);
      }
    }
    if (selectedFile) {
      formData.append("images", selectedFile);
    }

    try {
      console.log(formData);
      const response = await registerMitra(formData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LayoutTemplate>
      <>
        <h1 className="font-inter text-[30px] font-semibold mb-[32px] mt-[42px]">
          Gabung Sebagai Mitra
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
              value={formState.title}
              onChange={(e) =>
                setFormState((prevState) => ({
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
              value={formState.title}
              onChange={(e) =>
                setFormState((prevState) => ({
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
              value={formState.title}
              onChange={(e) =>
                setFormState((prevState) => ({
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
                Kategori Mitra
              </h2>
              <div className="font-inter text-[#425379] text-[16px] flex flex-col gap-[12px]">
                Pilih kategori yang sesuai dengan produk akan Anda. <br /> Jika
                pemilihan kategori kurang sesuai, maka kategori <br /> akan
                diubah oleh pihak MitraIn ID.
              </div>
            </div>
            <select
              name="categoryName"
              value={formState.categoryName}
              onChange={(e) =>
                setFormState((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }))
              }
              className="select select-bordered w-[648px]  font-inter text-[#6F7277] font-normal text-[16px]"
            >
              <option disabled value="">
                Pilih Kategori
              </option>
              <option>Konveksi</option>
            </select>
          </label>

          <label className="flex flex-col md:flex-row items-start justify-start md:justify-between gap-10 py-2 w-full">
            <div className="flex flex-col items-start justify-center gap-2 md:w-[550px]">
              <h2 className="text-black font-satoshi font-bold text-[22px]">
                Deskripsi
              </h2>
              <div className="font-inter text-[#425379] text-[16px] flex flex-col gap-[12px]">
                Ceritakan pada kami tentang mengapa Anda <br /> memutuskan untuk
                bergabung sebagai Mitra.
              </div>
            </div>
            <textarea
              value={formState.description}
              name="description"
              onChange={(e) =>
                setFormState((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }))
              }
              className="border border-gray-300 px-[24px] py-[16px] w-[648px] h-[200px] rounded-[8px] outline-none"
            />
          </label>

          <div className="flex flex-col md:flex-row items-start justify-start md:justify-between md:items-center gap-10 py-2 w-full">
            <div className="flex flex-col items-start justify-center gap-2 md:w-[550px]">
              <h2 className="text-black font-satoshi font-bold text-[22px]">
                Foto Mitra
              </h2>
              <div className="font-inter w-[420px] text-[#425379] text-[16px] flex flex-col gap-[12px]">
                <p>
                  Format gambar berupa .jpg .jpeg .png dengan ukuran minimum
                  adalah 300x300px (untuk gambar dengan kualitas optimal
                  disarankan menggunakan 700x700px).
                </p>
                <p>
                  Pilih foto produk dengan cara mengklik gambar. Upload foto
                  yang menarik dan berbeda-beda untuk menarik perhatian pembeli.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-5">
              <input type="file" onChange={handleFileChange} />
            </div>
          </div>

          <label className="flex flex-col md:flex-row items-start justify-start md:justify-between gap-10 py-2 w-full">
            <div className="flex flex-col items-start justify-center gap-2 md:w-[550px]">
              <h2 className="text-black font-satoshi font-bold text-[22px]">
                Lokasi*
              </h2>
              <div className="font-inter text-[#425379] text-[16px] flex flex-col gap-[12px]">
                Pastikan setiap produk yang diiklankan tidak melanggar <br />{" "}
                Hak Kekayaan Intelektual merek lain.
              </div>
            </div>
            <select
              name="address"
              value={formState.location}
              onChange={(e) =>
                setFormState((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }))
              }
              className="select select-bordered w-[648px]  font-inter text-[#6F7277] font-normal text-[16px]"
            >
              <option disabled selected>
                Pilih Lokasi
              </option>
              <option>Bandung</option>
            </select>
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
            <div className="flex flex-col gap-[24px]">
              <input
                type="text"
                name="phoneIntContact"
                placeholder="Nomor HP Pribadi*"
                value={formState.phone_number_contact}
                onChange={(e) =>
                  setFormState((prevState) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                  }))
                }
                className="border border-gray-300 px-[24px] py-[16px] w-[648px] h-[56px] rounded-[8px] outline-none"
              />
              <input
                type="text"
                name="phoneIntWhatsapp"
                placeholder="Nomor WhatsApp*"
                value={formState.phone_number_whatsapp}
                onChange={(e) =>
                  setFormState((prevState) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                  }))
                }
                className="border border-gray-300 px-[24px] py-[16px] w-[648px] h-[56px] rounded-[8px] outline-none"
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
