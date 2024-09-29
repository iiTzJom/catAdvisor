import styled from "@emotion/styled/macro";

const Contain = styled.div`
  max-width: 100%;
  display: flex;
  justify-content: center;
  min-height: 440px;
  position: relative;
`;

function Forbidden() {
  return <Contain>403</Contain>;
}

export default Forbidden;
