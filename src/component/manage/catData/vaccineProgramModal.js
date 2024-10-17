import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { getCatByUser } from "../../../api/userCatData";
// Removed the API import since it's no longer needed
// import { getVaccineProgram } from "../../../api/userVacine";

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  width: ${(props) => (props.isCalculated ? "600px" : "400px")};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  max-height: 80vh;
  overflow-y: auto;
`;

const VaccineProgramModal = ({
  open,
  handleClose,
  selectedCatId,
  userId,
  name,
}) => {
  const [birthDate, setBirthDate] = useState("");
  const [vaccineSchedule, setVaccineSchedule] = useState([]);
  const [error, setError] = useState("");
  const [isCalculated, setIsCalculated] = useState(false);
  const [catsData, setCatsData] = useState([]);

  // Function to calculate cat age from birth date
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    return `${age} ปี ${monthDiff} เดือน`;
  };

  // Fetch cat data when modal opens
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getCatByUser(name);
        if (data?.data?.code === 200) {
          const newData = Object.values(data.data.data);
          const updatedData = newData.map((cat) => ({
            ...cat,
            age: calculateAge(cat.birthDate), // Calculate age based on birthDate
          }));
          setCatsData(updatedData);
          // Set the birthDate from the selected cat's data
          const selectedCat = updatedData.find(
            (cat) => cat.id === selectedCatId
          );
          if (selectedCat) {
            setBirthDate(selectedCat.birthDate);
          }
        }
      } catch (err) {
        // setError("Failed to fetch cat data. Please try again.");
        console.error(err);
      }
    };

    if (open) {
      getData();
    }
  }, [open, name, selectedCatId]);

  const calculateVaccineSchedule = () => {
    if (!birthDate) {
      setError("กรุณากรอกวันเกิดของแมวเพื่อทำการคำนวณ");
      setVaccineSchedule([]); // Clear any existing schedule
      setIsCalculated(false);
      return;
    }

    const birthDateObj = new Date(birthDate);
    if (isNaN(birthDateObj)) {
      setError("กรุณากรอกวันที่ในรูปแบบที่ถูกต้อง");
      return;
    }

    let schedule = [];
    const firstVaccineDate = new Date(birthDateObj);
    firstVaccineDate.setDate(firstVaccineDate.getDate() + 56); // First vaccine at 8 weeks

    let nextDate = new Date(firstVaccineDate);

    const addDays = (date, days) => {
      let result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    };

    // Define vaccination schedule
    const vaccinationDetails = [
      {
        ageGroup: "8 สัปดาห์ 1 เข็ม (2 เดือน)",
        vaccinations: [
          {
            stage: "วัคซีนรวมในแมว ครั้งที่ 1",
            date: nextDate.toLocaleDateString(),
          },
        ],
      },
      {
        ageGroup: "12 สัปดาห์ 3 เข็ม (3 เดือน)",
        vaccinations: [
          {
            stage: "วัคซีนรวมในแมว ครั้งที่ 2",
            date: (nextDate = addDays(nextDate, 28)).toLocaleDateString(),
          },
          {
            stage: "วัคซีนป้องกันโรคลูคีเมียในแมว ครั้งที่ 1",
            date: nextDate.toLocaleDateString(),
          },
          {
            stage: "วัคซีนพิษสุนัขบ้า ครั้งที่ 1",
            date: nextDate.toLocaleDateString(),
          },
        ],
      },
      {
        ageGroup: "16 สัปดาห์ 3 เข็ม (4 เดือน)",
        vaccinations: [
          {
            stage: "วัคซีนรวมในแมว ครั้งที่ 3",
            date: (nextDate = addDays(nextDate, 28)).toLocaleDateString(),
          },
          {
            stage: "วัคซีนป้องกันโรคลูคีเมียในแมว ครั้งที่ 2",
            date: nextDate.toLocaleDateString(),
          },
          {
            stage: "วัคซีนพิษสุนัขบ้า ครั้งที่ 2",
            date: nextDate.toLocaleDateString(),
          },
        ],
      },
      {
        ageGroup: "1 ปี 3 เข็ม",
        vaccinations: [
          {
            stage: "กระตุ้นวัคซีนรวมในแมว ครั้งที่ 4",
            date: (nextDate = addDays(nextDate, 365)).toLocaleDateString(),
          },
          {
            stage: "กระตุ้นวัคซีนป้องกันโรคพิษสุนัขบ้า",
            date: nextDate.toLocaleDateString(),
          },
          {
            stage: "กระตุ้นวัคซีนลิวคีเมีย",
            date: nextDate.toLocaleDateString(),
          },
        ],
      },
      {
        ageGroup: "ทุกๆ 1 ปี 2 เข็ม",
        vaccinations: [
          {
            stage: "กระตุ้นวัคซีนรวมในแมว ครั้งที่ 5",
            date: (nextDate = addDays(nextDate, 365)).toLocaleDateString(),
          },
          {
            stage: "กระตุ้นวัคซีนป้องกันโรคพิษสุนัขบ้า",
            date: nextDate.toLocaleDateString(),
          },
        ],
      },
    ];

    schedule = vaccinationDetails;

    // Save schedule to local storage, organized by userId and selectedCatId
    const savedSchedules =
      JSON.parse(localStorage.getItem("vaccineSchedules")) || {};
    if (!savedSchedules[userId]) {
      savedSchedules[userId] = {};
    }

    savedSchedules[userId][selectedCatId] = {
      birthDate,
      schedule,
    };
    localStorage.setItem("vaccineSchedules", JSON.stringify(savedSchedules));

    setVaccineSchedule(schedule);
    setError(""); // Clear any existing errors
    setIsCalculated(true);
  };

  return (
    <StyledModal open={open} onClose={handleClose}>
      <ModalContent isCalculated={isCalculated}>
        <Typography variant="h6">โปรแกรมการฉีดวัคซีน</Typography>
        <TextField
          label="วันเกิดของแมว"
          type="date"
          fullWidth
          variant="outlined"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          style={{ marginTop: "10px" }}
        />
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          onClick={calculateVaccineSchedule}
          style={{ marginTop: "10px" }}
        >
          คำนวณตารางวัคซีนทั้งหมด
        </Button>
        {vaccineSchedule.length > 0 && (
          <div style={{ marginTop: "10px" }}>
            {vaccineSchedule.map((group, index) => (
              <div key={index} style={{ marginBottom: "20px" }}>
                <Typography variant="h6" style={{ fontWeight: "bold" }}>
                  {group.ageGroup}
                </Typography>
                <ul>
                  {group.vaccinations.map((item, i) => (
                    <li key={i}>{`${item.stage}: ${item.date}`}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        {catsData.length > 0 && (
          <div style={{ marginTop: "10px" }}>
            <Typography variant="h6">ข้อมูลแมว:</Typography>
            <ul>
              {catsData.map((cat, index) => (
                <li key={index}>
                  {cat.name} - อายุ: {cat.age}
                </li>
              ))}
            </ul>
          </div>
        )}
      </ModalContent>
    </StyledModal>
  );
};

export default VaccineProgramModal;
