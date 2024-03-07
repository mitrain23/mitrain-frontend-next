export interface PostDetailResponse {
  category: string;
  description: string;
  id: string;
  images: Image[];
  isLiked: null | boolean;
  location: string;
  mitra: Mitra;
  mitraId: string;
  phoneIntContact: string;
  phoneIntWhatsapp: string;
  priceMax: string;
  priceMin: string;
  title: string;
  merchant_name: string;
  experience: string;
}

interface Mitra {
  id: string;
  categoryName: string;
  description: string;
  experience: string;
}

interface Image {
  id: string;
  postId: string;
  url: string;
  userId: null | string;
}
