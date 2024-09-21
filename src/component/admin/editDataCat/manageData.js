import React, { useState } from "react";
import styled from "@emotion/styled/macro";
import PanoramaIcon from "@mui/icons-material/Panorama";
import { TextField, Button, Select, MenuItem } from "@mui/material";

const Container = styled.div`
  width: 100%;
  padding: 25px 60px;
`;

const DivStep = styled.div`
  width: 100%;
  position: relative;
`;
const LineStep = styled.div`
  width: 100%;
  border-bottom: 2px solid #eed7a1;
  padding-top: 20px;
`;

const NumStep = styled.div`
  background-color: ${(props) => (props.bg === "true" ? "#eed7a1" : "#d9d9d9")};
  position: absolute;
  border-radius: 100%;
  left: ${(props) => props.left};
  cursor: pointer;
  font-size: 20px;
  font-weight: 900;
  padding: 10px 17px;
`;

const TextStep = styled.div`
  position: absolute;
  border-radius: 100%;
  left: ${(props) => props.left};
  cursor: pointer;
  font-size: 20px;
  font-weight: 900;
  top: 60px;
  width: max-content;
`;

const DivDataEdit = styled.div`
  max-width: 101%;
  background-color: #ffffff;
  margin-top: 100px;
  height: 80vh;
  min-height: 80vh;
  // overflow-y: scroll;
  position: relative;
`;

const UploadBox = styled.div`
  position: absolute;
  border: 1px dashed #aaa;
  padding: 10px;
  border-radius: 5px;
  margin-top: 100px;
  margin-left: 100px;
  text-align: center;
  width: 500px; /* ขนาดกล่อง */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* เงา */
  cursor: pointer;
`;

const HiddenInput = styled.input`
  display: none;
`;

const TextFieldWrapper = styled.div`
  position: absolute;
  width: 300px;
  margin-top: 400px;
  margin-left: 100px;
`;

const AdditionalDetailsWrapper = styled.div`
  position: absolute;
  width: 660px;
  margin-top: 85px;
  margin-left: 750px;
`;

const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px; /* เพิ่มระยะห่างระหว่าง RatingItem แทนการใช้ margin */
  position: absolute;
  margin-top: 400px;
  margin-left: 750px;
`;

const RatingItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px; /* ลดระยะห่างให้ใกล้กันมากขึ้น */
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
`;

const SelectDropdown = styled(Select)`
  width: 100px;
`;

