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
import { useToast } from "@/src/components/ui/use-toast";
import { City } from "@/src/domain/entities/city";
import { Province } from "@/src/domain/entities/province";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { z } from "zod";
import {
  PostsRepository,
  formatPrice,
} from "../../services/posts/postsRepository";
import FileInputBox from "./fileInputBox";

interface ImageData {
  file: File | null;
  imageUrl: string | null;
  id: string | null;
}

const isMobilePhone = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  priceMin: z.string().min(1),
  priceMax: z.string().min(1),
  phoneIntContact: z.string().regex(isMobilePhone).min(11).max(12),
  phoneIntWhatsapp: z.string().regex(isMobilePhone).min(11).max(12),
  category: z.string().min(1),
  experience: z.string().min(1),
});

const API_BASE_URL = process.env.BASE_URL;

const CreateForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      priceMin: "",
      priceMax: "",
      phoneIntContact: "",
      phoneIntWhatsapp: "",
      category: "",
      experience: "",
    },
  });

  const { mutate: createPost, isLoading } = useMutation({
    mutationFn: (formData: FormData) => PostsRepository.createPost(formData),
  });

  const router = useRouter();
  const { toast } = useToast();

  const experiences = [
    "Kurang dari 1 Tahun",
    "2 Tahun",
    "3 Tahun",
    "5 Tahun",
    "Lebih dari 5 Tahun",
  ];

  const [coverImages, setCoverImages] = useState<ImageData[]>(
    Array(5).fill(null),
  );
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState<string>("");
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCityId, setSelectedCityId] = useState<string>("");

  const [categories, setCategories] = useState<string[]>([]);
  const [location, setLocation] = useState("");

  const handleFileChange = (
    file: File | null,
    boxNumber: number,
    coverImage: ImageData,
  ) => {
    // Get latest data (if null then fill it with { file: null, imageUrl: null }) not Array(5).fill(null))
    let updatedImages: ImageData[] = coverImages.map((imageData) => ({
      id: null,
      file: imageData ? imageData.file : null,
      imageUrl: imageData ? imageData.imageUrl : null,
    }));

    let imageUrl: string | null = null;
    const coverImageValues = [...coverImages];

    // set imageUrl if file is uploaded
    if (file != null) {
      imageUrl = URL.createObjectURL(file);
    }

    // Find a `null` place or by boxNumber of latest data and append it
    for (let i = 0; i < updatedImages.length; i++) {
      if (!file && !imageUrl) {
        // Delete Image Logic
        updatedImages[boxNumber - 1] = {
          id: null,
          file,
          imageUrl,
        };
        coverImageValues[boxNumber - 1] = coverImage;

        break;
      }

      if (
        updatedImages[boxNumber - 1].imageUrl !== null &&
        updatedImages[boxNumber - 1].imageUrl !== imageUrl
      ) {
        // Replace Image logic
        updatedImages[boxNumber - 1] = {
          id: null,
          file,
          imageUrl,
        };

        break;
      }

      if (updatedImages[i].file === null) {
        // Insert Image Logic
        updatedImages[i] = {
          id: null,
          file,
          imageUrl,
        };
        coverImageValues[i] = coverImage;
        break;
      }
    }

    const filteredImages = updatedImages.filter(
      (imageData) => !!imageData.file,
    );

    // Remove duplicate
    const tempArrImages = Array(5).fill({
      file: null,
      imageUrl: null,
    });

    filteredImages.forEach((imageData, idx) =>
      tempArrImages.fill(imageData, idx, idx + 1),
    );

    setCoverImages(tempArrImages);
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(values)) {
      if (key === "priceMin" || key === "priceMax") {
        formData.append(key, value.replaceAll(".", ""));
      } else {
        formData.append(key, value);
      }
    }

    if (location) {
      formData.append("location", location);
    }

    coverImages.forEach((coverImage) => {
      if (coverImage.file) {
        formData.append("images", coverImage.file);
      }
    });

    try {
      createPost(formData, {
        onSuccess: (data) => {
          toast({
            title: "Notifikasi",
            description: "Berhasil membuat iklan baru",
          });

          router.push("/iklan");
        },
        onError: (_) => {
          toast({
            title: "Notifikasi",
            description: "Gagal membuat iklan baru",
          });
        },
      });
    } catch (error) {
      toast({
        title: "Notifikasi",
        description: "Gagal membuat iklan baru",
      });
    }
    setCoverImages(Array(5).fill(null));
  };

  useEffect(() => {
    const getCategories = async () => {
      const response = await axios.get(API_BASE_URL + "/api/category");

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

    getCities();
  }, [selectedProvinceId]);

  return (
    <>
      <h1 className="font-inter text-[30px] font-bold mb-[32px] mt-[42px]">
        Tambah Iklan
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="md:flex flex-col max-md:items-center md:gap-[42px]"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <label className="flex flex-col md:flex-row items-start justify-start md:justify-between gap-10 py-2 w-full">
                  <div className="flex flex-col items-start justify-center gap-2 lg:w-[550px]">
                    <h2 className="text-black font-satoshi font-bold text-[22px]">
                      Informasi Produk*
                    </h2>
                    <div className="font-inter text-[#425379] text-[16px] flex flex-col gap-[12px]">
                      <p>
                        Pastikan setiap produk yang diiklankan tidak melanggar{" "}
                        <br /> Hak Kekayaan Intelektual merek lain.
                      </p>
                      <p>
                        Disarankan menggunakan huruf kapital di awal kalimat{" "}
                        <br /> dan hindari kapital berlebih.
                      </p>
                    </div>
                  </div>
                  <div className="w-full md:w-[648px]">
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        name="title"
                        placeholder="Custom Baju Anak (Jenis/ Kategori Produk) + TokoBaju (Merek)"
                        className="border placeholder:text-[16px] border-gray-300 px-[24px] py-[16px] w-full md:w-[648px] h-[56px] rounded-[8px] outline-none"
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
            name="category"
            render={({ field }) => (
              <FormItem>
                <label className="flex flex-col md:flex-row items-start justify-start md:justify-between gap-10 py-2 w-full">
                  <div className="flex flex-col items-start justify-center gap-2 md:w-[550px]">
                    <h2 className="text-black font-satoshi font-bold text-[22px]">
                      Kategori Mitra
                    </h2>
                    <div className="font-inter text-[#425379] text-[16px] flex flex-col gap-[12px]">
                      Pilih kategori yang sesuai dengan produk akan Anda. <br />{" "}
                      Jika pemilihan kategori kurang sesuai, maka kategori{" "}
                      <br /> akan diubah oleh pihak MitraIn ID.
                    </div>
                  </div>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full md:w-[648px] font-inter text-[#6F7277] h-[56px] font-normal text-[16px]">
                        <SelectValue placeholder="Pilih Kategori" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="text-[16px]">
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
                      Deskripsi Produk*
                    </h2>
                    <div className="font-inter text-[#425379] text-[16px] flex flex-col gap-[12px]">
                      <p>
                        Pastikan setiap produk yang diiklankan tidak melanggar{" "}
                        <br /> Hak Kekayaan Intelektual merek lain.
                      </p>
                      <p>
                        Disarankan menggunakan huruf kapital di awal kalimat{" "}
                        <br /> dan hindari kapital berlebih.
                      </p>
                    </div>
                  </div>
                  <div>
                    <FormControl>
                      <Textarea
                        placeholder="Deskripsi"
                        {...field}
                        className="border border-gray-300 px-[24px] py-[16px] w-full md:w-[648px] h-[200px] rounded-[8px] outline-none"
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
                <FormField
                  control={form.control}
                  name="priceMin"
                  render={({ field }) => (
                    <FormItem>
                      <label className="flex items-center border border-[#E5E7E9] rounded-[8px]">
                        <span className="bg-[#F3F4F5] h-[56px] w-[56px] flex items-center justify-center rounded-l-[8px]">
                          Rp
                        </span>
                        <FormControl>
                          <Input
                            {...field}
                            onChange={(e) =>
                              form.setValue(
                                "priceMin",
                                formatPrice(e.target.value),
                              )
                            }
                            type="text"
                            placeholder="Harga Minimum"
                            className="w-full border-none rounded-l-none rounded-r-[8px] shadow-none h-[56px] focus-visible:ring-0"
                          />
                        </FormControl>
                      </label>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="form-control">
                <FormField
                  control={form.control}
                  name="priceMax"
                  render={({ field }) => (
                    <FormItem>
                      <label className="flex items-center border border-[#E5E7E9] rounded-[8px]">
                        <span className="bg-[#F3F4F5] h-[56px] w-[56px] flex items-center justify-center rounded-l-[8px]">
                          Rp
                        </span>
                        <FormControl>
                          <Input
                            {...field}
                            onChange={(e) =>
                              form.setValue(
                                "priceMax",
                                formatPrice(e.target.value),
                              )
                            }
                            type="text"
                            placeholder="Harga Maksimal"
                            className="w-full border-none rounded-l-none rounded-r-[8px] shadow-none h-[56px] focus-visible:ring-0"
                          />
                        </FormControl>
                      </label>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </label>

          <label className="flex flex-col md:flex-row items-start justify-start md:justify-between gap-10 py-2 w-full">
            <div className="flex flex-col items-start justify-center gap-2 md:w-[550px]">
              <h2 className="text-black font-satoshi font-bold text-[22px]">
                Lokasi
              </h2>
              <div className="font-inter text-[#425379] text-[16px] flex flex-col gap-[12px]">
                Pastikan setiap produk yang diiklankan tidak melanggar <br />{" "}
                Hak Kekayaan Intelektual merek lain.
              </div>
            </div>
            <div className="flex flex-col gap-[24px] w-full lg:w-[648px]">
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
                    const city = cities.find((city) => city.id === value)?.name;

                    setLocation(`${city}, ${province}`);
                    setSelectedCityId(value);
                  }}
                >
                  <SelectTrigger className="w-full lg:w-[648px] font-inter text-[#6F7277] font-normal text-[16px] h-[56px]">
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
                        type="text"
                        name="phoneIntContact"
                        placeholder="Nomor HP Pribadi*"
                        className="border border-gray-300 px-[24px] py-[16px] h-[56px] rounded-[8px] outline-none placeholder:text-[16px]"
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
                        type="text"
                        name="phoneIntWhatsapp"
                        placeholder="Nomor WhatsApp*"
                        className="border border-gray-300 px-[24px] py-[16px] h-[56px] rounded-[8px] outline-none placeholder:text-[16px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </label>

          <div className="my-5"></div>

          <Button
            disabled={isLoading}
            className="w-full h-[56px] text-[16px]"
            type="submit"
          >
            {isLoading ? "Loading..." : "Create Post"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CreateForm;
