import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { getCatAllUser } from "../../../api/userCatData";
import debounce from "lodash/debounce";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

const Container = styled.div`
  background-color: #71a9db;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FilterContainer = styled.div`
  margin-bottom: 20px;
`;

const FilterInput = styled.input`
  padding: 10px 20px;
  border: 2px solid #ddd;
  border-radius: 25px;
  width: 300px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #5c8dbc;
  }
`;

const StatsContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  gap: 50px;
`;

const StatBox = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 150px;
  cursor: pointer;

  h3 {
    margin-bottom: 5px;
    font-size: 18px;
    color: #333;
  }

  p {
    font-size: 22px;
    color: #555;
    font-weight: bold;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  width: 280px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
  }
`;

const CardAvatarContainer = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 15px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
`;

const CardAvatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardContent = styled.div`
  font-size: 14px;
  text-align: left;

  h3 {
    font-size: 18px;
    color: #333;
    margin-bottom: 8px;
  }

  p {
    margin: 5px 0;
    color: #555;
  }
`;

const NoCatsMessage = styled.p`
  font-size: 18px;
  color: #666;
`;

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%", // ทำให้กว้างขึ้น
  maxWidth: 800,
  maxHeight: "80%", // จำกัดความสูงสูงสุด
  overflowY: "auto", // ให้เลื่อนขึ้นลงได้
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const calculateAge = (birthDate) => {
  const today = new Date();
  const birth = new Date(birthDate);
  const age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  return age + " ปี" + " " + monthDiff + " เดือน";
};

function CatListUser() {
  const [catsData, setCatsData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [open, setOpen] = useState(false);
  const [openBreedModal, setOpenBreedModal] = useState(false);
  const [selectedUserCats, setSelectedUserCats] = useState([]);
  const [uniqueBreeds, setUniqueBreeds] = useState([]);

  const handleOpen = (userCats) => {
    setSelectedUserCats(userCats);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleOpenBreedModal = () => setOpenBreedModal(true);
  const handleCloseBreedModal = () => setOpenBreedModal(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getCatAllUser();
        if (response?.data?.code === 200) {
          const allUsersCats = Object.values(response.data.data).flatMap(
            (userCats) => Object.values(userCats)
          );
          setCatsData(allUsersCats);

          const users = Object.keys(response.data.data);
          setUsersData(users);

          // หาสายพันธุ์แมวที่ไม่ซ้ำกัน
          const breeds = [...new Set(allUsersCats.map((cat) => cat.breedCat))];
          setUniqueBreeds(breeds);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getData();
  }, []);

  const handleFilterChange = (e) => {
    const { value } = e.target;
    debounce(() => setFilterText(value), 300)();
  };

  const filteredCats = catsData.filter((cat) =>
    filterText
      ? cat.createBy.toLowerCase().includes(filterText.toLowerCase())
      : true
  );

  const userCatsCount = usersData.length;
  const catCount = catsData.length;
  const breedCount = uniqueBreeds.length;

  return (
    <Container>
      {/* ส่วนสถิติ */}
      <StatsContainer>
        <StatBox>
          <h3>จำนวนผู้ใช้</h3>
          <p>{userCatsCount}</p>
        </StatBox>
        <StatBox>
          <h3>จำนวนแมว</h3>
          <p>{catCount}</p>
        </StatBox>
        <StatBox onClick={handleOpenBreedModal}>
          <h3>จำนวนสายพันธุ์</h3>
          <p>{breedCount}</p>
          <b>ดูรายละเอียด</b>
        </StatBox>
      </StatsContainer>

      {/* ช่องกรอง */}
      <FilterContainer>
        <FilterInput
          type="text"
          placeholder="กรองตามชื่อเจ้าของแมว"
          onChange={handleFilterChange}
        />
      </FilterContainer>

      {/* ตารางผู้ใช้ */}
      <TableContainer component={Paper}>
        <Table aria-label="user cat table">
          <TableHead>
            <TableRow>
              <TableCell>ชื่อผู้ใช้</TableCell>
              <TableCell>จำนวนแมว</TableCell>
              <TableCell>ดูรายละเอียด</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersData.map((user) => {
              const userCats = catsData.filter((cat) => cat.createBy === user);
              return (
                <TableRow key={user}>
                  <TableCell>{user}</TableCell>
                  <TableCell>{userCats.length}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleOpen(userCats)}>
                      ดูรายละเอียด
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal สำหรับแสดงรายละเอียดแมว */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <h2>รายละเอียดแมวของผู้ใช้</h2>
          <CardsContainer>
            {selectedUserCats.length > 0 ? (
              selectedUserCats.map((cat) => (
                <Card key={cat.id}>
                  <CardAvatarContainer>
                    <CardAvatar src={cat.imgCat} alt={cat.nameCat} />
                  </CardAvatarContainer>
                  <CardContent>
                    <h3>ชื่อแมว: {cat.nameCat}</h3>
                    <p>สายพันธุ์: {cat.breedCat}</p>
                    <p>เพศ: {cat.genderCat}</p>
                    <p>อายุ: {calculateAge(cat.birthDateCat)}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <NoCatsMessage>ไม่พบข้อมูลแมว</NoCatsMessage>
            )}
          </CardsContainer>
        </Box>
      </Modal>

      {/* Modal สำหรับแสดงรายละเอียดสายพันธุ์ */}
      <Modal open={openBreedModal} onClose={handleCloseBreedModal}>
        <Box sx={modalStyle}>
          <h2>รายละเอียดสายพันธุ์แมว</h2>
          <ul>
            {uniqueBreeds.map((breed, index) => (
              <li key={index}>{breed}</li>
            ))}
          </ul>
        </Box>
      </Modal>
    </Container>
  );
}

export default CatListUser;
