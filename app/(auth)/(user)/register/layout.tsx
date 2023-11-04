import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Mitrain Konveksi",
  description: "Mitrain Konveksi",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  return (
    <>
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
    </>
  );
};

export default layout;
