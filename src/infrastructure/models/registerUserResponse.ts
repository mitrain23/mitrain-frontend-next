export interface RegisterUserResponse {
    id:               string;
    name:             string;
    email:            string;
    password:         string;
    address:          string;
    phoneIntWhatsapp: string;
    phoneIntContact:  string;
    isPremium:        boolean;
    images:           Images;
}

export interface Images {
    url: string;
}
