import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button as MuiButton,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import NoteViews from "./ืnoteView";
import AddNotes from "./addNote";

const PageWrapper = styled.div`
  background-color: #71a9db;
  height: 100vh;
  padding: 20px;
`;

const DivSearch = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  .MuiInputBase-root {
    width: 100%;
    max-width: 800px;
    background-color: #d9d9d9;
    border-radius: 50px;
    padding-right: 12px;
  }

  .MuiButtonBase-root {
    background-color: #ffd6b3;
    width: 105px;
    height: 56px;
    border-radius: 40px;
  }

  .MuiButtonBase-root:hover {
    opacity: 0.8;
  }

  .MuiFormControl-root {
    width: 100%;
    text-align: center;
    display: block;
  }
`;

const AddRecordButton = styled(MuiButton)`
  background-color: #f59a83;
  color: white;
  padding: 10px;
  border-radius: 50%;
  position: absolute;
  top: 35px;
  right: 20px;
  min-width: 50px;
  min-height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  &:hover {
    background-color: #e57373;
  }
`;

const TableContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const Table = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const TableHeader = styled.div`
  display: flex;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ccc;
  font-weight: bold;
`;

const TableHeaderItem = styled.div`
  padding: 12px;
  text-align: left;
  flex: 2;
  box-sizing: border-box;
  min-width: 150px;
  text-align: ${({ align }) => align || "left"};
`;

const TableRow = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableData = styled.div`
  padding: 12px;
  text-align: left;
  flex: 2;
  display: flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: ${({ align }) => align || "left"};
  justify-content: ${({ align }) =>
    align === "center" ? "center" : "flex-start"};
`;

const ConfirmButton = styled(MuiButton)`
  background-color: #4caf50 !important;
  color: white !important;
  padding: 8px !important;
  border-radius: 50% !important;
  min-width: 40px !important;
  min-height: 40px !important;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CatNote = () => {
  const [keyword, setKeyword] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [openAddNotes, setOpenAddNotes] = useState(false);
  const [openNoteViews, setOpenNoteViews] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const dataBlog = [
    {
      name: "ฟุโกะ",
      tagId: "#23456",
      date: "11/09/2024",
      title: "ออกไปเที่ยว",
      notes: "พาออกไปเที่ยวที่ร้านคาเฟ่แมวและได้ไปพักที่สปาแมวใกล้เคียง...",
    },
    {
      name: "มิคุ",
      tagId: "#78901",
      date: "12/09/2024",
      title: "ไปที่สวนสาธารณะ",
      notes: "พาไปเดินเล่นที่สวนสาธารณะและพบกับแมวตัวอื่นๆ...",
    },
  ];

  useEffect(() => {
    if (keyword === "") {
      setFilteredData(dataBlog);
    } else {
      const lowercasedKeyword = keyword.toLowerCase();
      const filtered = dataBlog.filter((item) =>
        item.name.toLowerCase().includes(lowercasedKeyword)
      );
      setFilteredData(filtered);
    }
  }, [keyword, dataBlog]);

  const handleOpenAddNotes = () => {
    setSelectedNote(null); // Clear the selected note for new notes
    setOpenAddNotes(true); // Open AddNotes modal
    setOpenNoteViews(false); // Ensure NoteViews modal is closed
  };

  const handleOpenNoteViews = (note) => {
    setSelectedNote(note); // Set the note to be viewed
    setOpenNoteViews(true); // Open NoteViews modal
    setOpenAddNotes(false); // Ensure AddNotes modal is closed
  };

  const handleCloseModal = () => {
    setOpenAddNotes(false);
    setOpenNoteViews(false);
    setSelectedNote(null);
  };

  return (
    <PageWrapper>
      {/* Search Bar */}
      <DivSearch>
        <FormControl
          sx={{
            m: 1,
            width: "100%",
            maxWidth: "800px",
            "& fieldset": { border: "none" },
          }}
          variant="outlined"
        >
          <OutlinedInput
            id="outlined-adornment-password"
            type="text"
            value={keyword}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="search"
                  onClick={() => setKeyword(keyword)}
                  edge="end"
                >
                  <SearchIcon style={{ color: "white" }} />
                </IconButton>
              </InputAdornment>
            }
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setKeyword(e.target.value);
            }}
          />
        </FormControl>
        <AddRecordButton onClick={handleOpenAddNotes}>
          <EditIcon style={{ color: "white", fontSize: "24px" }} />
        </AddRecordButton>
      </DivSearch>

      <TableContainer>
        <Table>
          <TableHeader>
            <TableHeaderItem>ชื่อแมว</TableHeaderItem>
            <TableHeaderItem>Tag Id</TableHeaderItem>
            <TableHeaderItem>วันที่บันทึก</TableHeaderItem>
            <TableHeaderItem>ชื่อเรื่อง</TableHeaderItem>
            <TableHeaderItem>บันทึก</TableHeaderItem>
            <TableHeaderItem align="center">ดูบันทึก</TableHeaderItem>
          </TableHeader>
          {filteredData.map((record, index) => (
            <TableRow key={index}>
              <TableData>{record.name}</TableData>
              <TableData>{record.tagId}</TableData>
              <TableData>{record.date}</TableData>
              <TableData>{record.title}</TableData>
              <TableData>{record.notes}</TableData>
              <TableData align="center">
                <ConfirmButton onClick={() => handleOpenNoteViews(record)}>
                  <VisibilityIcon
                    style={{ color: "white", fontSize: "24px" }}
                  />
                </ConfirmButton>
              </TableData>
            </TableRow>
          ))}
        </Table>
      </TableContainer>

      <AddNotes
        open={openAddNotes}
        onClose={handleCloseModal}
        note={selectedNote}
      />
      <NoteViews
        open={openNoteViews}
        onClose={handleCloseModal}
        note={selectedNote}
      />
    </PageWrapper>
  );
};

export default CatNote;
