// 선호 키워드 선택 페이지
// 초기 추천을 위한 키워드를 선택
// 키워드 선택 후, 회원가입 완료
import { useState, useEffect } from 'react'
import { useSetRecoilState } from 'recoil';
import { userKeyState } from '../state/atoms';
import styled from 'styled-components';

import { FaRegChartBar } from "react-icons/fa";
import { RiGovernmentLine } from "react-icons/ri";
import { RiComputerLine } from "react-icons/ri";

import { postMembers } from '../api/fetch';
import SelectBox from '../common/SelectBox'
import NextButton from '../common/Button';

import QRModal from '../components/QR';


const SelectBoxWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
`

const KeywordPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 60px;
`
const KeywordPageHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`

const KeywordPageButton = styled.div`
   display: flex;
   justify-content: end;
   height: 35px;
`

const BigKeyWords = [
  { 
    'id': 100,
    'keyword': '정치',
    'state': false
  }, 
  {
    'id': 101,
    'keyword': '경제',
    'state': false
  }, 
  { 
    'id': 105,
    'keyword': 'IT/과학',
    'state': false
  }]


function Keywords({ tagsActive, setTagsActive }) {

  // 클릭 시 색 변화
  function handleTagClick(clickedKeyword) {
    const updatedTags = tagsActive.map((tag) =>
      tag.keyword === clickedKeyword.keyword
        ? { ...tag, state: !tag.state } : tag
    )
    setTagsActive(updatedTags)
  }

  // 아이콘을 선택하는 함수
  function selectIcon(keyword)  {
    switch(keyword) {
        case '정치':
            return <RiGovernmentLine size={20} />;
        case '경제':
            return <FaRegChartBar size={20} />;
        case 'IT/과학':
            return <RiComputerLine size={20} />;
        default:
            return ;
    }
  };

  return (
    <SelectBoxWrapper>
      
      {tagsActive.map((bigkeyword) => (
        <SelectBox 
          key={bigkeyword.id}
          $background={bigkeyword.state ? 'rgb(138, 192, 56, 0.7)' : ''}
          color={bigkeyword.state ? 'black' : ''}
          onClick={() => handleTagClick(bigkeyword)}
          >
          {selectIcon(bigkeyword.keyword)}
          {bigkeyword.keyword}
        </SelectBox>
      ))}
    </SelectBoxWrapper>
  )
}


function ChooseKeyword() {

  // userKey 상태 관리
  const setUserKey = useSetRecoilState(userKeyState)

  // 모달 창 상태 관리
  const [modalOpen, setModalOpen] = useState(false)
  

  // 각 키워드 상태 관리
  const [tagsActive, setTagsActive] = useState(BigKeyWords)

  // 선택된 키워드 상태 관리
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  // 클릭 시 키워드 담기
  useEffect(() => {
    const newSelectedKeywords = tagsActive.filter(word => word.state).map(word => word.id);
    setSelectedKeywords(newSelectedKeywords);
  }, [tagsActive]);


  // 새로운 user 진입 시 key 값 로컬스토리지에 저장
  function handleCreateMember() {
    postMembers(
      { "categories" : selectedKeywords },
      ( response ) => {

        // 응답으로 받은 key
        const key = response?.data.data.pw
        
        if (!localStorage.getItem('X-USER-ID')) {
          localStorage.setItem('X-USER-ID', key)
          setUserKey(key)
          console.log('새로운 회원이 등록되었습니다.')
        } else {
          console.log('이미 등록된 회원입니다.')
        }
      },
      (error) => {
        console.log(error)
      }
      )
      setModalOpen(!modalOpen)
  }

  const newKey = localStorage.getItem('X-USER-ID')
  return (
    <KeywordPageWrapper>
      <KeywordPageHeader>
        <img 
          src="/logo_dark.png"
          alt="logo"
          width="100px"
          />
        <h3>선호하는 분야를 선택해주세요 !</h3>
      </KeywordPageHeader>
      <Keywords
        tagsActive={tagsActive}
        setTagsActive={setTagsActive}
      />
      <KeywordPageButton>
        { selectedKeywords.length > 0 && <NextButton 
          onClick={handleCreateMember} 
          $background={"lightgray"}
          content={"다음"}/> }
      </KeywordPageButton>
      <QRModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </KeywordPageWrapper>
  )
}

export default ChooseKeyword