const Note = styled.p`
  position: absolute;
  font-size: 12px;
  color: #d7878a;
  margin-top: 670px;
  margin-left: 750px;
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

function ManageDataCat() {
  const [isStep, setIsSetp] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [personality, setPersonality] = useState(null);
  const [affection, setAffection] = useState(null);
  const [grooming, setGrooming] = useState(null);
  const [friendliness, setFriendliness] = useState();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const Step = [
    {
      id: 1,
      left: "0",
      leftText: "0",
      text: "ข้อมูลทั่วไป",
    },
    {
      id: 2,
      left: "32.67%",
      leftText: "29.67%",
      text: "ลักษณะร่างกาย",
    },
    {
      id: 3,
      left: "65.33%",
      leftText: "64%",
      text: "ลักษณะนิสัย",
    },
    {
      id: 4,
      left: "98%",
      leftText: "91%",
      text: "โรคทางพันธุกรรม",
    },
  ];

  return (
    <Container>
      <DivStep>
        {Step.map((data) => (
          <div key={data.id}>
            <NumStep
              bg={isStep === data.id ? "true" : "false"}
              left={data.left}
              onClick={() => setIsSetp(data.id)}
            >
              {data.id}
            </NumStep>
            <TextStep left={data.leftText}>{data.text}</TextStep>
          </div>
        ))}
        <LineStep />
      </DivStep>
      {isStep === 1 && (
        <DivDataEdit>
          <UploadBox
            onClick={() => document.getElementById("imageUpload").click()}
          >
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
          </UploadBox>
          <TextFieldWrapper>
            <TextField
              label="ชื่อภาษาไทย"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="ชื่อภาษาอังกฤษ"
              variant="outlined"
              fullWidth
              margin="normal"
            />
          </TextFieldWrapper>
          <AdditionalDetailsWrapper>
            <TextField
              label="คำอธิบาย"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={10}
            />
          </AdditionalDetailsWrapper>
          <RatingContainer>
            <RatingItem>
              <Label>ลักษณะนิสัย</Label>
              <SelectDropdown
                value={personality}
                onChange={(e) => setPersonality(e.target.value)}
              >
                {[...Array(10).keys()].map((i) => (
                  <MenuItem value={i + 1} key={i}>
                    {i + 1}
                  </MenuItem>
                ))}
              </SelectDropdown>
            </RatingItem>
            <RatingItem>
              <Label>ความขี้อ้อน</Label>
              <SelectDropdown
                value={affection}
                onChange={(e) => setAffection(e.target.value)}
              >
                {[...Array(10).keys()].map((i) => (
                  <MenuItem value={i + 1} key={i}>
                    {i + 1}
                  </MenuItem>
                ))}
              </SelectDropdown>
            </RatingItem>
            <RatingItem>
              <Label>การดูแลขน</Label>
              <SelectDropdown
                value={grooming}
                onChange={(e) => setGrooming(e.target.value)}
              >
                {[...Array(10).keys()].map((i) => (
                  <MenuItem value={i + 1} key={i}>
                    {i + 1}
                  </MenuItem>
                ))}
              </SelectDropdown>
            </RatingItem>
            <RatingItem>
              <Label>ความเป็นมิตร</Label>
              <SelectDropdown
                value={friendliness}
                onChange={(e) => setFriendliness(e.target.value)}
              >
                {[...Array(10).keys()].map((i) => (
                  <MenuItem value={i + 1} key={i}>
                    {i + 1}
                  </MenuItem>
                ))}
              </SelectDropdown>
            </RatingItem>
          </RatingContainer>
          <Note>
            *หมายเหตุ: คะแนนเต็มในแต่ละช่องคือ 10 คะแนน โดย 1 คะแนนเท่ากับ 1 ดาว
          </Note>
          <DivButtonNext>
            <ButtonNextPrev
              bg={"#FFBF6B"}
              bgHover={"#f3b565"}
              onClick={() => setIsSetp(2)}
            >
              ถัดไป
            </ButtonNextPrev>
          </DivButtonNext>
        </DivDataEdit>
      )}

      {isStep === 2 && (
        <DivDataEdit>
          <UploadBox
            onClick={() => document.getElementById("imageUpload").click()}
          >
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
          </UploadBox>
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
          <DivButtonNext>
            <ButtonNextPrev
              bg={"#D7878A"}
              bgHover={"#c97578"}
              onClick={() => setIsSetp(1)}
            >
              ย้อนกลับ
            </ButtonNextPrev>
            <ButtonNextPrev
              bg={"#FFBF6B"}
              bgHover={"#f3b565"}
              onClick={() => setIsSetp(3)}
            >
              ถัดไป
            </ButtonNextPrev>
          </DivButtonNext>
        </DivDataEdit>
      )}

      {isStep === 3 && (
        <DivDataEdit>
          <UploadBox
            onClick={() => document.getElementById("imageUpload").click()}
          >
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
          </UploadBox>
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
          <DivButtonNext>
            <ButtonNextPrev
              bg={"#D7878A"}
              bgHover={"#c97578"}
              onClick={() => setIsSetp(2)}
            >
              ย้อนกลับ
            </ButtonNextPrev>
            <ButtonNextPrev
              bg={"#FFBF6B"}
              bgHover={"#f3b565"}
              onClick={() => setIsSetp(4)}
            >
              ถัดไป
            </ButtonNextPrev>
          </DivButtonNext>
        </DivDataEdit>
      )}

      {isStep === 4 && (
        <DivDataEdit>
          <UploadBox
            onClick={() => document.getElementById("imageUpload").click()}
          >
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
          </UploadBox>
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
          <DivButtonNext>
            <ButtonNextPrev
              bg={"#D7878A"}
              bgHover={"#c97578"}
              onClick={() => setIsSetp(3)}
            >
              ย้อนกลับ
            </ButtonNextPrev>
            <ButtonNextPrev bg={"#B6C4A0"} bgHover={"#98af74"}>
              เพิ่มข้อมูล
            </ButtonNextPrev>
          </DivButtonNext>
        </DivDataEdit>
      )}
    </Container>
  );
}

export default ManageDataCat;
