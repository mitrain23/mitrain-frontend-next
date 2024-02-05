import SubNavbar from "@/src/infrastructure/ui/global/subNavbar";
import { cookies } from "next/headers";
import NavbarResults from "@/src/infrastructure/ui/global/navbar/navbarResults";
import Footer from "@/src/infrastructure/ui/global/footer";

export const metadata = {
  title: "Mitrain Konveksi",
  description: "Mitrain Konveksi",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  return (
    <>
      <SubNavbar />
      <NavbarResults token={token} />
      {children}
      <Footer />
    </>
  );
};

export default layout;