import { user } from "@/src/domain/entities/user";
import axios from "axios";
import { RegisterUserResponse } from "../../models/registerUserResponse";
import { LoginUserResponse } from "../../models/loginUserResponse";



const API_BASE_URL = process.env.BASE_URL;



// User repository
class UserRepository {

  static registerUser = async (formData: FormData): Promise<RegisterUserResponse> => {
    const response = await axios.post(`${API_BASE_URL}/api/register`, formData);
    console.log(response.data.data);
    return response.data.data;
  }


  static loginUser = async (credentials: user): Promise<LoginUserResponse> => {
    const response = await axios.post(`${API_BASE_URL}/api/login`, credentials);
    console.log(response.data);
    return response.data;
  }
    




}

export default UserRepository;
