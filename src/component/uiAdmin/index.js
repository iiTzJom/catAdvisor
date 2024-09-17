import styled from "@emotion/styled/macro";
import AdminSidebars from "./adminSidebar";
import AdminManage from "../admin/adminPages";
import BlogDataAdd from "../admin/addBlogData";

const Contain = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #1860c3;
  display: flex;
`;

const DivSidebar = styled.div`
  width: 15%;
`;

const DivBody = styled.div`
  width: 85%;
`;
function ManageAdmin() {
  return (
    <Contain>
      <DivSidebar>
        <AdminSidebars />
      </DivSidebar>
      <DivBody>
        {window.location.search === "?adminPageManage" && <AdminManage />}
        {window.location.search === "?blogCatData" && <BlogDataAdd />}
      </DivBody>
    </Contain>
  );
}

export default ManageAdmin;
