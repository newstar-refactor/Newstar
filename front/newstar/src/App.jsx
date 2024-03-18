import { BrowserRouter, Routes, Route } from "react-router-dom"
import { RecoilRoot } from "recoil"


import Intro from "./pages/Intro"
import MainPage from "./pages/MainPage"

function app() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/intro" element={<Intro />} />
            <Route path="/*" element={<MainPage />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  )
}

export default app