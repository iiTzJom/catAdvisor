import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddCatModal from "./addCat";
import ViewVaccineHistoryModal from "./history";
import VaccineProgram from "./vaccineProgramModal";
import IconButton from "@mui/material/IconButton";
import VaccineIcon from "@mui/icons-material/HealthAndSafety";
import axios from "axios";
import { getCatByUser, deleteCatByUser } from "../../../api/userCatData";
import { getVaccineHistory } from "../../../api/userVacine";

// Moved the getCatById function outside the component
export const getCatById = async (catId) => {
  try {
    const response = await axios.get(`/api/cats/${catId}`);
    return response.data; // Assuming the API returns the cat's data in response.data
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch cat data by ID");
  }
};

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
  position: relative;
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
  background-color: #ccc;
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
    props.variant === "edit"
      ? "#ffb74d"
      : props.variant === "history"
      ? "#64b5f6"
      : "#ef5350"};
  color: white;
  &:hover {
    background-color: ${(props) =>
      props.variant === "edit"
        ? "#ffa726"
        : props.variant === "history"
        ? "#42a5f5"
        : "#e53935"};
  }
`;

const calculateAge = (birthDate) => {
  const today = new Date();
  const birth = new Date(birthDate);
  const age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  return `${age} ปี ${monthDiff} เดือน`;
};

function DataCats({ name }) {
  const [catsData, setCatsData] = useState([]);
  const [error, setError] = useState(null);
  const [isAddCatModalOpen, setIsAddCatModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isVaccineProgramModalOpen, setIsVaccineProgramModalOpen] =
    useState(false);
  const [selectedCat, setSelectedCat] = useState(null);
  const [vaccineHistory, setVaccineHistory] = useState([]);
  const [typeModal, setTypeModal] = useState("Create");
  const [selectedCatId, setSelectedCatId] = useState(null);
  const [filteredVaccineHistory, setFilteredVaccineHistory] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getCatByUser(name);
        if (data?.data?.code === 200) {
          const newData = Object.values(data.data.data);
          setCatsData(newData);
        }
      } catch (err) {
        setError("Failed to fetch cat data. Please try again.");
        console.error(err);
      }
    };

    getData();
  }, [name]);

  const openAddCatModal = () => setIsAddCatModalOpen(true);
  const closeAddCatModal = () => setIsAddCatModalOpen(false);
  const openHistoryModal = () => setIsHistoryModalOpen(true);
  const closeHistoryModal = () => setIsHistoryModalOpen(false);

  const openVaccineProgramModal = (catId) => {
    setSelectedCatId(catId); // Using catId instead of catName
    setIsVaccineProgramModalOpen(true);
  };

  const closeVaccineProgramModal = () => {
    setSelectedCatId(null); // Clear selected cat ID
    setIsVaccineProgramModalOpen(false);
  };

  const handelDelete = (id) => {
    deleteCatByUser(name, id)
      .then((data) => {
        if (data?.data?.code === 200) {
          window.location.href = "/Manage?catData";
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const viewVaccineHistory = (catName) => {
    getVaccineHistory({ userName: name, catName })
      .then((data) => {
        if (data?.data?.code === 200) {
          const historyData = data.data.data;
          const historyArray = Object.values(historyData);
          const filteredData = historyArray.filter(
            (history) => history.idCat === catName
          );
          setFilteredVaccineHistory(filteredData);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <Container>
      {error && <p style={{ color: "red" }}>{error}</p>}
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

                <IconButton
                  onClick={() => openVaccineProgramModal(cat.id)}
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    color: "#ffffff",
                    backgroundColor: "#71A9DB",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    "&:hover": {
                      backgroundColor: "#5692b6",
                      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
                    },
                  }}
                >
                  <VaccineIcon />
                </IconButton>

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
                <CardButton
                  variant="history"
                  onClick={() => {
                    viewVaccineHistory(cat.id); // Pass cat id for history
                    openHistoryModal();
                  }}
                >
                  ดูประวัติการรักษา
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
      <ViewVaccineHistoryModal
        open={isHistoryModalOpen}
        handleClose={closeHistoryModal}
        vaccineHistory={filteredVaccineHistory}
      />
      <VaccineProgram
        open={isVaccineProgramModalOpen}
        handleClose={closeVaccineProgramModal}
        selectedCatId={selectedCatId}
      />
    </Container>
  );
}

export default DataCats;
