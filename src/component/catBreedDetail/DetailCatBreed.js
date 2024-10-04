import styled from "@emotion/styled/macro";
import ReactHtmlParser from "react-html-parser";

const Contain = styled.div``;

const DivDetail = styled.div`
  display: flex;
  background-color: #efe7d0;
  max-width: 100%;
  height: 100%;
  padding: 40px 240px;
`;

const DivLeft = styled.div`
  width: 80%;
`;

const Dcs = styled.div`
  font-size: 20px;
  width: 80%;
`;

const TitleTh = styled.div`
  width: 80%;
  text-align: end;
  font-size: 120px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const TitleEn = styled.div`
  width: 80%;
  text-align: end;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
`;
const DivRight = styled.div`
  width: 20%;
`;

const ImageCat = styled.img`
  max-height: 650px;
  height: 100%;
`;

function DetailCatBreed({ data }) {
  return (
    <Contain>
      <DivDetail>
        <DivLeft>
          <TitleTh>{data?.nameTH}</TitleTh>
          <TitleEn>{data?.nameEN}</TitleEn>
          <Dcs>{ReactHtmlParser(data?.textGeneral)}</Dcs>
        </DivLeft>
        <DivRight>
          <ImageCat src={data?.imgGeneral} />
        </DivRight>
      </DivDetail>
    </Contain>
  );
}

export default DetailCatBreed;
