import { Routes, Route } from "react-router-dom"

import ShortForm from "../pages/ShortForm"
import Search from "../pages/Search"
import MyPage from "../pages/MyPage"
import CollectNews from "../pages/CollectNews"
import ChooseKeyword from "../pages/ChooseKeyword"

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
          <Route path="/collect" element={<CollectNews/>} />
          <Route path="/keywords" element={<ChooseKeyword/>} />
        </Routes>
      </TotalPageContainer>
      <BottomNavbar/>
    </>
  )
}

export default MainPage