// 메인 숏폼 페이지
// 뉴스 기사 좌우로 스크롤

import api from '../api/api'
import { useRecoilState } from 'recoil'
import { recommendDataState } from '../state/atoms'


import MainNewsCard from '../components/main/MainNewsCard'
import { useEffect } from 'react';


export default function Main() {
  const [recommendDatas, setRecommendDatas] = useRecoilState(recommendDataState)

  // useEffect(() => {
  //   axios.get(api.news)
  //     .then(res => {
  //       setRecommendDatas(res.data)
  //     })
  //     .catch(err => {
  //       console.error('Error fetching data:', err)
  //     })
  // })


  return (
    <div>
      <MainNewsCard/>
    </div>

  )
}