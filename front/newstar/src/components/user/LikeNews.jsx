// 좋아요 한 뉴스

import styled from "styled-components"
import { useRecoilValue } from "recoil"
import { likeDataState, newsDataState } from "../../state/atoms"

import LikeNewsCard from "../main/LikeNewsCard"

const LikeNewsContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  padding: 15px;
  position: relative;
  
`

const LikeNewsCards = styled.div`
  min-width: 100%;
  display: flex;
  gap: 10px;
`

export default function LikeNews() {
  const likeNews = useRecoilValue(likeDataState)
  const newsData = useRecoilValue(newsDataState)


  return (
    <div>
      <h2>좋아요 한 뉴스</h2>
      <LikeNewsContainer>
        <LikeNewsCards>
          {likeNews && likeNews.map((likeData, idx) => (
            <LikeNewsCard
              key={`${idx}-${likeData.article_id}`} 
              likeData={likeData} />
          ))}
        </LikeNewsCards>
      </LikeNewsContainer>
    </div>
  )
}