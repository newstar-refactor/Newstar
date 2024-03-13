// 메인 숏폼 페이지
// 뉴스 기사 좌우로 스크롤

import { useEffect } from 'react';
import api from '../api/api'
import { useRecoilState } from 'recoil'
import { recommendDataState, recordDataState } from '../state/atoms'


import MainNewsCard from '../components/main/MainNewsCard'
import MainPageContainer from '../styles/MainContainer'

export default function Main() {
  const [recommendDatas, setRecommendDatas] = useRecoilState(recommendDataState)
  const [recordDatas, setRecordDatas] = useRecoilState(recordDataState)

  // useEffect(() => {
  //   axios.get(api.news)
  //     .then(res => {
  //       setRecommendDatas(res.data)
  //     })
  //     .catch(err => {
  //       console.error('Error fetching data:', err)
  //     })
  // })

  // useEffect(() => {
  //   axios.get(api.record)
  //     .then(res => {
  //       setRecordDatas(res.data)
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