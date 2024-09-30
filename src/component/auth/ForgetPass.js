import React from "react";
import Modal from "@mui/material/Modal";
import styled from "@emotion/styled/macro";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { checkUsernameResetPassword } from "../../api/auth";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
const style = {
  position: "absolute",
  textAlign: "center",
  width: "800px",
  paddingTop: "30px",
  paddingBottom: "30px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
};

const Logo = styled.img`
  width: 150px;
  height: auto;
  margin-bottom: 30px;
`;

const Title = styled.div`
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 40px;
`;

const StyledTextField = styled(TextField)`
  width: 400px;
  margin-bottom: 30px;
`;

const DivButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ResetButton = styled.div`
  font-size: 20px;
  width: fit-content;
  background-color: #ffbf6b;
  color: #000000;
  padding: 15px 80px;
  margin-top: 20px;
  border-radius: 40px;
  text-align: center;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const BackToLogin = styled.div`
  margin-top: 20px;
  font-size: 14px;
  color: #1860c3;
  cursor: pointer;
  text-decoration: underline;
`;

const DivIconLoading = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
`;
function ForgetPassword({ open, close, backtologin }) {
  const [userName, setUserName] = useState("");
  const [isError, setIsError] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const resetPassword = () => {
    if (userName !== "") {
      setIsLoading(true);
      checkUsernameResetPassword({ userName: userName })
        .then(({ data }) => {
          if (data.code === 200 && data.message === "success") {
            setIsReset(true);
          }
          setIsLoading(false);
        })

        .catch((err) => err);
    } else {
      setIsError(true);
    }
  };
  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Logo src={process.env.PUBLIC_URL + "/CatAdvisorLogo.png"} />
        <Title>ลืมรหัสผ่าน?</Title>
        <DivIconLoading>{isLoading && <CircularProgress />}</DivIconLoading>

        {isReset ? (
          "ระบบได้ทำการส่งลิ้งค์เพื่อ reset password ไปยังอีเมลของท่านแล้วกรุณาตรวจสอบที่ e-mail ของท่าน"
        ) : (
          <>
            <Box>
              <StyledTextField
                required
                id="outlined-required"
                label="Username"
                onChange={(e) => {
                  setUserName(e.target.value);
                  setIsError(false);
                }}
                error={isError}
              />
            </Box>
            <DivButton>
              <ResetButton onClick={() => resetPassword()}>
                Send Reset Password
              </ResetButton>
            </DivButton>
            <BackToLogin onClick={() => backtologin(false)}>
              กลับไปยังหน้า Login
            </BackToLogin>
          </>
        )}
      </Box>
    </Modal>
  );
}

export default ForgetPassword;
