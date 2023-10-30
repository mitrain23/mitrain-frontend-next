import { Mitra } from "@/src/domain/entities/mitra";
import { user } from "@/src/domain/entities/user";
import axios from "axios";
import { LoginMitraResponse } from "../../models/loginMitraResponse";

const API_BASE_URL = process.env.BASE_URL;

export class MitraRepository {
  static registerMitra = async (data: FormData): Promise<Mitra> => {
    const response = await axios.post(
      `${API_BASE_URL}/api/register/mitra`,
      data,
    );
    console.log(response.data.data);
    return response.data.data;
  };

  static loginMitra = async (
    credentials: user,
  ): Promise<LoginMitraResponse> => {
    const response = await axios.post(
      `${API_BASE_URL}/api/login/mitra`,
      credentials,
    );
    console.log(response.data);
    return response.data;
  };
}
