import { Outlet } from "react-router-dom"

import { ContainerWithNav, TotalContainer } from "../styles/Container"
import { TopNavbar, BottomNavbar } from "../components/Navbar";

function MainPage() {
  return (
    <TotalContainer>
      <ContainerWithNav>
        <Outlet/>
      </ContainerWithNav>
      <BottomNavbar/>
    </TotalContainer>
  )
}

export default MainPage