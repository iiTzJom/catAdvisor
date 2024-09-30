import styled from "@emotion/styled/macro";
import { useState } from "react";
import PanoramaIcon from "@mui/icons-material/Panorama";
import CircularProgress from "@mui/material/CircularProgress";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
} from "@mui/material";
import ReactHtmlParser from "react-html-parser";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { createBlog } from "../../../api/blog";
import { sessionService } from "redux-react-session";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { v4 } from "uuid";
import { imgDB } from "../../../fireBase/UploadImg";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
const Container = styled.div`
  max-width: 100%;
  padding: 70px 60px;
  position: relative;
`;
const DivDataEdit = styled.div`
  max-width: 100%;
  background-color: #ffffff;
  height: 80vh;
  min-height: 80vh;
  position: relative;
`;

const TextTitle = styled.div`
  font-size: 20px;
  font-weight: 900;
  margin-bottom: 10px;
`;

const DivBodyEdit = styled.div`
  padding: 60px 25px 25px 25px;
  display: flex;
`;

const DivLeft = styled.div`
  width: 49%;
`;

const DivRight = styled.div`
  width: 49%;
  margin-left: 2%;
`;

const UploadBox = styled.div`
  border: 1px dashed #aaa;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  height: 300px;
  position: relative;
`;

const DivIconUpload = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
`;

const AdditionalDetailsWrapper = styled.div`
  margin-top: 40px;

  .MuiFormControl-root {
    margin: 0;
  }
  .MuiInputBase-root {
    height: 320px;
  }
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

const DivButtonNext = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: end;
  padding-right: 40px;
`;

const ButtonNextPrev = styled(Button)`
  background-color: ${(props) => props.bg};
  color: #000000;
  padding: 10px 40px;
  border-radius: 20px;
  font-size: 20px;
  font-weight: 900;
  margin-bottom: 20px;
  margin-right: 40px;
  &:hover {
    background-color: ${(props) => props.bgHover};
  }
`;

const style = {
  position: "absolute",
  width: "1100px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: "20px",
};

const DivReviewBt = styled.div`
  width: 100%;
  text-align: end;
`;
const ReviewBt = styled.div`
  cursor: pointer;
  color: blue;
  text-decoration: underline;
`;

const StyledTextField = styled(TextField)`
  width: 400px;
  margin-bottom: 30px;
`;

const DivName = styled.div`
  width: 100%;
  display: flex;
  margin-top: 40px;
