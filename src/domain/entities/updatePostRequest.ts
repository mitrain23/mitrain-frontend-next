export interface IUpdatePostRequest {
  title: string;
  description: string;
  priceMin: string;
  priceMax: string;
  phoneIntContact: string;
  phoneIntWhatsapp: string;
  category: string;
  experience: string;
  isLiked: string;
  location: string;
  images: Image[];
}

interface Image {
  id: string | null;
  url: string | null;
}
