import React, { useEffect, useState } from "react";
import styled from "@emotion/styled/macro";
import ReactHtmlParser from "react-html-parser";
import { getBlogDetail } from "../../api/blog";
const Contain = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: row-reverse; /* แก้ไขทิศทางให้รูปอยู่ทางขวา */
  align-items: flex-start; /* จัดให้ทุกอย่างอยู่ที่จุดเริ่มต้นของ container */
`;

const DivLeft = styled.div`
  margin-top: 40px;
  width: 50%; /* ปรับให้ใช้ครึ่งหนึ่งของพื้นที่ */
`;

const DivRight = styled.div`
  width: 50%; /* ปรับให้ใช้ครึ่งหนึ่งของพื้นที่ */
  position: relative;
`;

const ImageDetailCat = styled.img`
  height: 500px;
  width: 500px;
  object-fit: cover;
  padding-left: 120px;
  padding-top: 150px;
`;

const TiTleDetail = styled.div`
  width: 100%;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const DivRec = styled.div`
  width: 100%;
  margin-top: 40px;
  display: flex;
  margin-bottom: 20px;
`;

const DcsDetial = styled.div`
  width: 100%;
  font-size: 20px;
  margin-bottom: 20px;
`;

const Reccommend = styled.div`
  height: fit-content;
  margin-right: 20px;
  margin-top: 8px;
  font-size: 16px;
  font-weight: bold;
  width: fit-content;
  color: #ffffff;
  background-color: #d7878a;
  padding: 5px 30px;
  text-align: center;
`;

const DivCatagory = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 100px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  background-color: white;
  background-image: url(${(props) =>
    process.env.PUBLIC_URL + props.background});
  background-size: 30px 30px;
  background-repeat: no-repeat;
  background-position: center;
`;

function TextDetail({ data }) {
  const [dataCat, setDataCat] = useState({
    imgCat: "",
    title: "",
    recommend: false,
    description: "",
    cateId: "",
  });
  useEffect(async () => {
    const getData = await getBlogDetail(window.location.search.slice(1)).then(
      (data) => {
        if (data.data.code === 200) {
          setDataCat({
            imgCat: data.data.data.imgCat,
            title: data.data.data.title,
            recommend: data.data.data.recommend,
            description: data.data.data.description,
            cateId: data.data.data.cateId,
          });
        }
      }
    );

    return () => {
      clearInterval(getData); // ใช้ clearInterval แทน destroy
    };
  }, []);

  return (
    <Contain>
      <DivRight>
        <ImageDetailCat src={process.env.PUBLIC_URL + dataCat?.imgCat} />
      </DivRight>
      <DivLeft>
        <DivRec>
          {dataCat?.recommend && <Reccommend>เเนะนำ</Reccommend>}{" "}
          {dataCat?.cateId == "01J61ZZFHJAYM56B6JV9ZSQW0E" && (
            <DivCatagory background={"/medicon.png"} />
          )}
          {dataCat?.cateId == "01J61ZZFHK6ZY1W6GBY0JV2H4X" && (
            <DivCatagory background={"/bookicon.png"} />
          )}
          {dataCat?.cateId == "01J61ZZFHKFEKX8DYHJNC2E8YD" && (
            <DivCatagory background={"/caticon.png"} />
          )}
          {dataCat?.cateId == "01J61ZZFHMYDYFTGDF6AK659PW" && (
            <DivCatagory background={"/foodicon.png"} />
          )}
          {dataCat?.cateId == "01J61ZZFHK6ZY1W6GBY0JV2FGC" && (
            <DivCatagory background={"/heart_3319163.png"} />
          )}
        </DivRec>
        <TiTleDetail>{dataCat?.title}</TiTleDetail>
        <DcsDetial>{ReactHtmlParser(dataCat?.description)}</DcsDetial>
      </DivLeft>
    </Contain>
  );
}

export default TextDetail;
