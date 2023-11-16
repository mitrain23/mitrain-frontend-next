import { useState } from "react";
import { RegisterUserUseCaseImpl } from "../../usecases/userAuth/registerUserUseCaseImpl";
import { useRouter } from "next/navigation";

export const useRegisterUser = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const registerUserMutation = async (formData: FormData) => {
    try {
      setIsLoading(true);
      const registerUserUseCase = new RegisterUserUseCaseImpl();
      const response = await registerUserUseCase.execute(formData);
      router.push("/login");
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  return { registerUserMutation, isLoading };
};
