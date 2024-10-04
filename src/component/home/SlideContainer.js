import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styled from "@emotion/styled/macro";
import { getBlogList } from "../../api/blog";
const DivPic = styled.div`
  position: relative;
  max-width: 100%;
`;

const DivPicInside = styled.img`
  width: 335px;
  height: 280px;
  object-fit: cover;
`;

const SliderContainer = styled.div`
  padding-left: 240px;
  padding-right: 240px;
  max-width: 100%;
  background-color: #efe7d0;
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

const DivCard = styled.div`
  position: relative;
  width: 335px;
  height: 454px;
  background-color: #ffffff;
  cursor: pointer;
  margin-right: 30px;
  margin-top: 50px;
  margin-bottom: 40px;
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

function Slide() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const [dataBlogs, setDataBlogs] = useState([]);

  useEffect(() => {
    var newData = [];
    const getData = getBlogList()
      .then((data) => {
        if (data?.data?.code === 200) {
          Object.keys(data?.data?.data).map(
            (key, i) => i < 10 && [newData.push(data?.data?.data[key])]
          );
          setDataBlogs(newData);
        }
      })
      .catch((err) => err);

    return () => {
      clearInterval(getData); // ใช้ clearInterval แทน destroy
    };
  }, []);

  return (
    <SliderContainer>
      <Carousel responsive={responsive}>
        {dataBlogs.map((data) => (
          <DivCard key={data.id}>
            <DivPic>
              <DivPicInside src={data.imgCat} alt={data.title} />
              {data.cateId === "01J61ZZFHKFEKX8DYHJNC2E8YD" && (
                <DivCatagory background={"/caticon.png"} />
              )}
              {data.cateId === "01J61ZZFHK6ZY1W6GBY0JV2FGC" && (
                <DivCatagory background={"/heart_3319163.png"} />
              )}

              {data.cateId === "01J61ZZFHMYDYFTGDF6AK659PW" && (
                <DivCatagory background={"/foodicon.png"} />
              )}

              {data.cateId === "01J61ZZFHJAYM56B6JV9ZSQW0E" && (
                <DivCatagory background={"/medicon.png"} />
              )}
              {data.cateId === "01J61ZZFHK6ZY1W6GBY0JV2H4X" && (
                <DivCatagory background={"/bookicon.png"} />
              )}
            </DivPic>
            <TitleCard>{data.title}</TitleCard>
            <Dcs dangerouslySetInnerHTML={{ __html: data.description }} />
            <DivBottom>
              <DivButton>
                <SeeMore
                  onClick={() =>
                    (window.location.href = "/text-blog-list/" + data.id)
                  }
                >
                  ดูเพิ่มเติม
                </SeeMore>
              </DivButton>
              {data.recommend && (
                <DivReccommend>
                  <Reccommend>แนะนำ</Reccommend>
                </DivReccommend>
              )}
            </DivBottom>
          </DivCard>
        ))}
      </Carousel>
    </SliderContainer>
  );
}

export default Slide;
