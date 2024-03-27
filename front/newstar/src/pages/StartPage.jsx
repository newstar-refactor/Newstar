import { Routes, Route, Outlet } from "react-router-dom"

import { ContainerWithoutNav } from "../styles/Container"

function StartPage() {
  return (
    <>
      <ContainerWithoutNav>
        <Outlet/>
      </ContainerWithoutNav>
    </>
  )
}

export default StartPage