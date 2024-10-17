import React, { useState, useEffect } from "react";
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
import Switch from "@mui/material/Switch";
import {
  createVacine,
  createVacineNoti,
  updateVacine,
} from "../../../api/userVacine";
import { getCatByUser } from "../../../api/userCatData";
import { Token } from "@mui/icons-material";

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

const DivSwitch = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const DivTextSwitch = styled.div`
  padding-top: 8px;
`;
const vaccines = [
  "วัคซีนรวมในแมว (ครั้งที่ 1)",
  "วัคซีนรวมในแมว (ครั้งที่ 2)",
  "วัคซีนป้องกันโรคลูคีเมียในแมว (ครั้งที่ 1)",
  "วัคซีนพิษสุนัขบ้า (ครั้งที่ 1)",
  "วัคซีนรวมในแมว (ครั้งที่ 3)",
  "วัคซีนป้องกันโรคลูคีเมียในแมว (ครั้งที่ 2)",
  "วัคซีนพิษสุนัขบ้า (ครั้งที่ 2)",
  "กระตุ้นวัคซีนรวมในแมว (ครั้งที่ 4)",
  "กระตุ้นวัคซีนป้องกันโรคพิษสุนัขบ้า",
  "กระตุ้นวัคซีนลิวคีเมีย",
  "กระตุ้นวัคซีนรวมในแมว (ครั้งที่ 5)",
  "กระตุ้นวัคซีนป้องกันโรคพิษสุนัขบ้า",
];

const AddVaccines = ({ open, handleClose, token, type, name, dataVacine }) => {
  const [formData, setFormData] = useState({
    idCat: "",
    vacineName: "",
    vacineDate: "",
    vacineNameNext: "",
    vacineDateNext: "",
    status: false,
    createBy: "",
    id: "",
  });
  const [dataDB, setDataDB] = useState([]);

  useEffect(() => {
    if (dataVacine === null) {
      setFormData({
        idCat: "",
        vacineName: "",
        vacineDate: "",
        vacineNameNext: "",
        vacineDateNext: "",
        status: false,
        createBy: "",
        id: "",
      });
    } else {
      setFormData({
        idCat: dataVacine.idCat,
        vacineName: dataVacine.vacineName,
        vacineDate: dataVacine.vacineDate,
        vacineNameNext: dataVacine.vacineNameNext,
        vacineDateNext: dataVacine.vacineDateNext,
        status: dataVacine.status,
        createBy: dataVacine.createBy,
        id: dataVacine.id,
      });
    }
  }, [dataVacine]);
  useEffect(() => {
    var newData = [];
    if (name !== "" || !name) {
      const getData = getCatByUser(name)
        .then((data) => {
          if (data?.data?.code === 200) {
            Object.keys(data?.data?.data).map((key) => [
              newData.push(data?.data?.data[key]),
            ]);
            //setListNote(newData);
            setDataDB(newData);
          }
        })
        .catch((err) => err);
      return () => {
        clearInterval(getData); // ใช้ clearInterval แทน destroy
      };
    }
  }, [name]);

  const handleSubmit = async () => {
    const dataSave = {
      idCat: formData.idCat,
      vacineName: formData.vacineName,
      vacineDate: formData.vacineDate,
      vacineNameNext: formData.vacineNameNext,
      vacineDateNext: formData.vacineDateNext,
      status: formData.status,
      createBy: name,
    };

    await createVacine(dataSave)
      .then(async (data) => {
        if (data?.data?.code === 200) {
          const dataSaveNoti = {
            idVacine: data?.data?.id,
            accessToken: token,
            idCat: formData.idCat,
            vacineName: formData.vacineName,
            vacineDate: formData.vacineDate,
            vacineNameNext: formData.vacineNameNext,
            vacineDateNext: formData.vacineDateNext,
            status: formData.status,
            createBy: name,
          };
          await createVacineNoti(dataSaveNoti)
            .then((data) => {
              if (data?.data?.code === 200) {
                window.location.href = "/Manage?notiVacine";
              }
            })
            .catch((err) => err);
        }
      })
      .catch((err) => err);
    handleClose();
  };

  const handleEdit = async () => {
    const dataSave = {
      idCat: formData.idCat,
      vacineName: formData.vacineName,
      vacineDate: formData.vacineDate,
      vacineNameNext: formData.vacineNameNext,
      vacineDateNext: formData.vacineDateNext,
      status: formData.status,
      updateBy: name,
      id: formData.id,
    };

    await updateVacine(dataSave)
      .then(async (data) => {
        if (data?.data?.code === 200) {
          window.location.href = "/Manage?notiVacine";
        }
      })
      .catch((err) => err);
    handleClose();
  };

  const label = { inputProps: { "aria-label": "Color switch demo" } };

  return (
    <ModalBackdrop open={open} onClose={handleClose}>
      <ModalContent>
        <Title>{type === "edit" ? "แก้ไขข้อมูล" : "เพิ่มข้อมูลวัคซีน"}</Title>
        <form noValidate autoComplete="off">
          <FormControl fullWidth variant="outlined" required>
            <InputLabel id="cat-name-label">ชื่อแมว</InputLabel>
            <Select
              labelId="cat-name-label"
              id="catName"
              value={formData.idCat}
              onChange={(e) =>
                setFormData({ ...formData, idCat: e.target.value })
              }
              label="ชื่อแมว"
            >
              {dataDB.map((data) => (
                <MenuItem value={data.id}>{data.nameCat}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <StyledFormControl variant="outlined" required>
            <InputLabel id="vaccineToday-label">วัคซีนวันนี้</InputLabel>
            <Select
              labelId="vaccineToday-label"
              id="vaccineToday"
              value={formData.vacineName}
              onChange={(e) =>
                setFormData({ ...formData, vacineName: e.target.value })
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
            value={formData.vacineDate}
            onChange={(e) =>
              setFormData({ ...formData, vacineDate: e.target.value })
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
              value={formData.vacineNameNext}
              onChange={(e) =>
                setFormData({ ...formData, vacineNameNext: e.target.value })
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
          <StyledTextField
            fullWidth
            id="nextInjectionDate"
            label="วันฉีดครั้งถัดไป"
            type="date"
            value={formData.vacineDateNext || ""}
            onChange={(e) =>
              setFormData({ ...formData, vacineDateNext: e.target.value })
            }
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            required
          />

          <DivSwitch>
            <Switch
              {...label}
              checked={formData.status}
              color="success"
              onChange={(e) => {
                setFormData({ ...formData, status: e.target.checked });
              }}
            />
            <DivTextSwitch>ดำเนินการเสร็จสิ้น</DivTextSwitch>
          </DivSwitch>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            marginTop={2}
          >
            <StyledSubmitButton
              variant="contained"
              onClick={() =>
                dataVacine !== null ? handleEdit() : handleSubmit()
              }
            >
              {dataVacine !== null ? "แก้ไข" : "เพิ่มข้อมูล"}
            </StyledSubmitButton>
          </Box>
        </form>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default AddVaccines;
