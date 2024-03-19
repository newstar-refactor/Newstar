import { Routes, Route } from "react-router-dom"

import ShortForm from "./ShortForm"
import Search from "./Search"
import MyPage from "./MyPage"
import CategoryNews from "./CategoryNews"
import CategoryNewsDetail from "./CategoryNewsDetail"
import ChooseKeyword from "./ChooseKeyword"

import { TotalPageContainer } from "../styles/Container"
import { TopNavbar, BottomNavbar } from "../components/Navbar";

function MainPage() {
  return (
    <>
      <TopNavbar/>
      <TotalPageContainer>
        <Routes>
          <Route path="/" element={<ShortForm/>} />
          <Route path="/search" element={<Search/>} />
          <Route path="/mypage" element={<MyPage/>} />
          <Route path="/category" element={<CategoryNews/>} />
          <Route path="/category/:categoryId" element={<CategoryNewsDetail/>} />
          <Route path="/keywords" element={<ChooseKeyword/>} />
        </Routes>
      </TotalPageContainer>
      <BottomNavbar/>
    </>
  )
}

export default MainPage