import { Outlet } from "react-router-dom"

import { ContainerWithNav } from "../styles/Container"
import { TopNavbar, BottomNavbar } from "../components/Navbar";

function MainPage() {
  return (
    <>
      <ContainerWithNav>
        <Outlet/>
      </ContainerWithNav>
      <BottomNavbar/>
    </>
  )
}

export default MainPage