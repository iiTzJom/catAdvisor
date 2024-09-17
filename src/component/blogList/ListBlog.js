import styled from "@emotion/styled/macro";
import { useState } from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Contain = styled.div`
  max-width: 100%;
`;

const DivHead = styled.div`
  padding: 30px 240px;
  max-width: 100%;
  background-color: #71a9db;
`;

const DivList = styled.div`
  margin-top: 60px;
  margin-bottom: 20px;
  padding-left: 240px;
  padding-right: 240px;
  display: flex;
  flex-wrap: wrap;
  min-height: 300px;
`;

const DivSearch = styled.div`
  width: 100%;
  text-align: center;
  .MuiInputBase-root {
    width: 785px;
    background-color: #d9d9d9;
    border-radius: 50px;
    padding-right: 12px;
  }

  .MuiButtonBase-root {
    background-color: #ffd6b3;
    width: 105px;
    height: 56px;
    border-radius: 40px;
  }

  .MuiButtonBase-root:hover {
    opacity: 0.8;
  }

  .MuiFormControl-root {
    width: 100%;
    text-align: center;
    display: block;
  }

  .MuiFormLabel-root {
    width: 672px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const DivMenu = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const BottomMenu = styled.div`
  width: fit-content;
  padding: 1px;
  margin-right: 40px;
  height: -webkit-fill-available;
  cursor: pointer;

  &:hover {
    color: #ffcc00; /* เปลี่ยนสีเมื่อเมาส์วาง */
  }

  &:nth-last-child(1) {
    margin-right: 0;
  }
  padding-left: 5px;
`;

const DivCard = styled.div`
  position: relative;
  width: 335px;
  height: 454px;
  background-color: #ffffff;
  margin-right: 206px;
  margin-bottom: 40px;

  &:nth-child(3n) {
    margin-right: 0;
  }
  cursor: pointer;
`;

const DivPic = styled.img`
  width: 335px;
  height: 280px;
  object-fit: cover;
`;

const TitleCard = styled.div`
  font-size: 20px;
  font-weight: bold;
  padding-left: 10px;
  padding-top: 10px;
`;

const Dcs = styled.div`
  font-size: 20px;
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 5px;
  color: #757575;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const DivBottom = styled.div`
  position: absolute;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  width: -webkit-fill-available;
  bottom: 10px;
`;
const DivButton = styled.div`
  width: 50%;
`;

const SeeMore = styled.div`
  font-size: 20px;
  font-weight: bold;
  width: fit-content;
  color: #000000;
  background-color: #d9d9d9;
  padding: 10px 20px;
  border-radius: 40px;
  text-align: center;
  &:hover {
    opacity: 0.7;
  }
  cursor: pointer;
`;

const DivReccommend = styled.div`
  width: 50%;
  text-align: -webkit-right;
`;

const Reccommend = styled.div`
  margin-top: 8px;
  font-size: 16px;
  font-weight: bold;
  width: fit-content;
  color: #ffffff;
  background-color: #d7878a;
  padding: 5px 30px;
  text-align: center;
`;

const Icon = styled.img`
  height: 20px;
`;

const DivCatagory = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 100px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  background-color: white;
  right: -25px;
  top: -25px;
  background-image: url(${(props) =>
    process.env.PUBLIC_URL + props.background});
  background-size: 30px 30px;
  background-repeat: no-repeat;
  background-position: center;
`;

