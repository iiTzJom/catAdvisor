import React from "react";
import styled from "@emotion/styled";
import { Modal, Box } from "@mui/material";

// Styled Components
const ModalContent = styled(Box)`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 800px;
  margin: auto;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const InfoText = styled.p`
  margin: 8px 0;
  font-weight: bold;
`;

const NoteText = styled.p`
  margin: 8px 0;
`;

const NoteViews = ({ open, onClose, note }) => {
  if (!note) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <ModalContent>
        <Title id="modal-title">{note.title}</Title>
        <InfoText>
          <strong>ชื่อแมว:</strong> {note.name}
        </InfoText>
        <InfoText>
          <strong>Tag Id:</strong> {note.tagId}
        </InfoText>
        <InfoText>
          <strong>วันที่บันทึก:</strong> {note.date}
        </InfoText>
        <NoteText>{note.notes}</NoteText>
      </ModalContent>
    </Modal>
  );
};

export default NoteViews;
