import Bottombar from "@/components/shared/Bottombar"
import LeftSidebar from "@/components/shared/LeftSidebar"
import TopBar from "@/components/shared/TopBar"
import { Outlet } from "react-router"

export const RootLayout = () => {

  return (
    <div className="w-full h-screen md:flex">
      <TopBar />
      <LeftSidebar />

      <section className="flex flex-1 h-full">
        <Outlet />
      </section>

      <Bottombar />
    </div>

  )
}
