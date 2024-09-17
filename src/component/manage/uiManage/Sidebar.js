import styled from "@emotion/styled/macro";

const Contain = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px;
  max-width: 100%;
  height: 100vh;
  background-color: #eae7e6;
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
  flex: 1; /* ใช้พื้นที่ที่เหลือทั้งหมดเพื่อให้ ProfileTag และ LogoutButton อยู่ที่ด้านล่าง */
`;

const DivButton = styled.div`
  display: flex;
  background-color: ${(props) => props.focus};
  color: ${(props) => props.focus && "#ffffff"};
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
`;

const Icon = styled.img`
  height: 20px;
  margin-right: 5px;
`;

const BottomMenu = styled.div`
  width: fit-content;
  padding: 1px;
  height: -webkit-fill-available;
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
  margin-top: auto; /* ให้พื้นที่ว่างด้านบน */
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

function Sidebars() {
  const menu = [
    {
      path: "?profile",
      name: "แก้ไขโปรไฟล์",
      icon: "/caticon.png",
    },
    {
      path: "?catData",
      name: "ข้อมูลแมว",
      icon: "/heart_3319163.png",
    },
    {
      path: "?notiVacine",
      name: "แจ้งเตือนการฉีดวัคซีน",
      icon: "/foodicon.png",
    },
    {
      path: "?note",
      name: "สมุดบันทึก",
      icon: "/medicon.png",
    },
  ];

  const handleLogoClick = () => {
    window.location.href = "/";
  };

  const handleLogout = () => {
    // ลอคเอาท์จากระบบ
    console.log("Logout");
  };

  return (
    <Contain>
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
            <Icon src={process.env.PUBLIC_URL + data.icon} />
            <BottomMenu>{data.name}</BottomMenu>
          </DivButton>
        ))}
      </DivMenu>
      <BottomSection>
        <ProfileTag>Tag ID: 12345</ProfileTag>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </BottomSection>
    </Contain>
  );
}

export default Sidebars;
