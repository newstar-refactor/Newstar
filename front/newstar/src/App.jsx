import { BrowserRouter, Routes, Route } from "react-router-dom"

import Intro from "./pages/Intro"
import Main from "./pages/Main"
import Search from "./pages/Search"
import MyPage from "./pages/MyPage"
import ChooseKeyword from "./pages/ChooseKeyword"
import Navbar from "./components/Navbar"

function app() {
  return (
    <BrowserRouter>
      <div>
        {/* <ChooseKeyword/> */}
        <Routes>
          <Route path="/" element={<Main/>} />
          <Route path="/intro" element={<Intro/>} />
          <Route path="/search" element={<Search/>} />
          <Route path="/mypage" element={<MyPage/>} />
          <Route path="/keywords" element={<ChooseKeyword/>} />
        </Routes>
        <Navbar/>
      </div>
    </BrowserRouter>

  )
}

export default app