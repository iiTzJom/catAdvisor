import styled from "@emotion/styled/macro";
import { useState } from "react";
import PanoramaIcon from "@mui/icons-material/Panorama";
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

const Container = styled.div`
  max-width: 100%;
  padding: 70px 60px;
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
  const [isEnd, setIsEnd] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [dataCat, setDataCat] = useState({
    descriptionGenaralKnowledge: "",
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSwitchChange = (event) => {
    setIsEnd(event.target.checked);
  };

  const [textReview, setTextReview] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <Container>
      <DivDataEdit>
        <DivBodyEdit>
          <DivLeft>
            <TextTitle>เพิ่มข้อมูลความรู้ทั่วไป</TextTitle>
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

            <FormControlLabel
              sx={{ marginTop: "40px" }}
              control={
                <Switch
                  color="primary"
                  checked={isEnd}
                  onChange={handleSwitchChange}
                />
              }
              label="เเนะนำ"
              labelPlacement="end"
            />
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
                onChange={(e) =>
                  setDataCat({ ...dataCat, descriptionInfo: e.target.value })
                }
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
          <ButtonNextPrev bg={"#B6C4A0"} bgHover={"#98af74"}>
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
