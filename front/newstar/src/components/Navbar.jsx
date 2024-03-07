// 하단 네비게이션 바
// 홈, 마이페이지, 기사 검색

import { FiHome } from "react-icons/fi";
import { BsFillPersonFill } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";

function Navbar() {
  return (
    <div>
      <FiHome />
      <IoSearch />
      <BsFillPersonFill />
    </div>
  )
}