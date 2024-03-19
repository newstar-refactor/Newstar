// 뉴스 카테고리별로 모아보기
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { useRecoilState } from 'recoil'

import { getCategoryNews, getPagingNews } from '../api/fetch'
import { categoryDataState } from '../state/atoms'
import CategoryNewsCard from '../components/main/CategoryNewsCard'

const CategoryNewsCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 35px;
  padding: 20px;
`

// 카테고리 번호
const BigCategory = { 100: '정치', 101: '경제', 105: 'IT/과학' }
const SmallCategory = {
  264: '대통령실',
  265: '국회/정당',
  268: '북한',
  266: '행정',
  267: '국방/외교',
  269: '정치일반',
  
  259: '금융',
  258: '증권',
  261: '산업/재계',
  771: '중기/벤처',
  260: '부동산',
  262: '글로벌 경제',
  310: '생활경제',
  263: '경제 일반',
  
  731: '모바일',
  226: '인터넷/SNS',
  227: '통신/뉴미디어',
  230: 'IT 일반',
  732: '보안/해킹',
  283: '컴퓨터',
  229: '게임/리뷰',
  228: '과학 일반',
}


export default function CategoryNews() {
  const sampleDatas = [
    {
      id: 0,
      title: "신한은행, 창덕궁에서 '임원 봉사' 실시",
      url: 'https://n.news.naver.com/mnews/article/082/0001259059',
      date: '2024-03-07 13:56:04',
      Bcategory: 101,
      Scategory: 259,
      imageUrl: 'https://mimgnews.pstatic.net/image/origin/082/2024/03/07/1259059.jpg?type=nf220_150',
      content:'지난 6일 서울시 종로구 소재 창덕궁에서 신한은행 정상혁 은행장(가운데)과 임직원들이 새봄맞이 환경정비 봉사활동을 마친 후 기념촬영하는 모습 신한은행은 지난 6일 서울시 종로구 소재 창덕궁에서 새봄맞이 임원봉사활동을 실시했다고 7일 밝혔다. 신한은행 정상혁 은행장과 임직원 30여명은 창덕궁 희정당에서 창호를 개방해 겨우내 쌓인 먼지를 털어내고 바닥을 청소하는 등 새봄맞이 대청소를 실시했다. 신한은행은 전국의 지역본부와 본부부서 임직원들이 다양한 봉사활동에 참여하고 있으며 올해는 ‘다함께 봉사’라는 새로운 컨셉으로 릴레이 봉사 캠페인을 시작했다. ‘다함께 봉사’는 임직원간 서로 독려하는 릴레이 방식으로 ‘봉사활동을 확산하면서 복지 사각지대에 희망을 전하자’는 의지를 담았다. 신한은행은 신한금융그룹의 ‘솔선수범 릴레이 캠페인’에 발맞춰 ‘다함께 봉사’를 통해 ‘ESG 상생 프로젝트’를 꾸준히 실천해 나갈 예정이다. 신한은행 관계자는 “신한은행은 문화재청 궁능유적본부 창덕궁관리소와 함께 창덕궁을 방문하는 관람객을 위한 오디오 가이드 서비스를 2022년부터 제공하고 있다"며 "올해는 ‘창덕궁 후원’ 관람객을 위한 무료 오디오 가이드 서비스 오픈을 준비하고 있다”고 말했다.'
    },
    {
      id: 1,
      title: "옴디아, '한국 디스플레이 컨퍼런스' 개최",
      url:'https://n.news.naver.com/mnews/article/092/0002323741',
      date: '2024-03-07 13:47:01',
      Bcategory: 105,
      Scategory: 230,
      imageUrl: 'https://mimgnews.pstatic.net/image/origin/092/2024/03/07/2323741.jpg?type=nf220_150',
      content: '13일 양재 엘타워서 18개 이상 발표 세션 진행 인포마테크(Informa Tech)의 기술 연구 및 자문 그룹 옴디아(Omdia)는 양재 엘타워에서 오는 13, 14일 양일 간 "2024년 상반기 한국 디스플레이 컨퍼런스"를 개최한다고 7일 밝혔다. 이번 행사에서 옴디아 시장 분석 전문가들은 18개 이상의 다양한 발표세션을 통해 세계 디스플레이 산업 동향을 보여줄 수 있는 최신 트렌드와 발전을 위한 인사이트를 제공할 예정이다. (사진=옴디아) 또한 최신 디스플레이 시장 기술과 산업, 대형 디스플레이, TV, 모바일 및 기타 사용 사례 등 다양한 범위의 주제를 다룬다. 주요 세션으로는 ▲2024년 디스플레이 10대 주제 ▲2024년 디스플레이 산업전망 ▲2024년 대형 디스플레이 투자 및 FAB 운영 분석 ▲글로벌 스마트폰 시장 분석 및 전망 ▲2024년에 떠오를 디스플레이 – IT OLED, 마이크로 LED 및 트렌스포머블 디스플레이 등이 있다. 김수연 옴디아 이사는 "옴디아는 디스플레이 산업의 복잡성을 헤쳐 나가는 데에 필요한 정보를 제공하기 위해 20년간 연구를 이어왔다"며 "새로운 기술과 시장 현황 등 주요 주제들을 연구 결과에 기반한 발표가 준비되는 만큼, 이번 행사가 역동적으로 변화하는 디스플레이 산업 및 유관 산업 관계자들이 통찰력과 최신 정보를 가장 빠르게 얻어 갈 수 있는 훌륭한 기회가 될 것"이라고 밝혔다.'
    },
    {
      id: 2,
      title: "신한은행, 창덕궁에서 '임원 봉사' 실시",
      url: 'https://n.news.naver.com/mnews/article/082/0001259059',
      date: '2024-03-07 13:56:04',
      Bcategory: 101,
      Scategory: 259,
      imageUrl: 'https://mimgnews.pstatic.net/image/origin/082/2024/03/07/1259059.jpg?type=nf220_150',
      content:'지난 6일 서울시 종로구 소재 창덕궁에서 신한은행 정상혁 은행장(가운데)과 임직원들이 새봄맞이 환경정비 봉사활동을 마친 후 기념촬영하는 모습 신한은행은 지난 6일 서울시 종로구 소재 창덕궁에서 새봄맞이 임원봉사활동을 실시했다고 7일 밝혔다. 신한은행 정상혁 은행장과 임직원 30여명은 창덕궁 희정당에서 창호를 개방해 겨우내 쌓인 먼지를 털어내고 바닥을 청소하는 등 새봄맞이 대청소를 실시했다. 신한은행은 전국의 지역본부와 본부부서 임직원들이 다양한 봉사활동에 참여하고 있으며 올해는 ‘다함께 봉사’라는 새로운 컨셉으로 릴레이 봉사 캠페인을 시작했다. ‘다함께 봉사’는 임직원간 서로 독려하는 릴레이 방식으로 ‘봉사활동을 확산하면서 복지 사각지대에 희망을 전하자’는 의지를 담았다. 신한은행은 신한금융그룹의 ‘솔선수범 릴레이 캠페인’에 발맞춰 ‘다함께 봉사’를 통해 ‘ESG 상생 프로젝트’를 꾸준히 실천해 나갈 예정이다. 신한은행 관계자는 “신한은행은 문화재청 궁능유적본부 창덕궁관리소와 함께 창덕궁을 방문하는 관람객을 위한 오디오 가이드 서비스를 2022년부터 제공하고 있다"며 "올해는 ‘창덕궁 후원’ 관람객을 위한 무료 오디오 가이드 서비스 오픈을 준비하고 있다”고 말했다.'
    },
    {
      id: 3,
      title: "옴디아, '한국 디스플레이 컨퍼런스' 개최",
      url:'https://n.news.naver.com/mnews/article/092/0002323741',
      date: '2024-03-07 13:47:01',
      Bcategory: 105,
      Scategory: 230,
      imageUrl: 'https://mimgnews.pstatic.net/image/origin/092/2024/03/07/2323741.jpg?type=nf220_150',
      content: '13일 양재 엘타워서 18개 이상 발표 세션 진행 인포마테크(Informa Tech)의 기술 연구 및 자문 그룹 옴디아(Omdia)는 양재 엘타워에서 오는 13, 14일 양일 간 "2024년 상반기 한국 디스플레이 컨퍼런스"를 개최한다고 7일 밝혔다. 이번 행사에서 옴디아 시장 분석 전문가들은 18개 이상의 다양한 발표세션을 통해 세계 디스플레이 산업 동향을 보여줄 수 있는 최신 트렌드와 발전을 위한 인사이트를 제공할 예정이다. (사진=옴디아) 또한 최신 디스플레이 시장 기술과 산업, 대형 디스플레이, TV, 모바일 및 기타 사용 사례 등 다양한 범위의 주제를 다룬다. 주요 세션으로는 ▲2024년 디스플레이 10대 주제 ▲2024년 디스플레이 산업전망 ▲2024년 대형 디스플레이 투자 및 FAB 운영 분석 ▲글로벌 스마트폰 시장 분석 및 전망 ▲2024년에 떠오를 디스플레이 – IT OLED, 마이크로 LED 및 트렌스포머블 디스플레이 등이 있다. 김수연 옴디아 이사는 "옴디아는 디스플레이 산업의 복잡성을 헤쳐 나가는 데에 필요한 정보를 제공하기 위해 20년간 연구를 이어왔다"며 "새로운 기술과 시장 현황 등 주요 주제들을 연구 결과에 기반한 발표가 준비되는 만큼, 이번 행사가 역동적으로 변화하는 디스플레이 산업 및 유관 산업 관계자들이 통찰력과 최신 정보를 가장 빠르게 얻어 갈 수 있는 훌륭한 기회가 될 것"이라고 밝혔다.'
    },
    {
      id: 4,
      title: "신한은행, 창덕궁에서 '임원 봉사' 실시",
      url: 'https://n.news.naver.com/mnews/article/082/0001259059',
      date: '2024-03-07 13:56:04',
      Bcategory: 101,
      Scategory: 259,
      imageUrl: 'https://mimgnews.pstatic.net/image/origin/082/2024/03/07/1259059.jpg?type=nf220_150',
      content:'지난 6일 서울시 종로구 소재 창덕궁에서 신한은행 정상혁 은행장(가운데)과 임직원들이 새봄맞이 환경정비 봉사활동을 마친 후 기념촬영하는 모습 신한은행은 지난 6일 서울시 종로구 소재 창덕궁에서 새봄맞이 임원봉사활동을 실시했다고 7일 밝혔다. 신한은행 정상혁 은행장과 임직원 30여명은 창덕궁 희정당에서 창호를 개방해 겨우내 쌓인 먼지를 털어내고 바닥을 청소하는 등 새봄맞이 대청소를 실시했다. 신한은행은 전국의 지역본부와 본부부서 임직원들이 다양한 봉사활동에 참여하고 있으며 올해는 ‘다함께 봉사’라는 새로운 컨셉으로 릴레이 봉사 캠페인을 시작했다. ‘다함께 봉사’는 임직원간 서로 독려하는 릴레이 방식으로 ‘봉사활동을 확산하면서 복지 사각지대에 희망을 전하자’는 의지를 담았다. 신한은행은 신한금융그룹의 ‘솔선수범 릴레이 캠페인’에 발맞춰 ‘다함께 봉사’를 통해 ‘ESG 상생 프로젝트’를 꾸준히 실천해 나갈 예정이다. 신한은행 관계자는 “신한은행은 문화재청 궁능유적본부 창덕궁관리소와 함께 창덕궁을 방문하는 관람객을 위한 오디오 가이드 서비스를 2022년부터 제공하고 있다"며 "올해는 ‘창덕궁 후원’ 관람객을 위한 무료 오디오 가이드 서비스 오픈을 준비하고 있다”고 말했다.'
    },
  ]

  const samplePaging = [
    {
      id: 0-1,
      title: "신한은행, 창덕궁에서 '임원 봉사' 실시",
      url: 'https://n.news.naver.com/mnews/article/082/0001259059',
      date: '2024-03-07 13:56:04',
      Bcategory: 101,
      Scategory: 259,
      imageUrl: 'https://mimgnews.pstatic.net/image/origin/082/2024/03/07/1259059.jpg?type=nf220_150',
      content:'지난 6일 서울시 종로구 소재 창덕궁에서 신한은행 정상혁 은행장(가운데)과 임직원들이 새봄맞이 환경정비 봉사활동을 마친 후 기념촬영하는 모습 신한은행은 지난 6일 서울시 종로구 소재 창덕궁에서 새봄맞이 임원봉사활동을 실시했다고 7일 밝혔다. 신한은행 정상혁 은행장과 임직원 30여명은 창덕궁 희정당에서 창호를 개방해 겨우내 쌓인 먼지를 털어내고 바닥을 청소하는 등 새봄맞이 대청소를 실시했다. 신한은행은 전국의 지역본부와 본부부서 임직원들이 다양한 봉사활동에 참여하고 있으며 올해는 ‘다함께 봉사’라는 새로운 컨셉으로 릴레이 봉사 캠페인을 시작했다. ‘다함께 봉사’는 임직원간 서로 독려하는 릴레이 방식으로 ‘봉사활동을 확산하면서 복지 사각지대에 희망을 전하자’는 의지를 담았다. 신한은행은 신한금융그룹의 ‘솔선수범 릴레이 캠페인’에 발맞춰 ‘다함께 봉사’를 통해 ‘ESG 상생 프로젝트’를 꾸준히 실천해 나갈 예정이다. 신한은행 관계자는 “신한은행은 문화재청 궁능유적본부 창덕궁관리소와 함께 창덕궁을 방문하는 관람객을 위한 오디오 가이드 서비스를 2022년부터 제공하고 있다"며 "올해는 ‘창덕궁 후원’ 관람객을 위한 무료 오디오 가이드 서비스 오픈을 준비하고 있다”고 말했다.'
    },
    {
      id: 1-1,
      title: "옴디아, '한국 디스플레이 컨퍼런스' 개최",
      url:'https://n.news.naver.com/mnews/article/092/0002323741',
      date: '2024-03-07 13:47:01',
      Bcategory: 105,
      Scategory: 230,
      imageUrl: 'https://mimgnews.pstatic.net/image/origin/092/2024/03/07/2323741.jpg?type=nf220_150',
      content: '13일 양재 엘타워서 18개 이상 발표 세션 진행 인포마테크(Informa Tech)의 기술 연구 및 자문 그룹 옴디아(Omdia)는 양재 엘타워에서 오는 13, 14일 양일 간 "2024년 상반기 한국 디스플레이 컨퍼런스"를 개최한다고 7일 밝혔다. 이번 행사에서 옴디아 시장 분석 전문가들은 18개 이상의 다양한 발표세션을 통해 세계 디스플레이 산업 동향을 보여줄 수 있는 최신 트렌드와 발전을 위한 인사이트를 제공할 예정이다. (사진=옴디아) 또한 최신 디스플레이 시장 기술과 산업, 대형 디스플레이, TV, 모바일 및 기타 사용 사례 등 다양한 범위의 주제를 다룬다. 주요 세션으로는 ▲2024년 디스플레이 10대 주제 ▲2024년 디스플레이 산업전망 ▲2024년 대형 디스플레이 투자 및 FAB 운영 분석 ▲글로벌 스마트폰 시장 분석 및 전망 ▲2024년에 떠오를 디스플레이 – IT OLED, 마이크로 LED 및 트렌스포머블 디스플레이 등이 있다. 김수연 옴디아 이사는 "옴디아는 디스플레이 산업의 복잡성을 헤쳐 나가는 데에 필요한 정보를 제공하기 위해 20년간 연구를 이어왔다"며 "새로운 기술과 시장 현황 등 주요 주제들을 연구 결과에 기반한 발표가 준비되는 만큼, 이번 행사가 역동적으로 변화하는 디스플레이 산업 및 유관 산업 관계자들이 통찰력과 최신 정보를 가장 빠르게 얻어 갈 수 있는 훌륭한 기회가 될 것"이라고 밝혔다.'
    },
    {
      id: 2-1,
      title: "신한은행, 창덕궁에서 '임원 봉사' 실시",
      url: 'https://n.news.naver.com/mnews/article/082/0001259059',
      date: '2024-03-07 13:56:04',
      Bcategory: 101,
      Scategory: 259,
      imageUrl: 'https://mimgnews.pstatic.net/image/origin/082/2024/03/07/1259059.jpg?type=nf220_150',
      content:'지난 6일 서울시 종로구 소재 창덕궁에서 신한은행 정상혁 은행장(가운데)과 임직원들이 새봄맞이 환경정비 봉사활동을 마친 후 기념촬영하는 모습 신한은행은 지난 6일 서울시 종로구 소재 창덕궁에서 새봄맞이 임원봉사활동을 실시했다고 7일 밝혔다. 신한은행 정상혁 은행장과 임직원 30여명은 창덕궁 희정당에서 창호를 개방해 겨우내 쌓인 먼지를 털어내고 바닥을 청소하는 등 새봄맞이 대청소를 실시했다. 신한은행은 전국의 지역본부와 본부부서 임직원들이 다양한 봉사활동에 참여하고 있으며 올해는 ‘다함께 봉사’라는 새로운 컨셉으로 릴레이 봉사 캠페인을 시작했다. ‘다함께 봉사’는 임직원간 서로 독려하는 릴레이 방식으로 ‘봉사활동을 확산하면서 복지 사각지대에 희망을 전하자’는 의지를 담았다. 신한은행은 신한금융그룹의 ‘솔선수범 릴레이 캠페인’에 발맞춰 ‘다함께 봉사’를 통해 ‘ESG 상생 프로젝트’를 꾸준히 실천해 나갈 예정이다. 신한은행 관계자는 “신한은행은 문화재청 궁능유적본부 창덕궁관리소와 함께 창덕궁을 방문하는 관람객을 위한 오디오 가이드 서비스를 2022년부터 제공하고 있다"며 "올해는 ‘창덕궁 후원’ 관람객을 위한 무료 오디오 가이드 서비스 오픈을 준비하고 있다”고 말했다.'
    },
    {
      id: 3-1,
      title: "옴디아, '한국 디스플레이 컨퍼런스' 개최",
      url:'https://n.news.naver.com/mnews/article/092/0002323741',
      date: '2024-03-07 13:47:01',
      Bcategory: 105,
      Scategory: 230,
      imageUrl: 'https://mimgnews.pstatic.net/image/origin/092/2024/03/07/2323741.jpg?type=nf220_150',
      content: '13일 양재 엘타워서 18개 이상 발표 세션 진행 인포마테크(Informa Tech)의 기술 연구 및 자문 그룹 옴디아(Omdia)는 양재 엘타워에서 오는 13, 14일 양일 간 "2024년 상반기 한국 디스플레이 컨퍼런스"를 개최한다고 7일 밝혔다. 이번 행사에서 옴디아 시장 분석 전문가들은 18개 이상의 다양한 발표세션을 통해 세계 디스플레이 산업 동향을 보여줄 수 있는 최신 트렌드와 발전을 위한 인사이트를 제공할 예정이다. (사진=옴디아) 또한 최신 디스플레이 시장 기술과 산업, 대형 디스플레이, TV, 모바일 및 기타 사용 사례 등 다양한 범위의 주제를 다룬다. 주요 세션으로는 ▲2024년 디스플레이 10대 주제 ▲2024년 디스플레이 산업전망 ▲2024년 대형 디스플레이 투자 및 FAB 운영 분석 ▲글로벌 스마트폰 시장 분석 및 전망 ▲2024년에 떠오를 디스플레이 – IT OLED, 마이크로 LED 및 트렌스포머블 디스플레이 등이 있다. 김수연 옴디아 이사는 "옴디아는 디스플레이 산업의 복잡성을 헤쳐 나가는 데에 필요한 정보를 제공하기 위해 20년간 연구를 이어왔다"며 "새로운 기술과 시장 현황 등 주요 주제들을 연구 결과에 기반한 발표가 준비되는 만큼, 이번 행사가 역동적으로 변화하는 디스플레이 산업 및 유관 산업 관계자들이 통찰력과 최신 정보를 가장 빠르게 얻어 갈 수 있는 훌륭한 기회가 될 것"이라고 밝혔다.'
    },
    {
      id: 4-1,
      title: "신한은행, 창덕궁에서 '임원 봉사' 실시",
      url: 'https://n.news.naver.com/mnews/article/082/0001259059',
      date: '2024-03-07 13:56:04',
      Bcategory: 101,
      Scategory: 259,
      imageUrl: 'https://mimgnews.pstatic.net/image/origin/082/2024/03/07/1259059.jpg?type=nf220_150',
      content:'지난 6일 서울시 종로구 소재 창덕궁에서 신한은행 정상혁 은행장(가운데)과 임직원들이 새봄맞이 환경정비 봉사활동을 마친 후 기념촬영하는 모습 신한은행은 지난 6일 서울시 종로구 소재 창덕궁에서 새봄맞이 임원봉사활동을 실시했다고 7일 밝혔다. 신한은행 정상혁 은행장과 임직원 30여명은 창덕궁 희정당에서 창호를 개방해 겨우내 쌓인 먼지를 털어내고 바닥을 청소하는 등 새봄맞이 대청소를 실시했다. 신한은행은 전국의 지역본부와 본부부서 임직원들이 다양한 봉사활동에 참여하고 있으며 올해는 ‘다함께 봉사’라는 새로운 컨셉으로 릴레이 봉사 캠페인을 시작했다. ‘다함께 봉사’는 임직원간 서로 독려하는 릴레이 방식으로 ‘봉사활동을 확산하면서 복지 사각지대에 희망을 전하자’는 의지를 담았다. 신한은행은 신한금융그룹의 ‘솔선수범 릴레이 캠페인’에 발맞춰 ‘다함께 봉사’를 통해 ‘ESG 상생 프로젝트’를 꾸준히 실천해 나갈 예정이다. 신한은행 관계자는 “신한은행은 문화재청 궁능유적본부 창덕궁관리소와 함께 창덕궁을 방문하는 관람객을 위한 오디오 가이드 서비스를 2022년부터 제공하고 있다"며 "올해는 ‘창덕궁 후원’ 관람객을 위한 무료 오디오 가이드 서비스 오픈을 준비하고 있다”고 말했다.'
    },
  ]
  
  const [loading, setLoading] = useState(true)
  const [fetching, setFetching] = useState(false)
  // const [categoryDatas, setCategoryDatas] = useRecoilState(categoryDataState)
  const [categoryDatas, setCategoryDatas] = useState([])
  // const [categoryPaging, setCategoryPaging] = useState({ next: undefined }); // API로부터 받아온 다음 페이지 데이터를 저장
  const [categoryPaging, setCategoryPaging] = useState([]); // API로부터 받아온 다음 페이지 데이터를 저장

  // category 별 데이터 불러오기
  useEffect(() => {

    setLoading(true)

    // getCategoryNews(
    //   101,
    //   ({ response }) => {
    //     setCategoryDatas(response.data.data)
    //     setCategoryPaging(response.data.paging)
    //   },
    //   (error) => {
    //     console.log(error)
    //   }
    // )

    setCategoryDatas(sampleDatas)

    setLoading(false)
  },[])

  // // 페이지 끝에 닿으면 추가 데이터 불러오기
  function fetchMoreDatas() {
    setFetching(true)

    // getPagingNews(
    //   101,
    //   ({ response }) => {
    //     const fetchedData = response.data.data
    //     const mergedData = categoryDatas.concat(...fetchedData)
    //     setCategoryDatas(mergedData)
    //   },
    //   (error) => {
    //     console.log(error)
    //   }
    // )

    const fetchedData = samplePaging
    const mergedData = categoryDatas.concat(...fetchedData)
    setCategoryDatas(mergedData)
    // setFetching(false)
  }

  // // 스크롤 이벤트 핸들러
  function handleScroll() {
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop = document.documentElement.scrollTop;
  const clientHeight = document.documentElement.clientHeight;
  if (scrollTop + clientHeight >= scrollHeight && fetching === false) {
    // 페이지 끝에 도달 -> 추가 데이터
    fetchMoreDatas();
  }};

  useEffect(() => {
    // scroll event listener 등록
    window.addEventListener("scroll", handleScroll);
    return () => {
      // scroll event listener 해제
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <CategoryNewsCardContainer>
      {categoryDatas.map((categoryData) => (
        <CategoryNewsCard
          key={`${categoryData.id}-${categoryData.title}`}
          categoryData={categoryData}
        />
      ))}
    </CategoryNewsCardContainer>
  )
}