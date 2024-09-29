import React, { useState, useEffect } from "react";
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
import { login } from "../../api/auth";
import { loginUser } from "../../redux/action/userActions";
import { useDispatch, useSelector } from "react-redux";
import { imgDB } from "../../fireBase/UploadImg";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { sessionService } from "redux-react-session";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

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
  const { isLang, userName } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [dataLogin, setDataLogin] = useState({
    userName: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isAlert, setIsAlert] = useState(null);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const [message, setMessage] = useState(null);

  const handleLogin = () => {
    if (dataLogin.userName === "") {
      setIsAlert("userName");
    } else if (dataLogin.password === "") {
      setIsAlert("password");
    } else {
      login(dataLogin)
        .then(({ data }) => {
          if (data.code === 200) {
            if (data.message === "login success") {
              const dataUser = data.data;
              dispatch(
                loginUser(
                  dataUser.userName,
                  dataUser.id,
                  dataUser.firstName,
                  dataUser.lastName,
                  dataUser.email,
                  dataUser.imgProfile,
                  dataUser.type
                )
              );

              if (dataUser.type === 1) {
                window.location.href = "/Admin?cat-data-list";
              } else if (dataUser.type === 2) {
                window.location.href = "/Manage?profile";
              }
            } else {
              setMessage(data.message);
            }
          }
        })
        .catch((e) => setMessage("login fail"));
    }
  };

  const aaa = async (data) => {
    const id = v4();
    const imgRef = ref(imgDB, `files/${id}`);
    await uploadBytes(imgRef, data).then((value) =>
      getDownloadURL(value.ref).then((url) => {
        console.log("id", id);
        console.log("aaaaaaaaaaaaaa", url);
      })
    );
  };
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
              onChange={(e) => {
                setDataLogin({ ...dataLogin, userName: e.target.value });
                setMessage(null);
              }}
              error={isAlert === "userName" && true}
            />
            {/* <input type="file" onChange={(e) => aaa(e.target.files[0])} /> */}
            <FormControl sx={{ width: "425px" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                error={isAlert === "password" && true}
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
                onChange={(e) => {
                  setDataLogin({ ...dataLogin, password: e.target.value });
                  setMessage(null);
                }}
              />
            </FormControl>
            <ForgotPassword onClick={forgetpassword}>
              Reset Password
            </ForgotPassword>
            {message === "login fail" && (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="error">
                  เข้าสู่ระบบไม่สำเร็จกรุณาลองใหม่อีกครั้ง
                </Alert>
              </Stack>
            )}
            <LoginButton onClick={() => handleLogin()}>ล็อกอิน</LoginButton>
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
