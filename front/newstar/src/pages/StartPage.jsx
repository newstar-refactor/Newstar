import { Routes, Route } from "react-router-dom"


import { TotalPageContainer } from "../styles/Container"

import Intro from "../pages/Intro"
import ChooseKeyword from "./ChooseKeyword";

function MainPage() {
  return (
    <>
      <TotalPageContainer>
        <Routes>
          <Route path="/" element={<Intro/>} />
          <Route path="/choose" element={<ChooseKeyword/>} />

        </Routes>
      </TotalPageContainer>
    </>
  )
}

export default MainPage