import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete"; // Import DeleteIcon
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Button as MuiButton,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { getCatByUser } from "../../../api/userCatData";
import {
  getCatNoteByUser,
  deleteCatNoteByUser,
} from "../../../api/userCatNote";
import NoteViews from "./noteView";
import AddNotes from "./addNote";

//New Update

const PageWrapper = styled.div`
  max-height: 100vh;
  padding: 20px;
  max-width: 100%;
  text-align: -webkit-center;
`;

const DivSearch = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  .MuiInputBase-root {
    width: 80%;
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

const DivButton = styled.div`
  width: 100%;
  text-align: -webkit-right;
  margin-bottom: 10px;
`;

const AddRecordButton = styled(MuiButton)`
  background-color: #f59a83;
  color: white;
  padding: 10px;
  border-radius: 50%;
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

const TableContainerMain = styled.div`
  max-width: 80%;
`;

const TableContainer = styled.div`
  max-width: 100%;
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

const CatNote = ({ name }) => {
  const [keyword, setKeyword] = useState("");
  const [openAddNotes, setOpenAddNotes] = useState(false);
  const [openNoteViews, setOpenNoteViews] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [catsData, setCatsData] = useState([]);
  const [listNote, setListNote] = useState([]);
  const [status, setStatus] = useState("create");

  useEffect(() => {
    var newData = [];
    const getData = getCatByUser(name)
      .then((data) => {
        if (data?.data?.code === 200) {
          Object.keys(data?.data?.data).map((key) => [
            newData.push({
              id: data?.data?.data[key].id,
              nameCat: data?.data?.data[key].nameCat,
            }),
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

  useEffect(() => {
    var newData = [];
    const getData = getCatNoteByUser(name)
      .then((data) => {
        if (data?.data?.code === 200) {
          Object.keys(data?.data?.data).map((key) => [
            newData.push(data?.data?.data[key]),
          ]);
          setListNote(newData);
          // setDataDB(newData);
        }
      })
      .catch((err) => err);
    return () => {
      clearInterval(getData); // ใช้ clearInterval แทน destroy
    };
  }, []);

  const handleOpenAddNotes = () => {
    setSelectedNote(null);
    setOpenAddNotes(true);
    setOpenNoteViews(false);
    setStatus("create");
  };

  const handleOpenNoteViews = (note, type) => {
    setSelectedNote(note);
    if (type === "view") {
      setOpenNoteViews(true);
      setOpenAddNotes(false);
    } else {
      setOpenAddNotes(true);
      handleDropdownClose();
      setStatus("edit");
    }
  };

  const handleCloseModal = () => {
    setOpenAddNotes(false);
    setOpenNoteViews(false);
    setSelectedNote(null);
    setAnchorEl(null);
  };

  const handleDropdownClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteNote = (tagId) => {
    deleteCatNoteByUser(name, tagId)
      .then((data) => {
        if (data?.data?.code === 200) {
          window.location.href = "/Manage?note";
        }
      })
      .catch((err) => err);
  };

  return (
    <PageWrapper>
      <DivSearch>
        {/* <FormControl
          sx={{
            m: 1,
            "& fieldset": { border: "none" },
          }}
          variant="outlined"
        >
          <OutlinedInput
            id="outlined-adornment-password"
            type="text"
            value={keyword}
            placeholder="ค้นหาชื่อ"
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
        </FormControl> */}
      </DivSearch>

      <TableContainerMain>
        <DivButton>
          <AddRecordButton onClick={handleOpenAddNotes}>
            <EditIcon style={{ color: "white", fontSize: "24px" }} />
          </AddRecordButton>
        </DivButton>

        <TableContainer>
          <Table>
            <TableHeader>
              <TableHeaderItem>ชื่อแมว</TableHeaderItem>
              <TableHeaderItem>วันที่บันทึก</TableHeaderItem>
              <TableHeaderItem>ชื่อเรื่อง</TableHeaderItem>
              <TableHeaderItem>บันทึก</TableHeaderItem>
              <TableHeaderItem align="center">ดูบันทึก</TableHeaderItem>
              <TableHeaderItem align="center"></TableHeaderItem>
            </TableHeader>
            {listNote.map((record, index) => (
              <TableRow key={index}>
                <TableData>
                  {catsData.filter((v) => v.id === record?.idCat)[0].nameCat}
                </TableData>
                <TableData>
                  {new Date(record?.noteDate).getDate() +
                    "-" +
                    (new Date(record?.noteDate).getMonth() + 1) +
                    "-" +
                    new Date(record?.noteDate).getFullYear()}
                </TableData>
                <TableData>{record?.nameNote}</TableData>
                <TableData>{record?.text}</TableData>
                <TableData align="center">
                  <ConfirmButton
                    onClick={() => handleOpenNoteViews(record, "view")}
                  >
                    <VisibilityIcon
                      style={{ color: "white", fontSize: "24px" }}
                    />
                  </ConfirmButton>
                </TableData>
                <TableData align="center">
                  <MenuItem onClick={() => handleOpenNoteViews(record, "edit")}>
                    <EditIcon style={{ marginRight: "8px" }} />
                    แก้ไข
                  </MenuItem>
                  <MenuItem onClick={() => handleDeleteNote(record.id)}>
                    <DeleteIcon style={{ marginRight: "8px" }} />
                    ลบ
                  </MenuItem>
                </TableData>
              </TableRow>
            ))}
          </Table>
        </TableContainer>
      </TableContainerMain>

      <AddNotes
        open={openAddNotes}
        onClose={handleCloseModal}
        note={selectedNote}
        name={name}
        dataCat={catsData}
        status={status}
        item={catsData?.map((data) => (
          <MenuItem value={data.id}>{data.nameCat}</MenuItem>
        ))}
      />
      <NoteViews
        open={openNoteViews}
        onClose={handleCloseModal}
        note={selectedNote}
        dataCat={catsData}
      />
    </PageWrapper>
  );
};

export default CatNote;
