import { Routes, Route } from "react-router-dom"


import { ContainerWithoutNav } from "../styles/Container"

import Intro from "../pages/Intro"
import ChooseKeyword from "./ChooseKeyword";

function MainPage() {
  return (
    <>
      <ContainerWithoutNav>
        <Routes>
          <Route path="/" element={<Intro/>} />
          <Route path="/choose" element={<ChooseKeyword/>} />

        </Routes>
      </ContainerWithoutNav>
    </>
  )
}

export default MainPage