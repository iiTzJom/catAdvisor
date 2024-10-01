import React, { useState } from "react";
import styled from "@emotion/styled/macro";
import PanoramaIcon from "@mui/icons-material/Panorama";
import { TextField, Button, Select, MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ReactHtmlParser from "react-html-parser";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Padding } from "@mui/icons-material";

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

const TextTitle = styled.div`
  font-size: 20px;
  font-weight: 900;
  margin-bottom: 10px;
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
  border: 1px dashed #aaa;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* เงา */
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

const HiddenInput = styled.input`
  display: none;
`;

const TextFieldWrapper = styled.div`
  margin-top: 40px;
  width: 100%;
`;

const AdditionalDetailsWrapper = styled.div`
  //position: absolute;
  //width: 660px;
  margin-top: 40px;
  //margin-left: 750px;
  .MuiFormControl-root {
    margin: 0;
  }
  .MuiInputBase-root {
    height: 320px;
  }
`;

const DivReviewBt = styled.div`
  width: 100%;
  text-align: end;
`;
const ReviewBt = styled.div`
  cursor: pointer;
  color: blue;
  text-decoration: underline;
`;
const RatingContainer = styled.div`
  display: flex;
  margin-top: 50px;
  justify-content: center;
`;

const RatingItem = styled.div`
  display: flex;
  // justify-content: space-between;
  //margin-bottom: 5px; /* ลดระยะห่างให้ใกล้กันมากขึ้น */
  margin-right: 30px;
  .MuiInputBase-root {
    height: 45px;
    width: 120px;
  }
  .MuiInputBase-input {
    text-align: center;
  }
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  padding-right: 20px;
  width: 100px;
`;

const Note = styled.p`
  font-size: 12px;
  color: #d7878a;
  margin-top: 30px;
  width: 100%;
  text-align: center;
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

