import { user } from "@/src/domain/entities/user";
import { loginMitra } from "@/src/domain/usecases/loginMitra_usecase";
import { LoginMitraResponse } from "@/src/infrastructure/models/loginMitraResponse";
import { MitraRepository } from "@/src/infrastructure/services/mitraAuth/mitraRepository";

export class LoginMitraUseCaseImpl implements loginMitra {
  execute(credentials: user): Promise<LoginMitraResponse> {
    return MitraRepository.loginMitra(credentials);
  }
}
