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

  height: 7vh;
  max-width: 500px;
  min-width: 200px;
  
  margin: 0 auto;
  
  overflow: hidden;
  padding: 10px;
  z-index: 10;
  background-color: white;
`

const TopNavContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  height: 7vh;
  max-width: 500px;
  min-width: 300px;

  display: flex;
  align-items: center;
  margin: 0 auto;
  padding: 10px 10px 5px;
  z-index: 10;
  
  background-color: white;
`

const NavContent = styled.div`
  display: inline-flex;
  align-items: flex-end;
  justify-content: center;
  float: left;
  width: calc(100%/4);

`

function BottomNavbar() {
  return (
    <NavContainer>
      <NavContent>
        <Link to={'/newstar'}><FiHome size="20" /></Link>
      </NavContent>
      <NavContent>
        <Link to={'/newstar/search'}><IoSearch size="20" /></Link>
      </NavContent>
      <NavContent>
        <Link to={'/newstar/category'}><FaList size="20" /></Link>
      </NavContent>
      <NavContent>
        <Link to={'/newstar/mypage'}><BsFillPersonFill size="20" /></Link>
      </NavContent>
    </NavContainer>
  )
}

function TopNavbar() {
  return (
    <TopNavContainer>
      <Link to={'/newstar'}>
        <img 
          src="/logo_dark.png" 
          alt="newstar logo"
          width="80"
          height="35" />
      </Link>
    </TopNavContainer>
  )
}

export { BottomNavbar, TopNavbar }