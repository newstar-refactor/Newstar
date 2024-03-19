// 메인 페이지 뉴스 카드
import { useState, useEffect } from "react"
import styled from "styled-components"

import MainNewsHeader from "./MainNewsHeader"
import MainNewsBody from "./MainNewsBody"


const MainNewsImage = styled.img`
  width: 100%;
  padding: 10px;
`

const NewsContainer = styled.div`
  
`


// 좋아요 상태 변환 함수
// function replaceItemAtIndex(arr, index, newValue) {
//   return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
// }



function MainNewsCard({ newsData }) {

  const [isLiked, setIsLiked] = useState(false);

  const handleDoubleClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <NewsContainer onDoubleClick={handleDoubleClick}>
      <MainNewsHeader
        newsData={newsData}
        isLiked={isLiked}
        setIsLiked={setIsLiked}
      />
      <MainNewsImage
        src={newsData.imageUrl}
        alt="news image"
        />
      <MainNewsBody newsData={newsData} />
    </NewsContainer>
  )
}

export default MainNewsCard