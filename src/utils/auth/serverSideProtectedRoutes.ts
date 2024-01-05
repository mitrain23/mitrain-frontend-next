import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ServerSideProtectedRoutes = ({ children }: any) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    redirect("/loginMitra");
  }

  return children;
};

export default ServerSideProtectedRoutes;
