import styled from "styled-components"

const BookMarkWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  border: 0.5px solid gray;
  border-radius: 8px;
  width: 100%;
  height: 90px;
`

const BookMarkInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  white-space: nowrap; 
  overflow: hidden;
  padding: 20px;
  width: 75%;

  font-size: 13px;
`

const BookMarkImage = styled.img`
  width: 25%;
  // 왼상 오상 오하 왼하
  border-radius: 0 8px 8px 0;
`

// 뉴스 북마크
export default function BookMark({ recommendData }) {
  return (
    <BookMarkWrapper>
      <BookMarkInfo>
        <div>{recommendData.title}</div>
        <div style={{color: 'gray'}}>{recommendData.content}</div>
        <div style={{color: 'gray'}}>{recommendData.url}</div>
      </BookMarkInfo>
      <BookMarkImage src={recommendData.imageUrl} alt="news image" />
    </BookMarkWrapper>
  )
}