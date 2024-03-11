// 하단 네비게이션 바
// 홈, 마이페이지, 기사 검색

import { Link } from 'react-router-dom'

import { FiHome } from "react-icons/fi";
import { BsFillPersonFill } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";

export default function Navbar() {
  return (
    <div>
      <Link to={'/'}><FiHome size="50" /></Link>
      <Link to={'/search'}><IoSearch size="50" /></Link>
      <Link to={'/mypage'}><BsFillPersonFill size="50" /></Link>
    </div>
  )
}