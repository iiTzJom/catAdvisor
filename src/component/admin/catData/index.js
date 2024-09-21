import React from "react";
import styled from "@emotion/styled/macro";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function AdminCatData() {
  return (
    <>
      {" "}
      <ContentWrapper>
        <PageHeader>+ เพิ่มข้อมูลแมว</PageHeader>
        <CardGrid>
          {catData.map((cat, index) => (
            <CatCard key={index} bgColor={cat.bgColor} className="cat-card">
              <CatImage src={cat.image} alt={cat.nameEN} />
              <CatName>
                {cat.nameTH}
                <br />
                {cat.nameEN}
              </CatName>
              <MenuDropdown show={selectedCardIndex === index}>
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
              <IconButton onClick={() => handleIconClick(index)}>
                <MoreHorizIcon />
              </IconButton>
            </CatCard>
          ))}
        </CardGrid>
      </ContentWrapper>
    </>
  );
}

export default AdminCatData;
