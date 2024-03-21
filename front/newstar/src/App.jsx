import { BrowserRouter, Routes, Route } from "react-router-dom"
import { RecoilRoot } from "recoil"


import StartPage from "./pages/StartPage"
import MainPage from "./pages/MainPage"

function app() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<StartPage />} />
            <Route path="/newstar/*" element={<MainPage />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  )
}

export default app