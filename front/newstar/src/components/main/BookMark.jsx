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
  gap: 1px;

  font-size: 13px;
`

const BookMarkImage = styled.img`
  width: 25%;
  // 왼상 오상 오하 왼하
  border-radius: 0 8px 8px 0;
`

// 뉴스 북마크
export default function BookMark({ newsData }) {
  return (
    <BookMarkWrapper>
      <BookMarkInfo>
        <div>{newsData.title}</div>
        <div style={{color: 'gray'}}>{newsData.content}</div>
        <div style={{color: 'gray'}}>{newsData.url}</div>
      </BookMarkInfo>
      <BookMarkImage src={newsData.image_url} alt="news image" />
    </BookMarkWrapper>
  )
}