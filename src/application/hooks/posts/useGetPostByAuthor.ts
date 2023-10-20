"use client";
import { useEffect, useState } from "react";
import { GetPostByAuthorImpl } from "../../usecases/posts/getPostByAuthorUseCaseImpl";
import { GetPostByAuthorResponse } from "@/src/infrastructure/models/getPostByAuthorResponse";

export const useGetPostByAuthor = (id: string | null) => {
  const [data, setData] = useState<GetPostByAuthorResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        if (id !== null) {
          const getPostByAuthor = new GetPostByAuthorImpl();
          const response = await getPostByAuthor.execute(id);
          setData(response);
          setIsError(false);
        } else {
          // Handle the case when id is null
          setData(null);
          setIsError(false);
        }
      } catch (error) {
        // Handle any errors here
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [id]);

  return { data, isLoading, isError };
};
