export interface ICreatePostRequest {
  title: string;
  description: string;
  priceMin: string;
  priceMax: string;
  phoneIntContact: string;
  phoneIntWhatsapp: string;
  category: string;
  experience: string;
  location: string;
  images: File;
}
