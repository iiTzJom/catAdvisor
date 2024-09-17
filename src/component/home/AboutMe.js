import styled from "@emotion/styled/macro";

const Contain = styled.div`
  padding-left: 240px;
  padding-right: 240px;
  max-width: 100%;
  background-color: #efe7d0;
`;

const DivText = styled.div`
  width: 100%;
  height: 530px;
  font-size: 80px;
  display: flex;
`;

const DivLeft = styled.div`
  position: relative;
  width: 60%;
`;
const DivRight = styled.div`
  position: relative;
  width: 40%;
`;

const DivLeftInside = styled.div`
  width: 65%;
  position: absolute;
  top: 50%;
  transform: translate(0%, -50%);
`;

const DivText1 = styled.div`
  font-size: 30px;
  color: #000000;
`;

const DivPicAbout = styled.img`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(0%, -50%);
  width: 370px; /* ความกว้างของสี่เหลี่ยม */
  height: 370px; /* ความสูงของสี่เหลี่ยม */
`;

const Line = styled.div`
  width: 80%;
  border-top: 1px solid #000; /* เส้นขีดสีดำ */
  margin: 10px 0; /* ช่องว่างด้านบนและล่างของเส้นขีด */
  // margin-left: 121px;
  // margin-top: -140px;
`;

const DivText2 = styled.div`
  // margin-top: 60px;
  // margin-left: 120px;
  // width: 890px;
  font-size: 20px;
  // font-family: inter;
`;

function AboutMe() {
  return (
    <Contain>
      <DivText>
        <DivLeft>
          <DivLeftInside>
            <DivText1>เกี่ยวกับเรา</DivText1>

            <Line />
            <DivText2>
              ที่ CatAdvisor เราเชื่อว่าทุกแมวคู่ควรกับการดูแลที่ดีที่สุด
              เราทุ่มเทในการรวบรวมข้อมูลและคำแนะนำจากผู้เชี่ยวชาญ
              เพื่อช่วยให้เจ้าของแมวทุกคนสามารถมอบความรักและการดูแลที่เหมาะสมที่สุดให้กับเพื่อนแมวของพวกเขา
              ไม่ว่าคุณจะเป็นเจ้าของแมวมือใหม่หรือมีประสบการณ์ CatAdvisor
              พร้อมที่จะเป็นเพื่อนคู่ใจของคุณในทุกช่วงเวลาของการดูแลแมว
              ร่วมสร้างสรรค์ชุมชนที่อบอุ่นและใส่ใจ
              เพื่อความสุขของทั้งคุณและแมวของคุณ
            </DivText2>
          </DivLeftInside>
        </DivLeft>

        <DivRight>
          <DivPicAbout src={process.env.PUBLIC_URL + "/CatAdvisorLogo.png"} />
        </DivRight>
      </DivText>
    </Contain>
  );
}

export default AboutMe;
