// 좋아요 한 뉴스

import { useRecoilValue } from "recoil"
import { likeDataState } from "../../state/atoms"

export default function LikeNews() {
  const likeNews = useRecoilValue(likeDataState)

  return (
    <div>
      <h2>좋아요 한 뉴스</h2>
    </div>
  )
}