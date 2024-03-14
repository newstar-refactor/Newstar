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
  height: 50px;
  overflow: hidden;
  background-color: rgb(136, 171, 142);
  padding: 10px;
  z-index: 10;
`

const TopNavContainer = styled.div`
  position: fixed;
  top: 0;
  height: 50px;
  overflow: hidden;
  background-color: rgb(136, 171, 142);
  display: flex;
  padding: 0px 10px 5px;
  align-items: center;
  z-index: 10;
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
        <Link to={'/'}><FiHome color="rgb(242, 241, 235)" size="20" /></Link>
      </NavContent>
      <NavContent>
        <Link to={'/search'}><IoSearch color="rgb(242, 241, 235)" size="20" /></Link>
      </NavContent>
      <NavContent>
        <Link to={'/mypage'}><BsFillPersonFill color="rgb(242, 241, 235)" size="20" /></Link>
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