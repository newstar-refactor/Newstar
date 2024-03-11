// 내가 본 뉴스, 좋아요 한 뉴스 카드
import React from "react";
import { useNaviage } from "react-router-dom"


// styled-components
const BoxContainer = styled.div`
  display: flex;
  align-itmes: center;
  border: 1px solid;
  paddind: 10px;
`

// title, imageUrl 변수 수정
const SubNewsCard = ({ title, imageUrl }) => {
  
  const navigate = useNaviage();

  // subcard를 클릭하면 숏폼 url로 이동
  const handleClick = () => {
    navigate(newsUrl)
  };

  return (
    <BoxContainer onClick={handleClick}>
      <img src={imageUrl} alt="newsimage" />
      <div>{title}</div>
    </BoxContainer>
  );
};

export default SubNewsCard;