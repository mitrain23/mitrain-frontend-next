import { user } from "@/src/domain/entities/user"
import UserRepository from "@/src/infrastructure/services/userAuth/userRepositoryImpl"


const registerUseCase = async (credentials: user) => {
    try {
        const data = await UserRepository.registerUser(credentials)
        console.log(data)
        window.location.reload();
        return data
    } catch (error){
        throw new Error('Register failed');
    }
}


export default registerUseCase;