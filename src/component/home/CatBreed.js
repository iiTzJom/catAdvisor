import styled from "@emotion/styled/macro";
import { Fade, Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import React, { useEffect, useState } from "react";
import { getListCatBreeds } from "../../api/catBreeds";
const Contain = styled.div`
  position: relative;
  padding-left: 240px;
  padding-right: 240px;
  max-width: 100%;
  background-color: #3d80cb;
  color: #ffffff;
`;

const DivMenu = styled.div`
  margin-top: 20px;
  width: 100%;
  text-align: end;
  display: flex;
  justify-content: end;
`;

const DivButton = styled.div`
  padding-left: 20px;
  &:hover {
    color: #ffbf6b; /* เปลี่ยนสีเมื่อเมาส์วาง */
  }
  cursor: pointer;
`;

const DivImage = styled.div`
  width: 100%;
  height: 530px;
  display: flex;
`;

const DivLeft = styled.div`
  position: relative;
  display: "flex";
  width: 40%;
`;
const DivRight = styled.div`
  position: relative;
  width: 60%;
`;

const DivRightInside = styled.div`
  width: 70%;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(0%, -50%);
`;

const BreedText = styled.div`
  padding-top: 20px;
  width: 100%;
  text-align: end;
  font-size: 30px;
`;

const BreedText2 = styled.div`
  text-align: end;
`;

const Square = styled.div`
  position: absolute;
  alignitems: "center";
  justifycontent: "center";
  backgroundsize: "cover";
  top: 50%;
  transform: translate(0%, -50%);
  width: 370px; /* ความกว้างของสี่เหลี่ยม */
  height: 370px; /* ความสูงของสี่เหลี่ยม */
  // margin-right: ${(props) => props.right || "0"}; /* ขยับไปทางขวา */
  // margin-top: ${(props) => props.top || "0"}; /* ขยับขึ้นด้านบน */
`;

function CatBreed() {
  const fadeProperties = {
    duration: 3000,
    transitionDuration: 500,
    infinite: true,
    indicators: false,
    arrows: false,
  };

  const divStyle = {
    display: "flex",
    width: "420px",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "contain",
    height: "500px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  const [dataCatBreeds, setDataCatBreedss] = useState([]);

  useEffect(() => {
    var newData = [];
    const getData = getListCatBreeds()
      .then((data) => {
        if (data?.data?.code === 200) {
          Object.keys(data?.data?.data).map(
            (key, i) => i < 3 && [newData.push(data?.data?.data[key])]
          );
          setDataCatBreedss(newData);
        }
      })
      .catch((err) => err);

    return () => {
      clearInterval(getData);
    };
  }, []);

  return (
    <Contain>
      <BreedText>สายพันธุ์แมว</BreedText>
      <DivMenu>
        {dataCatBreeds.map((data) => (
          <DivButton
            onClick={() =>
              (window.location.href = "/cat-breeds-detail?" + data.id)
            }
          >
            {data.nameTH}
          </DivButton>
        ))}
      </DivMenu>
      <div className="slide-container">
        <Fade {...fadeProperties}>
          {dataCatBreeds.map((data) => (
            <DivImage>
              <DivLeft>
                <div
                  style={{
                    ...divStyle,
                    backgroundImage: `url(${data.imgGeneral})`,
                  }}
                />
              </DivLeft>
              <DivRight>
                <DivRightInside>
                  <BreedText2>{data.textGeneral}</BreedText2>
                </DivRightInside>
              </DivRight>
            </DivImage>
          ))}
        </Fade>
      </div>
    </Contain>
  );
}

export default CatBreed;
