import styled from "@emotion/styled/macro";
import AdminSidebars from "./uiAdmin/adminSidebar";
import AdminCatData from "./catData";
import AddEditDataCat from "./editDataCat";
import BlogDataAdd from "./blogList/addBlogData";
import BlogDataList from "./blogListData/blogListData";
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
        {window.location.search === "?cat-data-list" && <AdminCatData />}
        {window.location.search === "?add-edit-data-cat" && <AddEditDataCat />}
        {window.location.search === "?blog-data-list" && <BlogDataList />}
        {window.location.search === "?blogCatData" && <BlogDataAdd />}
      </DivBody>
    </Contain>
  );
}

export default ManageAdmin;
