import { user } from "@/src/domain/entities/user";
import { LoginMitraUseCaseImpl } from "../../usecases/mitraAuth/loginMitraUseCaseImpl";
import { useRouter } from 'next/navigation'
import Cookies from "js-cookie";






export const useLoginMitra = () => {

  const router = useRouter();


  const loginMitraMutation = async (formData: user) => {
    try {
      const loginMitraUseCase = new LoginMitraUseCaseImpl();
      const response = await loginMitraUseCase.execute(formData);
      Cookies.set('token', response.token, { expires: 1 });  // expiration time (e.g., 1 day)
      Cookies.set('user', JSON.stringify(response.data), { expires: 1 });
      localStorage.setItem('user', JSON.stringify(response.data));
      window.location.href = "/results";
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  return loginMitraMutation;
};