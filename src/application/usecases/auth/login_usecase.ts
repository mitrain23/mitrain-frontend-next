import { user } from "@/src/domain/entities/user";
import UserRepository from "@/src/infrastructure/services/userAuth/userRepositoryImpl";



// User use case
const loginUseCase = async (credentials: user) => {
    try {
      const data = await UserRepository.loginUser(credentials);      
      // Store the response data in local storage
      localStorage.setItem('token', data.token);
      window.location.reload();
      return data;
    } catch (error) {
      throw new Error('Login failed');
    }
  };
  
  export default loginUseCase ;
  