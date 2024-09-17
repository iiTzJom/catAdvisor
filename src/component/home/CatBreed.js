import styled from "@emotion/styled/macro";
import { Fade, Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

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
  const dataBreedCat = [
    { name: "บริทิซ ช็อตแฮร์", id: 2 },
    { name: "อเมริกัน ช็อตแฮร์", id: 1 },
    { name: "สก๊อตติซ โฟลด์", id: 3 },
  ];
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
      name: "บริทิขข็อตแฮร์ (British Short hair)",
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
    backgroundSize: "revert-layer",
    height: "500px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };
  return (
    <Contain>
      <BreedText>สายพันธุ์แมว</BreedText>
      <DivMenu>
        {dataBreedCat.map((data) => (
          <DivButton
            onClick={() =>
              (window.location.href = "/cat-breeds-detail/" + data.id)
            }
          >
            {data.name}
          </DivButton>
        ))}
      </DivMenu>
      <div className="slide-container">
        <Fade {...fadeProperties}>
          {dataCat.map((data) => (
            <DivImage>
              <DivLeft>
                <div
                  style={{
                    ...divStyle,
                    backgroundImage: `url(${data.pic})`,
                  }}
                />
              </DivLeft>
              <DivRight>
                <DivRightInside>
                  <BreedText2>{data.detail}</BreedText2>
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
