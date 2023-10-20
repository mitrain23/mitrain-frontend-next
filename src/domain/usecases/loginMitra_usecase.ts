import { LoginMitraResponse } from "@/src/infrastructure/models/loginMitraResponse";
import { user } from "../entities/user";

export interface loginMitra {
  execute(credentials: user): Promise<LoginMitraResponse>;
}
