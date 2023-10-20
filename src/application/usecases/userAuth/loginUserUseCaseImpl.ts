import { user } from "@/src/domain/entities/user";
import { loginUser } from "@/src/domain/usecases/loginUser_usecase";
import { LoginUserResponse } from "@/src/infrastructure/models/loginUserResponse";
import UserRepository from "@/src/infrastructure/services/userAuth/userRepository";
import { setCookie } from "cookies-next";

export default class LoginUserUseCaseImpl implements loginUser {
  execute(credentials: user): Promise<LoginUserResponse> {
    return UserRepository.loginUser(credentials);
  }
}
