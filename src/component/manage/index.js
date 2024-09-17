import styled from "@emotion/styled/macro";
import Sidebars from "./uiManage/Sidebar";
import UsersProfile from "./profile/userProfile";
import DataCats from "./catData/dataCat";
import CatVacine from "./notiVacine/vacine";
import CatNote from "./note/noteCat";

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
  background-color: #71a9db;
`;
function Manage() {
  return (
    <Contain>
      <DivSidebar>
        <Sidebars />
      </DivSidebar>
      <DivBody>
        {window.location.search === "?profile" && <UsersProfile />}
        {window.location.search === "?catData" && <DataCats />}
        {window.location.search === "?notiVacine" && <CatVacine />}
        {window.location.search === "?note" && <CatNote />}
      </DivBody>
    </Contain>
  );
}

export default Manage;
