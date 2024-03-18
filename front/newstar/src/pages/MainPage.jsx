import { Routes, Route } from "react-router-dom"


import ShortForm from "../pages/ShortForm"
import Search from "../pages/Search"
import MyPage from "../pages/MyPage"
import ChooseKeyword from "../pages/ChooseKeyword"

import MainPageContainer from "../styles/MainContainer";
import { TopNavbar, BottomNavbar } from "../components/Navbar";

function MainPage() {
  return (
    <MainPageContainer>
      <TopNavbar/>
      <Routes>
        <Route path="/" element={<ShortForm/>} />
        <Route path="/search" element={<Search/>} />
        <Route path="/mypage" element={<MyPage/>} />
        <Route path="/keywords" element={<ChooseKeyword/>} />
        </Routes>
      <BottomNavbar/>
    </MainPageContainer>
  )
}

export default MainPage