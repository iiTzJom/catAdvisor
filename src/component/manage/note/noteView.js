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

const Line = styled.div`
  width: 100%;
  border-top: dashed 1px #6e6e6e;
  margin-top: 20px;
`;
const NoteViews = ({ open, onClose, note, dataCat }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <ModalContent>
        <InfoText>
          <strong>Tag Id:</strong> {note?.id}
        </InfoText>
        <Line />
        <Title id="modal-title">{note?.nameNote}</Title>
        <InfoText>
          <strong>ชื่อแมว:</strong>{" "}
          {dataCat?.filter((v) => v.id === note?.idCat)[0]?.nameCat}
        </InfoText>
        <InfoText>
          <strong>วันที่บันทึก:</strong>{" "}
          {new Date(note?.noteDate).getDate() +
            "-" +
            (new Date(note?.noteDate).getMonth() + 1) +
            "-" +
            new Date(note?.noteDate).getFullYear()}
        </InfoText>
        <NoteText>{note?.text}</NoteText>
      </ModalContent>
    </Modal>
  );
};

export default NoteViews;
