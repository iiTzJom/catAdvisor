import styled from "@emotion/styled/macro";
import ListCatBreed from "./ListCatBreed";

const Contain = styled.div`
  max-width: 100%;
  padding: 40px 240px;
  background-color: #efe7d0;
`;

function CatBreed() {
  return (
    <Contain>
      <ListCatBreed />
    </Contain>
  );
}

export default CatBreed;
