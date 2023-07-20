import { Post } from "../entities/post";

export interface GetAllPostUseCase {
  execute(): Promise<Post[] | null>;
}

