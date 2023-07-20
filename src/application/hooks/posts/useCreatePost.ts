import { CreatePostUseCaseImpl } from "../../usecases/posts/createPostUseCaseImpl";
import { useRouter } from 'next/navigation'




export const useCreatePost = () => {
    const router = useRouter();
    const createPostMutation = async (formData: any) => {
      try {
        const createPostUseCase = new CreatePostUseCaseImpl();
        const response = await createPostUseCase.execute(formData);
        router.push('/profile')       
        return response;
      } catch (error) {
        console.error('Error:', error);
        // You can handle and log any errors here
        throw error;
      }
    };
  
    return createPostMutation;
  };
  