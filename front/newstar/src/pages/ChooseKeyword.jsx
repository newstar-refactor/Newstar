// 선호 키워드 선택 페이지
// 초기 추천을 위한 키워드를 선택
// 키워드 선택 후, 회원가입 완료
import { useState } from 'react'
import { RiGovernmentLine } from "react-icons/ri";
import { AiOutlineStock } from "react-icons/ai";
import { RiComputerLine } from "react-icons/ri";

import Tag from '../common/Tag'


function Keywords() {

  const BigKeyWords = [
    {
      'keyword': '정치',
      'state': false
    }, 
    {
      'keyword': '경제',
      'state': false
    }, 
    { 
      'keyword': 'IT/과학',
      'state': false
    }]

  // 각 키워드 상태 관리
  const [tagsActive, setTagsActive] = useState(BigKeyWords)
  console.log(tagsActive)

  // 클릭 시 색 변화
  function handleTagClick(clickedKeyword) {
    const updatedTags = tagsActive.map((tag) =>
      tag.keyword === clickedKeyword.keyword
        ? { ...tag, state: !tag.state } : tag
    )
    setTagsActive(updatedTags)
  }


  return (
    <div>
      {tagsActive.map((bigkeyword, idx) => (
        <Tag 
          key={idx}
          $background={bigkeyword.state ? 'gray' : ''}
          onClick={() => handleTagClick(bigkeyword)}
          >{bigkeyword.keyword}</Tag>
      ))}
    </div>
  )
}

function ChooseKeyword() {
  return (
    <div>
      <h3>선호하는 분야를 선택해주세요 !</h3>
      <Keywords/>
    </div>
  )
}

export default ChooseKeyword