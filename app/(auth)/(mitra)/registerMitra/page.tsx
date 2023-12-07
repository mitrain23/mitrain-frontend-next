"use client";

import { Button } from "@/src/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Textarea } from "@/src/components/ui/textarea";
import { City } from "@/src/domain/entities/city";
import { Province } from "@/src/domain/entities/province";
import { MitraRepository } from "@/src/infrastructure/services/mitraAuth/mitraRepository";
import LayoutTemplate from "@/src/utils/layout";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { z } from "zod";

const isMobilePhone = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(1),
  categoryName: z.string(),
  description: z.string().min(1),
  phoneIntContact: z.string().regex(isMobilePhone).min(11).max(12),
  phoneIntWhatsapp: z.string().regex(isMobilePhone).min(11).max(12),
  experience: z.string().min(1),
});

const API_BASE_URL = process.env.BASE_URL;

const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      categoryName: "Kaos",
      description: "",
      phoneIntContact: "",
      phoneIntWhatsapp: "",
      experience: "",
    },
  });

  const router = useRouter();

  const [selectedFile, setSelectedFile] = useState<File>();
  const [categories, setCategories] = useState<string[]>([]);

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState<string>("");

  const [cities, setCities] = useState<City[]>([]);
  const [selectedCityId, setSelectedCityId] = useState<string>("");

  const [address, setAddress] = useState("");

  // Handle the file input's onChange event
  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    setSelectedFile(file);
  };

  const { mutate: registerMitra, isLoading } = useMutation({
    mutationFn: (formData: FormData) => MitraRepository.registerMitra(formData),
  });
  const experiences = [
    "Kurang dari 1 Tahun",
    "2 Tahun",
    "3 Tahun",
    "5 Tahun",
    "Lebih dari 5 Tahun",
  ];

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();

    if (selectedFile) {
      formData.append("images", selectedFile);
    }

    if (address) {
      formData.append("address", address);
    }

    for (const [key, data] of Object.entries(values)) {
      formData.append(key, data);
    }

    try {
      registerMitra(formData, {
        onSuccess: (data) => {
          console.log(data);
          router.push("/loginMitra");
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      const response = await axios.get(API_BASE_URL + "/api/category");
      console.log(response.data.data);

      const categories: string[] = [];

      for (const category of response.data.data) {
        categories.push(category.categoryName);
      }

      setCategories(categories);
    };

    const getProvinces = async () => {
      const response = await axios.get(
        "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json",
      );

      setProvinces(response.data);
    };

    getCategories();
    getProvinces();
  }, []);

  useEffect(() => {
    const getCities = async () => {
      const response = await axios.get(
        `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvinceId}.json`,
      );
      setCities(response.data);
    };

    getCities().catch((reason) => console.log(reason));
  }, [selectedProvinceId]);

  return (
    <LayoutTemplate>
      <>
        <h1 className="font-inter text-[30px] font-bold mb-[32px] mt-[42px]">
          Gabung Sebagai Mitra
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="md:flex flex-col max-md:items-center md:gap-[42px]"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <label className="flex flex-col md:flex-row items-start justify-start md:justify-between gap-10 py-2 w-full">
                    <div className="flex flex-col items-start justify-center gap-2 lg:w-[550px]">
                      <h2 className="text-black font-satoshi font-bold text-[22px]">
                        Nama Lengkap
                      </h2>
                      <div className="font-inter text-[#425379] text-[16px] flex flex-col gap-[12px]">
                        Pastikan nama Anda diawali dengan huruf kapital dan{" "}
                        <br /> tidak menggunakan karakter khusus.
                      </div>
                    </div>
                    <div className="w-full md:w-max">
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Adit Saputra"
                          className="border border-gray-300 px-[24px] md:w-[648px] w-full py-[16px] h-[56px] rounded-[8px] outline-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </label>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <label className="flex flex-col md:flex-row items-start justify-start md:justify-between gap-10 py-2 w-full">
                    <div className="flex flex-col items-start justify-center gap-2 lg:w-[550px]">
                      <h2 className="text-black font-satoshi font-bold text-[22px]">
                        Email Aktif
                      </h2>
                      <div className="font-inter text-[#425379] text-[16px] flex flex-col gap-[12px]">
                        Email Anda yang aktif (cth: john.doe@mitrain.id) *
                      </div>
                    </div>
                    <div className="w-full md:w-max">
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john.doe@mitrain.id"
                          className="border border-gray-300 px-[24px] md:w-[648px] w-full py-[16px] h-[56px] rounded-[8px] outline-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </label>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <label className="flex flex-col md:flex-row items-start justify-start md:justify-between gap-10 py-2 w-full">
                    <div className="flex flex-col items-start justify-center gap-2 lg:w-[550px]">
                      <h2 className="text-black font-satoshi font-bold text-[22px]">
                        Buat Password
                      </h2>
                      <div className="font-inter text-[#425379] text-[16px] flex flex-col gap-[12px]">
                        Pastikan password yang Anda buat tergolong kuat. *
                      </div>
                    </div>
                    <div className="w-full md:w-max">
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          className="border border-gray-300 px-[24px] md:w-[648px] w-full py-[16px] h-[56px] rounded-[8px] outline-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </label>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryName"
              render={({ field }) => (
                <FormItem>
                  <label className="flex flex-col md:flex-row items-start justify-start md:justify-between gap-10 py-2 w-full">
                    <div className="flex flex-col items-start justify-center gap-2 md:w-[550px]">
                      <h2 className="text-black font-satoshi font-bold text-[22px]">
                        Kategori Mitra
                      </h2>
                      <div className="font-inter text-[#425379] text-[16px] flex flex-col gap-[12px]">
                        Pilih kategori yang sesuai dengan produk akan Anda.{" "}
                        <br /> Jika pemilihan kategori kurang sesuai, maka
                        kategori <br /> akan diubah oleh pihak MitraIn ID.
                      </div>
                    </div>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="md:w-[648px] w-full h-[56px] font-inter text-[#6F7277] font-normal text-[16px]">
                          <SelectValue placeholder="Pilih Kategori" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category, idx) => (
                          <SelectItem
                            className="h-[56px]"
                            value={category}
                            key={idx}
                          >
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </label>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <label className="flex flex-col md:flex-row items-start justify-start md:justify-between gap-10 py-2 w-full">
                    <div className="flex flex-col items-start justify-center gap-2 md:w-[550px]">
                      <h2 className="text-black font-satoshi font-bold text-[22px]">
                        Pengalaman
                      </h2>
                      <div className="font-inter text-[#425379] text-[16px] flex flex-col gap-[12px]">
                        Pengalaman Pekerjaan Anda
                      </div>
                    </div>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full md:w-[648px] font-inter text-[#6F7277] h-[56px] font-normal text-[16px]">
                          <SelectValue placeholder="Pengalaman" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="text-[16px]">
                        {experiences.map((experience, idx) => (
                          <SelectItem
                            className="h-[56px]"
                            value={experience}
                            key={idx}
                          >
                            {experience}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </label>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <label className="flex flex-col md:flex-row items-start justify-start md:justify-between gap-10 py-2 w-full">
                    <div className="flex flex-col items-start justify-center gap-2 md:w-[550px]">
                      <h2 className="text-black font-satoshi font-bold text-[22px]">
                        Deskripsi
                      </h2>
                      <div className="font-inter text-[#425379] text-[16px] flex flex-col gap-[12px]">
                        Ceritakan pada kami tentang mengapa Anda <br />{" "}
                        memutuskan untuk bergabung sebagai Mitra.
                      </div>
                    </div>
                    <div>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Deskripsi"
                          className="border border-gray-300 px-[24px] py-[16px] md:w-[648px] w-full h-[200px] rounded-[8px] outline-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </label>
                </FormItem>
              )}
            />

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
                    yang menarik dan berbeda-beda untuk menarik perhatian
                    pembeli.
                  </p>
                </div>
              </div>
              {/* <div className="flex flex-col md:flex-row items-center md:items-start gap-5"> */}
              <Input
                type="file"
                onChange={handleFileChange}
                className="border border-gray-300 px-[24px] md:w-[648px] w-full py-[16px] h-[56px] rounded-[8px] outline-none"
              />
              {/* </div> */}
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
              <div className="w-full lg:w-[648px]">
                <Select
                  name="province"
                  value={selectedProvinceId}
                  onValueChange={(value) => {
                    const selectedProvinceId = value;
                    const selectedProvinceObject = provinces.find(
                      (province: any) => province.id === selectedProvinceId,
                    );

                    setSelectedProvinceId(selectedProvinceObject?.id || "");
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

                {selectedProvinceId && (
                  <Select
                    name="city"
                    value={selectedCityId}
                    onValueChange={(value) => {
                      const province = provinces.find(
                        (province) => province.id === selectedProvinceId,
                      )?.name;
                      const city = cities.find((city) => city.id === value)
                        ?.name;

                      setAddress(`${city}, ${province}`);

                      setSelectedCityId(value);
                    }}
                  >
                    <SelectTrigger className="w-full lg:w-[648px] font-inter text-[#6F7277] font-normal text-[16px] h-[56px] mt-4">
                      <SelectValue placeholder="Pilih Kota/Kabupaten" />
                    </SelectTrigger>
                    <SelectContent className="overflow-y-auto max-h-[10rem]">
                      {cities.map((city, idx) => (
                        <SelectItem
                          className="h-[56px]"
                          value={city.id}
                          key={idx}
                        >
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
                <FormField
                  control={form.control}
                  name="phoneIntContact"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Nomor HP Pribadi*"
                          className="border border-gray-300 px-[24px] py-[16px] md:w-[648px] w-full h-[56px] rounded-[8px] outline-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneIntWhatsapp"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Nomor WhatsApp*"
                          className="border border-gray-300 px-[24px] py-[16px] md:w-[648px] w-full h-[56px] rounded-[8px] outline-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </label>

            <Button
              disabled={isLoading}
              type="submit"
              className="w-full my-5 h-[56px] text-[16px]"
            >
              {isLoading ? "Loading..." : "Gabung"}
            </Button>
          </form>
        </Form>
      </>
    </LayoutTemplate>
  );
};

export default Page;
