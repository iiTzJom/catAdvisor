import styled from "@emotion/styled/macro";

const Contain = styled.div`
  max-width: 100%;
  height: 100%;
  padding-top: 40px;
  padding-left: 240px;
  padding-right: 240px;
  background-color: #71a9db;
  color: #ffffff;
`;

const DivCopyRight = styled.div`
  width: 100%;
  margin-top: 40px;
  padding-bottom: 10px;
  text-align: center;
  color: #ffffff;
`;

const DivFooter = styled.div`
  width: 100%;
  display: flex;
`;

const DivAbout = styled.div`
  width: 25%;
`;

const DivContact = styled.div`
  width: 25%;
`;

const DivLogo = styled.div`
  width: 50%;
  font-size: 96px;
  text-align: end;
  padding-top: 110px;
`;

const DivText = styled.div`
  margin-top: 20px;
  &:hover {
    color: #ffbf6b; /* เปลี่ยนสีเมื่อเมาส์วาง */
  }
  cursor: pointer;
`;

const DivTextContact = styled.div`
  margin-top: 20px;
`;

const Divtittle = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const LogoCat = styled.img`
  width: 180px;
  margin-top: 20px;
`;

function Footer() {
  const menu = [
    { text: "หน้าหลัก", path: "/" },
    { text: "สายพันธุ์แมว", path: "/cat-breeds-list" },
    { text: "เปรียบเทียบสายพันธุ์", path: "cat-compare" },
    { text: "ความรู้ทั่วไป", path: "/blogs" },
    { text: "แผนที่", path: "/map" },
  ];

  return (
    <Contain>
      <DivFooter>
        <DivAbout>
          <Divtittle>เกี่ยวกับเรา</Divtittle>
          {menu.map((data, i) => (
            <DivText onClick={() => (window.location.href = data.path)}>
              {data.text}
            </DivText>
          ))}
        </DivAbout>
        <DivContact>
          <Divtittle>ติดต่อ</Divtittle>
          <DivTextContact>
            123 Cat Street, Meowtown <br />
            <br />
            Email: info@catadvisor.com <br />
            <br />
            Phone: 123-456-7890
          </DivTextContact>
          <LogoCat src={process.env.PUBLIC_URL + "CatAdvisorLogo.png"} />
        </DivContact>
        <DivLogo>CAT ADVISOR</DivLogo>
      </DivFooter>
      <DivCopyRight>Powered by :</DivCopyRight>
    </Contain>
  );
}

export default Footer;
