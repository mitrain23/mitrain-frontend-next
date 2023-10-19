import Navbar from "@/src/infrastructure/ui/global/navbar"
import NavbarResults from "@/src/infrastructure/ui/global/navbar/navbarResults"
import SubNavbar from "@/src/infrastructure/ui/global/subNavbar"
import ServerSideProtectedRoutes from "@/src/utils/auth/serverSideProtectedRoutes"
import { cookies } from "next/headers"

export const metadata = {
    title: 'Mitrain Konveksi',
    description: 'Mitrain Konveksi',
}


const layout = ({ children }: { children: React.ReactNode }) => {

    const cookieStore = cookies()
    const token = cookieStore.get('token')


    return (
        <ServerSideProtectedRoutes>
            <SubNavbar />
            <NavbarResults token={token} />
            {children}
        </ServerSideProtectedRoutes>
    )
}

export default layout