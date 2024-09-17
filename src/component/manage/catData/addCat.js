import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

const style = {
  position: "absolute",
  width: "600px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ModalHeader = styled.div`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 20px;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  margin-bottom: 20px;
`;

const StyledFormControl = styled(FormControl)`
  width: 100%;
  margin-bottom: 20px;
`;

const SubmitButton = styled.div`
  font-size: 18px;
  background-color: #ffbf6b;
  color: #000000;
  padding: 10px 20px;
  border-radius: 30px;
  text-align: center;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const CardAvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const CardAvatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px; /* Space between the image and the upload button */
  border: 2px solid #ddd; /* Optional: Add border to the image */
`;

const UploadButton = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const HiddenInput = styled.input`
  display: none;
`;

const AddCatModal = ({
  open,
  handleClose,
  handleSubmit,
  catsData,
  setCatsData,
  cat = {}, // Default to an empty object if cat is not provided
}) => {
  const [name, setName] = useState(cat.name || "");
  const [breed, setBreed] = useState(cat.breed || "");
  const [birthDate, setBirthDate] = useState(cat.birthDate || "");
  const [gender, setGender] = useState(cat.gender || "");
  const [image, setImage] = useState(cat.avatar || ""); // Initialize with cat.avatar

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Update image state with the base64 URL
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = () => {
    const newCat = {
      name,
      breed,
      birthDate,
      gender,
      avatar: image, // Use the updated image URL
    };
    handleSubmit(newCat);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="add-cat-modal-title"
      aria-describedby="add-cat-modal-description"
    >
      <Box sx={style}>
        <ModalHeader>เพิ่มข้อมูลแมว</ModalHeader>
        <CardAvatarContainer>
          <CardAvatar src={image} alt={`รูปของ ${name}`} />
          <UploadButton htmlFor={`avatar-upload`}>
            <PhotoCameraIcon color="primary" />
            <HiddenInput
              id={`avatar-upload`}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </UploadButton>
        </CardAvatarContainer>
        <StyledTextField
          autoFocus
          margin="dense"
          label="ชื่อแมว"
          type="text"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <StyledTextField
          margin="dense"
          label="พันธุ์แมว"
          type="text"
          variant="outlined"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
        />
        <StyledFormControl variant="outlined">
          <InputLabel>เพศ</InputLabel>
          <Select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            label="เพศ"
          >
            <MenuItem value="ผู้">ผู้</MenuItem>
            <MenuItem value="เมีย">เมีย</MenuItem>
          </Select>
        </StyledFormControl>
        <StyledTextField
          margin="dense"
          label="วันเกิด"
          type="date"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
        <SubmitButton onClick={onSubmit}>บันทึกข้อมูล</SubmitButton>
      </Box>
    </Modal>
  );
};

export default AddCatModal;
