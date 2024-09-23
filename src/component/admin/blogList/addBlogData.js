import styled from "@emotion/styled/macro";
import { useState } from "react";
import PanoramaIcon from "@mui/icons-material/Panorama";
import { TextField, Button, FormControlLabel, Switch } from "@mui/material";

const Container = styled.div`
  max-width: 100%;
  padding: 25px 60px;
  max-height: 100%;
  background-color: #71a9db;
`;

const DivDataEdit = styled.div`
  max-width: 101%;
  background-color: #ffffff;
  margin-top: 100px;
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

function BlogDataAdd() {
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [isEnd, setIsEnd] = useState(false); // State for Switch

  const handleSwitchChange = (event) => {
    setIsEnd(event.target.checked);
  };

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
              value="เเนะนำ"
              control={
                <Switch
                  color="primary"
                  checked={isEnd}
                  onChange={handleSwitchChange}
                />
              }
              label="เเนะนำ"
              labelPlacement="แนะนำ"
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
                rows={20}
              />
            </AdditionalDetailsWrapper>
          </DivRight>
        </DivBodyEdit>
        <DivButtonNext>
          <ButtonNextPrev bg={"#B6C4A0"} bgHover={"#98af74"}>
            เพิ่มข้อมูล
          </ButtonNextPrev>
        </DivButtonNext>
      </DivDataEdit>
    </Container>
  );
}

export default BlogDataAdd;
