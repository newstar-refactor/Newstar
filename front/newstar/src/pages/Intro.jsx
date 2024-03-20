// 앱 소개 및 설명 페이지
// 아래로 스크롤
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { postMembers } from '../api/fetch'

import styled from "styled-components"

import Lottie from "lottie-react"
import searchNewsLottie from "../assets/lottie/searchNews.json"
import NewStart from "../assets/lottie/NewStart.json"

const IntroWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
  gap: 150px;
`

const IntroBox1 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

`
const IntroBox2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`
const IntroBox3 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
`

const StartBtn = styled.button`
  border: none;
  border-radius: 5px;
  width: auto;
  padding: 10px 30px;
  font-size: 20px;
  background-color: rgb(136, 171, 142);
  color: rgb(242, 241, 235);
  margin: 20px;
  cursor: pointer;
`
const LottieStyle = {
  display: 'flex',
  height: '250px',
  width: 'auto',
  justifyContent: 'end'
}

// function HowToUse() {
//   return (
//     <IntroWrapper>
//       <div>먼저, 관심있는 분야를 선택하고</div>
//       <div>뉴스를 추천받은 후</div>
//       <div>각 뉴스에 대해 좋아요로 관심을 표시하세요</div>

//       <div>내가 관심있는 뉴스만 빠르고 간편하게 보실 수 있습니다</div>
//     </IntroWrapper>
//   )
// }


export default function Intro() {
  const navigate = useNavigate()

  return (
    <IntroWrapper>
      <IntroBox1>
        <h2>아직도 기사</h2>
        <h2>검색해서 보시나요?</h2>
        <Lottie 
          animationData={searchNewsLottie}
          style={{ width: 'auto', height: '250px'}} />
      </IntroBox1>

      <IntroBox2>
        <div>빠르고 간편하게 사용하는</div>
        <h2>뉴스 기사 숏폼</h2>
      </IntroBox2>

      <IntroBox3>
        <IntroBox2>
          <img 
            src="/logo_dark.png" 
            alt="newstar_logo"
            width={150}
            />
          <div>지금 시작해보세요!</div>
        </IntroBox2>
        <Lottie 
            animationData={NewStart}
            style={LottieStyle} />
      </IntroBox3>
      <StartBtn onClick={() => navigate("/choose")}>시작하기</StartBtn>

    </IntroWrapper>
  )
}