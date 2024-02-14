export default interface IAllPostResponse {
  category: string;
  description: string;
  id: string;
  isLiked: boolean | string | null;
  location: string;
  mitraId: string;
  phoneIntContact: string;
  phoneIntWhatsapp: string;
  priceMax: string;
  priceMin: string;
  title: string;
  merchant_name: string;
  images?: [
    {
      url: string;
    },
  ];
  mitra: {
    user: {
      name: string;
    };
  };
}