const DivIcon = styled.div`
  display: grid;
  margin-left: 10px;
  .MuiSvgIcon-root {
    cursor: pointer;
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

function ManageDataCat() {
  const [isStep, setIsSetp] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  const [dataCat, setDataCat] = useState({
    scoreCharacter: 1,
    scorePersistence: 1,
    scoreFurCare: 1,
    scoreFriendliness: 1,
    descriptionInfo: "",
    descriptionAppear: "",
    descriptionTemper: "",
    descriptionIll: "",
  });

  const [textReview, setTextReview] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);

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
          <DivBodyEdit>
            <DivLeft>
              <TextTitle>ข้อมูลทั่วไป</TextTitle>
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
                </DivIconUpload>
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
              <RatingContainer>
                <RatingItem>
                  <Label>ลักษณะนิสัย</Label>
                  <TextField value={dataCat.scoreCharacter} />
                  <DivIcon>
                    <AddIcon
                      onClick={() =>
                        dataCat.scoreCharacter < 10 &&
                        setDataCat({
                          ...dataCat,
                          scoreCharacter: dataCat.scoreCharacter + 1,
                        })
                      }
                    />
                    <RemoveIcon
                      onClick={() =>
                        dataCat.scoreCharacter !== 1 &&
                        setDataCat({
                          ...dataCat,
                          scoreCharacter: dataCat.scoreCharacter - 1,
                        })
                      }
                    />
                  </DivIcon>
                </RatingItem>

                <RatingItem>
                  <Label>ความขี้อ้อน</Label>
                  <TextField value={dataCat.scorePersistence} />
                  <DivIcon>
                    <AddIcon
                      onClick={() =>
                        dataCat.scorePersistence < 10 &&
                        setDataCat({
                          ...dataCat,
                          scorePersistence: dataCat.scorePersistence + 1,
                        })
                      }
                    />
                    <RemoveIcon
                      onClick={() =>
                        dataCat.scorePersistence !== 1 &&
                        setDataCat({
                          ...dataCat,
                          scorePersistence: dataCat.scorePersistence - 1,
                        })
                      }
                    />
                  </DivIcon>
                </RatingItem>
              </RatingContainer>

              <RatingContainer>
                <RatingItem>
                  <Label>การดูแลขน</Label>
                  <TextField value={dataCat.scoreFurCare} />
                  <DivIcon>
                    <AddIcon
                      onClick={() =>
                        dataCat.scoreFurCare < 10 &&
                        setDataCat({
                          ...dataCat,
                          scoreFurCare: dataCat.scoreFurCare + 1,
                        })
                      }
                    />
                    <RemoveIcon
                      onClick={() =>
                        dataCat.scoreFurCare !== 1 &&
                        setDataCat({
                          ...dataCat,
                          scoreFurCare: dataCat.scoreFurCare - 1,
                        })
                      }
                    />
                  </DivIcon>
                </RatingItem>

                <RatingItem>
                  <Label>ความเป็นมิตร</Label>
                  <TextField value={dataCat.scoreFriendliness} />
                  <DivIcon>
                    <AddIcon
                      onClick={() =>
                        dataCat.scoreFriendliness < 10 &&
                        setDataCat({
                          ...dataCat,
                          scoreFriendliness: dataCat.scoreFriendliness + 1,
                        })
                      }
                    />
                    <RemoveIcon
                      onClick={() =>
                        dataCat.scoreFriendliness !== 1 &&
                        setDataCat({
                          ...dataCat,
                          scoreFriendliness: dataCat.scoreFriendliness - 1,
                        })
                      }
                    />
                  </DivIcon>
                </RatingItem>
              </RatingContainer>

              <Note>
                *หมายเหตุ: คะแนนเต็มในแต่ละช่องคือ 10 คะแนน โดย 1 คะแนนเท่ากับ 1
                ดาว
              </Note>
            </DivRight>
          </DivBodyEdit>
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
          <DivBodyEdit>
            <DivLeft>
              <TextTitle>ลักษณะร่างกาย</TextTitle>
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
                  defaultValue={dataCat.descriptionAppear}
                  onChange={(e) =>
                    setDataCat({
                      ...dataCat,
                      descriptionAppear: e.target.value,
                    })
                  }
                />
                <DivReviewBt>
                  <ReviewBt
                    onClick={() => {
                      setIsOpenModal(true);
                      setTextReview(dataCat.descriptionAppear);
                    }}
                  >
                    ดูตัวอย่าง
                  </ReviewBt>
                </DivReviewBt>
              </AdditionalDetailsWrapper>
            </DivRight>
          </DivBodyEdit>

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
          <DivBodyEdit>
            <DivLeft>
              <TextTitle>ลักษณะนิสัย</TextTitle>
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
                  defaultValue={dataCat.descriptionTemper}
                  onChange={(e) =>
                    setDataCat({
                      ...dataCat,
                      descriptionTemper: e.target.value,
                    })
                  }
                />
                <DivReviewBt>
                  <ReviewBt
                    onClick={() => {
                      setIsOpenModal(true);
                      setTextReview(dataCat.descriptionTemper);
                    }}
                  >
                    ดูตัวอย่าง
                  </ReviewBt>
                </DivReviewBt>
              </AdditionalDetailsWrapper>
            </DivRight>
          </DivBodyEdit>

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
          <DivBodyEdit>
            <DivLeft>
              <TextTitle>โรคทางพันธุกรรม</TextTitle>
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
                </DivIconUpload>
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Selected"
                    style={{ width: "80px", marginTop: "10px" }}
                  />
                )}
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
                  defaultValue={dataCat.descriptionIll}
                  onChange={(e) =>
                    setDataCat({
                      ...dataCat,
                      descriptionIll: e.target.value,
                    })
                  }
                />
                <DivReviewBt>
                  <ReviewBt
                    onClick={() => {
                      setIsOpenModal(true);
                      setTextReview(dataCat.descriptionIll);
                    }}
                  >
                    ดูตัวอย่าง
                  </ReviewBt>
                </DivReviewBt>
              </AdditionalDetailsWrapper>
            </DivRight>
          </DivBodyEdit>

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

export default ManageDataCat;
