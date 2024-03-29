// 마이페이지
// 내 정보, 내 선호도(워드 클라우드), 내가 본 기사, 좋아요 한 기사,
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer'

import MyNews from '../components/user/MyNews';
import LikeNews from '../components/user/LikeNews';
import styled from 'styled-components';

import { recordDataState, likeDataState } from '../state/atoms';
import { useRecoilState } from 'recoil';

import { getRecords, getLikes } from '../api/fetch';

const MyPageContainer = styled.div`
  padding: 10px;

  // 직접 자식 컴포넌트들 사이에 간격을 추가
  & > * + * {
      margin-top: 50px;
  }
`;

export default function MyPage() {
  // 최근 본 뉴스 기록
  const [recordDatas, setRecordDatas] = useRecoilState(recordDataState);
  const [recordPage, setRecordPage] = useState(0)
  const [recordRef, recordInView] = useInView()

  // 좋아요 한 뉴스 기록
  const [likeDatas, setLikeDatas] = useRecoilState(likeDataState);
  const [likePage, setLikePage] = useState(0)
  const [likeRef, likeInView] = useInView()

  useEffect(() => {
    if (recordInView) {
      getRecords(
        5, recordPage,
        (response) => {
          setRecordDatas(response.data.data.reverse());
          setRecordPage((recordPage) => recordPage + 1)
        },
        (error) => {
          console.log(error);
        }
      )
    }
  }, [recordInView])

  useEffect(() => {
    getLikes(
      5, likePage,
      (response) => {
        setLikeDatas(response.data.data.reverse());
        setLikePage((likePage) => likePage + 1)
      },
      (error) => {
        console.log(error);
      }
    );
  }, [likeInView]);

  return (
      <MyPageContainer>
          <MyNews recordRef={recordRef} />
          <LikeNews likeRef={likeRef} />
      </MyPageContainer>
  );
}
