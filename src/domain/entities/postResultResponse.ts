export default interface PostResultResponse {
  category: string;
  description: string;
  id: string;
  images: Images[];
  isLiked: null | boolean;
  location: string;
  merchant_name: string;
  mitra: Mitra;
  mitraId: string;
  phoneIntContact: string;
  phoneIntWhatsapp: string;
  priceMax: string;
  priceMin: string;
  title: string;
  experience: string;
}

type Images = {
  url: string;
};

type Mitra = {
  experience: string;
  user: {
    name: string;
  };
};
