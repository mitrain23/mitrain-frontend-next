import { user } from "@/src/domain/entities/user";
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie';
import LoginUserUseCaseImpl from "../../usecases/userAuth/loginUserUseCaseImpl";



export const useLoginUser = () => {

  const router = useRouter();


  const loginUserMutation = async (credentials: user) => {
    try {
      const loginUserUseCase = new LoginUserUseCaseImpl();
      const response = await loginUserUseCase.execute(credentials);
      Cookies.set('token', response.token, { expires: 1 / 8 });  // expiration time (e.g., 1 day)
      Cookies.set('user', JSON.stringify(response.data), { expires: 1 / 8 });
      localStorage.setItem('user', JSON.stringify(response.data));
      window.location.href = "/results";
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  return loginUserMutation;
};