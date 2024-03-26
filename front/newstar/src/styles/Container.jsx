import styled from 'styled-components';


// 전체 페이지
const TotalContainer = styled.div`
  height: 100vh;
`

// 네브바 없는 페이지
const ContainerWithoutNav = styled.main`
  right: 0;
  left: 0;
  position: relative;
  max-width: 500px;
  margin: 0px auto;
  height: 100vh;
  padding: 20px 20px 60px;
`;

// 네브바 있는 페이지
const ContainerWithNav = styled.main`
  position: relative;
  right: 0;
  left: 0;
  top: 0;

  max-width: 500px;
  min-width: 280px;
  margin: 0px auto;
  height: calc(100vh - 50px);

  overflow-y: auto;
`


export { ContainerWithNav, ContainerWithoutNav, TotalContainer }
