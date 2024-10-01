import styled from "@emotion/styled/macro";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState, useCallback } from "react";
import LoginModal from "../component/auth/Login";
import RegisterModal from "../component/auth/Register";
import ForgetPassword from "../component/auth/ForgetPass";
import { sessionService } from "redux-react-session";

const Contain = styled.div`
  padding-left: 240px;
  padding-right: 240px;
  max-width: 100%;
  height: 100%;
  background-color: #1860c3;
`;

const PopupBody = styled.div`
  left: -160px;
  top: 30px;
  position: absolute;
  background-color: #ffffff;
  color: #000000;
  width: 150px;
  padding: 12px 16px;
  margin: 8px;
  font-size: 20px;
  border-radius: 8px;
  z-index: 1;
`;

const DivNavbar = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
`;

const NavbarLeft = styled.div`
  width: 20%;
  padding-top: 10px;
  color: #ffffff;
  cursor: pointer;
`;

const NavbarRight = styled.div`
  width: 80%;
  padding-top: 10px;
  display: flex;
  justify-content: end;
`;

const DivIcon = styled.div`
  margin-left: 40px;
  color: #ffffff;
  cursor: pointer;
  position: relative;
`;

const TextMenu = styled.div`
  cursor: pointer;
  &:hover {
    color: #ffbf6b; /* เปลี่ยนสีเมื่อเมาส์วาง */
  }
  width: 150px;
`;

const DivMenu = styled.div`
  width: fit-content;
  padding: 1px;
  margin-left: 40px;
  height: -webkit-fill-available;
  color: #ffffff;
  cursor: pointer;

  &:hover {
    color: #ffbf6b; /* เปลี่ยนสีเมื่อเมาส์วาง */
  }
`;

function Navbar() {
  // const [dataDetaiil, setDataDetail] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [isForgetPassword, setIsForgetPassword] = useState(false);

  const menu = [
    { text: "หน้าหลัก", path: "/" },
    { text: "สายพันธุ์แมว", path: "/cat-breeds-list" },
    { text: "เปรียบเทียบสายพันธุ์", path: "/cat-compare" },
    { text: "ความรู้ทั่วไป", path: "/blogs" },
    { text: "แผนที่", path: "/map" },
  ];
  const handleCloseLogin = useCallback(() => {
    setIsOpenLogin(false);
  }, []);
  const handleOpenRegister = useCallback(() => {
    setIsOpenLogin(false);
    setIsOpenRegister(true);
    setIsForgetPassword(false);
  }, []);
  const handleClose = useCallback(() => {
    setIsOpenLogin(false);
    setIsOpenRegister(false);
    setIsForgetPassword(false);
  }, []);
  const handleOpenForgetPassword = useCallback(() => {
    setIsForgetPassword(true);
    setIsOpenRegister(false);
    setIsOpenLogin(false);
  }, []);
  const handleBackToLogin = useCallback(() => {
    setIsOpenLogin(true);
    setIsOpenRegister(false);
    setIsForgetPassword(false);
  }, []);

  const [type, setType] = useState(0);

  sessionService
    .loadUser()
    .then((data) => {
      if (data.type === undefined) {
        setType(0);
      } else {
        setType(data.type);
      }
      if (
        window.location.pathname.toLocaleUpperCase() === "/MANAGE" &&
        (data.type !== 2 || !data.type)
      ) {
        window.location.href = "/";
      } else if (
        window.location.pathname.toLocaleUpperCase() === "/ADMIN" &&
        (data.type !== 1 || !data.type)
      ) {
        window.location.href = "/";
      }
    })
    .catch((err) => {
      window.location.href = "/";
    });

  return (
    <Contain>
      <DivNavbar>
        <NavbarLeft onClick={() => (window.location.href = "/")}>
          CAT ADVISOR
        </NavbarLeft>
        <NavbarRight>
          {menu.map((data, i) => (
            <DivMenu onClick={() => (window.location.href = data.path)}>
              {data.text}
            </DivMenu>
          ))}
          <DivIcon>
            <AccountCircleIcon onClick={() => setIsOpen(true)} />
            {isOpen && (
              <PopupBody onMouseLeave={() => setIsOpen(false)}>
                {type === 0 && (
                  <TextMenu onClick={() => setIsOpenLogin(true)}>
                    Login
                  </TextMenu>
                )}
                {type === 1 && (
                  <TextMenu
                    onClick={() =>
                      (window.location.href = "/Admin?cat-data-list")
                    }
                  >
                    Admin
                  </TextMenu>
                )}
                {type === 2 && (
                  <TextMenu
                    onClick={() => (window.location.href = "/Manage?profile")}
                  >
                    Manage
                  </TextMenu>
                )}
              </PopupBody>
            )}
          </DivIcon>
        </NavbarRight>
      </DivNavbar>
      <LoginModal
        open={isOpenLogin}
        close={handleCloseLogin}
        register={handleOpenRegister}
        forgetpassword={handleOpenForgetPassword}
      />
      <RegisterModal open={isOpenRegister} close={handleClose} />
      <ForgetPassword
        open={isForgetPassword}
        close={handleClose}
        backtologin={handleBackToLogin}
      />
    </Contain>
  );
}

export default Navbar;
