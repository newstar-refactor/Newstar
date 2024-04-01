// 최근 본 뉴스
import styled from "styled-components"
import LikeNewsCard from "../main/LikeNewsCard"

import { useState, useEffect } from "react"
import { useRecoilState } from "recoil"
import { useInView } from 'react-intersection-observer'

import { recordDataState } from "../../state/atoms"
import { getRecords } from "../../api/fetch"

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

export default function MyNews() {
  // 최근 본 뉴스 기록
  const [records, setRecords] = useRecoilState(recordDataState);
  const [recordPage, setRecordPage] = useState(1)
  const [ref, inView] = useInView()
  useEffect(() => {
    if (inView) {
      getRecords(
        5, recordPage,
        (response) => {
          setRecords([...records, ...response.data.data.content]);
          setRecordPage((recordPage) => recordPage + 1)
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }, [inView])

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
          <div style={{ color: 'white'}} ref={ref}>next</div>
          </MyNewsCards>
        </MyNewsContainer>
    </div>
  )
}