import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styled from "@emotion/styled/macro";

const Contain = styled.div`
  margin-bottom: 40px;
  margin-top: 40px;
  position: relative;
  padding-left: 240px;
  padding-right: 240px;
  max-width: 100%;
`;

const Card = styled.div`
  width: 350px;
  height: 200px;
  background-color: ${(props) => props.bg};
  text-align: center;
  cursor: pointer;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: bold;
  width: 350px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;

  &:hover {
    color: #ffcc00; /* เปลี่ยนสีเมื่อเมาส์วาง */
  }
`;

const DivImage = styled.img`
  height: 200px;
`;

function SlideCat({ data }) {
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

  return (
    <Contain>
      <Carousel responsive={responsive}>
        {data.map((value) => (
          <>
            <Card
              onClick={() =>
                (window.location.href = "/cat-breeds-detail/" + value.id)
              }
              bg={value.bgColor}
            >
              <DivImage src={process.env.PUBLIC_URL + value.pic} />
            </Card>
            <Name
              onClick={() =>
                (window.location.href = "/cat-breeds-detail/" + value.id)
              }
            >
              {value.nameTh + " " + value.nameEn}
            </Name>
          </>
        ))}
        {data.map((value) => (
          <>
            <Card
              onClick={() =>
                (window.location.href = "/cat-breeds-detail/" + value.id)
              }
              bg={value.bgColor}
            >
              <DivImage src={process.env.PUBLIC_URL + value.pic} />
            </Card>
            <Name
              onClick={() =>
                (window.location.href = "/cat-breeds-detail/" + value.id)
              }
            >
              {value.nameTh + " " + value.nameEn}
            </Name>
          </>
        ))}
      </Carousel>
    </Contain>
  );
}

export default SlideCat;
