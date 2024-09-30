import TextField from "@mui/material/TextField";
import styled from "@emotion/styled/macro";
import { useState } from "react";
import { updatePassword } from "../../api/auth";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
const Contain = styled.div`
  max-width: 100%;
  display: flex;
  justify-content: center;
  min-height: 440px;
  position: relative;
`;

const DivIconLoading = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
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

function ResetPassword() {
  const [newPassword, setNewPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isError, setIsError] = useState({
    password: false,
    confirmPassword: false,
  });
  const [isMatch, setIsMatch] = useState(false);
  const [isReset, setIReset] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = () => {
    setIsLoading(true);
    if (newPassword.password === "") {
      setIsError({ ...isError, password: true });
    } else if (newPassword.confirmPassword === "") {
      setIsError({ ...isError, confirmPassword: true });
    } else {
      if (newPassword.password !== newPassword.confirmPassword) {
        setIsMatch(true);
      } else {
        updatePassword({
          userName: window.location.search.split("%2f")[0].split("?")[1],
          password: newPassword.password,
        })
          .then(({ data }) => {
            if (data.code === 200 && data.message === "Update Success") {
              setIReset(true);
              setIsLoading(false);
            } else {
              setIReset(false);
              setIsLoading(false);
            }
          })
          .catch((err) => err);
      }
    }
  };

  return (
    <Contain>
      <DivIconLoading>
        <DivIconLoading>{isLoading && <CircularProgress />}</DivIconLoading>
        {isReset ? (
          "เปลี่ยนรหัสผ่านสำเร็จ กรุณาเข้าสู่ระบบอีกครั้ง"
        ) : (
          <>
            <Box>
              <StyledTextField
                required
                id="outlined-required"
                label="New password"
                type="password"
                onChange={(e) => {
                  setNewPassword({ ...newPassword, password: e.target.value });
                  setIsError({ ...isError, password: false });
                  setIsMatch(false);
                }}
                error={isError.password}
              />
            </Box>
            <Box>
              <StyledTextField
                required
                id="outlined-required"
                label="Confirm New password"
                type="password"
                onChange={(e) => {
                  setNewPassword({
                    ...newPassword,
                    confirmPassword: e.target.value,
                  });
                  setIsError({ ...isError, confirmPassword: false });
                  setIsMatch(false);
                }}
                error={isError.confirmPassword}
              />
            </Box>
            {isMatch && (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="error">รหัสผ่านไม่ตรงกัน กรุณาตรวจสอบ</Alert>
              </Stack>
            )}
            <DivButton>
              <ResetButton onClick={() => resetPassword()}>
                Reset Password
              </ResetButton>
            </DivButton>
          </>
        )}
      </DivIconLoading>
    </Contain>
  );
}

export default ResetPassword;
