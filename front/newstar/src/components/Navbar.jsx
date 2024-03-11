// 하단 네비게이션 바
// 홈, 마이페이지, 기사 검색

import { Link } from 'react-router-dom'
import styled from 'styled-components';

import { FiHome } from "react-icons/fi";
import { BsFillPersonFill } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";

const NavContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 45px;
  border-top: 2px solid rgb(49, 48, 77);
  overflow: hidden;

  padding: 10px;


`

const NavContent = styled.div`
  text-align: center;
  float: left;
  width: calc(100%/3);

  height: 45px;
  line-height: 45px;
`

export default function Navbar() {
  return (
    <NavContainer>
      <NavContent>
        <Link to={'/'}><FiHome color="rgb(49, 48, 77)" size="30" /></Link>
      </NavContent>
      <NavContent>
        <Link to={'/search'}><IoSearch color="rgb(49, 48, 77)" size="30" /></Link>
      </NavContent>
      <NavContent>
        <Link to={'/mypage'}><BsFillPersonFill color="rgb(49, 48, 77)" size="30" /></Link>
      </NavContent>
    </NavContainer>
  )
}