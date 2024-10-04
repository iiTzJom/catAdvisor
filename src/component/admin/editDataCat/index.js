import React from "react";
import styled from "@emotion/styled/macro";
import ManageDataCat from "./manageData";
const Container = styled.div`
  display: flex;
  background-color: #71a9db; /* Background of main page */
  height: 100vh;
`;
function AddEditDataCat({ name }) {
  return (
    <Container>
      <ManageDataCat name={name} />
    </Container>
  );
}
export default AddEditDataCat;
