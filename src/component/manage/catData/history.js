// ViewVaccineHistoryModal.js
import React from "react";
import styled from "@emotion/styled";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  margin: 0 0 10px;
`;

const VaccineList = styled.ul`
  list-style: none;
  padding: 0;
`;

const VaccineItem = styled.li`
  margin: 5px 0;
`;

const CloseButton = styled(Button)`
  margin-top: 10px;
  background-color: #f59a83;
  color: white;
  &:hover {
    background-color: #fa8466;
  }
`;

const ViewVaccineHistoryModal = ({ open, handleClose, vaccineHistory }) => {
  console.log(vaccineHistory);
  return (
    <StyledModal open={open} onClose={handleClose}>
      <ModalContent>
        <Title>ประวัติการรักษา</Title>
        {vaccineHistory.length > 0 ? (
          <Table>
            <TableBody>
              {vaccineHistory.map((history, index) => (
                <TableRow key={index}>
                  <TableCell>{history.vacineName}</TableCell>
                  <TableCell>
                    {new Date(history.vacineDate).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>ไม่มีประวัติการรักษา</p>
        )}
        <CloseButton onClick={handleClose}>ปิด</CloseButton>
      </ModalContent>
    </StyledModal>
  );
};

export default ViewVaccineHistoryModal;
