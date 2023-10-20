import { Mitra } from "@/src/domain/entities/mitra";
import { registerMitra } from "@/src/domain/usecases/registerMitra_usecase";
import { MitraRepository } from "@/src/infrastructure/services/mitraAuth/mitraRepository";

export class RegisterMitraUseCaseImpl implements registerMitra {
  execute(data: FormData): Promise<Mitra> {
    return MitraRepository.registerMitra(data);
  }
}