`;

const categories = [
  {
    id: "01J61ZZFHKFEKX8DYHJNC2E8YD",
    name: "ลักษณะพิเศษต่างๆของแมว",
    icon: "/caticon.png",
  },
  {
    id: "01J61ZZFHK6ZY1W6GBY0JV2FGC",
    name: "การเลี้ยงดู",
    icon: "/heart_3319163.png",
  },
  {
    id: "01J61ZZFHMYDYFTGDF6AK659PW",
    name: "อุปกรณ์/สิ่งจำเป็น",
    icon: "/foodicon.png",
  },
  {
    id: "01J61ZZFHJAYM56B6JV9ZSQW0E",
    name: "โรคทั่วไปของเเมว",
    icon: "/medicon.png",
  },
  {
    id: "01J61ZZFHK6ZY1W6GBY0JV2H4X",
    name: "ประสบการณ์จากผู้พัฒนา",
    icon: "/bookicon.png",
  },
];

function BlogDataAdd() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isRecommend, setIsRecommend] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [dataCat, setDataCat] = useState({
    descriptionInfo: "",
    title: "",
  });
  const [textReview, setTextReview] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [user, setUser] = useState("");
  const [checkDataEmpty, setCheckDataEmpty] = useState(false);
  const [imgFile, setImgfile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleImageUpload = (e) => {
    setCheckDataEmpty(false);
    setImgfile(e.target.files[0]);
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleCategoryChange = (event) => {
    setCheckDataEmpty(false);
    setSelectedCategory(event.target.value);
  };

  const handleSwitchChange = (event) => {
    setIsRecommend(event.target.checked);
  };
  sessionService
    .loadUser()
    .then((data) => {
      setUser(data.userName);
    })
    .catch((err) => {
      window.location.href = "/";
    });

  const uploadImgToFirebase = async (data) => {
    const id = v4();
    const imgRef = ref(imgDB, `imgBlogs/${id}`);
    await uploadBytes(imgRef, data).then((value) =>
      getDownloadURL(value.ref).then((url) => {
        console.log("urlurl", url);
        return url;
      })
    );
  };

  const create = async () => {
    setIsLoading(true);
    var dataSave = {
      cateId: selectedCategory,
      imgCat: "",
      recommend: isRecommend,
      description: dataCat.descriptionInfo,
      createBy: user,
      updateBy: "",
      createDate: new Date().toString(),
      updateDate: "",
      title: dataCat.title,
    };

    if (
      dataSave.cateId === "" ||
      imgFile === "" ||
      dataSave.recommend === "" ||
      dataSave.description === "" ||
      dataSave.title === ""
    ) {
      setCheckDataEmpty(true);
    } else {
      const id = v4();
      const imgRef = ref(imgDB, `imgBlogs/${id}`);
      await uploadBytes(imgRef, imgFile).then((value) =>
        getDownloadURL(value.ref).then((url) => {
          console.log("urlurl", url);
          dataSave.imgCat = url;
        })
      );
      await createBlog(dataSave)
        .then((data) => {
          if (
            data.data.code === 200 &&
            data.data.message === "create success"
          ) {
            window.location.href = "/admin?blog-data-list";
          }
        })
        .catch((err) => err);
    }
    setIsLoading(false);
  };

  return (
    <Container>
      <DivIconLoading>{isLoading && <CircularProgress />}</DivIconLoading>
      <DivDataEdit>
        {checkDataEmpty && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="error">
              กรอกข้อมูลไม่ครบ กรุณาตรวจสอบอีกครั้ง
            </Alert>
          </Stack>
        )}
        <DivBodyEdit>
          <DivLeft>
            <TextTitle>เพิ่มข้อมูลความรู้ทั่วไป</TextTitle>
            <DivName>
              <Box>
                <StyledTextField
                  required
                  id="outlined-required"
                  label="ชื่อเรื่อง"
                  onChange={(e) => {
                    setDataCat({ ...dataCat, title: e.target.value });
                    setCheckDataEmpty(false);
                  }}
                  //error={isError}
                />
              </Box>
              <FormControlLabel
                sx={{ marginLeft: "40px" }}
                control={
                  <Switch
                    color="primary"
                    checked={isRecommend}
                    onChange={handleSwitchChange}
                  />
                }
                label="เเนะนำ"
                labelPlacement="end"
              />
            </DivName>
            <UploadBox
              onClick={() => document.getElementById("imageUpload").click()}
            >
              <DivIconUpload>
                <PanoramaIcon style={{ fontSize: 50, color: "#888" }} />
                <p>อัปโหลดรูปภาพ</p>
                <HiddenInput
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Selected"
                    style={{ width: "80px", marginTop: "10px" }}
                  />
                )}
              </DivIconUpload>
            </UploadBox>
          </DivLeft>
          <DivRight>
            <AdditionalDetailsWrapper>
              <TextField
                label="คำอธิบาย"
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={12}
                defaultValue={dataCat.descriptionInfo}
                onChange={(e) => {
                  setDataCat({ ...dataCat, descriptionInfo: e.target.value });
                  setCheckDataEmpty(false);
                }}
              />
              <DivReviewBt>
                <ReviewBt
                  onClick={() => {
                    setIsOpenModal(true);
                    setTextReview(dataCat.descriptionInfo);
                  }}
                >
                  ดูตัวอย่าง
                </ReviewBt>
              </DivReviewBt>
            </AdditionalDetailsWrapper>
            <FormControl fullWidth margin="normal" sx={{ marginTop: "40px" }}>
              <InputLabel>เลือกหมวดหมู่</InputLabel>
              <Select
                value={selectedCategory}
                onChange={handleCategoryChange}
                label="เลือกหมวดหมู่"
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DivRight>
        </DivBodyEdit>
        <DivButtonNext>
          <ButtonNextPrev
            bg={"#B6C4A0"}
            bgHover={"#98af74"}
            onClick={() => create()}
          >
            เพิ่มข้อมูล
          </ButtonNextPrev>
        </DivButtonNext>
      </DivDataEdit>
      <Modal
        open={isOpenModal}
        onClose={() => {
          setIsOpenModal(false);
          setTextReview("");
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {textReview === ""
            ? "ไม่พบข้อมูลดูตัวอย่าง"
            : ReactHtmlParser(textReview)}
        </Box>
      </Modal>
    </Container>
  );
}

export default BlogDataAdd;
