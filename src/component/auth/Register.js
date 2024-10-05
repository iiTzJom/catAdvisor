import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import styled from "@emotion/styled/macro";
import TextField from "@mui/material/TextField";
import { register } from "../../api/auth";
import CircularProgress from "@mui/material/CircularProgress";

const style = {
  position: "absolute",
  width: "1100px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
};

const DivLoading = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  z-index: 100;
`;
const Login = styled.div`
  display: flex;
  width: 100%;
  height: auto;
`;

const LoginLeft = styled.div`
  width: 50%;
  background-color: #1860c3;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 500px;
`;

const ImgLogoLeft = styled.img`
  width: 300px;
  height: auto;
  margin-bottom: 20px;
`;

const LoginTitle = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 36px;
  color: #ffffff;
  margin-top: 20px;
`;

const LoginDcs = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  color: #ffffff;
`;

const LoginRight = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

const LoginText = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 36px;
  margin-bottom: 40px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%; /* Ensure form takes the full width */
`;

const StyledTextField = styled(TextField)`
  width: 90%; /* Set width to 90% to fit nicely within the modal */
  margin-bottom: 20px;
`;

const NameFields = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
  width: 90%; /* Ensure name fields also take 90% of the width */
`;

const NameTextField = styled(TextField)`
  width: 100%; /* Make sure each name field takes its full space */
`;

const LoginButton = styled.div`
  font-size: 20px;
  width: 300px;
  color: #000000;
  background-color: #ffbf6b;
  padding: 10px 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 40px;
  text-align: center;
  &:hover {
    opacity: 0.7;
  }
  cursor: pointer;
`;

function RegisterModal({ open, close }) {
  const [dataRegister, setDataRegister] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userName: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isAlert, setIsAlert] = useState(null);
  const [isRegis, setIsRegis] = useState(false);
  const [message, setMessage] = useState("");
  const handleRegister = () => {
    if (dataRegister.firstName === "") {
      setIsAlert("firstName");
    } else if (dataRegister.lastName === "") {
      setIsAlert("lastName");
    } else if (dataRegister.email === "") {
      setIsAlert("email");
    } else if (dataRegister.password === "") {
      setIsAlert("password");
    } else if (dataRegister.confirmPassword === "") {
      setIsAlert("confirmPassword");
    } else if (dataRegister.userName === "") {
      setIsAlert("userName");
    } else {
      if (dataRegister.password === dataRegister.confirmPassword) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (re.test(String(dataRegister.email).toLowerCase())) {
          setIsLoading(true);
          register(dataRegister)
            .then((value) => {
              if (value.data.code == 200) {
                //modal สมัครสมาชิกสำเร็จ กรุณายืนยันการสมัครสมาชิกที่อีเมลของท่าน
                setIsLoading(false);
                setIsRegis(true);
                setMessage(value.data.message);
              }
            })
            .catch((err) => err);
        } else {
          setIsAlert("emailFail");
        }
      } else {
        setIsAlert("passwordFail");
      }
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Login>
            {isLoading && (
              <DivLoading>
                <CircularProgress />
              </DivLoading>
            )}
            <LoginLeft>
              <ImgLogoLeft src={process.env.PUBLIC_URL + "/whitelogo.png"} />
              <LoginTitle>ยินดีต้อนรับ</LoginTitle>
              <LoginDcs>
                สร้างบัญชีของคุณเพื่อรับข่าวสารและข้อมูลที่ดีที่สุดเกี่ยวกับแมว
              </LoginDcs>
            </LoginLeft>
            <LoginRight>
              {isRegis ? (
                <>
                  {message === "This username has been registed"
                    ? "Usernameนี้มีอยู่ในระบบ กรุณาสร้างUsernameใหม่อีกครั้ง"
                    : "สมัครสมาชิกสำเร็จ กรุณายืนยันการสมัครสมาชิกที่อีเมลของท่าน"}
                </>
              ) : (
                <>
                  <LoginText>สมัครสมาชิก</LoginText>
                  <FormContainer>
                    <NameFields>
                      <NameTextField
                        required
                        label="ชื่อ"
                        error={isAlert === "firstName" && true}
                        onChange={(e) => {
                          setDataRegister({
                            ...dataRegister,
                            firstName: e.target.value,
                          });
                          setIsAlert(null);
                        }}
                        helperText={
                          isAlert === "firstName" && "Incorrect entry."
                        }
                      />
                      <NameTextField
                        required
                        label="นามสกุล"
                        error={isAlert === "lastName" && true}
                        onChange={(e) => {
                          setDataRegister({
                            ...dataRegister,
                            lastName: e.target.value,
                          });
                          setIsAlert(null);
                        }}
                        helperText={
                          isAlert === "lastName" && "Incorrect entry."
                        }
                      />
                    </NameFields>
                    <StyledTextField
                      required
                      label="Email"
                      error={
                        (isAlert === "email" || isAlert === "emailFail") && true
                      }
                      onChange={(e) => {
                        setDataRegister({
                          ...dataRegister,
                          email: e.target.value,
                        });
                        setIsAlert(null);
                      }}
                      helperText={
                        isAlert === "email"
                          ? "Incorrect entry."
                          : isAlert === "emailFail" && "Invalid email address"
                      }
                    />
                    <StyledTextField
                      required
                      label="Username"
                      error={isAlert === "userName" && true}
                      onChange={(e) => {
                        setDataRegister({
                          ...dataRegister,
                          userName: e.target.value,
                        });
                        setIsAlert(null);
                      }}
                      helperText={isAlert === "userName" && "Incorrect entry."}
                    />
                    <StyledTextField
                      required
                      label="Password"
                      type="password"
                      error={
                        (isAlert === "confirmPassword" ||
                          isAlert === "passwordFail") &&
                        true
                      }
                      onChange={(e) => {
                        setDataRegister({
                          ...dataRegister,
                          password: e.target.value,
                        });
                        setIsAlert(null);
                      }}
                      helperText={
                        isAlert === "password"
                          ? "Incorrect entry."
                          : isAlert === "passwordFail" && "password is not math"
                      }
                    />
                    <StyledTextField
                      required
                      label="Confirm Password"
                      type="password"
                      error={
                        (isAlert === "confirmPassword" ||
                          isAlert === "passwordFail") &&
                        true
                      }
                      helperText={
                        isAlert === "confirmPassword"
                          ? "Incorrect entry."
                          : isAlert === "passwordFail" && "password is not math"
                      }
                      onChange={(e) => {
                        setDataRegister({
                          ...dataRegister,
                          confirmPassword: e.target.value,
                        });
                        setIsAlert(null);
                      }}
                    />
                  </FormContainer>
                  <LoginButton onClick={() => handleRegister()}>
                    Confirm
                  </LoginButton>
                </>
              )}
            </LoginRight>
          </Login>
        </Box>
      </Modal>
    </>
  );
}

export default RegisterModal;
