import React, { useState } from "react";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import AddCatModal from "./addCat";
import EditCatModal from "./editCat";

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

const CardAvatarContainer = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto;
`;

const CardAvatar = styled.img`
  width: 100%;
  height: 100%;
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

const HiddenInput = styled.input`
  display: none;
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
      avatar: "https://via.placeholder.com/100", // ลิงก์รูป placeholder
    },
    {
      id: 2,
      name: "เลโอ",
      breed: "อเมริกัน ช็อตแฮร์",
      gender: "เมีย",
      birthDate: "2022-07-11",
      statusColor: "green",
      avatar: "https://via.placeholder.com/100", // ลิงก์รูป placeholder
    },
  ]);

  const [isAddCatModalOpen, setIsAddCatModalOpen] = useState(false);
  const [isEditCatModalOpen, setIsEditCatModalOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState(null);
  const [typeModal, setTypeModal] = useState("Create");

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

  // ฟังก์ชันอัปเดตอวาตาร์
  const handleAvatarChange = (e, catId) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedCats = catsData.map((cat) =>
          cat.id === catId ? { ...cat, avatar: reader.result } : cat
        );
        setCatsData(updatedCats);
      };
      reader.readAsDataURL(file);
    }
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
                {/* วงกลมสำหรับแสดงรูปแมว */}
                <CardAvatarContainer>
                  <CardAvatar src={cat.avatar} alt={`รูปของ ${cat.name}`} />

                  {/* ปุ่มสำหรับอัปโหลดรูป */}
                  {/* <UploadButton htmlFor={`avatar-upload-${cat.id}`}>
                    <PhotoCameraIcon color="primary" />
                    <HiddenInput
                      id={`avatar-upload-${cat.id}`}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleAvatarChange(e, cat.id)}
                    />
                  </UploadButton> */}
                </CardAvatarContainer>

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
                  onClick={() => {
                    setTypeModal("Edit");
                    setSelectedCat(cat);
                    openAddCatModal();
                  }}
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
        service={typeModal}
        catData={selectedCat}
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
