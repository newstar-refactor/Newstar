// // 검색바

import React, { useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { FaRegPaperPlane } from "react-icons/fa";
import styled from 'styled-components';

// 검색 바 컨테이너 스타일
const SearchBarContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 60px;
`;

// 입력 필드와 아이콘들을 감싸는 컨테이너
const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #F5F5F5;
  border-radius: 5px;
  padding-left: 15px; /* 좌측 패딩 추가 */
  position: relative; /* 아이콘 절대 위치를 위해 추가 */
`;

// 입력 필드 스타일
const Input = styled.input`
  width: 100%;
  border: none; /* 테두리 제거 */
  background-color: transparent; /* 배경색 투명 */
  height: 40px;
  padding: 0 10px; /* 좌우 패딩 추가 */
  &:focus {
    outline: none; /* 포커스시 테두리 없앰 */
  }
`;

// 경계선 스타일
const BoundaryLine = styled.div`
  height: 24px;
  width: 1px;
  background-color: #000;
  margin: 0 12px;
`;

// 검색 아이콘 스타일
const SearchIcon = styled(FaRegPaperPlane)`
  position: absolute;
  right: 10px;
  cursor: pointer;
  z-index: 1;
`;

export default function SearchBar({ setKeyword }) {

  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSearchClick = () => {
    setKeyword(input);
  }

  const activeEnter = (e) => {
    if(e.key === "Enter") {
      handleSearchClick();
    }
  }

  return (
    <SearchBarContainer>
      <InputWrapper>
        <IoSearch />
        <BoundaryLine />
        <Input
          type="text"
          value={input}
          placeholder="키워드를 입력하세요."
          onChange={handleInputChange}
          onKeyDown={(e) => activeEnter(e)}
        />
        <SearchIcon onClick={handleSearchClick} />
      </InputWrapper>
    </SearchBarContainer>
  );
}
