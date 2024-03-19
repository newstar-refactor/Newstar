// 메인 페이지 뉴스 카드
import { useState, useEffect } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import styled from "styled-components"

import LikeButton from "../../common/Like"
import { api } from "../../api/api"
import { recordDataState } from "../../state/atoms";

import MainNewsHeader from "./MainNewsHeader"
import MainNewsBody from "./MainNewsBody"


const MainNewsImage = styled.img`
  width: 100%;
  padding: 10px;
  border-radius: 20px;
`

const NewsContainer = styled.div`
  
`


// 좋아요 상태 변환 함수
// function replaceItemAtIndex(arr, index, newValue) {
//   return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
// }



function MainNewsCard({ recommendData }) {

  const [isLiked, setIsLiked] = useState(false);

  const handleDoubleClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <NewsContainer onDoubleClick={handleDoubleClick}>
      <MainNewsImage
        src={recommendData.imageUrl}
        alt="news image"
      />

      <MainNewsHeader
        recommendData={recommendData}
        isLiked={isLiked}
        setIsLiked={setIsLiked}
      />
      <MainNewsBody recommendData={recommendData} />
    </NewsContainer>
  )

  
}

export default MainNewsCard