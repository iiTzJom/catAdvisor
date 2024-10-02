import styled from "@emotion/styled/macro";
import Sidebars from "./uiManage/Sidebar";
import UsersProfile from "./profile/userProfile";
import DataCats from "./catData/dataCat";
import CatVacine from "./notiVacine/vacine";
import CatNote from "./note/noteCat";
import { sessionService } from "redux-react-session";
import { useState } from "react";

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
  const [type, setType] = useState(0);
  const [name, setName] = useState("");
  sessionService
    .loadUser()
    .then((data) => {
      if (data.type === undefined) {
        setType(0);
      } else {
        setType(data.type);
        setName(data.userName);
      }
    })
    .catch((err) => {
      //window.location.href = "/";
    });

  return (
    <Contain>
      {type === 2 && (
        <>
          <DivSidebar>
            <Sidebars />
          </DivSidebar>
          <DivBody>
            {window.location.search === "?profile" && (
              <UsersProfile name={name} />
            )}
            {window.location.search === "?catData" && <DataCats name={name} />}
            {window.location.search === "?notiVacine" && <CatVacine />}
            {window.location.search === "?note" && <CatNote />}
          </DivBody>
        </>
      )}
    </Contain>
  );
}

export default Manage;
