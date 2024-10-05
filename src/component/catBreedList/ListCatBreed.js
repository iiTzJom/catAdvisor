import styled from "@emotion/styled/macro";
import React, { useEffect, useState } from "react";
import { getListCatBreeds } from "../../api/catBreeds";
import ReactHtmlParser from "react-html-parser";
const CardList = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 30px;
  height: 100%;
  background-color: ${(props) => props.bg};
`;

const ImageCat = styled.img`
  height: 450px;
`;

const DivLeft = styled.div`
  width: 70%;
  padding-top: 95px;
  padding-left: 75px;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Dcs = styled.div`
  font-size: 20px;
  width: 80%;
`;

const SeeMore = styled.div`
  font-size: 20px;
  font-weight: bold;
  width: fit-content;
  color: #000000;
  background-color: #d9d9d9;
  padding: 10px 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 40px;
  text-align: center;
  &:hover {
    opacity: 0.7;
  }
  cursor: pointer;
`;

const DivRight = styled.div`
  text-align: end;
  width: 30%;
`;

function ListCatBreed() {
  const dataCat = [
    {
      id: 1,
      name: "อเมริกันช็อตแฮร์ (American Short hair)",
      detail:
        "ก่อนอื่นเรามาทำความรู้จักกับแมวอเมริกันช็อตแฮร์ (American Shorthair) กันก่อนเชื่อว่าหลายๆท่านไม่ว่าจะอยู่ในวงการแมวหรือไม่เมื่อมีคนพูดถึงเรื่องเเมวก็ต้องนึกถึงเเมวสายพันธุ์เมริกันช็อตแฮร์เป็นอันดับต้นๆอย่างเเน่นอนเรียกได้ว่าเป็นเเมวที่มีชื่อเสียงและได้รับความสนใจเป็นอย่างมาก ส่วนมากมักพบเห็นเเมวสายพันธุ์นี้ในครอบครัวที่มีเด็กนั้นก็ เพราะเเมวสายพันธุ์อเมริกันช็อตแฮร์นั้นเป็นเพื่อนเล่นที่น่ารักของเด็กๆรวมถึงสมาชิกที่เป็นแมวตัวอื่นๆในครอบครัวอีกด้วย",
      pic: "/AmericanStand.png",
      bgColor: "#B6C4A0 ",
    },
    {
      id: 2,
      name: "บริติชช็อตแฮร์ (British Short hair)",
      detail:
        "ก่อนอื่นเรามาทำความรู้จักบริติช ช็อตแฮร์ (British Shorthair)ว่ากันว่า British shorthair เป็นหนึ่งในสายพันธุ์แมวที่เก่าแก่ที่สุดของประเทศอังกฤษ ด้วยลักษณะเด่นที่มีขนหนานุ่มน่ากอด กับนิสัยเท่ๆ ถึงจะอยู่แบบเงียบๆ แต่ก็เข้ากับทุกคนได้ง่าย แถมยังเป็นมิตรอีกต่างหาก ถ้าใครกำลังมองหาเพื่อนแท้ซักตัวที่จะอยู่เคียงข้างแบบไม่กวนใจ แมวบริติช ช็อตแฮร์ (British Shorthair) รอที่จะครองใจคุณอยู่",
      pic: "/BritishStand.png",
      bgColor: "#D7878A",
    },
    {
      id: 3,
      name: "สก๊อตติซโฟล์ด (Scottish Fold)",
      detail:
        "ทำความรู้จัก สก๊อตทิช โฟล์ด (Scottish fold)อีกหนึ่งสายพันธุ์น้องแมวที่เป็นที่รู้จักมากไม่แพ้สายพันธุ์ไหนก็คือ สายพันธุ์สก๊อตทิช โฟลด์ [Scottish fold] ที่มีหูพับอันเป็นเอกลักษณ์แสนเก๋ที่ไม่เหมือนใคร หน้ากลมแป้น ขนอุยนุ่มน่ากอด ทำให้น้องแมวพันธุ์สก๊อตทิช โฟลด์ น้องแมวผู้มาจากสก๊อตแลนด์ ยึดพื้นที่หัวใจเจ้าของหลายๆ คนไปแล้ว",
      pic: "/ScottishStand.png",
      bgColor: "#EED7A1",
    },
  ];

  const [dataCatBreeds, setDataCatBreedss] = useState([]);

  useEffect(() => {
    var newData = [];
    const getData = getListCatBreeds()
      .then((data) => {
        if (data?.data?.code === 200) {
          Object.keys(data?.data?.data).map((key) => [
            newData.push(data?.data?.data[key]),
          ]);
          setDataCatBreedss(newData);
        }
      })
      .catch((err) => err);

    return () => {
      clearInterval(getData);
    };
  }, []);

  return (
    <>
      {dataCatBreeds.map((data) => (
        <CardList bg={data?.backgroundColor}>
          <DivLeft>
            <Title>{data?.nameTH}</Title>
            <Dcs>{ReactHtmlParser(data?.textGeneral)}</Dcs>
            <SeeMore
              onClick={() =>
                (window.location.href = "/cat-breeds-detail?" + data?.id)
              }
            >
              ดูเพิ่มเติม
            </SeeMore>
          </DivLeft>
          <DivRight>
            <ImageCat src={data?.imgGeneral} />
          </DivRight>
        </CardList>
      ))}
    </>
  );
}

export default ListCatBreed;
