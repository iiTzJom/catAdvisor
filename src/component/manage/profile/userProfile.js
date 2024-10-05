import React from "react";
import { useState, useEffect } from "react";
import styled from "@emotion/styled/macro";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { updateProfile, getProfile } from "../../../api/auth";
import { v4 } from "uuid";
import { imgDB } from "../../../fireBase/UploadImg";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../redux/action/userActions";
import CircularProgress from "@mui/material/CircularProgress";

const Contain = styled.div`
  display: flex;
  justify-content: center;
  max-width: 100%;
  text-align: center;
  height: 100vh;
  align-items: center;
`;

const CenteredBox = styled.div`
  width: 600px;
  border-radius: 10px;
  background-color: #ffffff;
  padding: 40px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const ProfileAvatar = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const UploadIcon = styled.div`
  position: absolute;
  font-size: 5px;
  bottom: 3px;
  right: 250px;
  background-color: #ffffff;
  border-radius: 50%;
  padding: 3px;
  border: 2px solid #1565c0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
`;

const InputField = styled(TextField)`
  width: 100%;
`;

const SubmitButton = styled(Button)`
  background-color: #ffb74d;
  color: #ffffff;
  width: 100%;
  padding: 12px;
  border-radius: 30px;
  font-size: 16px;
  margin-top: 10px;
  &:hover {
    background-color: #ffa726;
  }
`;
const DivIconLoading = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  z-index: 100;
`;

function UsersProfile({ name }) {
  const [isEditable, setIsEditable] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState("https://via.placeholder.com/100");
  const [isLoading, setIsLoading] = useState(false);
  const [checkDataEmpty, setCheckDataEmpty] = useState(false);
  const [imgFile, setImgfile] = useState("");
  const [dataUser, setDataUser] = useState({
    firstName: "",
    lastName: "",
    imgProfile: "",
    email: "",
  });
  const dispatch = useDispatch();
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImgfile(event.target.files[0]);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    getProfile(name)
      .then((data) => {
        setDataUser({
          firstName: data.data.data.firstName,
          lastName: data.data.data.lastName,
          imgProfile: data.data.data.imgProfile,
          email: data.data.data.email,
        });
        setAvatarSrc(data.data.data.imgProfile);
      })
      .catch((err) => err);
  }, []);

  const handleUpdate = async () => {
    if (isEditable) {
      setIsLoading(true);
      var dataSave = {
        firstName: dataUser.firstName,
        lastName: dataUser.lastName,
        imgProfile: "",
        userName: name,
      };
      if (dataSave.firstName === "" || dataSave.lastName === "") {
        setCheckDataEmpty(true);
      } else {
        const id = v4();
        const imgRef = ref(imgDB, `imgProfile/${id}`);
        if (imgFile !== "") {
          await uploadBytes(imgRef, imgFile).then((value) =>
            getDownloadURL(value.ref).then((url) => {
              dataSave.imgProfile = url;
            })
          );
        }
        await updateProfile(dataSave)
          .then((data) => {
            if (
              data.data.code === 200 &&
              data.data.message === "Update Success"
            ) {
              getProfile(name)
                .then((data) => {
                  if (data.data.code === 200) {
                    dispatch(
                      loginUser(
                        data.data.data.userName,
                        data.data.data.id,
                        data.data.data.firstName,
                        data.data.data.lastName,
                        data.data.data.email,
                        data.data.data.imgProfile,
                        data.data.data.type,
                        data.data.data.accessToken
                      )
                    );

                    window.location.href = "/Manage?profile";
                  }
                })
                .catch((err) => err);
            }
          })
          .catch((err) => err);
      }
      setIsLoading(false);
    }
  };

  const toggleEdit = () => {
    handleUpdate();
    setIsEditable(!isEditable);
  };

  return (
    <Contain>
      <DivIconLoading>{isLoading && <CircularProgress />}</DivIconLoading>
      <CenteredBox>
        <ProfileAvatar>
          <Avatar
            alt="Profile"
            src={avatarSrc}
            sx={{ width: 100, height: 100 }}
          />
          {isEditable && (
            <UploadIcon>
              <input
                type="file"
                style={{ display: "none" }}
                id="avatar-upload"
                accept="image/*"
                onChange={handleFileChange}
              />
              <label htmlFor="avatar-upload">
                <AddAPhotoIcon sx={{ color: "#1565C0", cursor: "pointer" }} />
              </label>
            </UploadIcon>
          )}
        </ProfileAvatar>

        <Box component="form">
          <InputRow>
            <InputField
              label="ชื่อ"
              value={dataUser.firstName}
              variant="standard"
              InputProps={{
                readOnly: !isEditable,
              }}
              onChange={(e) => {
                setDataUser({ ...dataUser, firstName: e.target.value });
              }}
            />
            <InputField
              label="นามสกุล"
              defaultValue="Doe"
              variant="standard"
              value={dataUser.lastName}
              InputProps={{
                readOnly: !isEditable,
              }}
              onChange={(e) =>
                setDataUser({ ...dataUser, lastName: e.target.value })
              }
            />
          </InputRow>

          <InputRow>
            <InputField
              //label="Email"
              value={dataUser.email}
              disabled={true}
              variant="standard"
            />
          </InputRow>

          <SubmitButton onClick={toggleEdit}>
            {isEditable ? "บันทึก" : "แก้ไข"}
          </SubmitButton>
        </Box>
      </CenteredBox>
    </Contain>
  );
}

export default UsersProfile;
