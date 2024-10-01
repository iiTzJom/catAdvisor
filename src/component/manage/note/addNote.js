import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import styled from "@emotion/styled";

const ModalContent = styled(Box)`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledButton = styled(Button)`
  background-color: #ffbf6b;
  color: white;
  margin-top: 20px;
  width: 500px;
  &:hover {
    background-color: #ffbf6b;
    opacity: 0.8;
  }
  font-size: 20px;
  font-weight: bold;
  border-radius: 10px;
`;

const AddNotes = ({ open, onClose, note }) => {
  const [formData, setFormData] = useState(note || {});

  useEffect(() => {
    setFormData(note || {});
  }, [note]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ModalContent>
        <FormControl fullWidth margin="normal">
          <InputLabel id="cat-name-label">ชื่อแมว</InputLabel>
          <Select
            labelId="cat-name-label"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            label="ชื่อแมว"
          >
            <MenuItem value="ฟุกุ">ฟุกุ</MenuItem>
            <MenuItem value="เลโอ">เลโอ</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="วันที่บันทึก"
          name="date"
          type="date"
          value={formData.date || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="ชื่อเรื่อง"
          name="title"
          value={formData.title || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="บันทึก"
          name="notes"
          value={formData.notes || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <StyledButton onClick={handleSave}>บันทึก</StyledButton>
      </ModalContent>
    </Modal>
  );
};

export default AddNotes;
