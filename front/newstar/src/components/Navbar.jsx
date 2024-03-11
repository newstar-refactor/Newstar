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
  height: 50px;
  border-top: 2px solid rgb(49, 48, 77);
  overflow: hidden;
  background-color: white;
  padding: 10px;
`

const TopNavContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  overflow: hidden;
  background-color: rgb(49, 48, 77);
  display: flex;
  padding: 0px 10px 5px;
  align-items: center;
`

const NavContent = styled.div`
  text-align: center;
  float: left;
  width: calc(100%/3);

  height: 45px;
  line-height: 45px;
`

function BottomNavbar() {
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

function TopNavbar() {
  return (
    <TopNavContainer>
      <img 
        src="/logo_white.png" 
        alt="newstar logo"
        width="85"
        height="45" />
    </TopNavContainer>
  )
}

export { BottomNavbar, TopNavbar }