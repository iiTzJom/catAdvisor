import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Button, MenuItem } from "@mui/material";
import AddVaccines from "./addVaccine";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit"; // เพิ่มไอคอนแก้ไข
import DeleteIcon from "@mui/icons-material/Delete"; // เพิ่มไอคอนลบ
import { sessionService } from "redux-react-session";
import AddToken from "./addTokenLine";
import { getVacineByUser, deleteVacine } from "../../../api/userVacine";
import { getCatByUser } from "../../../api/userCatData";
//New Update

const Container = styled.div`
  background-color: #71a9db;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
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
  align-items: center;
  gap: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: fit-content;
  .MuiButtonBase-root {
    padding: 0;
  }
`;

const Status = styled.span`
  color: ${({ status }) => status};
`;

const AddButton = styled(Button)`
  background-color: #f59a83;
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 16px;
  margin-bottom: 20px;
  margin-left: 20px;
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

  const [open, setOpen] = React.useState(false);
  const [openAddToken, setOpenAddToken] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState(null); // สำหรับเก็บข้อมูลแมวที่เลือก
  const [isType, setIsType] = useState("create");
  const [isNoti, setIsNoti] = useState(false);
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [vacineData, setVacineData] = useState([]);
  const [dataCat, setDataCat] = useState([]);

  sessionService
    .loadUser()
    .then((data) => {
      setName(data.userName);
      setToken(data.accessToken);
      if (data.accessToken !== "") {
        setIsNoti(true);
      }
    })
    .catch((err) => {
      //window.location.href = "/";
    });

  useEffect(() => {
    var newData = [];
    if (name !== "" || !name) {
      const getData = getCatByUser(name)
        .then((data) => {
          if (data?.data?.code === 200) {
            Object.keys(data?.data?.data).map((key) => [
              newData.push(data?.data?.data[key]),
            ]);
            //setListNote(newData);
            setDataCat(newData);
          }
        })
        .catch((err) => err);
      return () => {
        clearInterval(getData); // ใช้ clearInterval แทน destroy
      };
    }
  }, [name]);

  useEffect(() => {
    var newData = [];
    if (name !== "") {
      const getData = getVacineByUser(name)
        .then((data) => {
          if (data?.data?.code === 200) {
            Object.keys(data?.data?.data).map((key) => [
              newData.push(data?.data?.data[key]),
            ]);
            setVacineData(newData);
            // setDataDB(newData);
          }
        })
        .catch((err) => err);

      return () => {
        clearInterval(getData); // ใช้ clearInterval แทน destroy
      };
    }
  }, [name]);

  const handleEdit = (id) => {
    const dataToEdit = vacineData.find((item) => item.id === id);
    setSelectedData(dataToEdit); // ตั้งค่า selectedData
    setOpen(true); // เปิด Modal
    setIsType("edit");
  };

  const handleDelete = (id) => {
    deleteVacine(name, id)
      .then((data) => {
        if (data?.data?.code === 200) {
          window.location.href = "/Manage?notiVacine";
        }
      })
      .catch((err) => err);
  };

  const getStatusText = (status) => {
    switch (status) {
      case true:
        return "เสร็จสิ้น";
      default:
        return "กำลังดำเนินการ";
    }
  };

  const diffDate = (date1, date2) => {
    if (new Date(date1) < new Date()) {
      return false;
    } else {
      const d1 = new Date(date1);
      const d2 = new Date();

      const diffTime = Math.abs(d2 - d1);

      // แปลงจาก milliseconds เป็นวัน
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      return diffDays;
    }
  };

  return (
    <Container>
      <Table>
        {isNoti === true ? (
          <AddButton
            onClick={() => {
              setOpenAddToken(true);
            }}
            style={{ backgroundColor: "#16c464" }}
          >
            <img
              src={process.env.PUBLIC_URL + "/line.png"}
              style={{ width: "30px", paddingRight: "10px" }}
            />
            แก้ไข access token
          </AddButton>
        ) : (
          <AddButton
            onClick={() => {
              setOpenAddToken(true);
            }}
            style={{ backgroundColor: "#16c464" }}
          >
            <img
              src={process.env.PUBLIC_URL + "/line.png"}
              style={{ width: "30px", paddingRight: "10px" }}
            />
            รับการแจ้งเตือนผ่าน Line
          </AddButton>
        )}
        <AddButton
          onClick={() => {
            setOpen(true);
            setSelectedData(null);
            setIsType("create");
          }}
        >
          <AddIcon sx={{ paddingRight: "10px" }} />
          เพิ่มข้อมูลการฉีดวัคซีน
        </AddButton>
        <TableHeader>
          {/* <TableHeaderItem>Tag Id</TableHeaderItem> */}
          <TableHeaderItem>ชื่อแมว</TableHeaderItem>
          <TableHeaderItem>วันที่ฉีด</TableHeaderItem>
          <TableHeaderItem>วัคซีนวันนี้</TableHeaderItem>
          <TableHeaderItem>วันฉีดครั้งถัดไป</TableHeaderItem>
          <TableHeaderItem>วัคซีนครั้งถัดไป</TableHeaderItem>
          <TableHeaderItem>สถานะ</TableHeaderItem>
          <TableHeaderItem style={{ textAlign: "center" }}></TableHeaderItem>
        </TableHeader>
        {vacineData.map((row) => (
          <TableRow key={row?.id}>
            {/* <TableData>{row.tagId}</TableData> */}
            <TableData>
              {dataCat?.filter((v) => v?.id === row?.idCat)[0]?.nameCat}
            </TableData>
            <TableData>{row?.vacineDate}</TableData>
            <TableData>{row?.vacineName}</TableData>
            <TableData>{row?.vacineDateNext}</TableData>
            <TableData>{row.vacineNameNext}</TableData>
            <TableData>
              <Status
                status={
                  diffDate(new Date(row?.vacineDateNext)) === false
                    ? "#f44336"
                    : row?.status
                    ? "#4caf50"
                    : "#f59a83"
                }
              >
                {diffDate(new Date(row.vacineDateNext)) === false
                  ? "ล่าช้า"
                  : getStatusText(row?.status)}
              </Status>
            </TableData>
            <TableData style={{ textAlign: "center", display: "flex" }}>
              <MenuItem onClick={() => handleEdit(row.id)}>
                <EditIcon style={{ marginRight: "8px" }} />
                แก้ไข
              </MenuItem>
              <MenuItem onClick={() => handleDelete(row.id)}>
                <DeleteIcon style={{ marginRight: "8px" }} />
                ลบ
              </MenuItem>
            </TableData>
          </TableRow>
        ))}
      </Table>
      <AddToken
        open={openAddToken}
        handleClose={() => setOpenAddToken(false)}
      />
      <AddVaccines
        open={open}
        handleClose={() => setOpen(false)}
        type={isType}
        name={name}
        token={token}
        dataVacine={selectedData}
      />
    </Container>
  );
};

export default VaccinationPage;
