import React from "react";
import styled from "@emotion/styled/macro";
import CatListUser from "./userCatList";

const Container = styled.div`
  width: 100%;
  padding: 25px 60px;
`;

function ListCatUser() {
  return (
    <Container>
      <CatListUser />
    </Container>
  );
}

export default ListCatUser;
