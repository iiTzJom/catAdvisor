import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import styled from "@emotion/styled/macro";
import TextField from "@mui/material/TextField";

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
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
            <LoginLeft>
              <ImgLogoLeft src={process.env.PUBLIC_URL + "/whitelogo.png"} />
              <LoginTitle>ยินดีต้อนรับ</LoginTitle>
              <LoginDcs>
                สร้างบัญชีของคุณเพื่อรับข่าวสารและข้อมูลที่ดีที่สุดเกี่ยวกับแมว
              </LoginDcs>
            </LoginLeft>
            <LoginRight>
              <LoginText>สมัครสมาชิก</LoginText>
              <FormContainer>
                <NameFields>
                  <NameTextField required label="ชื่อ" defaultValue="" />
                  <NameTextField required label="นามสกุล" defaultValue="" />
                </NameFields>
                <StyledTextField required label="Email" defaultValue="" />
                <StyledTextField required label="Username" defaultValue="" />
                <StyledTextField
                  required
                  label="Password"
                  defaultValue=""
                  type="password"
                />
                <StyledTextField
                  required
                  label="Confirm Password"
                  defaultValue=""
                  type="password"
                />
              </FormContainer>
              <LoginButton>Confirm</LoginButton>
            </LoginRight>
          </Login>
        </Box>
      </Modal>
    </>
  );
}

export default RegisterModal;
