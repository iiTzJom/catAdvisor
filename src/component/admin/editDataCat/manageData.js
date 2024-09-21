import React, { useState } from "react";
import styled from "@emotion/styled/macro";
import Button from "@mui/material/Button";

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

const DivDataInSide = styled.div`
  padding: 40px;
  font-size: 100px;
  font-weight: 900;
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
          <div>
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
          <DivDataInSide>1</DivDataInSide>
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
          <DivDataInSide>2</DivDataInSide>
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
          <DivDataInSide>3</DivDataInSide>
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
          <DivDataInSide>4</DivDataInSide>
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
