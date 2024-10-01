import styled from "@emotion/styled/macro";
import AdminSidebars from "./uiAdmin/adminSidebar";
import AdminCatData from "./catData";
import AddEditDataCat from "./editDataCat";
import BlogDataAdd from "./blogList/addBlogData";
import BlogDataList from "./blogListData/blogListData";
import { sessionService } from "redux-react-session";
import { useState } from "react";
const Contain = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #71a9db;
  display: flex;
`;

const DivSidebar = styled.div`
  width: 15%;
`;

const DivBody = styled.div`
  width: 85%;
`;
function ManageAdmin() {
  const [type, setType] = useState(0);

  sessionService
    .loadUser()
    .then((data) => {
      if (data.type === undefined) {
        setType(0);
      } else {
        setType(data.type);
      }
    })
    .catch((err) => {
      window.location.href = "/";
    });

  return (
    <Contain>
      {type === 1 && (
        <>
          <DivSidebar>
            <AdminSidebars />
          </DivSidebar>
          <DivBody>
            {window.location.search === "?cat-data-list" && <AdminCatData />}
            {window.location.search === "?add-edit-data-cat" && (
              <AddEditDataCat />
            )}
            {window.location.search === "?blog-data-list" && <BlogDataList />}
            {(window.location.search === "?blogCatData" ||
              (window.location.search.split("&").length === 2 &&
                window.location.search.split("&")[1]?.indexOf("id") === 0)) && (
              <BlogDataAdd />
            )}
          </DivBody>
        </>
      )}
    </Contain>
  );
}

export default ManageAdmin;
