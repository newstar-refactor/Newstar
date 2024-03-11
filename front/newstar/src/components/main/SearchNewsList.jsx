// 검색 시 나오는 뉴스 리스트
import React from "react";
import { useNavigate } from "react-router-dom";

// title, imageUrl 변수 수정
const SerarchNewsList = ({ title, imageUrl }) => {

  const navigate = useNavigate();

  // 리스트를 클릭하면 숏폼 url로 이동
  const handleClick = () => {
    navigate(newsUrl)
  };

  return (
    <div onClick={handleClick}>
      <div>{title}</div>
      <img src={imageUrl} alt="newsimage"/>
    </div>
  );
};

export default SerarchNewsList;