import React, { useState } from "react";
import styled from "@emotion/styled";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import AddCatModal from "./addCat";
import EditCatModal from "./editCat";

const Container = styled.div`
  background-color: #71a9db;
  min-height: 100vh;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

const AddButton = styled(Button)`
  background-color: #ffb74d;
  color: white;
  padding: 10px 20px;
  border-radius: 30px;
  &:hover {
    background-color: #ffa726;
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

const CardAvatar = styled(Avatar)`
  width: 100px;
  height: 100px;
  margin: 0 auto;
  position: relative;
`;

const StatusIcon = styled.div`
  width: 15px;
  height: 15px;
  background-color: ${(props) => props.color || "green"};
  border-radius: 50%;
  border: 2px solid white;
  position: absolute;
  top: 0;
  right: 10px;
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
  const now = new Date();
  const birth = new Date(birthDate);
  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();

  if (months < 0 || (months === 0 && now.getDate() < birth.getDate())) {
    years--;
    months += 12;
  }

  const totalMonths = years * 12 + months;
  return {
    years,
    months,
    totalMonths,
  };
};

function DataCats() {
  const [catsData, setCatsData] = useState([
    {
      id: 1,
      name: "ฟุกุ",
      breed: "สก็อตติช โฟลด์",
      gender: "ผู้",
      birthDate: "2022-07-11",
      statusColor: "orange",
      avatar: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "เลโอ",
      breed: "อเมริกัน ช็อตแฮร์",
      gender: "เมีย",
      birthDate: "2022-07-11",
      statusColor: "green",
      avatar: "https://via.placeholder.com/100",
    },
  ]);

  const [isAddCatModalOpen, setIsAddCatModalOpen] = useState(false);
  const [isEditCatModalOpen, setIsEditCatModalOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState(null);

  const openAddCatModal = () => setIsAddCatModalOpen(true);
  const closeAddCatModal = () => setIsAddCatModalOpen(false);

  const openEditCatModal = (cat) => {
    setSelectedCat(cat);
    setIsEditCatModalOpen(true);
  };
  const closeEditCatModal = () => setIsEditCatModalOpen(false);

  const handleAddCat = (newCat) => {
    const newId =
      catsData.length > 0 ? Math.max(catsData.map((cat) => cat.id)) + 1 : 1;
    const catWithId = { ...newCat, id: newId };
    setCatsData([...catsData, catWithId]);
    closeAddCatModal();
  };

  const handleEditCat = (updatedCat) => {
    setCatsData(
      catsData.map((cat) => (cat.id === updatedCat.id ? updatedCat : cat))
    );
    closeEditCatModal();
  };

  return (
    <Container>
      <Header>
        <AddButton startIcon={<AddIcon />} onClick={openAddCatModal}>
          เพิ่มข้อมูลแมว
        </AddButton>
      </Header>

      <CardsContainer>
        {catsData.length > 0 ? (
          catsData.map((cat) => {
            const { years, months, totalMonths } = calculateAge(cat.birthDate);
            return (
              <Card key={cat.id}>
                <CardAvatar src={cat.avatar}>
                  <StatusIcon color={cat.statusColor} />
                </CardAvatar>
                <CardContent>
                  <h3>{cat.name}</h3>
                  <p>{cat.breed}</p>
                  <p>เพศ: {cat.gender}</p>
                  <p>
                    อายุ:{" "}
                    {totalMonths >= 12
                      ? `${Math.floor(totalMonths / 12)} ปี ${
                          totalMonths % 12
                        } เดือน`
                      : `${totalMonths} เดือน`}
                  </p>
                  <p>วันเกิด: {cat.birthDate}</p>
                </CardContent>
                <CardButton variant="delete">ลบ</CardButton>
                <CardButton
                  variant="edit"
                  onClick={() => openEditCatModal(cat)}
                >
                  แก้ไข
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
        handleSubmit={handleAddCat}
      />

      <EditCatModal
        open={isEditCatModalOpen}
        cat={selectedCat}
        handleClose={closeEditCatModal}
        handleSubmit={handleEditCat}
      />
    </Container>
  );
}

export default DataCats;
