import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";
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
      <div className="flex justify-between h-screen">
        <div className="md:w-1/2 w-full">
          <nav className="px-[24px] py-[24px] xl:px-[240px] md:px-[100px] md:py-[42px]">
            <Link href={"/"} className="flex flex-row gap-[16px] items-center">
              <div className="w-[60px] h-[60px]">
                <Image
                  src="/images/logoMitrain.svg"
                  width={0}
                  height={0}
                  alt="logo-mitrain"
                  className="w-full"
                />
              </div>
              <h1 className="hidden md:block font-satoshi text-[20px] font-bold text-[#0054A5]">
                MitraIn ID
              </h1>
            </Link>
          </nav>
          {children}
        </div>
        <div className="md:w-1/2 hidden md:block">
          <Image
            src="/images/login-bg.jpg"
            width={838}
            height={1092}
            className="w-full object-cover h-full"
            alt="loginBG"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default layout;
