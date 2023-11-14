import { useRouter } from "next/navigation";
import { useState } from "react";
import { UpdatePostUseCaseImpl } from "../../usecases/posts/updatePostUseCaseImpl";
import { IUpdatePostRequest } from "@/src/domain/entities/updatePostRequest";

export const useUpdatePost = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const updatePostMutation = async (
    data: IUpdatePostRequest,
    postId: string,
  ) => {
    try {
      setIsLoading(true);

      const updatePostUseCase = new UpdatePostUseCaseImpl();
      const response = await updatePostUseCase.execute(data, postId);

      router.push("/iklan");
      setIsLoading(false);

      return response;
    } catch (err) {
      console.error("Error : ", err);
      setIsLoading(false);
    }
  };

  return { updatePostMutation, isLoading };
};
