import React from "react";
import BlogDataAdd from "./addBlogData";
import styled from "@emotion/styled/macro";

const Container = styled.div`
  display: flex;
  background-color: #71a9db; /* Background of main page */
  height: 100vh;
  max-width: 100%;
`;

function AdminBlogData() {
  return (
    <Container>
      <BlogDataAdd />
    </Container>
  );
}

export default AdminBlogData;
