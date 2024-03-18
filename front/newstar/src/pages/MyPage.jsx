// 마이페이지
// 내 정보, 내 선호도(워드 클라우드), 내가 본 기사, 좋아요 한 기사, 
import MyCategory from "../components/user/MyCategory"
import MyNews from "../components/user/MyNews"
import LikeNews from "../components/user/LikeNews"


export default function MyPage() {
  return (
    <div>
      <MyCategory/>
      <MyNews/>
      <LikeNews/>
    </div>
  )
}