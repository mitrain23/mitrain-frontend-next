import { user } from "@/src/domain/entities/user";
import UserRepository from "@/src/infrastructure/services/userAuth/userRepositoryImpl";
import { setCookie } from 'cookies-next';


// User use case
const loginUseCase = async (credentials: user) => {
  try {
    const data = await UserRepository.loginUser(credentials);


    // set token to the cookie
    localStorage.setItem('token', data.token);
    setCookie(
      'token',
      data.token
    )
    window.location.reload();
    return data;
  } catch (error) {
    throw new Error('Login failed');
  }
};

export default loginUseCase;
