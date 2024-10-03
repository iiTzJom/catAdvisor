import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import AddCatModal from "./addCat";
import { getCatByUser, deleteCatByUser } from "../../../api/userCatData";
const Container = styled.div`
  background-color: #71a9db;
  max-height: 100vh;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  margin-bottom: 40px;
  width: 100%;
  justify-content: end;
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

const CardsContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const Card = styled.div`
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  width: 250px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const CardAvatarContainer = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto;
`;

const CardAvatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #ccc; /* กรณีไม่มีรูปภาพ */
`;

const UploadButton = styled.label`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #fff;
  border-radius: 50%;
  padding: 4px;
  border: 2px solid #1976d2;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardContent = styled.div`
  margin-top: 10px;
  font-size: 16px;
  text-align: left;
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

const calculateAge = (birthDate) => {
  const today = new Date();
  const birth = new Date(birthDate);

  const age = today.getFullYear() - birth.getFullYear(); // คำนวณปี

  const monthDiff = today.getMonth() - birth.getMonth(); // คำนวณเดือน

  return age + " ปี" + " " + monthDiff + " เดือน";
};

function DataCats({ name }) {
  const [catsData, setCatsData] = useState([]);

  useEffect(() => {
    var newData = [];
    const getData = getCatByUser(name)
      .then((data) => {
        if (data?.data?.code === 200) {
          Object.keys(data?.data?.data).map((key) => [
            newData.push(data?.data?.data[key]),
          ]);
          setCatsData(newData);
          // setDataDB(newData);
        }
      })
      .catch((err) => err);

    return () => {
      clearInterval(getData); // ใช้ clearInterval แทน destroy
    };
  }, []);

  const [isAddCatModalOpen, setIsAddCatModalOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState(null);
  const [typeModal, setTypeModal] = useState("Create");

  const openAddCatModal = () => setIsAddCatModalOpen(true);
  const closeAddCatModal = () => setIsAddCatModalOpen(false);

  const handelDelete = (id) => {
    deleteCatByUser(name, id)
      .then((data) => {
        if (data?.data?.code === 200) {
          window.location.href = "/Manage?catData";
        }
      })
      .catch((err) => err);
  };

  return (
    <Container>
      <Header>
        <AddButton
          startIcon={<AddIcon />}
          onClick={() => {
            setTypeModal("Create");
            setSelectedCat(null);
            openAddCatModal();
          }}
        >
          เพิ่มข้อมูลแมว
        </AddButton>
      </Header>

      <CardsContainer>
        {catsData.length > 0 ? (
          catsData.map((cat) => {
            const { years, months, totalMonths } = calculateAge(cat.birthDate);
            return (
              <Card key={cat.id}>
                <CardAvatarContainer>
                  <CardAvatar src={cat.imgCat} />
                </CardAvatarContainer>

                <CardContent>
                  <h3>{cat.nameCat}</h3>
                  <p>{cat.breedCat}</p>
                  <p>เพศ: {cat.genderCat}</p>
                  <p>อายุ: {calculateAge(cat.birthDateCat)}</p>
                  <p>
                    วันเกิด:{" "}
                    {new Date(cat.birthDateCat).getDate() +
                      "-" +
                      (new Date(cat.birthDateCat).getMonth() + 1) +
                      "-" +
                      new Date(cat.birthDateCat).getFullYear()}
                  </p>
                </CardContent>

                <CardButton
                  variant="edit"
                  onClick={() => {
                    setTypeModal("Edit");
                    setSelectedCat(cat);
                    openAddCatModal();
                  }}
                >
                  แก้ไข
                </CardButton>
                <CardButton
                  variant="delete"
                  onClick={() => handelDelete(cat.id)}
                >
                  ลบ
                </CardButton>
              </Card>
            );
          })
        ) : (
          <p>ไม่พบแมวที่ค้นหา</p>
        )}
      </CardsContainer>

      <AddCatModal
        open={isAddCatModalOpen}
        handleClose={closeAddCatModal}
        service={typeModal}
        catData={selectedCat}
        name={name}
      />

      {/* <EditCatModal
        open={isEditCatModalOpen}
        cat={selectedCat}
        handleClose={closeEditCatModal}
        handleSubmit={handleEditCat}
      /> */}
    </Container>
  );
}

export default DataCats;
