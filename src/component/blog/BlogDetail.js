import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "@emotion/styled/macro";

const Contain = styled.div`
  width: 100%;
  height: 100%;
`;

function BlogDetail() {
  let location = useLocation();
  const [dataDetaiil, setDataDetail] = useState(1);
  const initial = [
    { page: 1, detail: "AAAAAAAAA" },
    { page: 2, detail: "BBBBBBBB" },
    { page: 3, detail: "CCCCCC" },
  ];

  useEffect(() => {
    initial.map((data, i) =>
      data.page == location.pathname.split("/")[2]
        ? setDataDetail(initial[i].detail)
        : setDataDetail("OTHER")
    );
  }, []);

  return <Contain>AAA</Contain>;
}

export default BlogDetail;
