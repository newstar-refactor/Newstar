// 마이페이지
// 내 정보, 내 선호도(워드 클라우드), 내가 본 기사, 좋아요 한 기사,
import { useEffect } from 'react';

import MyNews from '../components/user/MyNews';
import LikeNews from '../components/user/LikeNews';
import styled from 'styled-components';
import AddQR from '../components/user/AddQR';

import { getLikes, getRecords } from "../api/fetch"
import { useRecoilState } from 'recoil';
import { likeDataState, recordDataState } from '../state/atoms';

const MyPageContainer = styled.div`
  padding: 50px 30px 20px;

  // 직접 자식 컴포넌트들 사이에 간격을 추가
  & > * + * {
      margin-top: 50px;
  }
`;

export default function MyPage() {
  const [likeNews, setLikeNews] = useRecoilState(likeDataState);
  const [records, setRecords] = useRecoilState(recordDataState);

  useEffect(() => {
    getRecords(
      5, 0,
      (response) => {
        setRecords(response.data.data.content);
        console.log(response.data.data.content)
      },
      (error) => {
        console.log(error);
      }
    )

  }, [])

  useEffect(() => {
      getLikes(
        5, 0,
        (response) => {
          setLikeNews(response.data.data.content);
          console.log(response.data.data.content)
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);
  


  return (
      <MyPageContainer>
          <MyNews />
          <LikeNews />
          <AddQR />
      </MyPageContainer>
  );
}
