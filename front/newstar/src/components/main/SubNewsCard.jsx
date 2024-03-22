// 내가 본 뉴스, 좋아요 한 뉴스 카드
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import LikeButton from "../../common/Like"
import styled from "styled-components"
import Tag from "../../common/Tag"
import { getRecords } from '../../api/fetch'


// styled-components
const BoxContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid;
  padding: 10px;
  cursor: pointer;
`


// title, imageUrl 변수 수정
// const SubNewsCard = ({ NewsData }) => {
const SubNewsCard = ({records}) => {
  const navigate = useNavigate();
  // const [records, setRecords] = useState([]);

  // useEffect(() => {
  //   getRecords(
  //     (response) => {
  //       setRecords(response.data);
  //       console.log(response.data)
  //     },
  //     (error) => {
  //       console.log("시청기록 데이터 조회 실패:", error);
  //     }
  //   );
  // }, []);

  // 카드 클릭 시, 숏폼 NewsData.url로 이동
  // const handleClick = () => { navigate(NewsData.url) }
  const handleClick = (url) => { navigate(url) }

  // return (
  //   <BoxContainer onClick={handleClick}>
  //     {NewsData.map(({ id, title, Bcategory, url }) => (
  //       <div key={id}>
  //         <Tag fontSize={'12px'}>{`# ${Bcategory}`}</Tag>
  //         <h2>{title}</h2>
  //       </div>
  //     ))}
  //   </BoxContainer>
  // );

  // return (
  //   <div>
  //     {records.map(({ id, title, Bcategory, url }) => (
  //       <BoxContainer key={id} onClick={() => handleClick(url)}>
  //         <Tag fontSize={'12px'}>{`# ${Bcategory}`}</Tag>
  //         <h2>{title}</h2>
  //       </BoxContainer>
  //     ))}
  //   </div>
  // );

  return (
    <div>
      {Array.isArray(records) ? records.map((record) => (
        <BoxContainer key={record.id} onClick={() => handleClick(url)}>
          {/* <Tag fontSize={'12px'}>{`# ${Bcategory}`}</Tag> */}
          <h2>{record.title}</h2>
        </BoxContainer>
      )) : null}
    </div>
  );

};

export default SubNewsCard;