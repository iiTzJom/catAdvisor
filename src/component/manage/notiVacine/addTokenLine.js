import React, { useState, useEffect } from "react";
import { Modal, Button, TextField, Box, FormControl } from "@mui/material";
import styled from "@emotion/styled";
import { sendLineNotification } from "../../../api/userVacine";
import { sessionService } from "redux-react-session";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../redux/action/userActions";
import { updateTokken } from "../../../api/userVacine";
const ModalBackdrop = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 600px; /* Increase the width as needed */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 16px;
  font-size: 24px;
  color: #16c464;
`;

const StyledSubmitButton = styled(Button)`
  background-color: #16c464;
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 20px;
  margin: 0 auto;
  width: 100%; /* Set the width to 100% to make the button full width */
  max-width: 300px; /* Optional: set a maximum width if needed */
  &:hover {
    background-color: #fdd835;
  }
`;

const AddToken = ({ open, handleClose }) => {
  const [token, setToken] = useState("");
  const [dataUser, setDataUser] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    sessionService
      .loadUser()
      .then((data) => {
        setDataUser(data);
      })
      .catch((err) => {
        //window.location.href = "/";
      });
  }, []);

  const addToken = () => {
    sendLineNotification({
      accessToken: dataUser.accessToken,
      message:
        "สวัสดี " +
        dataUser.firstName +
        " " +
        dataUser.lastName +
        " ยินดีต้อนรับสู่ Cat Advisor ระบบจะทำการแจ้งเตือนข้อมูลการฉีดวัคซีนที่ใกล้จะมาถึงก่อนกำหนดล่วงหน้า 3 วัน",
    })
      .then((data) => {
        if (data?.data?.code === 200) {
          dispatch(
            loginUser(
              dataUser.userName,
              dataUser.id,
              dataUser.firstName,
              dataUser.lastName,
              dataUser.email,
              dataUser.imgProfile,
              dataUser.type,
              dataUser.accessToken
            )
          );
          updateTokken({
            userName: dataUser.userName,
            accessToken: dataUser.accessToken,
          })
            .then((data) => {
              if (data?.data?.code === 200) {
                window.location.href = "/Manage?notiVacine";
              }
            })
            .catch((err) => err);
        }
      })
      .catch((err) => err);
  };

  return (
    <ModalBackdrop open={open} onClose={handleClose}>
      <ModalContent>
        <Title>
          {dataUser.accessToken === ""
            ? "รับการแจ้งเตือนผ่าน line"
            : "แก้ไขAccess Token ของคุณที่นี่"}
        </Title>

        <TextField
          label="Access Token"
          name="date"
          type="text"
          value={dataUser.accessToken}
          onChange={(e) => {
            setDataUser({ ...dataUser, accessToken: e.target.value });
          }}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          marginTop={2}
        >
          <StyledSubmitButton variant="contained" onClick={() => addToken()}>
            <img
              src={process.env.PUBLIC_URL + "/line.png"}
              style={{ width: "30px", paddingRight: "10px" }}
            />
            รับการแจ้งเตือน
          </StyledSubmitButton>
        </Box>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default AddToken;
