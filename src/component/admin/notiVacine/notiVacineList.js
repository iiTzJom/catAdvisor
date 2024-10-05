import React, { useEffect, useState } from "react";
import styled from "@emotion/styled/macro";
import { getVacineList, sendLineNotification } from "../../../api/userVacine";
import { getCatUser } from "../../../api/catBreeds";
import { Button } from "@mui/material";
const Container = styled.div`
  width: 100%;
  padding: 25px 60px;
`;
const Table = styled.div`
  width: 100%;
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

const DivButton = styled.div`
  width: 100%;
  text-align: end;
`;
function NotiVacineList({ name }) {
  const [listVacineNoti, setListVacineNoti] = useState([]);
  const [listCatUser, setListCatUser] = useState([]);
  const [newList, setNewList] = useState([]);
  useEffect(() => {
    var newData = [];

    const getData = getVacineList(name)
      .then((data) => {
        if (data?.data?.code === 200) {
          Object.keys(data?.data?.data).map((key) => [
            newData.push(data?.data?.data[key]),
          ]);
          setListVacineNoti(newData);
        }
      })
      .catch((err) => err);
    return () => {
      clearInterval(getData); // ใช้ clearInterval แทน destroy
    };
  }, []);

  useEffect(() => {
    var newData = [];
    var newDataInside = [];
    const getData = getCatUser(name)
      .then((data) => {
        if (data?.data?.code === 200) {
          Object.keys(data?.data?.data).map((key) => [
            newData.push(data?.data?.data[key]),
          ]);

          newData.map((data) =>
            Object.keys(data).map((key) => [newDataInside.push(data[key])])
          );

          setListCatUser(newDataInside);
        }
      })
      .catch((err) => err);
    return () => {
      clearInterval(getData);
    };
  }, []);

  const diffDate = (date1) => {
    if (new Date(date1) < new Date()) {
      return false;
    } else {
      const d1 = new Date(date1);
      const d2 = new Date();

      const diffTime = Math.abs(d2 - d1);

      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      return diffDays;
    }
  };

  console.log("listVacineNoti", listVacineNoti);

  useEffect(() => {
    var newData = [];
    listVacineNoti.map((data) =>
      newData.push({
        nameCat: listCatUser?.filter((v) => v?.id === data?.idCat)[0]?.nameCat,
        vacineDate: data?.vacineDate,
        numOfDate: diffDate(new Date(data.vacineDate)),
        vacineName: data?.vacineName,
        vacineDateNext: data?.vacineDateNext,
        numOfDateNext: diffDate(new Date(data.vacineDateNext)),
        vacineNameNext: data?.vacineNameNext,
        accessToken: data?.accessToken,
      })
    );
    setNewList(newData);
  }, [listVacineNoti]);

  const sendMessage = async () => {
    newList.map(async (data) => {
      if (data.numOfDate === 1 || data.numOfDateNext === 1) {
        await sendLineNotification({
          accessToken: data.accessToken,
          message:
            "น้อง" +
            data.nameCat +
            '🐱 ฉีด "' +
            data.vacineName +
            '"วันนี้\nอย่าลืมไปพบคุณหมอนะคะ 💖',
        })
          .then((data) => {
            if (data?.data?.code === 200) {
              console.log("SUCCESS");
            }
          })
          .catch((err) => err);
      }

      if (data.numOfDate === 2 || data.numOfDateNext === 2) {
        await sendLineNotification({
          accessToken: data.accessToken,
          message:
            "พรุ่งนี้น้อง" +
            data.nameCat +
            '🐱 จะได้ฉีด "' +
            data.vacineName +
            '" \nอย่าลืมไปพบคุณหมอนะคะ 💖',
        })
          .then((data) => {
            if (data?.data?.code === 200) {
              console.log("SUCCESS");
            }
          })
          .catch((err) => err);
      }
      if (data.numOfDate === 3 || data.numOfDateNext === 3) {
        await sendLineNotification({
          accessToken: data.accessToken,
          message:
            "อีก 2 วัน น้อง" +
            data.nameCat +
            '🐱 ถึงเวลาฉีด "' +
            data.vacineName +
            '" \nอย่าลืมเตรียมตัวนะคะ 💖',
        })
          .then((data) => {
            if (data?.data?.code === 200) {
              console.log("SUCCESS");
            }
          })
          .catch((err) => err);
      }
      if (data.numOfDate === 4 || data.numOfDateNext === 4) {
        await sendLineNotification({
          accessToken: data.accessToken,
          message:
            "อีก 3 วัน น้อง" +
            data.nameCat +
            '🐱 ถึงเวลาฉีด "' +
            data.vacineName +
            '" \nอย่าลืมเตรียมตัวนะคะ 💖',
        })
          .then((data) => {
            if (data?.data?.code === 200) {
              console.log("SUCCESS");
            }
          })
          .catch((err) => err);
      }
    });
  };

  console.log("----------", newList);
  return (
    <Container>
      <DivButton>
        <AddButton
          style={{ backgroundColor: "#16c464" }}
          onClick={() => sendMessage()}
        >
          <img
            src={process.env.PUBLIC_URL + "/line.png"}
            style={{ width: "30px", paddingRight: "10px" }}
          />
          แจ้งเตือนการฉีดวัคซีน
        </AddButton>
      </DivButton>
      <Table>
        <TableHeader>
          {/* <TableHeaderItem>Tag Id</TableHeaderItem> */}
          <TableHeaderItem>ชื่อแมว</TableHeaderItem>
          <TableHeaderItem>วันที่ฉีด</TableHeaderItem>
          <TableHeaderItem>วัคซีนวันนี้</TableHeaderItem>
          <TableHeaderItem>จำนวนวันก่อนฉีด</TableHeaderItem>
          <TableHeaderItem>วันฉีดครั้งถัดไป</TableHeaderItem>
          <TableHeaderItem>วัคซีนครั้งถัดไป</TableHeaderItem>
          <TableHeaderItem>จำนวนวันก่อนฉีดครั้งถัดไป</TableHeaderItem>
        </TableHeader>
        {newList.map((data, i) => (
          <TableRow key={i}>
            <TableData>{data?.nameCat}</TableData>
            <TableData>{data?.vacineDate}</TableData>
            <TableData>{diffDate(new Date(data?.vacineDate))}</TableData>
            <TableData>{data?.vacineName}</TableData>
            <TableData>{data?.vacineDateNext}</TableData>
            <TableData>{diffDate(new Date(data?.vacineDateNext))}</TableData>
            <TableData>{data?.vacineNameNext}</TableData>
          </TableRow>
        ))}
      </Table>
    </Container>
  );
}
export default NotiVacineList;
