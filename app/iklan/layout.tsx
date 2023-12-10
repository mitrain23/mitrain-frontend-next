import Footer from "@/src/infrastructure/ui/global/footer";
import Navbar from "@/src/infrastructure/ui/global/navbar";
import NavbarResults from "@/src/infrastructure/ui/global/navbar/navbarResults";
import SubNavbar from "@/src/infrastructure/ui/global/subNavbar";
import ProtectedRoute from "@/src/utils/auth/protectedRoute";
import ServerSideProtectedRoutes from "@/src/utils/auth/serverSideProtectedRoutes";
import { cookies } from "next/headers";

export const metadata = {
  title: "Mitrain Konveksi",
  description: "Mitrain Konveksi",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  return (
    <ServerSideProtectedRoutes>
      <div className="min-h-screen relative">
        <SubNavbar />
        <NavbarResults token={token} />
        {children}
        <Footer />
      </div>
    </ServerSideProtectedRoutes>
  );
};

export default layout;
