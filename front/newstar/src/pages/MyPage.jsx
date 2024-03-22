// 마이페이지
// 내 정보, 내 선호도(워드 클라우드), 내가 본 기사, 좋아요 한 기사, 
import { useState, useEffect } from "react"

import MyCategory from "../components/user/MyCategory"
import MyNews from "../components/user/MyNews"
import LikeNews from "../components/user/LikeNews"
import styled from "styled-components"

import { recordDataState } from "../state/atoms"
import { useRecoilState } from "recoil"

import { getRecords } from "../api/fetch"


const Container = styled.div`
  padding: 10px;
  
  // 직접 자식 컴포넌트들 사이에 간격을 추가
  & > * + * {
    margin-top: 50px;
  }
`;


export default function MyPage() {
  const [recordDatas, setRecordDatas] = useRecoilState(recordDataState)

  useEffect(()=>{
    getRecords(
      ( response ) => {
        // console.log(response.data.data)
        setRecordDatas(response.data.data)
      },
      ( error ) => {
        console.log(error)
      }
    )
  },[])

  return (
    <Container>
      <MyCategory/>
      <MyNews/>
      <LikeNews/>
    </Container>
  )
}