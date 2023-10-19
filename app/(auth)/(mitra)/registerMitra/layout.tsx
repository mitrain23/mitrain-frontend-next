import SubNavbar from "@/src/infrastructure/ui/global/subNavbar"
import { cookies } from "next/headers"
import Navbar from "@/src/infrastructure/ui/global/navbar"


export const metadata = {
    title: 'Mitrain Konveksi',
    description: 'Mitrain Konveksi',
  }


const layout = ({ children }: { children: React.ReactNode }) => {

    const cookieStore = cookies()
    const token = cookieStore.get('token')



    return (
        <>
            <Navbar isResults={false} token={token}/>
            {children}
        </>
    )
}

export default layout