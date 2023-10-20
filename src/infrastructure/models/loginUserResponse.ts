export interface LoginUserResponse {
  data: Data;
  token: string;
}

export interface Data {
  id: string;
  email: string;
  name: string;
  isMitra: boolean;
}