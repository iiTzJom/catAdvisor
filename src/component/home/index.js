import styled from "@emotion/styled/macro";
import AboutMe from "./AboutMe";
import CatBreed from "./CatBreed";
import Banners from "./Banner";
import SliderContainer from "./SlideContainer";

const Contain = styled.div`
  width: 100%;
  height: 100%;
`;

function Home() {
  return (
    <Contain>
      TEST2587963ffffff
      <Banners />
      <AboutMe />
      <CatBreed />
      <SliderContainer />
    </Contain>
  );
}

export default Home;
