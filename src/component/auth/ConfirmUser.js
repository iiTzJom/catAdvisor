import CircularProgress from "@mui/material/CircularProgress";
import styled from "@emotion/styled/macro";
import { useEffect, useState } from "react";
import { checkConfirmUserApi, confirmUserApi } from "../../api/auth";
import { is } from "date-fns/locale/is";
const Contain = styled.div`
  max-width: 100%;
  display: flex;
  justify-content: center;
  min-height: 440px;
  position: relative;
`;

const DivIconLoading = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
`;
function ConfirmUserLink() {
  const [isChkStatus, setIsChkStatus] = useState(null);
  const [dataReturn, setDataReturn] = useState(null);
  useEffect(() => {
    checkConfirmUserApi({
      id: window.location.search.split("%2f")[1],
      userName: window.location.search.split("%2f")[0].split("?")[1],
    }).then(({ data }) => {
      if (data.code == 200) {
        setIsChkStatus(true);
        setDataReturn(data.message);
        confirmUserApi({
          id: window.location.search.split("%2f")[1],
          userName: window.location.search.split("%2f")[0].split("?")[1],
        }).then(({ data }) => {
          if (data.code === 200) {
            setDataReturn("success");
          }
        });
      } else {
        setIsChkStatus(false);
      }
    });
  }, []);

  return (
    <Contain>
      <DivIconLoading>
        {isChkStatus === null && <CircularProgress />}
        {isChkStatus === true && dataReturn === "success" && (
          <>vertify success</>
        )}
        {isChkStatus === false && <>404</>}
      </DivIconLoading>
    </Contain>
  );
}

export default ConfirmUserLink;
