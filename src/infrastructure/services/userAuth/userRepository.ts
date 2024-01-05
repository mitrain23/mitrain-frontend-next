import { user } from "@/src/domain/entities/user";
import axios from "axios";
import { LoginUserResponse } from "../../models/loginUserResponse";
import { RegisterUserResponse } from "../../models/registerUserResponse";

const API_BASE_URL = process.env.BASE_URL;

class UserRepository {
  static registerUser = async (
    formData: FormData,
  ): Promise<RegisterUserResponse> => {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/registerUser`,
      formData,
    );

    return response.data.data;
  };

  static loginUser = async (credentials: user): Promise<LoginUserResponse> => {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/login`,
      credentials,
    );

    return response.data;
  };
}

export default UserRepository;
