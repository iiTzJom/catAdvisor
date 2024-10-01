import React, { useState, useEffect } from "react";
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
  position: relative;
`;

const CardAvatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px; /* Space between the image and the upload button */
  border: 2px solid #ddd; /* Optional: Add border to the image */
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${(props) =>
    process.env.PUBLIC_URL + props.background});
`;

const UploadButton = styled.label`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #fff;
  border-radius: 50%;
  padding: 4px;
  border: 2px solid #1976d2;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HiddenInput = styled.input`
  display: none;
`;

const AddCatModal = ({
  open,
  handleClose,
  handleSubmit,
  catData,
  service,
  cat = {}, // Default to an empty object if cat is not provided
}) => {
  const [dataCat, setDataCat] = useState({
    avatar: "https://via.placeholder.com/100",
    birthDate: "",
    breed: "",
    gender: "",
    id: "",
    name: "",
    statusColor: "",
  });

  useEffect(() => {
    if (catData != null) {
      setDataCat({
        avatar: catData.avatar,
        birthDate: catData.birthDate,
        breed: catData.breed,
        gender: catData.gender,
        id: catData.id,
        name: catData.name,
        statusColor: catData.statusColor,
      });
    } else {
      setDataCat({
        avatar: "https://via.placeholder.com/100",
        birthDate: "",
        breed: "",
        gender: "",
        id: "",
        name: "",
        statusColor: "",
      });
    }
  }, [catData]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDataCat({ ...dataCat, avatar: reader.result }); // Update image state with the base64 URL
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = () => {
    handleSubmit(dataCat);
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
        <ModalHeader>
          {service === "Edit" ? "แก้ไขข้อมูลแมว" : "เพิ่มข้อมูลแมว"}
        </ModalHeader>
        <CardAvatarContainer>
          <CardAvatar background={dataCat.avatar}>
            <UploadButton htmlFor={`avatar-upload`}>
              <PhotoCameraIcon color="primary" />
              <HiddenInput
                id={`avatar-upload`}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </UploadButton>
          </CardAvatar>
        </CardAvatarContainer>
        <StyledTextField
          autoFocus
          margin="dense"
          label="ชื่อแมว"
          type="text"
          variant="outlined"
          value={dataCat.name}
          onChange={(e) => setDataCat({ ...dataCat, name: e.target.value })}
        />
        <StyledTextField
          margin="dense"
          label="พันธุ์แมว"
          type="text"
          variant="outlined"
          value={dataCat.breed}
          onChange={(e) => setDataCat({ ...dataCat, breed: e.target.value })}
        />
        <StyledFormControl variant="outlined">
          <InputLabel>เพศ</InputLabel>
          <Select
            value={dataCat.gender}
            onChange={(e) => setDataCat({ ...dataCat, gender: e.target.value })}
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
          value={dataCat.birthDate}
          onChange={(e) =>
            setDataCat({ ...dataCat, birthDate: e.target.value })
          }
        />
        <SubmitButton onClick={onSubmit}>
          {service === "Edit" ? "บันทึกการเปลี่ยนแปลง" : "บันทึกข้อมูล"}
        </SubmitButton>
      </Box>
    </Modal>
  );
};

export default AddCatModal;
