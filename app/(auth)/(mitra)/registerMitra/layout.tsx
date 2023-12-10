import { cookies } from "next/headers";
import Footer from "@/src/infrastructure/ui/global/footer";
import LandingPageNavbar from "@/src/infrastructure/ui/global/navbar/landingPage";

export const metadata = {
  title: "Mitrain Konveksi",
  description: "Mitrain Konveksi",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  return (
    <>
      <LandingPageNavbar />
      {children}
      <Footer />
    </>
  );
};

export default layout;
