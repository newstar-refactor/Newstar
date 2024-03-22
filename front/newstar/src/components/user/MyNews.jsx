// 최근 본 뉴스
import SubNewsCard from "../main/SubNewsCard"

import { useRecoilValue } from "recoil"
import { recordDataState } from "../../state/atoms"

export default function MyNews() {
  const records = useRecoilValue(recordDataState)

  return (
    <div>
      <h2>최근 본 뉴스</h2>
      <SubNewsCard records={records} />
    </div>
  )
}