import { RegisterUserResponse } from "@/src/infrastructure/models/registerUserResponse";

export interface registerUser {
  execute(formData: FormData): Promise<RegisterUserResponse>;
}
