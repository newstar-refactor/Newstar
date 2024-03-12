// 내가 본 뉴스, 좋아요 한 뉴스 카드
import React from "react";
import { useNavigate } from "react-router-dom"
import LikeButton from "../../common/Like"
import styled from "styled-components"


// styled-components
const BoxContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid;
  padding: 10px;
  cursor: pointer;
`


// title, imageUrl 변수 수정
const SubNewsCard = ({ NewsData }) => {
  
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false)

  // 좋아요 버튼 클릭 핸들러
  const handleLikeButtonClick = () => { setIsLiked(!isLiked) };


  // 카드 클릭 시, 숏폼 NewsData.url로 이동
  const handleClick = () => { navigate(NewsData.url) }

  return (
    <BoxContainer onClick={handleClick}>
      {NewsData.map(({ id, title, Bcategory }) => (
        <div key={id}>
          <Tag fontSize={'12px'}>{`# ${Bcategory}`}</Tag>
          <h2>{title}</h2>
          {/* Card click 이벤트 버블링 방지 */}
          <LikeButton onClick={(e) =>
            { e.stopPropagation(); handleLikeButtonClick(id); }}
            isLiked={isLiked} />
        </div>
      ))}
    </BoxContainer>
  );

};

export default SubNewsCard;