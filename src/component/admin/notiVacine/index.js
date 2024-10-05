import React from "react";
import styled from "@emotion/styled/macro";
import NotiVacineList from "./notiVacineList";
const Container = styled.div`
  display: flex;
  background-color: #71a9db; /* Background of main page */
  height: 100vh;
`;
function NotiVacinePage({ name }) {
  return (
    <Container>
      <NotiVacineList />
    </Container>
  );
}
export default NotiVacinePage;
