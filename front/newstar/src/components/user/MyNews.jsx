// 최근 본 뉴스
import styled from "styled-components"
import LikeNewsCard from "../main/LikeNewsCard"

import { useRecoilValue } from "recoil"
import { recordDataState } from "../../state/atoms"

const MyNewsContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 15px;
  position: relative;
`

const MyNewsCards = styled.div`
  min-width: 100%;
  display: flex;
  gap: 10px;
`

export default function MyNews({ recordRef }) {
  const records = useRecoilValue(recordDataState)

  return (
    <div>
      <h2>최근 본 뉴스</h2>
        <MyNewsContainer>
          <MyNewsCards>
            {records && records.map((likeData, idx) => (
              <LikeNewsCard
                key={`${idx}-${likeData.article_id}`} 
                $background={'lightgray'}
                likeData={likeData} />
            ))}
          </MyNewsCards>
        </MyNewsContainer>
        <div ref={ recordRef }></div>
    </div>
  )
}