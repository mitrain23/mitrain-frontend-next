export default interface RegisterMitraRequest {
  email: string;
  password: string;
  name: string;
  address: string;
  phoneIntWhatsapp: string;
  phoneIntContact: string;
  categoryName: string;
  experience: string;
  description: string;
  images: RegisterMitraImage[];
}

interface RegisterMitraImage {
  url: string;
}
