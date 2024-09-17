import styled from "@emotion/styled/macro";
import ReactHtmlParser from "react-html-parser";

const Contain = styled.div`
  margin-top: 40px;
  position: relative;
  padding-left: 240px;
  padding-right: 240px;
  max-width: 100%;
`;

const DivModel = styled.div`
  margin-top: 20px;
  margin-bottom: 40px;
  display: flex;
  width: 100%;
`;

const DivLeft = styled.div`
  position: relative;
  text-align: ${(props) => (props.end == "true" ? "end" : "start")};
  width: ${(props) => (props.width == "true" ? "70%" : "30%")};
`;

const DivRight = styled.div`
  position: relative;
  text-align: ${(props) => (props.end == "true" ? "-webkit-right" : "")};
  width: ${(props) => (props.width == "true" ? "70%" : "30%")};
`;

const Title = styled.div`
  margin-bottom: 20px;
  width: 100%;
  font-size: 30px;
  font-weight: bold;
  text-align: ${(props) => (props.end == "true" ? "end" : "start")};
`;

const Dcs = styled.div`
  width: 80%;
  font-size: 20px;
  text-align: ${(props) => (props.end == "true" ? "end" : "start")};
`;

const ImageCat = styled.img`
  height: 100%;
  max-height: 450px;
`;

const Line = styled.div`
  margin-bottom: 30px;
  width: 100%;
  border-top: 1px solid #000; /* เส้นขีดสีดำ */
  // margin-left: 121px;
  // margin-top: -140px;
`;

function CatModel({ data }) {
  return (
    <Contain>
      <DivModel>
        <DivLeft>
          <ImageCat src={process.env.PUBLIC_URL + data?.pic1} />
        </DivLeft>
        <DivRight width={"true"} end={"true"}>
          <Title end={"true"}>ลักษณะร่างกาย</Title>
          <Dcs end={"true"}>{ReactHtmlParser(data?.dcs1)}</Dcs>
        </DivRight>
      </DivModel>
      <Line />
      <DivModel>
        <DivLeft width={"true"}>
          <Title>ลักษณะนิสัย</Title>
          <Dcs>{ReactHtmlParser(data?.dcs2)}</Dcs>
        </DivLeft>
        <DivRight>
          <ImageCat src={process.env.PUBLIC_URL + data?.pic2} />
        </DivRight>
      </DivModel>
      <Line />
      <DivModel>
        <DivLeft>
          <ImageCat src={process.env.PUBLIC_URL + data?.pic3} />
        </DivLeft>
        <DivRight width={"true"} end={"true"}>
          <Title end={"true"}>โรคทางพันธุกรรม</Title>
          <Dcs end={"true"}>{ReactHtmlParser(data?.dcs3)}</Dcs>
        </DivRight>
      </DivModel>
    </Contain>
  );
}

export default CatModel;
