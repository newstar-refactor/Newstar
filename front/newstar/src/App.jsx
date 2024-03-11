import { BrowserRouter, Routes, Route } from "react-router-dom"

import Intro from "./pages/Intro"
import Main from "./pages/Main"
import Search from "./pages/Search"
import MyPage from "./pages/MyPage"
import Navbar from "./components/Navbar"

function app() {
  return (
    <BrowserRouter>
      <div>
        
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/intro" element={<Intro/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/mypage" element={<MyPage/>}/>
        </Routes>
        <Navbar/>
      </div>
    </BrowserRouter>

  )
}

export default app