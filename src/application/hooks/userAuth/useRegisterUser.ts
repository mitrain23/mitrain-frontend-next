import { RegisterUserUseCaseImpl } from "../../usecases/userAuth/registerUserUseCaseImpl";
import { useRouter } from "next/navigation";

export const useRegisterUser = () => {
  const router = useRouter();

  const registerUserMutation = async (formData: FormData) => {
    try {
      const registerUserUseCase = new RegisterUserUseCaseImpl();
      const response = await registerUserUseCase.execute(formData);
      router.push("/login");
      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  return registerUserMutation;
};
