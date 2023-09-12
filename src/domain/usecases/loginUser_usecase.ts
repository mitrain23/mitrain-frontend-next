import { LoginUserResponse } from "@/src/infrastructure/models/loginUserResponse";
import { user } from "../entities/user";



export interface loginUser {
    execute(credentials: user): Promise<LoginUserResponse>
}