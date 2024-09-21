import React from "react";
import {
  Modal,
  Button,
  TextField,
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import styled from "@emotion/styled";

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
`;

const StyledTextField = styled(TextField)`
  margin: 16px 0;
`;

const StyledFormControl = styled(FormControl)`
  margin: 16px 0;
  width: 100%;
`;

const StyledSubmitButton = styled(Button)`
  background-color: #ffeb3b;
  color: black;
  padding: 10px 20px;
  border-radius: 20px;
  margin: 0 auto;
  width: 100%; /* Set the width to 100% to make the button full width */
  max-width: 300px; /* Optional: set a maximum width if needed */
  &:hover {
    background-color: #fdd835;
  }
`;

const vaccines = [
  "วัคซีนป้องกันโรคหวัด",
  "วัคซีนป้องกันโรคท้องเสีย",
  "วัคซีนป้องกันโรคพิษสุนัขบ้า",
  "วัคซีนป้องกันโรคหัดแมว",
  "วัคซีนป้องกันโรคปอดอักเสบ",
  "วัคซีนป้องกันโรคหัด",
  "วัคซีนป้องกันโรคบิด",
  "วัคซีนป้องกันโรคซาร์ส",
  // เพิ่มชื่อวัคซีนแมวอื่น ๆ ตามต้องการ
];

const AddVaccines = ({ open, handleClose, data, onSave }) => {
  const [formData, setFormData] = React.useState(data || {});

  React.useEffect(() => {
    setFormData(data || {}); // ตั้งค่าข้อมูลเมื่อเปิด Modal
  }, [data]);

  const handleSubmit = () => {
    onSave(formData); // เรียกใช้ฟังก์ชันบันทึกข้อมูล
    handleClose();
  };

  return (
    <ModalBackdrop open={open} onClose={handleClose}>
      <ModalContent>
        <Title>เพิ่มข้อมูลวัคซีน</Title>
        <form noValidate autoComplete="off">
          <FormControl fullWidth variant="outlined" required>
            <InputLabel id="cat-name-label">ชื่อแมว</InputLabel>
            <Select
              labelId="cat-name-label"
              id="catName"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              label="ชื่อแมว"
            >
              <MenuItem value="ฟุกุ">ฟุกุ</MenuItem>
              <MenuItem value="เลโอ">เลโอ</MenuItem>
            </Select>
          </FormControl>

          <StyledFormControl variant="outlined" required>
            <InputLabel id="vaccineToday-label">วัคซีนวันนี้</InputLabel>
            <Select
              labelId="vaccineToday-label"
              id="vaccineToday"
              value={formData.vaccineToday || ""}
              onChange={(e) =>
                setFormData({ ...formData, vaccineToday: e.target.value })
              }
              label="วัคซีนวันนี้"
            >
              {vaccines.map((vaccine) => (
                <MenuItem key={vaccine} value={vaccine}>
                  {vaccine}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>

          <StyledTextField
            fullWidth
            id="injectionDate"
            label="วันที่ฉีด"
            type="date"
            value={formData.date || ""}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            required
          />

          <StyledTextField
            fullWidth
            id="nextInjectionDate"
            label="วันฉีดครั้งถัดไป"
            type="date"
            value={formData.nextVaccineDate || ""}
            onChange={(e) =>
              setFormData({ ...formData, nextVaccineDate: e.target.value })
            }
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            required
          />

          <StyledFormControl variant="outlined" required>
            <InputLabel id="nextVaccine-label">วัคซีนครั้งถัดไป</InputLabel>
            <Select
              labelId="nextVaccine-label"
              id="nextVaccine"
              value={formData.nextVaccine || ""}
              onChange={(e) =>
                setFormData({ ...formData, nextVaccine: e.target.value })
              }
              label="วัคซีนครั้งถัดไป"
            >
              {vaccines.map((vaccine) => (
                <MenuItem key={vaccine} value={vaccine}>
                  {vaccine}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>

          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            marginTop={2}
          >
            <StyledSubmitButton variant="contained" onClick={handleSubmit}>
              เพิ่ม
            </StyledSubmitButton>
          </Box>
        </form>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default AddVaccines;
