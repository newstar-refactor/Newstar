// 키워드 태그
import styled from 'styled-components'

const TagWrapper = styled.div`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: ${(props) => props.fontSize || "1rem"};
  line-height: 1.5;
  // border: 1px solid lightgray;

  color: ${(props) => props.color || "white"};
  background: ${(props) => props.$background || "lightgray"};

  cursor: pointer;
`

export default function Tag({ children, color, $background, onClick, fontSize }) {
  return (
    <TagWrapper 
      color={color} 
      fontSize={fontSize}
      $background={$background}
      onClick={onClick}
      >
      {children}
    </TagWrapper>
  )
}