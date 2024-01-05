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
import { useToast } from "@/src/components/ui/use-toast";
import { City } from "@/src/domain/entities/city";
import { Province } from "@/src/domain/entities/province";
import UserRepository from "@/src/infrastructure/services/userAuth/userRepository";
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
  phoneIntContact: z.string().regex(isMobilePhone).min(11).max(12),
  phoneIntWhatsapp: z.string().regex(isMobilePhone).min(11).max(12),
});

const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phoneIntContact: "",
      phoneIntWhatsapp: "",
    },
  });

  const { toast } = useToast();
  const router = useRouter();

  const [selectedFile, setSelectedFile] = useState<File>();

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState<string>("");

  const [cities, setCities] = useState<City[]>([]);
  const [selectedCityId, setSelectedCityId] = useState<string>("");

  const [address, setAddress] = useState("");

  const { mutate: registerUser, isLoading } = useMutation({
    mutationFn: (formData: FormData) => UserRepository.registerUser(formData),
  });

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();

    if (address) {
      formData.append("address", address);
    }

    for (const [key, data] of Object.entries(values)) {
      formData.append(key, data);
    }

    if (selectedFile) {
      formData.append("images", selectedFile);
    }

    try {
      registerUser(formData, {
        onSuccess: (data) => {
          toast({
            title: "Notifikasi",
            description: "Berhasil melakukan registrasi",
          });
          router.push("/login");
        },
        onError: (error) => {
          toast({
            title: "Notifikasi",
            description: "Gagal melakukan registrasi",
          });
        },
      });
    } catch (error) {
      toast({
        title: "Notifikasi",
        description: "Gagal melakukan registrasi",
      });
    }
  };

  useEffect(() => {
    const getProvinces = async () => {
      const response = await axios.get(
        "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json",
      );

      setProvinces(response.data);
    };

    getProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvinceId) {
      const getCities = async () => {
        const response = await axios.get(
          `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvinceId}.json`,
        );
        setCities(response.data);
      };

      getCities();
    }
  }, [selectedProvinceId]);

  return (
    <LayoutTemplate>
      <>
        <h1 className="font-inter text-[30px] font-bold mb-[32px] mt-[42px]">
          Buat Akun
        </h1>
        <Form {...form}>
          <form
            className="md:flex flex-col max-md:items-center md:gap-[42px]"
            onSubmit={form.handleSubmit(handleSubmit)}
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
                    <div className="md:w-[648px] w-full">
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          name="name"
                          placeholder="Adit Saputra"
                          className="border border-gray-300 px-[24px] py-[16px] md:w-[648px] w-full h-[56px] rounded-[8px] outline-none"
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
                    <div className="flex flex-col items-start justify-center gap-2 md:w-[550px]">
                      <h2 className="text-black font-satoshi font-bold text-[22px]">
                        Email Aktif
                      </h2>
                      <div className="font-inter text-[#425379] text-[16px] flex flex-col gap-[12px]">
                        Email Anda yang aktif (cth: john.doe@mitrain.id)
                      </div>
                    </div>
                    <div className="md:w-[648px] w-full">
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john.doe@mitrain.id"
                          className="border border-gray-300 px-[24px] py-[16px] md:w-[648px] w-full h-[56px] rounded-[8px] outline-none"
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
                    <div className="flex flex-col items-start justify-center gap-2 md:w-[550px]">
                      <h2 className="text-black font-satoshi font-bold text-[22px]">
                        Buat Password
                      </h2>
                      <div className="font-inter text-[#425379] text-[16px] flex flex-col gap-[12px]">
                        Pastikan password yang Anda buat tergolong kuat.
                      </div>
                    </div>
                    <div className="md:w-[648px] w-full">
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          className="border border-gray-300 px-[24px] py-[16px] md:w-[648px] w-full h-[56px] rounded-[8px] outline-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </label>
                </FormItem>
              )}
            />

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
              <div className="flex flex-col md:flex-row items-center md:items-start gap-5 w-full md:w-[648px]">
                <Input
                  type="file"
                  onChange={handleFileChange}
                  className="border border-gray-300 px-[24px] md:w-[648px] w-full py-[16px] h-[56px] rounded-[8px] outline-none"
                />
              </div>
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
              <div className="flex flex-col gap-[24px] md:w-[648px] w-full">
                <FormField
                  control={form.control}
                  name="phoneIntContact"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Nomor HP Pribadi*"
                          className="border border-gray-300 px-[24px] py-[16px] w-full h-[56px] rounded-[8px] outline-none"
                          {...field}
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
                          type="text"
                          placeholder="Nomor WhatsApp*"
                          className="border border-gray-300 px-[24px] py-[16px] w-full h-[56px] rounded-[8px] outline-none"
                          {...field}
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
              className="w-full my-5 h-[56px] text-[16px]"
              type="submit"
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
