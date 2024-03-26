import { Routes, Route, Outlet } from "react-router-dom"

import { ContainerWithoutNav } from "../styles/Container"

function MainPage() {
  return (
    <>
      <ContainerWithoutNav>
        <Outlet/>
      </ContainerWithoutNav>
    </>
  )
}

export default MainPage