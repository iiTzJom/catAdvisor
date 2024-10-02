import styled from "@emotion/styled/macro";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PetsIcon from "@mui/icons-material/Pets";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NoteIcon from "@mui/icons-material/Note";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/action/userActions";
import { useState } from "react";
import { sessionService } from "redux-react-session";
const Contain = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  height: 100vh;
  background-color: #eae7e6;
  position: relative;
`;

const ContainInside = styled.div`
  padding: 25px;
`;

const Header = styled.div`
  display: flex;
  align-items: center; /* จัดให้อยู่กลางตามแนวแกน Y */
  margin-bottom: 20px;
`;

const DivPicAbout = styled.img`
  width: 50px; /* ความกว้างของรูปภาพ */
  height: 50px; /* ความสูงของรูปภาพ */
  cursor: pointer;
  margin-right: 10px; /* เพิ่มระยะห่างระหว่างโลโก้และข้อความ */
`;

const TextSide = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const DivMenu = styled.div`
  margin-top: 20px;
  flex: 1; /* ใช้พื้นที่ที่เหลือทั้งหมด */
`;

const DivButton = styled.div`
  display: flex;
  background-color: ${(props) => props.focus};
  color: ${(props) => props.focus && "#ffffff"};
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  align-items: center; /* จัดให้อยู่กลางตามแนวแกน Y */
`;

const BottomMenu = styled.div`
  width: fit-content;
  padding: 1px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  padding-left: 5px;
`;

// เพิ่ม styled components ใหม่
const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* จัดตำแหน่งให้อยู่กึ่งกลางแนวนอน */
  margin-top: 450px; /* ให้พื้นที่ว่างด้านบน */
  margin-bottom: 20px; /* เว้นระยะห่างจากด้านล่าง */
`;

const ProfileIcon = styled(AccountCircleIcon)`
  font-size: 60px !important;
  color: #ccc;
  margin-bottom: 10px;
`;

const ProfileTag = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px; /* เพิ่มระยะห่างระหว่าง ProfileTag และ LogoutButton */
`;

const LogoutButton = styled.div`
  background-color: #ff4d4d;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: #cc0000;
  }
`;
const DivProfile = styled.img`
  width: 50px; /* ความกว้างของรูปภาพ */
  height: 50px; /* ความสูงของรูปภาพ */
  cursor: pointer;
  margin-right: 10px; /* เพิ่มระยะห่างระหว่างโลโก้และข้อความ */
  border-radius: 100%;
`;

function Sidebars() {
  const dispatch = useDispatch();
  const [name, setName] = useState(null);
  const [imgProfile, setImgProfile] = useState(null);
  sessionService
    .loadUser()
    .then((data) => {
      setName(data.firstName + " " + data.lastName);
      setImgProfile(data.imgProfile);
    })
    .catch((err) => {
      //window.location.href = "/";
    });

  const menu = [
    {
      path: "?profile",
      name: "แก้ไขโปรไฟล์",
      icon: <AccountCircleIcon />,
    },
    {
      path: "?catData",
      name: "ข้อมูลแมว",
      icon: <PetsIcon />,
    },
    {
      path: "?notiVacine",
      name: "แจ้งเตือนการฉีดวัคซีน",
      icon: <NotificationsIcon />,
    },
    {
      path: "?note",
      name: "สมุดบันทึก",
      icon: <NoteIcon />,
    },
  ];

  const handleLogoClick = () => {
    window.location.href = "/";
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    window.location.href = "/";
  };

  return (
    <Contain>
      <ContainInside>
        <Header>
          <DivPicAbout
            src={process.env.PUBLIC_URL + "/CatAdvisorLogo.png"}
            onClick={handleLogoClick}
          />
          <TextSide>CAT ADVISOR</TextSide>
        </Header>
        <DivMenu>
          {menu.map((data, i) => (
            <DivButton
              key={i}
              focus={window.location.search === data.path && "#1860C3"}
              onClick={() => (window.location.href = "/Manage" + data.path)}
            >
              {data.icon}
              <BottomMenu>{data.name}</BottomMenu>
            </DivButton>
          ))}
        </DivMenu>
        <BottomSection>
          {imgProfile !== "" ? (
            <DivProfile src={imgProfile} />
          ) : (
            <ProfileIcon />
          )}

          <ProfileTag>{name}</ProfileTag>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </BottomSection>
      </ContainInside>
    </Contain>
  );
}

export default Sidebars;
