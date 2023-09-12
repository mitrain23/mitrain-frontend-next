export interface GetPostByAuthorResponse {
    data: Datum[];
}

export interface Datum {
    id:               string;
    title:            string;
    category:         string;
    description:      string;
    priceMin:         string;
    priceMax:         string;
    location:         string;
    phoneIntWhatsapp: string;
    phoneIntContact:  string;
    mitraId:          string;
    mitra:            Mitra;
    images:           Image[];
}

export interface Image {
    url: string;
}

export interface Mitra {
    name: string;
}
