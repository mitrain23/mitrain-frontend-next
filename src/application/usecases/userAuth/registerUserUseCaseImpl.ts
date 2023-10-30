import { user } from "@/src/domain/entities/user";
import { registerUser } from "@/src/domain/usecases/registerUser_usecase";
import { RegisterUserResponse } from "@/src/infrastructure/models/registerUserResponse";
import UserRepository from "@/src/infrastructure/services/userAuth/userRepository";

export class RegisterUserUseCaseImpl implements registerUser {
  execute(formData: FormData): Promise<RegisterUserResponse> {
    return UserRepository.registerUser(formData);
  }
}
