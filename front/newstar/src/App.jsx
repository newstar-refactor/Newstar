import { BrowserRouter, Routes, Route } from "react-router-dom"
import { RecoilRoot } from "recoil"
import styled from "styled-components"

import MainPageContainer from "./styles/MainContainer"
import Intro from "./pages/Intro"
import ShortForm from "./pages/ShortForm"
import Search from "./pages/Search"
import MyPage from "./pages/MyPage"
import ChooseKeyword from "./pages/ChooseKeyword"
import MainPage from "./pages/MainPage"


import SearchNewsList from "./components/main/SearchNewsList"

const MainContent = styled.div`
  padding: 50px 0px;
`

function app() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <MainPageContainer>
            <Routes>
              <Route path="/intro" element={<Intro />} />
              <Route path="/*" element={<MainPage />} />
            </Routes>
          </MainPageContainer>
        </BrowserRouter>
      </RecoilRoot>
    </>
  )
}

export default app