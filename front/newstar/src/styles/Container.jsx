import styled from 'styled-components';

// 네브바 없는 페이지
const ContainerWithoutNav = styled.main`
  right: 0;
  left: 0;
  position: relative;
  max-width: 500px;
  min-width: 300px;
  margin: 100px auto;
`;

// 네브바 있는 페이지
const ContainerWithNav = styled.div`
  right: 0;
  left: 0;
  position: relative;
  max-width: 500px;
  min-width: 300px;
  margin: 7vh auto;
`

export { ContainerWithNav, ContainerWithoutNav }
