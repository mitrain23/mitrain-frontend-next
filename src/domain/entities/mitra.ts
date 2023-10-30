export interface Mitra {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  address?: string;
  phoneIntWhatsapp?: string;
  phoneIntContact?: string;
  category?: string;
  description?: string;
  isPremium?: boolean;
  images?: Image[];
}

export interface Image {
  url?: string;
}
