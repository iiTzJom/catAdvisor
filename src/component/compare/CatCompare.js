import styled from "@emotion/styled/macro";
import React, { useState } from "react";
import ReactHtmlParser from "react-html-parser";
import StarIcon from "@mui/icons-material/Star";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";

const Contain = styled.div`
  max-width: 100%;
`;

const CompareBanner = styled.div`
  width: 100%;
  height: 530px;
  background-color: #71a9db;
  position: relative;
`;

const TextBanner = styled.div`
  font-size: 130px;
  font-weight: bold;
  color: #ffffff;
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -50%);
  width: max-content;
`;

const DcsBanner = styled.div`
  font-size: 30px;
  font-weight: semi-bold;
  color: #ffffff;
  position: absolute;
  left: 50%;
  top: 60%;
  transform: translate(-50%, -50%);
  width: max-content;
  background-color: #ffbf6b;
  padding: 20px;
  border-radius: 40px;
`;

const DivContent = styled.div`
  justify-content: center;
  display: flex;
  margin-top: 50px;
`;

const CardList = styled.div`
  padding-left: 30px;
  padding-right: 30px;
  position: relative;
  text-align: center;
  margin-top: 150px;
  width: 480px;
  margin-bottom: 100px;
  height: 600px;
  background-color: ${(props) => props.bg};
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 30px;
  padding-top: 150px;
`;

const Dcs = styled.div`
  font-weight: bold;
  text-align: left;
  font-size: 20px;
  width: auto;
`;

const ImageCat = styled.img`
  z-index: 10;
  top: -150px;
  left: 50%;
  position: absolute;
  height: 300px;
  transform: translate(-50%, 0%);
`;

const Rate = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

const RateRight = styled.div``;

function CompareCat() {
  const [selectedCat1, setSelectedCat1] = useState(1);
  const [selectedCat2, setSelectedCat2] = useState(2);

  const dataCompare = [
    {
      id: 1,
      name: "อเมริกันช็อตแฮร์ (American Short hair)",
      personality: 8,
      affectionate: 7,
      grooming: 8,
      friendly: 8,
      pic: "/AmericanStand.png",
      bgColor: "#B6C4A0 ",
    },
    {
      id: 2,
      name: "บริติชช็อตแฮร์ (British Short hair)",
      personality: 9,
      affectionate: 6,
      grooming: 7,
      friendly: 7,
      pic: "/BritishStand.png",
      bgColor: "#D7878A",
    },
    {
      id: 3,
      name: "สก๊อตติซโฟล์ด (Scottish Fold)",
      personality: 9,
      affectionate: 8,
      grooming: 7,
      friendly: 8,
      pic: "/ScottishStand.png",
      bgColor: "#EED7A1",
    },
  ];

  const handleCat1Change = (event) => {
    setSelectedCat1(event.target.value);
  };

  const handleCat2Change = (event) => {
    setSelectedCat2(event.target.value);
  };

  const renderCatCard = (catId) => {
    const data = dataCompare.find((cat) => cat.id === catId);

    return (
      <CardList bg={data.bgColor}>
        <ImageCat src={process.env.PUBLIC_URL + data.pic} />
        <Title>{ReactHtmlParser(data.name)}</Title>
        <Rate>
          <Dcs>ลักษณะนิสัย:</Dcs>
          <RateRight>
            {new Array(data.personality).fill("").map((_, index) => (
              <StarIcon key={index} />
            ))}
          </RateRight>
        </Rate>
        <Rate>
          <Dcs>ความขี้อ้อน:</Dcs>
          <RateRight>
            {new Array(data.affectionate).fill("").map((_, index) => (
              <StarIcon key={index} />
            ))}
          </RateRight>
        </Rate>
        <Rate>
          <Dcs>การดูแลขน:</Dcs>
          <RateRight>
            {new Array(data.grooming).fill("").map((_, index) => (
              <StarIcon key={index} />
            ))}
          </RateRight>
        </Rate>
        <Rate>
          <Dcs>เป็นมิตรต่อสัตว์เลี้ยงอื่นๆ:</Dcs>
          <RateRight>
            {new Array(data.friendly).fill("").map((_, index) => (
              <StarIcon key={index} />
            ))}
          </RateRight>
        </Rate>
      </CardList>
    );
  };

  return (
    <Contain>
      <CompareBanner>
        <TextBanner>เปรียบเทียบสายพันธุ์แมว</TextBanner>
        <DcsBanner>มาดูกันว่าแมวสายพันธุ์ไหนเหมาะสมกับคุณมากที่สุด</DcsBanner>
      </CompareBanner>
      <DivContent>
        <div>
          <FormControl fullWidth>
            <InputLabel>เลือกสายพันธุ์แมว 1</InputLabel>
            <Select value={selectedCat1} onChange={handleCat1Change}>
              {dataCompare.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {ReactHtmlParser(cat.name)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {renderCatCard(selectedCat1)}
        </div>
        <div>
          <FormControl fullWidth>
            <InputLabel>เลือกสายพันธุ์แมว 2</InputLabel>
            <Select value={selectedCat2} onChange={handleCat2Change}>
              {dataCompare.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {ReactHtmlParser(cat.name)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {renderCatCard(selectedCat2)}
        </div>
      </DivContent>
    </Contain>
  );
}

export default CompareCat;
