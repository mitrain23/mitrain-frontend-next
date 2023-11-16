import { ICreatePostRequest } from "@/src/domain/entities/createPostRequest";
import { CreatePostUseCaseImpl } from "../../usecases/posts/createPostUseCaseImpl";
import { useRouter } from "next/navigation";
import { useState } from "react"; // Import useState hook

export const useCreatePost = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // Initialize isLoading state

  const createPostMutation = async (formData: FormData) => {
    try {
      setIsLoading(true); // Set isLoading to true before making the request
      const createPostUseCase = new CreatePostUseCaseImpl();
      const response = await createPostUseCase.execute(formData);

      router.push("/iklan");
      setIsLoading(false); // Set isLoading back to false after the request is complete
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false); // Set isLoading to false in case of an error
    }
  };

  return { createPostMutation, isLoading }; // Return isLoading along with the mutation function
};
