import React, { useState, useEffect } from "react";
import styled from "@emotion/styled/macro";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { getListCatBreeds, deleteCatBreeds } from "../../../api/catBreeds";
const Container = styled.div`
  display: flex;
  background-color: #71a9db; /* Background of main page */
  height: 100vh;
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 92%;
  //max-width: 90%;
  margin-right: 20px;
  justify-items: center;
  overflow-y: scroll;
  overflow-x: clip;
  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #ededed;
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #d4d2d2;
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #d4d4d4;
  }
`;

const CatCard = styled.div`
  background-color: ${(props) => props.bgColor || "#fff"};
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 350px;
  height: 450px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 50px;
  margin-bottom: 50px;
`;

const CatImage = styled.img`
  width: 250px;
  height: 250px;
  object-fit: contain;
  border-radius: 10px;
  position: absolute;
  top: 20px;
`;

const CatName = styled.h3`
  margin-top: 280px;
  font-size: 18px;
  font-weight: bold;
  line-height: 1.5;
  text-align: center;
  white-space: pre-line;
`;

const DivIconLoading = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  z-index: 100;
`;

const AddButton = styled(Button)`
  background-color: #f59a83;
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 16px;
  margin-bottom: 20px;
  &:hover {
    background-color: #fa8466;
  }
`;

const DivButtonAdd = styled.div`
  width: 80%;
  text-align: end;
`;

const CardButton = styled(Button)`
  margin-top: 10px;
  width: 100%;
  background-color: ${(props) =>
    props.variant === "edit" ? "#ffb74d" : "#ef5350"};
  color: white;
  &:hover {
    background-color: ${(props) =>
      props.variant === "edit" ? "#ffa726" : "#e53935"};
  }
`;

function CatDataList() {
  const [isLoading, setIsLoading] = useState(false);

  const [dataCatBreeds, setDataCatBreedss] = useState([]);

  useEffect(() => {
    var newData = [];
    const getData = getListCatBreeds()
      .then((data) => {
        if (data?.data?.code === 200) {
          Object.keys(data?.data?.data).map((key) => [
            newData.push(data?.data?.data[key]),
          ]);
          setDataCatBreedss(newData);
        }
      })
      .catch((err) => err);

    return () => {
      clearInterval(getData);
    };
  }, []);

  const handelDelete = (id) => {
    deleteCatBreeds(id)
      .then((data) => {
        if (data?.data?.code === 200) {
          window.location.href = "/admin?cat-data-list";
        }
      })
      .catch((err) => err);
  };
  return (
    <Container>
      <DivIconLoading>{isLoading && <CircularProgress />}</DivIconLoading>
      <ContentWrapper>
        <DivButtonAdd>
          <AddButton
            onClick={() => (window.location.href = "/Admin?add-edit-data-cat")}
            startIcon={<AddIcon />}
          >
            เพิ่มข้อมูลแมว
          </AddButton>
        </DivButtonAdd>
        <CardGrid>
          {dataCatBreeds?.map((cat, index) => (
            <CatCard
              key={index}
              bgColor={cat.backgroundColor}
              className="cat-card"
            >
              <CatImage src={cat.imgGeneral} />

              <CatName>
                {cat.nameTH}
                <br />
                {cat.nameEN}
              </CatName>

              <CardButton
                variant="edit"
                onClick={() =>
                  (window.location.href =
                    "/Admin?add-edit-data-cat&id=" + cat.id)
                }
              >
                แก้ไข
              </CardButton>
              <CardButton variant="delete" onClick={() => handelDelete(cat.id)}>
                ลบ
              </CardButton>
            </CatCard>
          ))}
        </CardGrid>
      </ContentWrapper>
    </Container>
  );
}

export default CatDataList;
