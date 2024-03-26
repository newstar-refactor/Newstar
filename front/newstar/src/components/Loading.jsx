import styled from "styled-components"
import Lottie from "lottie-react"
import loading from "../assets/lottie/loading.json"

const LoadingBox = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default function Loading() {
  return (
    <LoadingBox>
      <Lottie 
          animationData={loading}
          style={{ width: 'auto', height: '250px' }} />
      <div style={{fontSize: '20px', fontWeight: 'bold'}}>로딩중 입니당</div>
    </LoadingBox>
  )
}