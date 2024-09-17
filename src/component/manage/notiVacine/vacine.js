import React from "react";
import styled from "@emotion/styled";
import {
  FormControl,
  InputAdornment,
  OutlinedInput,
  IconButton,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddVaccines from "./addVaccine";
import AddIcon from "@mui/icons-material/Add";

const Container = styled.div`
  background-color: #71a9db;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const DivSearch = styled.div`
  width: 100%;
  text-align: center;
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

  .MuiFormLabel-root {
    width: 672px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Table = styled.div`
  width: 80%;
  border-radius: 10px;
  text-align: end;
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
  flex: 1;
  box-sizing: border-box;
`;

const TableRow = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  background-color: #ffffff;
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableData = styled.div`
  padding: 12px;
  text-align: left;
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Status = styled.span`
  color: ${({ status }) =>
    status === "completed"
      ? "#4caf50"
      : status === "overdue"
      ? "#f44336"
      : "#f59a83"};
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

const ConfirmButton = styled(Button)`
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

const VaccinationPage = () => {
  const [dataBlog, setDataBlog] = React.useState([
    {
      id: 1,
      name: "ฟุก",
      tagId: "#23456",
      injectionDate: "11/09/2024",
      vaccineToday: "พิษสุนัขบ้า",
      nextInjectionDate: "11/10/2024",
      nextVaccine: "หวัดแมว",
      status: "in-progress",
    },
    {
      id: 2,
      name: "เมี้ยว",
      tagId: "#78901",
      injectionDate: "01/08/2024",
      vaccineToday: "หัดแมว",
      nextInjectionDate: "01/09/2024",
      nextVaccine: "โรคปอดอักเสบ",
      status: "overdue",
    },
    {
      id: 3,
      name: "เสือ",
      tagId: "#45678",
      injectionDate: "01/08/2024",
      vaccineToday: "วัคซีนป้องกันโรคหวัด",
      nextInjectionDate: "01/09/2024",
      nextVaccine: "วัคซีนป้องกันโรคท้องเสีย",
      status: "completed",
    },
  ]);

  const [filteredData, setFilteredData] = React.useState(dataBlog);
  const [keyword, setKeyword] = React.useState("");
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
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

  const handleConfirm = (id) => {
    setDataBlog((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, status: "completed" } : item
      )
    );
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "เสร็จสิ้น";
      case "overdue":
        return "ล่าช้า";
      default:
        return "กำลังดำเนินการ";
    }
  };

  return (
    <Container>
      <DivSearch>
        <FormControl
          sx={{ m: 1, width: "785px", "& fieldset": { border: "none" } }}
          variant="outlined"
        >
          <OutlinedInput
            id="outlined-adornment-password"
            type={"text"}
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
      </DivSearch>

      <Table>
        <AddButton onClick={handleOpen}>
          <AddIcon sx={{ paddingRight: "10px" }} />
          เพิ่มข้อมูลการฉีดวัคซีน
        </AddButton>
        <TableHeader>
          <TableHeaderItem>ชื่อแมว</TableHeaderItem>
          <TableHeaderItem>Tag Id</TableHeaderItem>
          <TableHeaderItem>วันที่ฉีด</TableHeaderItem>
          <TableHeaderItem>วัคซีนวันนี้</TableHeaderItem>
          <TableHeaderItem>วันฉีดครั้งถัดไป</TableHeaderItem>
          <TableHeaderItem>วัคซีนครั้งถัดไป</TableHeaderItem>
          <TableHeaderItem>สถานะ</TableHeaderItem>
          <TableHeaderItem>ยืนยัน</TableHeaderItem>
        </TableHeader>
        {filteredData.map((row) => (
          <TableRow key={row.id}>
            <TableData>{row.name}</TableData>
            <TableData>{row.tagId}</TableData>
            <TableData>{row.injectionDate}</TableData>
            <TableData>{row.vaccineToday}</TableData>
            <TableData>{row.nextInjectionDate}</TableData>
            <TableData>{row.nextVaccine}</TableData>
            <TableData>
              <Status status={row.status}>{getStatusText(row.status)}</Status>
            </TableData>
            <TableData>
              {row.status === "completed" ? null : (
                <ConfirmButton
                  variant="contained"
                  onClick={() => handleConfirm(row.id)}
                >
                  <CheckCircleIcon style={{ color: "white" }} />
                </ConfirmButton>
              )}
            </TableData>
          </TableRow>
        ))}
      </Table>

      <AddVaccines open={open} handleClose={handleClose} />
    </Container>
  );
};

export default VaccinationPage;
