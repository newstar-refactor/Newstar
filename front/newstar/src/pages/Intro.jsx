// 보류

// 앱 소개 및 설명 페이지
// 아래로 스크롤 후, 로그인 버튼
import SignUp from "../components/SignUp"

function IntroMent({ment}) {
  return (
    <div>
      <p>{ment}</p>
    </div>
  )
}

export default function Intro() {
  return (
    <div>
      <IntroMent 
        ment={'원하는 분야의 기사를 일일이 찾기 힘드시지 않으셨나요?'}/>
      <IntroMent 
        ment={'뉴스를 간편하고 빠르게 보고 싶지 않으신가요?'}/>
      <IntroMent 
        ment={'당신의 관심사를 알려주세요.'}/>
      <IntroMent 
        ment={'당신에게 맞는 기사를 실시간으로 추천해 드립니다.'}/>
      <IntroMent 
        ment={'먼저, 관심있는 분야를 선택하고,'}/>
      <IntroMent 
        ment={'뉴스를 추천 받은 후'}/>
      <IntroMent 
        ment={'각 뉴스에 대해 좋아요로 관심을 표시하면'}/>
      <IntroMent 
        ment={'내가 관심있는 기사만!'}/>
      <SignUp/>
    </div>
  )
}