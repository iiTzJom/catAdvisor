import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import styled from "@emotion/styled/macro";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  width: "1100px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
};

const Login = styled.div`
  display: flex;
  width: 100%;
  height: auto;
`;

const LoginLeft = styled.div`
  width: 50%;
  background-color: #1860c3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImgLogoLeft = styled.img`
  width: 350px;
  height: auto;
`;

const LoginTitle = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 48px;
  color: #ffffff;
  margin-top: 20px;
`;

const LoginDcs = styled.div`
  text-align: center;
  font-size: 20px;
  color: #ffffff;
  margin-top: 10px;
  padding-bottom: 50px;
`;

const LoginRight = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  background-color: #f8f8f8;
`;

const LoginText = styled.div`
  font-weight: bold;
  font-size: 48px;
  margin-bottom: 40px;
`;

const StyledTextField = styled(TextField)`
  width: 425px;
  margin-bottom: 30px;
`;

const ForgotPassword = styled(Typography)`
  font-size: 14px;
  color: #1860c3;
  text-align: right;
  width: 425px;
  cursor: pointer;
  text-decoration: underline;
  margin-top: 5px;
  margin-bottom: 20px;
`;

const LoginButton = styled.div`
  font-size: 24px;
  width: 300px;
  background-color: #ffbf6b;
  color: #000000;
  padding: 15px 20px;
  margin-top: 30px;
  border-radius: 40px;
  text-align: center;
  &:hover {
    opacity: 0.7;
  }
  cursor: pointer;
`;

const RegisterText = styled.div`
  margin-top: 20px;
  font-size: 16px;
  color: #1860c3;
  cursor: pointer;
  text-decoration: underline;
`;

function LoginModal({ open, close, register, forgetpassword }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Login>
          <LoginLeft>
            <ImgLogoLeft src={process.env.PUBLIC_URL + "/whitelogo.png"} />
            <LoginTitle>สวัสดีอีกครั้ง</LoginTitle>
            <LoginDcs>เข้าสู่ระบบเพื่อเริ่มต้นวันใหม่กับ Cat Advisor</LoginDcs>
          </LoginLeft>
          <LoginRight>
            <LoginText>ล็อกอิน</LoginText>
            <StyledTextField
              required
              id="outlined-required"
              label="Username"
              defaultValue=""
            />
            <FormControl sx={{ width: "425px" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <ForgotPassword onClick={forgetpassword}>
              Reset Password
            </ForgotPassword>
            <LoginButton>ล็อกอิน</LoginButton>
            <RegisterText onClick={register}>
              ยังไม่มีบัญชี? Create Account
            </RegisterText>
          </LoginRight>
        </Login>
      </Box>
    </Modal>
  );
}

export default LoginModal;
