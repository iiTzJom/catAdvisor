import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import styled from "@emotion/styled";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { createCatNote, updateCatNoteByUser } from "../../../api/userCatNote";

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
const DivIconLoading = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  z-index: 100;
`;
const AddNotes = ({ open, onClose, note, name, item, status }) => {
  const [formData, setFormData] = useState({
    idCat: "",
    nameNote: "",
    noteDate: "",
    text: "",
    createBy: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [checkDataEmpty, setCheckDataEmpty] = useState(false);
  useEffect(() => {
    setFormData({
      idCat: note?.idCat,
      nameNote: note?.nameNote,
      noteDate: note?.noteDate,
      text: note?.text,
      createBy: note?.createBy,
      id: note?.id,
    });
  }, [note]);

  const handleSave = async () => {
    setIsLoading(true);
    var dataSave = {
      idCat: formData.idCat,
      nameNote: formData.nameNote,
      noteDate: formData.noteDate,
      text: formData.text,
      createBy: name,
      updateBy: name,
      id: formData?.id,
    };

    if (
      dataSave.idCat === "" ||
      !dataSave.idCat ||
      dataSave.nameNote === "" ||
      !dataSave.nameNote ||
      dataSave.noteDate === "" ||
      !dataSave.noteDate ||
      dataSave.text === "" ||
      !dataSave.text
    ) {
      setCheckDataEmpty(true);
    } else {
      if (status === "edit") {
        // updateCatNoteByUser;
        await updateCatNoteByUser(dataSave)
          .then((data) => {
            if (
              data.data.code === 200 &&
              data.data.message === "Update Success"
            ) {
              window.location.href = "/Manage?note";
            }
          })
          .catch((err) => err);
      } else {
        await createCatNote(dataSave)
          .then((data) => {
            if (
              data.data.code === 200 &&
              data.data.message === "create success"
            ) {
              window.location.href = "/Manage?note";
            }
          })
          .catch((err) => err);
      }
    }
    setIsLoading(false);
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
        <DivIconLoading>{isLoading && <CircularProgress />}</DivIconLoading>
        <FormControl fullWidth margin="normal">
          <InputLabel id="cat-name-label">ชื่อแมว</InputLabel>
          <Select
            labelId="cat-name-label"
            name="name"
            value={formData?.idCat}
            defaultValue={note?.idCat}
            onChange={(e) => {
              setFormData({ ...formData, idCat: e.target.value });
              setCheckDataEmpty(false);
            }}
            label="ชื่อแมว"
          >
            {item}
          </Select>
        </FormControl>
        <TextField
          label="วันที่บันทึก"
          name="date"
          type="date"
          value={formData.noteDate}
          onChange={(e) => {
            setFormData({ ...formData, noteDate: e.target.value });
            setCheckDataEmpty(false);
          }}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="ชื่อเรื่อง"
          name="title"
          value={formData.nameNote}
          onChange={(e) => {
            setFormData({ ...formData, nameNote: e.target.value });
            setCheckDataEmpty(false);
          }}
          fullWidth
          margin="normal"
        />
        <TextField
          label="บันทึก"
          name="notes"
          value={formData.text}
          onChange={(e) => {
            setFormData({ ...formData, text: e.target.value });
            setCheckDataEmpty(false);
          }}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        {checkDataEmpty && (
          <Stack sx={{ width: "100%", marginTop: "20px" }} spacing={2}>
            <Alert severity="error">
              กรอกข้อมูลไม่ครบ กรุณาตรวจสอบอีกครั้ง
            </Alert>
          </Stack>
        )}
        <StyledButton onClick={handleSave}>บันทึก</StyledButton>
      </ModalContent>
    </Modal>
  );
};

export default AddNotes;
