export default interface RegisterMitraRequest {
  email: string;
  name: string;
  password: string;
  address: string;
  phoneIntWhatsapp: string;
  phoneIntContact: string;
  categoryName: string;
  experience: string;
  description: string;
  images: File[] | File;
}
