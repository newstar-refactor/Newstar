// 검색바
import React, { useState } from 'react';
import { IoSearch } from "react-icons/io5";
import styled from 'styled-components';

// 검색 바 컨테이너 스타일
const SearchBarContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

// 입력 필드 스타일
const Input = styled.input`
  width: 100%;
  padding-right: 30px; /* 아이콘 공간 확보 */
`;

// 검색 아이콘 스타일
const SearchIcon = styled(IoSearch)`
  position: absolute;
  right: 10px;
  cursor: pointer;
`;

export default function SearchBar({ setKeyword, onSearch }) {

  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSearchClick = () => {
    setKeyword(input);
    onSearch();
  }

  return (
    <SearchBarContainer>
      <Input
        type="text"
        value={input}
        placeholder="키워드를 입력하세요."
        onChange={handleInputChange}
      />
      <SearchIcon onClick={handleSearchClick} />
    </SearchBarContainer>
  );
}