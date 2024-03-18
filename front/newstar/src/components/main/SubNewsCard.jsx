// 내가 본 뉴스, 좋아요 한 뉴스 카드
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import LikeButton from "../../common/Like"
import styled from "styled-components"
import Tag from "../../common/Tag"


// styled-components
const BoxContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid;
  padding: 10px;
  cursor: pointer;
`

const NewsData = [
  {
    id: 0,
    title: '유정복 시장과 악수하는 윤 대통령',
    url: 'https://n.news.naver.com/mnews/article/003/0012412928',
    date: '2024-03-07 13:59:29',
    Bcategory: 100,
    Scategory: 264,
    imageUrl: 'https://mimgnews.pstatic.net/image/origin/003/2024/03/07/12412928.jpg?type=ofullfill220_150',
    content:'[인천=뉴시스] 조수정 기자 = 윤석열 대통령이 7일 인천 송도컨벤시아에서 열린 수도권광역급행철도 GTX-B 노선 착공기념식에 입장하며 유정복 인천시장과 악수하고 있다.  2024.03.07. chocrystal@newsis.com [사진 영상 제보받습니다] 공감언론 뉴시스가 독자 여러분의 소중한 제보를 기다립니다. 뉴스 가치나 화제성이 있다고 판단되는 사진 또는 영상을 뉴시스 사진영상부(n-photo@newsis.com)로 보내주시면 적극 반영하겠습니다.',
  },
  {
    id: 1,
    title: "성창연, 알바트로스 컨퍼런스 2024 서울 참여  ... '한국형 사업전략 패러다임의 변화' 선봬",
    url:' https://n.news.naver.com/mnews/article/011/0004309774',
    date: '2024-03-07 13:50:01',
    Bcategory: 101,
    Scategory: 258,
    imageUrl: 'https://mimgnews.pstatic.net/image/origin/011/2024/03/07/4309774.jpg?type=nf220_150',
    content: '변장원 성균관대학교 IMBA 창업연구회 회장, 코엑스서 사업전략 워크샵 개최 27일부터 이틀간 美 와튼스쿨, 英 런던정경대 등 세계적 석학 및 경영진 참여해 [서울경제] 동아시아의 기업 경영과 마케팅의 미래를 논하는 국제 포럼 "알바트로스 컨퍼런스(Albatross Conference 2024 Seoul)"에 성균관대학교 IMBA 창업연구회가 참가한다. 오는 27일부터 이틀간 서울 코엑스에서 개최되는 알바트로스 컨퍼런스에는 성균관대학교 창업연구회 뿐 아니라, 미국의 와튼스쿨과 영국의 런던정경대, 서울대학교 경영전문대학원 교수진 등 세계적인 석학들도 강단에 오른다. 성균관대학교 IMBA 창업연구회의 변장원 회장은 "커머스 사업의 본질과 한국형 커머스 전략 패러다임의 변화(The Essence of Commerce and Shift in Korean Commerce Strategy Paradigm)"라는 주제로 사업전략 워크샵을 컨퍼런스 첫날 오전에 다룰 예정이다. 변 회장은 “최정상의 글로벌 석학들과 경영진이 참여하는 알바트로스 컨퍼런스에 참여하게 되어 기쁘다. 성균관대학교 경영전문대학원의 창업연구회에서 다뤄온 주요 사례를 기업 관계자들이 쉽게 이해할 수 있도록 해체하면서도, 기업의 밝은 내일을 만들어갈 수 있는 방향성을 제시하고자 한다”고 말했다. 그러면서 "최근 동아시아, 특히 한국의 이커머스 시장은 시장규모는 223조원으로, 중국 및 미국에 비해 적은 편이지만 독점적 사업자가 없어 치열한 경쟁 모습을 보여주고 있다. 타국의 성공 사례를 반영하기보다는 이커머스 사업의 본질인 제품개발 및 유통전략, 그리고 각각의 성장단계에 걸맞는 현금유동성을 바라보는 시선이 필요하다"고 강조했다 변장원 성균관대학교 IMBA 창업연구회 회장의 이커머스 사업전략 워크샵 강연은 사전 접수자만이 들을 수 있으며, 참여 신청은 알바트로스 컨퍼런스 서울의 공식 홈페이지에서 할 수 있다. 한편, 오는 27일부터 양일간 서울 코엑스 오디토리움에서 개최되는 "알바트로스 컨퍼런스 2024 서울"에는 LG유플러스와 GS차지비, 대창그룹 등 국내 대기업뿐 아니라 일본의 VC 하코부네가 참여한다. 이와 더불어 최근 각광받고 있는 채널코퍼레이션(채널톡), 브이캣(파이온코퍼레이션), 크몽, 이벤터스, 온오프믹스 등 유망 스타트업들도 함께한다',
  }
]


// title, imageUrl 변수 수정
// const SubNewsCard = ({ NewsData }) => {
const SubNewsCard = () => {
    const navigate = useNavigate();
    const [isLiked, setIsLiked] = useState(false)

  // 좋아요 버튼 클릭 핸들러
  // const handleLikeButtonClick = () => { setIsLiked(!isLiked) };
    const handleLikeButtonClick = (id, e) => { 
      e.stopPropagation(); 
      setIsLiked(!isLiked);
      console.log(`Liked News ID: ${id}`); // 어떤 뉴스가 좋아요 되었는지 확인
    };


  // 카드 클릭 시, 숏폼 NewsData.url로 이동
  // const handleClick = () => { navigate(NewsData.url) }
  const handleClick = (url) => { navigate(url) }

  // return (
  //   <BoxContainer onClick={handleClick}>
  //     {NewsData.map(({ id, title, Bcategory, url }) => (
  //       <div key={id}>
  //         <Tag fontSize={'12px'}>{`# ${Bcategory}`}</Tag>
  //         <h2>{title}</h2>
  //         {/* Card click 이벤트 버블링 방지 */}
  //         <LikeButton onClick={(e) =>
  //           { e.stopPropagation(); handleLikeButtonClick(id); }}
  //           isLiked={isLiked} />
  //       </div>
  //     ))}
  //   </BoxContainer>
  // );

  return (
    <div>
      {NewsData.map(({ id, title, Bcategory, url }) => (
        <BoxContainer key={id} onClick={() => handleClick(url)}>
          <Tag fontSize={'12px'}>{`# ${Bcategory}`}</Tag>
          <h2>{title}</h2>
          <LikeButton onClick={(e) => handleLikeButtonClick(id, e)} isLiked={isLiked} />
        </BoxContainer>
      ))}
    </div>
  );

};

export default SubNewsCard;