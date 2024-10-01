import React from "react";
import { useState } from "react";
import styled from "@emotion/styled/macro";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const Contain = styled.div`
  display: flex;
  justify-content: center;
  max-width: 100%;
  text-align: center;
  height: 100vh;
  align-items: center;
`;

const CenteredBox = styled.div`
  width: 600px;
  border-radius: 10px;
  background-color: #ffffff;
  padding: 40px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const ProfileAvatar = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const UploadIcon = styled.div`
  position: absolute;
  font-size: 5px;
  bottom: 3px;
  right: 250px;
  background-color: #ffffff;
  border-radius: 50%;
  padding: 3px;
  border: 2px solid #1565c0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
`;

const InputField = styled(TextField)`
  width: 100%;
`;

const SubmitButton = styled(Button)`
  background-color: #ffb74d;
  color: #ffffff;
  width: 100%;
  padding: 12px;
  border-radius: 30px;
  font-size: 16px;
  margin-top: 10px;
  &:hover {
    background-color: #ffa726;
  }
`;

function UsersProfile() {
  const [isEditable, setIsEditable] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState("https://via.placeholder.com/100");
  const [gender, setGender] = useState("ชาย"); // สถานะสำหรับเลือกเพศ

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  return (
    <Contain>
      <CenteredBox>
        <ProfileAvatar>
          <Avatar
            alt="Profile"
            src={avatarSrc}
            sx={{ width: 100, height: 100 }}
          />
          {isEditable && (
            <UploadIcon>
              <input
                type="file"
                style={{ display: "none" }}
                id="avatar-upload"
                accept="image/*"
                onChange={handleFileChange}
              />
              <label htmlFor="avatar-upload">
                <AddAPhotoIcon sx={{ color: "#1565C0", cursor: "pointer" }} />
              </label>
            </UploadIcon>
          )}
        </ProfileAvatar>

        <Box component="form">
          <InputRow>
            <InputField
              label="ชื่อ"
              defaultValue="John"
              variant="standard"
              InputProps={{
                readOnly: !isEditable,
              }}
            />
            <InputField
              label="นามสกุล"
              defaultValue="Doe"
              variant="standard"
              InputProps={{
                readOnly: !isEditable,
              }}
            />
          </InputRow>

          <InputRow>
            <InputField
              label="Email"
              defaultValue="john.doe@example.com"
              disabled={true}
              variant="standard"
            />
          </InputRow>

          <SubmitButton onClick={toggleEdit}>
            {isEditable ? "บันทึก" : "แก้ไข"}
          </SubmitButton>
        </Box>
      </CenteredBox>
    </Contain>
  );
}

export default UsersProfile;
