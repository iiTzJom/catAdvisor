import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

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

const EditCatModal = ({ open, handleClose, handleSubmit, cat }) => {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (cat) {
      setName(cat.name);
      setBreed(cat.breed);
      setBirthDate(cat.birthDate);
      setGender(cat.gender);
      setImage(cat.image); // Assuming you have an image URL or handle image differently
    }
  }, [cat]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const onSubmit = () => {
    const updatedCat = {
      ...cat,
      name,
      breed,
      birthDate,
      gender,
      image,
    };
    handleSubmit(updatedCat);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="edit-cat-modal-title"
      aria-describedby="edit-cat-modal-description"
    >
      <Box sx={style}>
        <ModalHeader>แก้ไขข้อมูลแมว</ModalHeader>
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
        <StyledTextField
          margin="dense"
          label="เลือกรูปภาพ"
          type="file"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          onChange={handleImageChange}
          InputProps={{ accept: "image/*" }}
        />
        <SubmitButton onClick={onSubmit}>บันทึกการเปลี่ยนแปลง</SubmitButton>
      </Box>
    </Modal>
  );
};

export default EditCatModal;
