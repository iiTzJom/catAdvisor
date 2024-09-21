import React, { useState, useEffect } from "react";
import styled from "@emotion/styled/macro";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

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

const PageHeader = styled.div`
  background-color: #fbb03b;
  width: 1000px;
  padding: 15px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: white;
  border-radius: 20px;
  cursor: pointer;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;
  justify-items: center;
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

const MenuDropdown = styled.div`
  position: absolute;
  top: 30px;
  right: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: ${(props) => (props.show ? "block" : "none")};
  min-width: 180px;
  z-index: 10;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const MenuIcon = styled.div`
  margin-right: 8px;
`;

const IconButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  color: #333;
  cursor: pointer;
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

function CatDataList() {
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);

  const handleIconClick = (id) => {
    setSelectedCardIndex(id);
  };

  // const handleClickOutside = (event) => {
  //   if (
  //     !event.target.closest(".cat-card") &&
  //     !event.target.closest(".page-header")
  //   ) {
  //     setSelectedCardIndex(null);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  const catData = [
    {
      id: 1,
      nameTH: "อเมริกัน ช็อตแฮร์",
      nameEN: "American Short Hair",
      bgColor: "#a0d8f1",
      image: "/AmericanStand.png",
    },
    {
      id: 2,
      nameTH: "บริติช ช็อตแฮร์",
      nameEN: "British Short Hair",
      bgColor: "#f0a0a0",
      image: "/BritishStand.png",
    },
    {
      id: 3,
      nameTH: "สก็อตติช โฟลด์",
      nameEN: "Scottish Fold",
      bgColor: "#fce191",
      image: "/ScottishStand.png",
    },
  ];

  return (
    <Container>
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
          {catData.map((cat, index) => (
            <CatCard key={index} bgColor={cat.bgColor} className="cat-card">
              <CatImage src={cat.image} alt={cat.nameEN} />
              <CatName>
                {cat.nameTH}
                <br />
                {cat.nameEN}
              </CatName>
              <MenuDropdown
                onMouseLeave={() => setSelectedCardIndex(0)}
                show={selectedCardIndex === cat.id}
              >
                <MenuItem>
                  <MenuIcon>
                    <EditIcon />
                  </MenuIcon>
                  แก้ไข
                </MenuItem>
                <MenuItem>
                  <MenuIcon>
                    <DeleteIcon />
                  </MenuIcon>
                  ลบ
                </MenuItem>
              </MenuDropdown>
              <IconButton onClick={() => handleIconClick(cat.id)}>
                <MoreHorizIcon />
              </IconButton>
            </CatCard>
          ))}
        </CardGrid>
      </ContentWrapper>
    </Container>
  );
}

export default CatDataList;
