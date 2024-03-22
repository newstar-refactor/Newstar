// 메인 페이지 뉴스 카드
import { useState, useEffect } from "react"
import styled from "styled-components"

import MainNewsHeader from "./MainNewsHeader"
import MainNewsBody from "./MainNewsBody"

import { likeNews } from "../../api/fetch"


const MainNewsImage = styled.img`
  width: 100%;
  padding: 10px;
  border-radius: 20px;
`

const NewsContainer = styled.div`
  height: auto;
  max-height: 86vh;
  overflow-y: auto;
  width: 100%;
`


// 좋아요 상태 변환 함수
function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function MainNewsCard({ newsData }) {
  
  // 좋아요 상태 관리
  const [isLiked, setIsLiked] = useState(false);

  // 좋아요 상태 업데이트
  
  function handleLike() {
    setIsLiked(!isLiked)
    const data = {
      article_id: newsData.article_id,
      likes: !isLiked
    }
    likeNews(
      data,
      ( response ) => {
        console.log(response)
        isLiked ? console.log("좋습니다") : console.log("됐습니다")
      },
      ( error ) => {
        console.log(error)
      }
    )
  }

  return (
    <NewsContainer onDoubleClick={handleLike}>
      <MainNewsImage
        src={newsData.image_url}
        alt="news image"
      />

      <MainNewsHeader
        newsData={newsData}
        isLiked={isLiked}
        setIsLiked={setIsLiked}
        handleLikeButtonClick={handleLike}
      />
      <MainNewsBody newsData={newsData} />
    </NewsContainer>
  )
}

export default MainNewsCard