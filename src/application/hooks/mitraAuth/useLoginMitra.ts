import { user } from "@/src/domain/entities/user";
import { LoginMitraUseCaseImpl } from "../../usecases/mitraAuth/loginMitraUseCaseImpl";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useState } from "react";

export const useLoginMitra = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const loginMitraMutation = async (formData: user) => {
    try {
      setIsLoading(true);
      const loginMitraUseCase = new LoginMitraUseCaseImpl();
      const response = await loginMitraUseCase.execute(formData);
      Cookies.set("token", response.token, { expires: 1 / 8 }); // expiration time (e.g., 1 day)
      Cookies.set("user", JSON.stringify(response.data), { expires: 1 / 8 });
      localStorage.setItem("user", JSON.stringify(response.data));
      // window.location.href = "/results";
      router.replace("/results");

      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  return { loginMitraMutation, isLoading };
};
