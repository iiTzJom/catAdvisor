import DetailCatBreed from "./DetailCatBreed";
import { useEffect, useState } from "react";
import CatModel from "./Model";
import SlideCat from "./CatSlide";
import { getCatBreedsDetail, getListCatBreeds } from "../../api/catBreeds";
import styled from "@emotion/styled/macro";
const Contain = styled.div`
  // margin-bottom: 40px;
  // margin-top: 40px;
  // position: relative;
  // padding-left: 240px;
  // padding-right: 240px;
  max-width: 100%;
`;

function CatBreedDetail() {
  const [catDetail, setCatDetail] = useState("");

  useEffect(() => {
    const getData = getCatBreedsDetail(window.location.search.slice(1)).then(
      (data) => {
        if (data.data.code === 200) {
          setCatDetail(data.data.data);
        }
      }
    );
    return () => {
      clearInterval(getData); // ใช้ clearInterval แทน destroy
    };
  }, []);

  const [listCatBreeds, setListCatBreeds] = useState([]);

  useEffect(() => {
    var newData = [];
    const getData = getListCatBreeds()
      .then((data) => {
        if (data?.data?.code === 200) {
          Object.keys(data?.data?.data).map(
            (key, i) => i < 10 && [newData.push(data?.data?.data[key])]
          );
          setListCatBreeds(newData);
        }
      })
      .catch((err) => err);

    return () => {
      clearInterval(getData); // ใช้ clearInterval แทน destroy
    };
  }, []);

  return (
    <Contain>
      <DetailCatBreed data={catDetail} />
      <CatModel data={catDetail} />
      <SlideCat data={listCatBreeds} />
    </Contain>
  );
}

export default CatBreedDetail;
