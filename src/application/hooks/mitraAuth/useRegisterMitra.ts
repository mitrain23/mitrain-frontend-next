import { Mitra } from "@/src/domain/entities/mitra";
import { RegisterMitraUseCaseImpl } from "../../usecases/mitraAuth/registerMitraUseCaseImpl";
import { useRouter } from 'next/navigation'






export const useRegisterMitra = () => {

  const router = useRouter();

    const registerMitraMutation = async (formData: FormData) => {
      try {
        const registerMitraUseCase = new RegisterMitraUseCaseImpl();
        const response = await registerMitraUseCase.execute(formData);
        router.push('/loginMitra')
        return response;
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
    };
  
    return registerMitraMutation;
  };