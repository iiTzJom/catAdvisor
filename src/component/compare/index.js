import styled from "@emotion/styled/macro";
import CompareCat from "./CatCompare";
const Contain = styled.div`
  max-width: 100%;
  padding: 40px 240px;
`;

function CatBreed() {
  return (
    <Contain>
      <CompareCat />
    </Contain>
  );
}

export default CatBreed;
