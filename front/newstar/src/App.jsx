import { BrowserRouter, Routes, Route } from "react-router-dom"
import { RecoilRoot } from "recoil"

import StartPage from "./pages/StartPage"
import MainPage from "./pages/MainPage"

import Intro from "./pages/Intro"
import ShortForm from "./pages/ShortForm"
import Search from "./pages/Search"
import MyPage from "./pages/MyPage"
import CategoryNews from "./pages/CategoryNews"
import CategoryNewsDetail from "./pages/CategoryNewsDetail"
import ChooseKeyword from "./pages/ChooseKeyword"
import NewsDetail from "./pages/NewsDetail"

function app() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StartPage />}>
              <Route index element={<Intro/>} />
              <Route path="choose" element={<ChooseKeyword/>} />
            </Route>
            <Route path="/newstar" element={<MainPage />}>
              <Route index element={<ShortForm/>} />
              <Route path=":articleId" element={<NewsDetail/>} />
              <Route path="search" element={<Search/>} />
              <Route path="mypage" element={<MyPage/>} />
              <Route path="category" element={<CategoryNews/>} />
              <Route path="category/:categoryId" element={<CategoryNewsDetail/>} />
              <Route path="keywords" element={<ChooseKeyword/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  )
}

export default app