import styled from "@emotion/styled/macro";
import { useState, useEffect } from "react";
import { getBlogList } from "../../api/blog";
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
  color: ${({ color }) => (color === "true" ? "#ffcc00" : "#FFFFFF")};
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

const DivDataNotFound = styled.div`
  width: 100%;
  text-align: center;
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

  const [keyword, setKeyword] = useState("");
  const [ifFocus, setIsFocus] = useState("all");

  const [dataBlogs, setDataBlogs] = useState([]);
  const [dataDB, setDataDB] = useState([]);

  useEffect(() => {
    var newData = [];
    const getData = getBlogList()
      .then((data) => {
        if (data?.data?.code === 200) {
          Object.keys(data?.data?.data).map((key) => [
            newData.push(data?.data?.data[key]),
          ]);
          setDataBlogs(newData);
          setDataDB(newData);
        }
      })
      .catch((err) => err);

    return () => {
      clearInterval(getData); // ใช้ clearInterval แทน destroy
    };
  }, []);

  const selectCate = (id) => {
    setIsFocus(id);
    if (id === "all") {
      setDataBlogs(dataDB);
    } else {
      setDataBlogs(dataDB.filter((data) => data.cateId === id));
    }
  };

  const searchByKeywords = (event) => {
    if (event.code === "Enter" || event.type === "click") {
      const textSearch = keyword
        .split("แมว")
        .map((data) => data.replace(/ /g, ""))
        .filter((value) => value != "");
      setDataBlogs(
        dataDB.filter((data) =>
          textSearch?.some((value) => data.description.includes(value))
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
                  ? setDataBlogs(dataDB)
                  : setKeyword(e.target.value)
              }
            />
          </FormControl>
        </DivSearch>
        <DivMenu>
          <BottomMenu
            color={ifFocus === "all" ? "true" : "false"}
            onClick={() => selectCate("all")}
          >
            ทั้งหมด
          </BottomMenu>
          {catagoryCat.map((data, i) => (
            <>
              <Icon src={process.env.PUBLIC_URL + data.icon} />
              <BottomMenu
                color={ifFocus === data.id ? "true" : "false"}
                onClick={() => selectCate(data.id)}
              >
                {data.name}
              </BottomMenu>
            </>
          ))}
        </DivMenu>
      </DivHead>
      <DivList>
        {dataBlogs.length == 0 ? (
          <DivDataNotFound>ไม่พบข้อมูลที่ค้นหา</DivDataNotFound>
        ) : (
          dataBlogs.map((data, i) => (
            <DivCard>
              {data.cateId == "01J61ZZFHJAYM56B6JV9ZSQW0E" && (
                <DivCatagory background={"/medicon.png"} />
              )}
              {data.cateId == "01J61ZZFHK6ZY1W6GBY0JV2H4X" && (
                <DivCatagory background={"/bookicon.png"} />
              )}
              {data.cateId == "01J61ZZFHKFEKX8DYHJNC2E8YD" && (
                <DivCatagory background={"/caticon.png"} />
              )}
              {data.cateId == "01J61ZZFHMYDYFTGDF6AK659PW" && (
                <DivCatagory background={"/foodicon.png"} />
              )}
              {data.cateId == "01J61ZZFHK6ZY1W6GBY0JV2FGC" && (
                <DivCatagory background={"/heart_3319163.png"} />
              )}
              <DivPic src={process.env.PUBLIC_URL + data.imgCat} />
              <TitleCard>{data.title}</TitleCard>
              <Dcs>{data.description}</Dcs>
              <DivBottom>
                <DivButton>
                  <SeeMore
                    onClick={() =>
                      (window.location.href = "/text-blog-list?" + data.id)
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
          ))
        )}
      </DivList>
    </Contain>
  );
}

export default BlogList;
