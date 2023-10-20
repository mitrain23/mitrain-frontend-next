export interface Post {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  title: string;
  description: string;
  price_min: string;
  price_max: string;
  location: string;
  phone_number_whatsapp: string;
  phone_number_contact: string;
  authorId?: number | null;
  author?: Author;
  image?: Image[];
}

export interface Author {
  name: string;
}

export interface Image {
  id: number;
  name: string;
  postId: number;
}
