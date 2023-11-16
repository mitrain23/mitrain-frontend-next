import { RegisterMitraUseCaseImpl } from "../../usecases/mitraAuth/registerMitraUseCaseImpl";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useRegisterMitra = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const registerMitraMutation = async (formData: FormData) => {
    try {
      setIsLoading(true);

      const registerMitraUseCase = new RegisterMitraUseCaseImpl();
      const response = await registerMitraUseCase.execute(formData);
      router.push("/loginMitra");
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  return { registerMitraMutation, isLoading };
};
