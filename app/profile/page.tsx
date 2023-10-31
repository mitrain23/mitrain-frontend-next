"use client";

import { useGetPostByAuthor } from "@/src/application/hooks/posts/useGetPostByAuthor";
import { decodeToken } from "@/src/utils/auth/decodeToken";

const ProfilePage = () => {
  const userId = decodeToken();
  const getPostByAuthor = useGetPostByAuthor(userId);

  if (getPostByAuthor.isLoading) {
    return <div>Loading</div>;
  }

  if (getPostByAuthor.isError) {
    return <div>Error</div>;
  }

  return (
    <div></div>
    // <div className='px-10 py-5'>
    //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 place-items-center md:place-items-start ">
    //         {getPostByAuthor.data?.map((post) => {
    //             return (
    //                 <div key={post.id}>
    //                     <Card data={post} deletePost={true} />
    //                 </div>
    //             )
    //         })}
    //     </div>
    // </div>
  );
};

export default ProfilePage;
