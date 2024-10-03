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
import { createCatData, updateCatByUser } from "../../../api/userCatData";
import { v4 } from "uuid";
import { imgDB } from "../../../fireBase/UploadImg";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

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

const DivIconLoading = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  z-index: 100;
`;
const AddCatModal = ({ open, handleClose, catData, service, name }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [checkDataEmpty, setCheckDataEmpty] = useState(false);
  const [imgFile, setImgfile] = useState("");
  const [dataCat, setDataCat] = useState({
    avatar: "https://via.placeholder.com/100",
    birthDate: "",
    breed: "",
    gender: "",
    id: "",
    name: "",
  });

  useEffect(() => {
    if (catData != null) {
      setDataCat({
        avatar: catData.imgCat,
        birthDate: catData.birthDateCat,
        breed: catData.breedCat,
        gender: catData.genderCat,
        id: catData.id,
        name: catData.nameCat,
      });
    } else {
      setDataCat({
        avatar: "https://via.placeholder.com/100",
        birthDate: "",
        breed: "",
        gender: "",
        id: "",
        name: "",
      });
    }
  }, [catData]);

  const handleImageChange = (event) => {
    setCheckDataEmpty(false);
    setImgfile(event.target.files[0]);
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDataCat({ ...dataCat, avatar: reader.result }); // Update image state with the base64 URL
      };

      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async () => {
    if (service === "Edit") {
      setIsLoading(true);
      var dataSave = {
        imgCat: dataCat.avatar,
        updateBy: name,
        genderCat: dataCat.gender,
        birthDateCat: dataCat.birthDate,
        nameCat: dataCat.name,
        breedCat: dataCat.breed,
        id: dataCat.id,
      };
      if (
        dataSave.genderCat === "" ||
        dataSave.birthDateCat === "" ||
        dataSave.nameCat === "" ||
        dataSave.breedCat === "" ||
        dataSave.imgCat === ""
      ) {
        setCheckDataEmpty(true);
      } else {
        const id = v4();
        const imgRef = ref(imgDB, `imgUserCat/${id}`);
        if (imgFile !== "") {
          await uploadBytes(imgRef, imgFile).then((value) =>
            getDownloadURL(value.ref).then((url) => {
              dataSave.imgCat = url;
            })
          );
        }
        await updateCatByUser(dataSave)
          .then((data) => {
            if (
              data.data.code === 200 &&
              data.data.message === "Update Success"
            ) {
              window.location.href = "/Manage?catData";
            }
          })
          .catch((err) => err);
      }
      setIsLoading(false);
    } else {
      setIsLoading(true);
      var dataSave = {
        imgCat: "",
        genderCat: dataCat.gender,
        birthDateCat: dataCat.birthDate,
        nameCat: dataCat.name,
        breedCat: dataCat.breed,
        createBy: name,
      };

      if (
        dataSave.genderCat === "" ||
        dataSave.birthDateCat === "" ||
        dataSave.nameCat === "" ||
        dataSave.breedCat === "" ||
        imgFile === ""
      ) {
        setCheckDataEmpty(true);
      } else {
        const id = v4();
        const imgRef = ref(imgDB, `imgUserCat/${id}`);
        await uploadBytes(imgRef, imgFile).then((value) =>
          getDownloadURL(value.ref).then((url) => {
            dataSave.imgCat = url;
          })
        );
        await createCatData(dataSave)
          .then((data) => {
            if (
              data.data.code === 200 &&
              data.data.message === "create success"
            ) {
              window.location.href = "/Manage?catData";
            }
          })
          .catch((err) => err);
      }
      setIsLoading(false);
    }
    // handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="add-cat-modal-title"
      aria-describedby="add-cat-modal-description"
    >
      <Box sx={style}>
        <DivIconLoading>{isLoading && <CircularProgress />}</DivIconLoading>
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
          onChange={(e) => {
            setDataCat({ ...dataCat, name: e.target.value });
            setCheckDataEmpty(false);
          }}
        />
        <StyledTextField
          margin="dense"
          label="พันธุ์แมว"
          type="text"
          variant="outlined"
          value={dataCat.breed}
          onChange={(e) => {
            setDataCat({ ...dataCat, breed: e.target.value });
            setCheckDataEmpty(false);
          }}
        />
        <StyledFormControl variant="outlined">
          <InputLabel>เพศ</InputLabel>
          <Select
            value={dataCat.gender}
            onChange={(e) => {
              setDataCat({ ...dataCat, gender: e.target.value });
              setCheckDataEmpty(false);
            }}
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
          onChange={(e) => {
            setDataCat({ ...dataCat, birthDate: e.target.value });
            setCheckDataEmpty(false);
          }}
        />
        <SubmitButton onClick={onSubmit}>
          {service === "Edit" ? "บันทึกการเปลี่ยนแปลง" : "บันทึกข้อมูล"}
        </SubmitButton>

        {checkDataEmpty && (
          <Stack sx={{ width: "100%", marginTop: "20px" }} spacing={2}>
            <Alert severity="error">
              กรอกข้อมูลไม่ครบ กรุณาตรวจสอบอีกครั้ง
            </Alert>
          </Stack>
        )}
      </Box>
    </Modal>
  );
};

export default AddCatModal;