function BlogList() {
  const catagoryCat = [
    {
      id: "01J61ZZFHKFEKX8DYHJNC2E8YD",
      name: "ลักษณะพิเศษต่างๆของแมว",
      icon: "/caticon.png",
    },
    {
      id: "01J61ZZFHK6ZY1W6GBY0JV2FGC",
      name: "การเลี้ยงดู",
      icon: "/heart_3319163.png",
    },
    {
      id: "01J61ZZFHMYDYFTGDF6AK659PW",
      name: "อุปกรณ์/สิ่งจำเป็น",
      icon: "/foodicon.png",
    },
    {
      id: "01J61ZZFHJAYM56B6JV9ZSQW0E",
      name: "โรคทั่วไปของเเมว",
      icon: "/medicon.png",
    },
    {
      id: "01J61ZZFHK6ZY1W6GBY0JV2H4X",
      name: "ประสบการณ์จากผู้พัฒนา",
      icon: "/bookicon.png",
    },
  ];

  const blog = [
    {
      id: "01J62BE0Y0C32K21QWE8F44X5A",
      id_cate: "01J61ZZFHKFEKX8DYHJNC2E8YD",
      title: "การมองเห็น",
      dcs: "อาการตาบอดสีที่ไม่สามารถมองเห็นสีเเดง :โดยปกติทั่วไปมนุษย์นั้นสามารถที่จะเเยกสีฟ้า เเดง เขียว เเละยังสามารถบอกได้ว่าสีเหล่านี้คือสีอะไรเเต่เเมวนั้นตาบอดสีซึ่งไม่สามารถที่จะมองเห็นสีเเดงได้หากนำสีเเดงให้เเมวดูแมวจะมองเห็นเป็นสีเทาขุ่น<br/><br/>ใช้เเสงเล็กๆ ในการตรวจจับสิ่งของ :หากเราทำการส่องสัตว์ตอนกลางคืนจะมองเห็นแสงที่คล้ายกับเเสงเลเซอร์ออกมาจากตาของสัตว์ ลักษณะเเบบนี้เกิดขึ้นจากเนื้อเยื่อที่สะท้อนเเสงTapetumที่อยู่หลังเรตินาซึ่งทำหน้าที่เหมือนกระจกลักษณะของเเสงที่ออกมาจากดวงตานั้นเป็นปรากฏการณ์สะท้อนจากเนื้อเยื่อ Tapetum ที่อยู่ในตา เเละเนื้อเยื่อตัวนี้ทำให้แมวใช้เเสงเพียง 1/6 เพื่อตรวจจับสิ่งต่างๆ<br/><br/>ดวงตาที่สามารถปรับปริมาณการรับเเสง :ดวงตาเเมวมีความเฉพาะที่สามารถมองเห็นสิ่งของด้วยเเสงเพียงเล็กน้อย เเต่ในเวลากลางวันแมวไม่สามารถควบคุมปริมาณเเสงได้ ดังนั้นในตอนกลางวันที่มีเเสงมากแมวจะปรับรูม่านตาของเเมวเป็นเเนวตั้ง ซึ่งการปรับรูม่านตานั้นจะช่วยในการปรับการรับเเสงของเเมวทำให้มองเห็นได้ง่ายยิ่งขึ้น<br/><br/>เปลือกตาที่่3 :แมวไม่สามารถมองเห็นวัตถุที่อยู่ใกล้ได้ เเต่มีความสามารถที่โดดเด่นในการมองเห็นหากวัตถุนั้นอยู่ไกลหรือมีการเคลื่อนที่ เนื่องจากวิวัฒนาการมาจากนักล่าจึงทำให้เเมวมีเปลือกตาที่3ในบางครั้งมีการสอบถามว่าเป็นหนังตาที่มีความผิดปกติบริเวณดวงตาหรือไม่ เเต่จริงๆเเล้วคือเปลือกตาที่3 สำหรับคนนั้นใช้การหลับตาเพื่อป้องกันดวงตา เเต่สำหรับเเมวนั้นใช้เปลือกตาที่3ในการป้องกันดวงตา",
      recommend: true,
      pic: "/cateyes.jpg",
    },
    {
      id: "01J62BE0Y244M9PQH9CRMVS7RR",
      id_cate: "01J61ZZFHMYDYFTGDF6AK659PW",
      title: "ห้องน้ำเเมว",
      dcs: "ห้องน้ำ :ห้องน้ำเเมวหรือ Litter Box การเตรียมห้องน้ำให้เเมวต้องซื้อโดยคำนวนจากการเลี้ยงแมวที่เลี้ยง +1 เช่น หากคุณเลี้ยงเเมว1ตัวต้องมีห้องน้ำอย่างน้อย2อัน หรือ หากคุณเลี้ยงเเมว10ตัวควรมีห้องน้ำอย่างน้อย11อัน โดยความใหญ่ของห้องน้ำแมวนั้นต้องมีความใหญ่กว่าขนาดของเเมว 1.5เท่า ความสูงของห้องน้ำมีความสูงโดยประมาณ20เซนติเมตรเพื่อป้องกันไม่ให้ทรายในห้องน้ำกระเด็นออกมาเเต่หากห้องน้ำมีความสูงเกินไปก็จะส่งผลกับเเมวที่มีอายุมากเพราะเป็นโรคข้อต่ออักเสบจะทำให้เข้าห้องน้ำได้ยาก แมวเข้าไปขับถ่ายมักจะเขี่ยทรายกระจายออกนอกห้อน้ำการที่ห้องน้ำมีหลังคานั้นจะช่วยกันไม่ให้ทรายกระเด็นออกนอกห้องน้ำได้<br/><br/>วิธีดูเเลห้องน้ำเเมว<br/><br/>ให้วางห่างจากพื้นที่กินอาหาร<br/><br/>โรยทรายให้มีความหนาประมาณ 8 เซนติเมตรจากพื้นห้องน้ำ<br/><br/>หากเป็นไปได้ให้เก็บสิ่งแปลกปลอมทุกวัน<br/><br/>ทำความสะอาดหรือเปลี่ยนทรายใหม่ทั้งหมดอย่างน้อย 1 ครั้งต่อ 1-2สัปดาห์",
      recommend: false,
      pic: "/cattoilet.jpg",
    },
    {
      id: "01J62BE0Y3NDM937WN2TVFKC66",
      id_cate: "01J61ZZFHK6ZY1W6GBY0JV2H4X",
      title: "การอ้วก",
      dcs: "หากผู้เลี้ยงคิดว่าอาการท้องเสียเป็นอันตรายต่อแมว ผู้เลี้ยงจำเป็นต้องหาสาเหตุของอาการ…",
      recommend: true,
      pic: "/CatAdvisorLogo.png",
    },
    {
      id: "01J62BE0Y3M4TGRZXS3G0GW3BW",
      id_cate: "01J61ZZFHJAYM56B6JV9ZSQW0E",
      title: "โรคFIP",
      dcs: "FIP (Feline Infectious Peritonitis) เป็นโรคติดต่อที่รักษาไม่…",
      recommend: true,
      pic: "/FIP.jpg",
    },
    {
      id: "01J62BE0Y40B3J2AXVRJHHHXKN",
      id_cate: "01J61ZZFHKFEKX8DYHJNC2E8YD",
      title: "การดมกลิ่น",
      dcs: "การตรวจสอบความปลอดภัยทางอาหาร :แมวมีพัฒนาการในการรับกลิ่นมากกว่ามนุษย์ถึง 1,000เท่า ซึ่งจะใช้ประสาทรับกลิ่นนี้ในการเเยกสิ่งต่างๆ เช่น เเยกว่าเป็นเเมวตัวผู้หรือตัวเมีย ด้วยวิวัฒนาการในการรับกลิ่นทำให้สามารถเเยกได้ว่าอาหารนี้กินได้หรือไม่ได้หรือเป็นอาหารที่ปลอดภัยหรือไม่ ดังนั้นเเมวที่มีอาการป่วยจนไม่สามารถรับกลิ่นได้จึงมีอาการเบื่ออาหารอย่างรุนเเรง หากเเมวเด็กไม่สามารถ ที่จะลืมตาได้ให้หานมเเม่แมวมาทาที่บริเวณประสาทรับกลิ่น เนื่องจากเเมวมีประสาทรับกลิ่นที่เรียกว่า Jacobson's organ ซึ่งทำหน้าที่รับกลิ่นของอาหารที่มีความคล้ายกับฟีโรโมน<br/><br/>การแสดงออกถึงการมีชีวิต :อีกหนึ่งระบบการสื่อสารของเเมวคือกลิ่น โดยแสดงออกโดยการเลีย(Allogrooming) การถ่ายถอดกลิ่นโดยการคลอเคลีย(Allorubbing) ซึ่งการแสดงออกเหล่านี้เเสดงถึง ความใกล้ชิด เเละยืนยันว่าเหมือนครอบครัวโดยการถ่ายทอดกลิ่น เมื่อผู้เลี้ยงออกไปข้างนอกเเล้วกลับมาจะสังเกตได้ว่าแมวจะมาคลอเคลียเพื่อเป็นการเเสดงออกถึงความใกล้ชิดสนิทสนม เเละยังเป็นการฝากกลิ่นไปในตัวอีกด้วย",
      recommend: false,
      pic: "/catnose.jpg",
    },
    {
      id: "01J62BE0Y40VKBZEH0YWRCYQ8J",
      id_cate: "01J61ZZFHMYDYFTGDF6AK659PW",
      title: "ชามอาหารชามน้ำ",
      dcs: "ผู้เลี้ยงจำเป็นที่จะต้องซื้ออ่างข้าวและอ่างน้ำหลายใบ เพราะด้วยลักษณะ…",
      recommend: true,
      pic: "/catbowls.jpg",
    },
    {
      id: "01J62BE0Y5JGHEDMHZH6DCH1TK",
      id_cate: "01J61ZZFHJAYM56B6JV9ZSQW0E",
      title: "อาการท้องเสีย",
      dcs: "หากผู้เลี้ยงคิดว่าอาการท้องเสียเป็นอันตรายต่อแมว ผู้เลี้ยงจำเป็นต้องหาสาเหตุของอาการ…,",
      recommend: false,
      pic: "/CatAdvisorLogo.png",
    },
    {
      id: "01J62BE0Y552CW10TJ8K1JE5WW",
      id_cate: "01J61ZZFHK6ZY1W6GBY0JV2H4X",
      title: "สิวเเมว",
      dcs: "สิวบริเวณคางแมวเรียกว่าสิวแมว (Feline Acne) หรือมักเรียกว่าสิวคางแมว ในช่วงแรก…",
      recommend: true,
      pic: "/CatAdvisorLogo.png",
    },

    {
      id: "01J62TJB26MF5912N2CZGFG2SS",
      id_cate: "01J61ZZFHKFEKX8DYHJNC2E8YD",
      title: "การได้ยิน",
      dcs: "ใบหูเคลื่อนไหวตามทิศทางที่ได้ยิน :หากเเมวได้ยินเสียงดังมาจากทางใดทางหนึ่งใบหูของมันจะหันไปตามทิศทางนั้นโดยอัตโนมัติ ซึ่งใบหูของเเมวนั้นสามารถที่จะเคลื่อนไหวได้อิสระมากกว่าหูของคนนั้นเป็นเพราะว่ากล้ามเนื่อบริเวณใบหูของเเมวมีกล้ามเนื้อประมาณ 30 มัดโดยที่ใบหูของเเมวกระดิกบ่อยๆนั้นเป็นการค้นหาเสียง<br/><br/>ความสามารถในการได้ยินที่มีความโดดเด่นกว่าสุนัข :แมวนั้นมีความโดดเด่นด้านการได้ยินมากกว่าสุนัข โดยทั่วไปสุนัขสามารถที่จะได้ยินเสียงในคลื่นความถี่ประมาณ 67-45,000Hz ในขณะเดียวกันนั้นเเมวสามารถที่จะได้ยินเสียงในคลื่นความถี่ประมาณ 45-65,000Hz โดยความสามารถที่ได้ยินคลื่นความถี่สูงๆได้นั้นจึงทำให้เเมวสามารถจับหนูที่มีเสียงคลื่นความถี่ราวๆ 50,000Hz ได้<br/><br/>แมวตัวสีขาวตาสีฟ้าเป็นเเมวพิการทางการได้ยินหรือไม่? :โครโมโซมที่กำหนดตาสีฟ้าเเละขนสีขาวมีความเกี่ยวข้องกับหูชั้นในรูปหอยโข่งหากเกิดความผิดปกติทามธรรมชาติของหูชั้นในรูปหอยโข่งตั้งเเต่เกิดจะส่งผลต่อการได้ยินของแมวทำให้เเมวพิการทางการได้ยิน ซึ่งค้นพบว่าแมวที่มีตาสีฟ้ามีโอกาสพิการทางการได้ยิน 40% เเละเเมวที่มีขนสีขาวมีโอกาสพิการทางการได้ยินถึง 20% เเละเเมวที่มีตาสีฟ้าเเละขนสีขาวมีโอกาสพิการทางการได้ยินสูงถึง 65-85%",
      recommend: false,
      pic: "/catears.jpg",
    },
    {
      id: "01J62TJB26MF5912N2CZGFG2LS",
      id_cate: "01J61ZZFHMYDYFTGDF6AK659PW",
      title: "อาหาร",
      dcs: "เมื่อนำแมวมาเลี้ยง เเน่นอนว่าจะต้องหาอาหารให้มันกิน จึ่งต้องมีการซื้ออาหารทั้งก่อนที่จะเลี้ยงเเละในขณะที่เลี้ยง ซึ่งอาหารแมวก็มีหลากหลายชนิด เเต่บริษัทอาหารส่วนใหญ่จะเเยกอาหารแมวตามอายุแมว ดังนั้น การเลือกอาหารแมวให้เหมาะสมกับอายุเเมวจึงเป็นสิ่งสำคัญ<br/><br/>นมผง :เป็นอาหารแมวที่เหมาะสมกับเเมวเเรกเกิดที่ยังไม่ลืมตา เเนะนำให้ชงนมผงที่เป็นลักษณะของเหลวที่มีส่วนผสมของน้ำมันหรือเป็นผง ให้ผสมนมผงกับน้ำอัตราส่วน 1:2 ให้มีความเป็นของเหลวคล้ายน้ำ<br/><br/>อาหารเเมวเด็กที่หย่านม :อาหารที่ให้แมวที่เพิ่งเลิกกินนมผง โดยทั่วไปเเล้วอาหารชนิดนี้คือการนำอาหารแมวเด็กมาผสมน้ำ<br/><br/>อาหารแมวเด็ก :เป็นอาหารสำหรับแมวเด็กโดยบริษัทผลิตอาหารเเมวแต่ละแห่งจะแบ่งช่วงอายุแมวเด็กที่เรียกว่า Kitten ไว้เเตกต่างกันเเต่ส่วนมากเเล้วเหมาะสำหรับเเมววัย 5-12 เดือน<br/><br/>อาหารเม็ดสูตรเเมวโตเต็มวัย :เป็นอาหารที่ให้แมวที่หยุดการเจริญเติบโตเเล้วเหมาะสำหรับเเมววัย 1-7 ปี เเละ นิยมให้กินหลังจากการทำหมันเพื่อช่วยป้องกันไม่ให้เเมวเกิดการอ้วนเละไม่เหม็นกลิ่นอุจจาระ<br/><br/>อาหารเม็ดสูตรซีเนียร์ :บริษัทผลิตอาหารส่วนมาจะทำอาหารสำหรับเเมวที่มีอายุมากกว่า 7ปี เเยกต่างหากโดยจะมีสารต้านอนุมูลอิสระที่ป้องกันการเเก่, โรคหัวใจในวัยชราเเละโรคไต",
      recommend: true,
      pic: "/catears.jpg",
    },
    {
      id: "01J62TJB26MF5912N2CZGFG2HS",
      id_cate: "01J61ZZFHKFEKX8DYHJNC2E8YD",
      title: "การสัมผัส",
      dcs: "ประสาทสัมผัสของฝ่าเท้าที่อ่อนไหวง่าย :แมวมีพัฒนาการประสาทสัมผัสจากฝ่าเท้าเพื่อใช้ประโยชน์ในการล่าเหยื่อ โดยแมวที่เจริญเติบโตในป่าเมื่อมันออกล่าเหยื่อจะใช้สายตาจ้องมองที่เหยื่อเเละทำการเอาเท้ากดเหยื่อไว้ที่พื้น หนึ่งสิ่งที่เเมวไม่ชอบคือการตัดเล็บสาเหตุเพราะ เมื่อถูกจับตัดเล็บจะต้องถูกกดฝ่าเท้าซึ่งเป็นบริเวณที่เเมวอ่อนไหวง่าย ส่งผลทำให้เเมวหงุดหงิดได้<br/><br/>การรับรู้วัตถุทางหนวด :หนึ่งในประสาทสัมผัสของเเมวที่ช่วยในการล่าเหยื่อของเเมวก็คือหนวด แมวจะใช้หนวดในการรับรู้สิ่งของต่างๆจากบริเวณรอบตัวของมันเอง หากหนวดมีการสัมผัสกับสิ่งของแมวจำทำการหลับตาลงเเละค่อยๆย่องไปข้างหน้าหากหนวดมีการสัมผัสกับสิ่งของเเมวจะทำการหลับตาโดยอัตโนมัติเพื่อเป็นการป้องกันไม่ให้หนวดทิ่มตา หรือหากมีช่องเล็กๆแมวจะใช้หนวดของมันในการพิจารณาว่ามันสามารถที่จะลอดผ่านได้หรือไม่ คำเตือน! ต้องการเล่นกับเเมวควรระวังหนวดเเมวให้เป็นพิเศษ เพราะเป็นประสาทสัมผัสที่สำคัญมากของเเมว",
      recommend: true,
      pic: "/catears.jpg",
    },
    {
      id: "01J62TJB26MF5912N2CZGFG2ST",
      id_cate: "01J61ZZFHKFEKX8DYHJNC2E8YD",
      title: "การรับรส",
      dcs: "ลิ้นที่เเข็งกระด้าง :หากให้แมวเลียมืออาจจะรู้สึกถึงความเเข็งกระด้างของลิ้น เพราะลิ้นของเเมวมีก้อนเเข็งที่ปูดออกมาทั่วลิ้นซึ่งก้อนเเข็งนั้นเรียกว่า ปุ่มรูปด้าย (Filiform Papillae) ซึ่งเป็นส่วนช่วยให้ลิ้นของเเมวทำงานได้อย่างมีประสิทธิภาพมากขึ้น ในตอนที่เเมวเลียขนเพื่อทำความสะอาดตัวเองที่เรียกว่า Grooming ปุ่มรูปด้ายจะช่วยทำหน้าที่เป็นเหมือนหวีในการแปรงขน รวมถึงตอนกินอาหารจะช่วยทำหน้าที่ในการบด<br/><br/>อ่อนไหวต่อรสขมเเละไม่รับรสหวาน :แมวมีส่วนที่รับรสขมที่ได้รับการพัฒนาขึ้นเป็นพิเศษ เพราะธรรมชาติของสัตว์กินเนื้อจะใช้ลิ้นในการแยกอาหารที่เน่าเสียหรืออาหารที่เป็นพิษ ในทางตรงกันข้ามนั้นแมวไม่สามารถที่จะ รับรสหวานได้ สำหรับสัตว์กินพืชเเละสัตว์ที่กินได้ทั้งเนื้อเเละพืชได้รับการพัฒนาให้สามารถรับรสหวานได้ เเต่สำหรับสัตว์กินเนื้ออย่างเเมวนั้นประสาทสัมผัสในการรับรสหวานนั้นได้เสื่อมหายไป เเต่ถึงอย่างงั้นเเมวก็ยังสามารถรับรสหวานได้จากอะมิโนซานเเละโปรตีน",
      recommend: false,
      pic: "/catears.jpg",
    },
    {
      id: "01J62TJB26MF5912N2CZGFG2TG",
      id_cate: "01J61ZZFHMYDYFTGDF6AK659PW",
      title: "กรงพกพาเคลื่อนที่",
      dcs: "เเนะนำให้ใช้กรงเเมวเเบบพลาสติกที่เเยกระหว่างส่วนบนกับส่วนล่างมากกว่ากรงที่เปิดจากด้าน...",
      recommend: true,
      pic: "/catears.jpg",
    },
    {
      id: "01J62BE0Y3M4TGRZXS3G0GW3BE",
      id_cate: "01J61ZZFHJAYM56B6JV9ZSQW0E",
      title: "โรคไข้หวัดเเมว",
      dcs: "FIP (Feline Infectious Peritonitis) เป็นโรคติดต่อที่รักษาไม่…",
      recommend: false,
      pic: "/FIP.jpg",
    },
    {
      id: "01J62BE0Y40B3J2AXVRJHHHXKP",
      id_cate: "01J61ZZFHKFEKX8DYHJNC2E8YD",
      title: "สัณชาตญาณ",
      dcs: "การถ่ายทอดอารมณ์ทางร่ายกาย :ในบางครั้งเเมวจะชอบขึ้นไปนั่งบนตักหรือเลียส่วนใดส่วนหนึ่งของผู้เลี้ยง นั่นคือสัณญาณบ่งบอกให้ผู้เลี้ยงว่าสามารถลูบตัวได้ เนื่องจากแมวยังมีความทรงจำในวัยเด็กจากการถูกเลียขนจากแม่แมวจึงต้องการให้ผู้เลี้ยงทำแบบเดียวกัน หากในขณะที่ลูบขนเเมวเบาๆคล้ายกับการหวีขนจะส่งผลให้แมวส่งเสียงร้องด้วยความรู้สึกดี เเน่นอนว่าการทำแบบนี้เป็นการสื่อสารของเเมวที่ต้องการให้สัมผัสตัว เเต่หากพยายามสัมผัสเเล้วแมว ต้องการอยู่เงียบๆเพียงลำพังก็อาจทำให้เเมวเกิดความเครียดได้ ดังนั้น ควรศึกษาภาษาท่าทางของเเมว ดังนี้<br/><br/>การอ้อน :หากแมวเอาหน้าหรือส่วนใดส่วนหนึ่งไปถูกับเจ้าของนั้นหมายถึงการอ้อน เป็นสัญญาณบอกว่าสามารถสัมผัสตัวของมันได้รวมถึงเมื่อมันทักทายเเมวตัวอื่นกฌจะใช้วิธีเดียวกัน<br/><br/>การเอาหัวมาชน :การที่แมวส่งเสียงร้องในขณะที่เอาหัวมาชนผู้เลี้ยงเรียกว่า Bunting โดยเป็นการกระทำที่หมายถึงความต้องการในการมุดเจ้าของเพื่อทำการทิ้งกลิ่นตัวไว้<br/><br/>การเหยียดขา :การที่เเมวเหยียดขาหน้าทั้งสองซ้ำๆเป็นการกระทำที่มันจดจำตอนที่เเม่ให้นมว่ามันต้องยืนเหยียดเเบบนั้น ดั้งนั้นผู้เลี้ยงควรใช้ตัว ผ้าห่ม หรือหมอนให้มันสามารถเหยียดได้ โดยจะทำให้เเมวอารมณ์ดีเเละมีความสุข<br/><br/>หดตัว :แมวเป็นสัตว์ที่ขี้กลัวมาก หากรู้สึกหวาดกลัวมันจะหาที่ซ่อนหรือไม่ก็วิ่งหนี พฤติกรรมนี้พบเห็นได้บ่อยในตอนที่รู้สึกหวาดกลัวคือการหดตัว การหดตัวนั้นคือการใช้หูเเละหนวดมาเเนบกับลำตัวเพื่อไม่ให้เห็นขาซึ่งเป็นท่าเตรียมป้องกัน<br/><br/>พองตัว :แมวที่กำลังหดตัวเต็มที่เเล้วอยู่ๆก็เหยียดขาตรงพร้อมกับพองตัวกฌสามารถพบเจอได้ หลังจากที่มันตั้งขาพร้อมกับเหยียดหาง พร้อมกับเหยียดขนนั้นคือท่าเตรียมในการจู่โจมของเเมว สาเหตุที่มันพองตัวเพราะทำให้ดูมีเเข็งเเรง<br/><br/>การให้เห็นท้อง :การที่แมวให้เห็นท้องได้นั้นมีความหมายเเตกต่างกันเล็กน้อย หากในระหว่างกำลังต่อสู้กับอีกฝ่ายตรงข้ามเเล้วหงายท้องให้ดูถือว่าเป็นการแสดงออกถึงการมีความสุข หรืออีกความหมายหนึ่งของการให้เห็นท้อง นั่นอาจหมายถึงกำลังเเสดงความมั่นใจหรือต้องการให้เล่นด้วยนั้นเอง โดยเฉพาะอย่างยิ่งจะพบเห็นได้จากแมวที่ทำตัวน่ารักเเต่ว่าการที่มันชอบให้ดูท้องนั้นไม่ได้หมายความว่าให้ลูบ ซึ่งอาจจะถูกกัดได้เพราะคิดว่ามาเล่นด้วย",
      recommend: false,
      pic: "/catnose.jpg",
    },
    {
      id: "01J62Z0EPWDATGW00BWC5RFQ08",
      id_cate: "01J61ZZFHMYDYFTGDF6AK659PW",
      title: "ทรายเเมว",
      dcs: "ทรายห้องน้ำแมว :แมวค่อนข้างอ่อนไหวต่อกลิ่นในห้องน้ำน้อย แต่จะมีความรู้สึกชอบเเละไม่ชอบต่อวัตถุที่ใช้โดยส่วนมากเเล้วเเมวจะชอบทรายที่นุ่มหากปูทรายประมาณ 8 เซนติเมตร ถือเป็นความสูงที่มีความเหมาะสมหากผู้เลี้ยงทำการเปลี่ยนทรายทันทีอาจทำให้เเมวเกิดภาวะเครียดได้ ให้ผู้เลี้ยงระมัดระวังในการเปลี่ยนทรายผู้เลี้ยงเเมวบางคนถามว่าสามารถใช้ทรายจากสนามเด็กเล่นได้หรือไม่? ไม่เเนะนำให้นำมาใช้ เพราะอาจมีความเสี่ยงในการติดเชื่อปรสิตได้รวมทั้งทรายในสนามเด็กเล่นไม่สามารถดักจับกลิ่นการขับถ่ายของเเมวได้อีกทั้งยังมีอนุภาคเล็กเเละสามารถปลิวไปทั่วบ้านได้ซึ่งส่งผลเสียต่อสุขภาพได้ทรายเเมวจึงถูกเเบ่งออกเป็น 2 ประเภทได้เเก่<br/><br/>ทรายเเมวชนิดเเข็ง<br/><br/>ทรายเเมวชนิดเเข็งเป็นทรายที่เเข็งตัวเมื่อเเมวขับถ่ายเพื่อดูดซึมของเสียที่เเมวขับถ่ายออกมาซึ่งเรียกว่ามันฝรั่งก็ได้เช่นกันสามารถดูเเลได้ง่ายเเละเเมวด็ชอบทรายชนิดนี้<br/><br/>ทรายเเมวชนิดซึมซับ<br/><br/>ทรายที่ดูดซึมของเสียของเเมวข้อดีของทรายชนิดนี้คือไม่จำเป็นที่จะต้องทำความสะอาดทุกๆวันทรายเเมวชนิดนี้ทำขึ้นมาจากหลานวัสดุ เช่น ทรายแมวคริสตัลที่ทำจากซิลิกาเจล ทรายเเมวจากไม่สนอัดเม็ดที่ทำจากขี้เลื่อย ทรายเเมวคริสตัลฝุ่นน้อยเเละสามารถนำกลับมาใช้ใหม่ได้ เเต่เเมวไม่ค่อยชอบทรายแบบนี้ ในขณะที่ไม้สนอัดเม็ดเป็นทรายที่เป็นมิตรกับสิ่งเเวดล้อมเเต่ก็ค่อนข้างมีฝุ่นเยอะ",
      recommend: false,
      pic: null,
    },
    {
      id: "01J62Z7QCHGDM3H4VP8GA7T112",
      id_cate: "01J61ZZFHJAYM56B6JV9ZSQW0E",
      title: "โรคเอดส์แมว",
      dcs: ".......",
      recommend: true,
      pic: null,
    },
    {
      id: "01J62ZC267WFR6DQN6YB20XZ0N",
      id_cate: "01J61ZZFHJAYM56B6JV9ZSQW0E",
      title: "โรคปอดอักเสบ",
      dcs: ".......",
      recommend: false,
      pic: null,
    },
    {
      id: "01J62ZGSK6QRP2ZG1WT7FS1T6H",
      id_cate: "01J61ZZFHK6ZY1W6GBY0JV2H4X",
      title: "ถ่ายเหลว",
      dcs: ".......",
      recommend: false,
      pic: "/CatAdvisorLogo.png",
    },
    {
      id: "01J62ZNFMZXB0Y327JH02JVKTP",
      id_cate: "01J61ZZFHK6ZY1W6GBY0JV2H4X",
      title: "นอนซึม",
      dcs: ".......",
      recommend: false,
      pic: null,
    },
    {
      id: "01J62ZGSK6QRP2ZG1WT7FS1BTY",
      id_cate: "01J61ZZFHK6ZY1W6GBY0JV2H4X",
      title: "ทำหมันแมว",
      dcs: ".......",
      recommend: true,
      pic: "/CatAdvisorLogo.png",
    },
  ];

  const [dataBlog, setDataBlog] = useState(blog);
  const [keyword, setKeyword] = useState("");
  const selectCate = (id) => {
    if (id === "all") {
      setDataBlog(blog);
    } else {
      setDataBlog(blog.filter((data) => data.id_cate === id));
    }
  };

  const searchByKeywords = (event) => {
    if (event.code === "Enter" || event.type === "click") {
      const textSearch = keyword
        .split("แมว")
        .map((data) => data.replace(/ /g, ""))
        .filter((value) => value != "");
      setDataBlog(
        blog.filter((data) =>
          textSearch?.some((value) => data.dcs.includes(value))
        )
      );
    }
  };
  return (
    <Contain>
      <DivHead>
        <DivSearch>
          <FormControl
            sx={{ m: 1, width: "785px", "& fieldset": { border: "none" } }}
            variant="outlined"
          >
            <OutlinedInput
              id="outlined-adornment-password"
              type={"text"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={(e) => searchByKeywords(e)}
                    edge="end"
                  >
                    <SearchIcon style={{ color: "white" }} />
                  </IconButton>
                </InputAdornment>
              }
              onKeyDown={(e) => searchByKeywords(e)}
              onChange={(e) =>
                e.target.value == ""
                  ? setDataBlog(blog)
                  : setKeyword(e.target.value)
              }
            />
          </FormControl>
        </DivSearch>
        <DivMenu>
          <BottomMenu onClick={() => selectCate("all")}>ทั้งหมด</BottomMenu>
          {catagoryCat.map((data, i) => (
            <>
              <Icon src={process.env.PUBLIC_URL + data.icon} />
              <BottomMenu onClick={() => selectCate(data.id)}>
                {data.name}
              </BottomMenu>
            </>
          ))}
        </DivMenu>
      </DivHead>
      <DivList>
        {dataBlog.length == 0
          ? "ไม่พบข้อมูลที่ค้นหา"
          : dataBlog.map((data, i) => (
              <DivCard>
                {data.id_cate == "01J61ZZFHJAYM56B6JV9ZSQW0E" && (
                  <DivCatagory background={"/medicon.png"} />
                )}
                {data.id_cate == "01J61ZZFHK6ZY1W6GBY0JV2H4X" && (
                  <DivCatagory background={"/bookicon.png"} />
                )}
                {data.id_cate == "01J61ZZFHKFEKX8DYHJNC2E8YD" && (
                  <DivCatagory background={"/caticon.png"} />
                )}
                {data.id_cate == "01J61ZZFHMYDYFTGDF6AK659PW" && (
                  <DivCatagory background={"/foodicon.png"} />
                )}
                <DivPic src={process.env.PUBLIC_URL + data.pic} />
                <TitleCard>{data.title}</TitleCard>
                <Dcs>{data.dcs}</Dcs>
                <DivBottom>
                  <DivButton>
                    <SeeMore
                      onClick={() =>
                        (window.location.href = "/text-blog-list/" + data.id)
                      }
                    >
                      เพิ่มเติม
                    </SeeMore>
                  </DivButton>
                  <DivReccommend>
                    {data.recommend && <Reccommend>เเนะนำ</Reccommend>}
                  </DivReccommend>
                </DivBottom>
              </DivCard>
            ))}
      </DivList>
    </Contain>
  );
}

export default BlogList;
