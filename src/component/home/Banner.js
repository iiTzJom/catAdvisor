import styled from "@emotion/styled/macro";

const Banner = styled.div`
  width: 100%;
  height: 530px;
  background-image: url(${process.env.PUBLIC_URL + "/catwall.jpg"});
  background-position: center;
  position: relative;
`;

const DivTextBanner = styled.div`
  font-size: 200px;
  color: #ffffff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: max-content;
`;

function Banners() {
  return (
    <>
      <Banner>
        <DivTextBanner>Cat Advisor</DivTextBanner>
      </Banner>
    </>
  );
}

export default Banners;
