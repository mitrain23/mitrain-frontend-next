"use client";

import { Post } from "@/src/domain/entities/post";
import React, { useEffect, useState } from "react";
import FileInputBox from "./fileInputBox";
import { useCreatePost } from "@/src/application/hooks/posts/useCreatePost";
import { decodeToken } from "@/src/utils/auth/decodeToken";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Textarea } from "@/src/components/ui/textarea";
import { Button } from "@/src/components/ui/button";

interface FormState {
  title: string;
  description: string;
  category: string;
  priceMin: string;
  priceMax: string;
  location: string;
  phoneIntWhatsapp: string;
  phoneIntContact: string;
}

interface ImageData {
  file: File | null;
  imageUrl: string | null;
}

interface Province {
  id: string;
  name: string;
}

interface City {
  id: string;
  name: string;
}

const CreateForm = () => {
  const formatPrice = (input: any) => {
    return input.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    // Format the input value and update the state
    const formattedValue = formatPrice(value);
    setFormState((prevState) => ({
      ...prevState,
      [name]: formattedValue,
    }));
  };

  const [formState, setFormState] = useState<FormState>({
    title: "",
    description: "",
    category: "",
    priceMin: "",
    priceMax: "",
    location: "",
    phoneIntWhatsapp: "",
    phoneIntContact: "",
  });
  const [coverImages, setCoverImages] = useState(Array(5).fill(null));
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<any>("");
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCities, setSelectedCities] = useState<any>("");

  useEffect(() => {
    fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
      .then((response) => response.json())
      .then((data) => {
        // Set the fetched data in the provinces state
        setProvinces(data);
        console.log(data[0].id, "ini data provinsi");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    // if (selectedProvince) {
    console.log(selectedProvince);
    fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvince}.json`,
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "doihwandoiaidnwani");
        // Set the fetched cities in the cities state
        setCities(data);
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
      });
    // }
  }, [selectedProvince]);

  useEffect(() => {
    console.log(formState.location);
  }, [formState.location]);

  // handleFileChange
  interface ImageData {
    file: any;
    imageUrl: string | null;
  }

  const handleFileChange = (file: any, boxNumber: any, coverImage: any) => {
    const updatedImages: ImageData[] = coverImages.map((imageData) => ({
      file: imageData ? imageData.file : null,
      imageUrl: imageData ? imageData.imageUrl : null,
    }));
    let imageUrl = null;
    const coverImageValues = [...coverImages];
    if (file != null) {
      imageUrl = URL.createObjectURL(file);
    }

    for (let i = 0; i < updatedImages.length; i++) {
      if (updatedImages[i].file === null) {
        updatedImages[i] = {
          file: file,
          imageUrl: imageUrl,
        };
        coverImageValues[i] = coverImage;
        break;
      }
    }

    setCoverImages(updatedImages);
  };

  console.log(coverImages);

  // TODO: isLoading
  const createPost = useCreatePost();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(formState).forEach(([key, value]) => {
      formData.append(key, value);
    });
    coverImages.forEach((coverImage, index) => {
      formData.append("images", coverImage.file);
    });

    try {
      const response = await createPost.createPostMutation(formData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setCoverImages(Array(5).fill(null));
    setFormState({
      title: "",
      description: "",
      category: "",
      priceMin: "",
      priceMax: "",
      location: "",
      phoneIntWhatsapp: "",
      phoneIntContact: "",
    });

    // console.log([...formData])
    console.log(formState, "ini formState");
  };

  return (
    <>
      <h1 className="font-inter text-[30px] font-semibold mb-[32px] mt-[42px]">
        Tambah Iklan
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col max-md:items-center md:gap-[42px]"
      >
        <label className="flex flex-col md:flex-row items-start justify-start md:justify-between gap-10 py-2 w-full">
          <div className="flex flex-col items-start justify-center gap-2 lg:w-[550px]">
            <h2 className="text-black font-satoshi font-bold text-[22px]">
              Informasi Produk*
            </h2>
            <div className="font-inter text-[#425379] text-[16px] flex flex-col gap-[12px]">
              <p>
                Pastikan setiap produk yang diiklankan tidak melanggar <br />{" "}
                Hak Kekayaan Intelektual merek lain.
              </p>
              <p>
                Disarankan menggunakan huruf kapital di awal kalimat <br /> dan
                hindari kapital berlebih.
              </p>
            </div>
          </div>
          <Input
            type="text"
            name="title"
            placeholder="Custom Baju Anak (Jenis/ Kategori Produk) + TokoBaju (Merek)"
            value={formState.title}
            onChange={(e) =>
              setFormState((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }))
            }
            className="border placeholder:text-[16px] border-gray-300 px-[24px] py-[16px] w-full md:w-[648px] h-[56px] rounded-[8px] outline-none"
          />
        </label>

        <label className="flex flex-col md:flex-row items-start justify-start md:justify-between gap-10 py-2 w-full">
          <div className="flex flex-col items-start justify-center gap-2 md:w-[550px]">
            <h2 className="text-black font-satoshi font-bold text-[22px]">
              Kategori Mitra
            </h2>
            <div className="font-inter text-[#425379] text-[16px] flex flex-col gap-[12px]">
              Pilih kategori yang sesuai dengan produk akan Anda. <br /> Jika
              pemilihan kategori kurang sesuai, maka kategori <br /> akan diubah
              oleh pihak MitraIn ID.
            </div>
          </div>
          <Select
            name="category"
            value={formState.category}
            onValueChange={(value) =>
              setFormState((prev) => ({
                ...prev,
                category: value,
              }))
            }
          >
            <SelectTrigger className="w-full md:w-[648px] font-inter text-[#6F7277] h-[56px] font-normal text-[16px]">
              <SelectValue placeholder="Pilih Kategori" />
            </SelectTrigger>
            <SelectContent className="text-[16px]">
              <SelectItem value="konveksi" className="h-[56px]">
                Konveksi
              </SelectItem>
              <SelectItem value="lainnya" className="h-[56px]">
                Lainnya
              </SelectItem>
            </SelectContent>
          </Select>
        </label>

        <label className="flex flex-col md:flex-row items-start justify-start md:justify-between gap-10 py-2 w-full">
          <div className="flex flex-col items-start justify-center gap-2 md:w-[550px]">
            <h2 className="text-black font-satoshi font-bold text-[22px]">
              Deskripsi Produk*
            </h2>
            <div className="font-inter text-[#425379] text-[16px] flex flex-col gap-[12px]">
              <p>
                Pastikan setiap produk yang diiklankan tidak melanggar <br />{" "}
                Hak Kekayaan Intelektual merek lain.
              </p>
              <p>
                Disarankan menggunakan huruf kapital di awal kalimat <br /> dan
                hindari kapital berlebih.
              </p>
            </div>
          </div>
          <Textarea
            value={formState.description}
            name="description"
            onChange={(e) =>
              setFormState((prevState) => ({
                ...prevState,
                description: e.target.value,
              }))
            }
            className="border border-gray-300 px-[24px] py-[16px] w-full md:w-[648px] h-[200px] rounded-[8px] outline-none"
          />
        </label>

        <div className="flex flex-col md:flex-row items-start justify-start md:justify-between gap-10 py-2 w-full">
          <div className="flex flex-col items-start justify-center gap-2 md:w-[550px]">
            <h2 className="text-black font-satoshi font-bold text-[22px]">
              Foto Produk*
            </h2>
            <div className="font-inter w-full md:w-[420px] text-[#425379] text-[16px] flex flex-col gap-[12px]">
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
          <div className="flex flex-wrap flex-row items-center justify-center md:items-start gap-5">
            {coverImages.map((coverImage, index) => (
              <FileInputBox
                key={index}
                boxNumber={index + 1}
                onChange={handleFileChange}
                coverImage={coverImage}
              />
            ))}
          </div>
        </div>

        <label className="flex flex-col md:flex-row items-start justify-start md:justify-between gap-10 py-2 w-full">
          <div className="flex flex-col items-start justify-center gap-2 md:w-[550px]">
            <h2 className="text-black font-satoshi font-bold text-[22px]">
              Harga*
            </h2>
            <div className="font-inter text-[#425379] text-[16px] flex flex-col gap-[12px]">
              Masukkan harga minimum dan maksimum produk yang <br /> Anda
              tawarkan agar pembeli paham tentang harga yang <br /> Anda
              tawarkan.
            </div>
          </div>
          <div className="flex flex-col gap-[24px] w-full md:w-[648px]">
            <div className="form-control w-full md:w-[648px]">
              <label className="flex items-center border border-[#E5E7E9] rounded-[8px]">
                <span className="bg-[#F3F4F5] h-[56px] w-[56px] flex items-center justify-center rounded-l-[8px]">
                  Rp
                </span>
                <Input
                  name="priceMin"
                  type="text"
                  placeholder="Harga Minimum"
                  className="w-full border-none rounded-l-none rounded-r-[8px] shadow-none h-[56px] focus-visible:ring-0"
                  value={formState.priceMin}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="flex items-center border border-[#E5E7E9] rounded-[8px]">
                <span className="bg-[#F3F4F5] h-[56px] w-[56px] flex items-center justify-center rounded-l-[8px]">
                  Rp
                </span>
                <Input
                  name="priceMax"
                  type="text"
                  placeholder="Harga Maksimal"
                  className="w-full border-none rounded-l-none rounded-r-[8px] shadow-none h-[56px] focus-visible:ring-0"
                  value={formState.priceMax}
                  onChange={handleInputChange}
                />
              </label>
            </div>
          </div>
        </label>

        <label className="flex flex-col md:flex-row items-start justify-start md:justify-between gap-10 py-2 w-full">
          <div className="flex flex-col items-start justify-center gap-2 md:w-[550px]">
            <h2 className="text-black font-satoshi font-bold text-[22px]">
              Lokasi
            </h2>
            <div className="font-inter text-[#425379] text-[16px] flex flex-col gap-[12px]">
              Pastikan setiap produk yang diiklankan tidak melanggar <br /> Hak
              Kekayaan Intelektual merek lain.
            </div>
          </div>
          <div className="flex flex-col gap-[24px]">
            <Select
              name="province"
              value={selectedProvince}
              onValueChange={(value) => {
                const selectedProvinceId = value;
                const selectedProvinceObject = provinces.find(
                  (province: any) => province.id === selectedProvinceId,
                );

                setSelectedProvince(selectedProvinceObject?.id);
                setCities([]);
              }}
            >
              <SelectTrigger className="w-full lg:w-[648px] font-inter text-[#6F7277] font-normal text-[16px] h-[56px]">
                <SelectValue placeholder="Pilih Provinsi" />
              </SelectTrigger>
              <SelectContent className="overflow-y-auto max-h-[10rem]">
                {provinces.map((province, idx) => (
                  <SelectItem
                    className="h-[56px]"
                    value={province.id}
                    key={idx}
                  >
                    {province.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedProvince && (
              <Select
                name="city"
                value={selectedCities}
                onValueChange={(value) => {
                  setFormState((prev) => ({
                    ...prev,
                    location: value,
                  }));
                  setSelectedCities(value);
                }}
              >
                <SelectTrigger className="w-full lg:w-[648px] font-inter text-[#6F7277] font-normal text-[16px] h-[56px]">
                  <SelectValue placeholder="Pilih Kota/Kabupaten" />
                </SelectTrigger>
                <SelectContent className="overflow-y-auto max-h-[10rem]">
                  {cities.map((city, idx) => (
                    <SelectItem className="h-[56px]" value={city.id} key={idx}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
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
          <div className="flex flex-col gap-[24px] w-full md:w-[648px]">
            <Input
              type="text"
              name="phoneIntContact"
              placeholder="Nomor HP Pribadi*"
              value={formState.phoneIntContact}
              onChange={(e) =>
                setFormState((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }))
              }
              className="border border-gray-300 px-[24px] py-[16px] h-[56px] rounded-[8px] outline-none placeholder:text-[16px]"
            />
            <Input
              type="text"
              name="phoneIntWhatsapp"
              placeholder="Nomor WhatsApp*"
              value={formState.phoneIntWhatsapp}
              onChange={(e) =>
                setFormState((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }))
              }
              className="border border-gray-300 px-[24px] py-[16px] h-[56px] rounded-[8px] outline-none placeholder:text-[16px]"
            />
          </div>
        </label>

        <div className="my-5"></div>

        <Button className="w-full h-[56px] text-[16px]" type="submit">
          Create Post
        </Button>
      </form>
    </>
  );
};

export default CreateForm;
