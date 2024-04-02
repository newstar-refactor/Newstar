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
  display: flex;
  padding: 15px;
  gap: 10px;
  position: relative;
`

export default function MyNews() {
  // 최근 본 뉴스 기록
  const [records, setRecords] = useRecoilState(recordDataState);
  const [recordPage, setRecordPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isEnd, setIsEnd] = useState(false)
  const [ref, inView] = useInView()

  useEffect(() => {
    setIsLoading(false)
    setIsEnd(false)
    setRecords([])
    setRecordPage(0)
  }, [])

  useEffect(() => {
    if (inView && !isLoading && !isEnd) {
      setIsLoading(true)
      getRecords(
        5, recordPage,
        (response) => {
          const data = response.data.data.content
          if(data.length < 5) {
            setIsEnd(true)
          }
          setRecords([...records, ...response.data.data.content]);
          setRecordPage((recordPage) => recordPage + 1)
          setIsLoading(false)
        },
        (error) => {
          console.log(error);
          setIsLoading(false)
        }
      )
    }
  }, [inView])

  return (
    <>
      <h2>최근 본 뉴스</h2>
      <MyNewsContainer>
          {records && records.map((likeData, idx) => (
            <LikeNewsCard
              key={`${idx}-${likeData.article_id}`} 
              $background={'lightgray'}
              likeData={likeData} />
          ))}
          <div ref={ref} />
      </MyNewsContainer>
    </>
  )
}