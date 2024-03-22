// 메인 페이지 뉴스 카드
import { useState, useEffect } from "react"
import styled from "styled-components"

import MainNewsHeader from "./MainNewsHeader"
import MainNewsBody from "./MainNewsBody"


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

function MainNewsCard({ newsData, recordDatas, setRecordDatas }) {
  
  // 좋아요 상태 관리
  const [isLiked, setIsLiked] = useState(false);

  function handleLikeButtonClick() {
    setIsLiked(!isLiked)
    if (recordDatas.length > 0) {
      toggleLike()
    }
  }

  // 좋아요 상태 업데이트
  
  function toggleLike() {
    const likeRecord = recordDatas.findIndex((record) => record.article_id === newsData.article_id)
    const newRecords = replaceItemAtIndex(recordDatas, likeRecord, {
      ...recordDatas[likeRecord],
      like: !recordDatas[likeRecord].likes
    })

    setRecordDatas(newRecords)
  }

  return (
    <NewsContainer onDoubleClick={handleLikeButtonClick}>
      <MainNewsImage
        src={newsData.image_url}
        alt="news image"
      />

      <MainNewsHeader
        newsData={newsData}
        isLiked={isLiked}
        setIsLiked={setIsLiked}
        handleLikeButtonClick={handleLikeButtonClick}
      />
      <MainNewsBody newsData={newsData} />
    </NewsContainer>
  )
}

export default MainNewsCard