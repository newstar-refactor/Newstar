// 하단 네비게이션 바
// 홈, 마이페이지, 기사 검색

import { Link } from 'react-router-dom'
import styled from 'styled-components';

import { FiHome } from "react-icons/fi";
import { BsFillPersonFill } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import { FaList } from "react-icons/fa";

const NavContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  height: 50px;
  max-width: 600px;
  min-width: 200px;
  
  margin: 0 auto;
  
  overflow: hidden;
  padding: 10px;
  z-index: 10;
  background-color: white;
  /* border-top: 0.5px black solid; */
`

const TopNavContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  height: 50px;
  max-width: 600px;
  min-width: 300px;

  display: flex;
  align-items: center;
  /* overflow: hidden; */
  margin: 0 auto;
  padding: 0px 10px 5px;
  z-index: 10;
  
  background-color: white;
  /* border-bottom: 0.5px black solid; */
`

const NavContent = styled.div`
  text-align: center;
  float: left;
  width: calc(100%/4);

  height: 45px;
  line-height: 45px;
`

function BottomNavbar() {
  return (
    <NavContainer>
      <NavContent>
        <Link to={'/'}><FiHome size="20" /></Link>
      </NavContent>
      <NavContent>
        <Link to={'/search'}><IoSearch size="20" /></Link>
      </NavContent>
      <NavContent>
        <Link to={'/category'}><FaList size="20" /></Link>
      </NavContent>
      <NavContent>
        <Link to={'/mypage'}><BsFillPersonFill size="20" /></Link>
      </NavContent>
    </NavContainer>
  )
}

function TopNavbar() {
  return (
    <TopNavContainer>
      <img 
        src="/logo_dark.png" 
        alt="newstar logo"
        width="80"
        height="35" />
    </TopNavContainer>
  )
}

export { BottomNavbar, TopNavbar }