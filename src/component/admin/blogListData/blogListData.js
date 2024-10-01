import React, { useState, useEffect } from "react";
import styled from "@emotion/styled/macro";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Button, MenuItem } from "@mui/material";
import { getBlogList, deleteBlog } from "../../../api/blog";

// Styles for the main container and card components
const Container = styled.div`
  display: flex;
  background-color: #71a9db;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const CardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  overflow-y: scroll;
  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #ededed;
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #d4d2d2;
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #d4d4d4;
  }
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  padding: 20px;
  position: relative;
  text-align: center;
`;

const CardImage = styled.img`
  width: 300px;
  height: 275px;
  border-radius: 8px;
  object-fit: cover;
`;

const CardTitle = styled.h3`
  font-size: 20px;
  margin-top: 10px;
`;

const CardDescription = styled.p`
  font-size: 14px;
  color: #555;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const IconWrapper = styled.div`
  position: absolute;
  top: -2px;
  right: 10px;
  cursor: pointer;
  &.MuiPaper-root-MuiPopover-paper-MuiMenu-paper {
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const DivReccommend = styled.div`
  width: 100%;
  text-align: -webkit-right;
`;

const Reccommend = styled.div`
  margin-top: 8px;
  font-size: 16px;
  font-weight: bold;
  width: fit-content;
  color: #ffffff;
  background-color: #d7878a;
  padding: 5px 30px;
  text-align: center;
`;

const DivMenu = styled.div`
  background-color: #ffffff;
  position: absolute;
  z-index: 1;
  left: -80px;
  top: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;

function BlogDataList() {
  const [isOpenMenu, setIsOpenMenu] = useState(null);
  const [dataBlogs, setDataBlogs] = useState([]);

  useEffect(() => {
    var newData = [];
    const getData = getBlogList()
      .then((data) => {
        if (data?.data?.code === 200) {
          Object.keys(data?.data?.data).map((key) => [
            newData.push(data?.data?.data[key]),
          ]);
          setDataBlogs(newData);
        }
      })
      .catch((err) => err);

    return () => {
      clearInterval(getData); // ใช้ clearInterval แทน destroy
    };
  }, []);

  const deleteData = (id) => {
    deleteBlog(id)
      .then((data) => {
        if (data?.data?.code === 200) {
          window.location.href = "/admin?blog-data-list";
        }
      })
      .catch((err) => err);
  };

  return (
    <Container>
      <ContentWrapper>
        <DivButtonAdd>
          <AddButton
            onClick={() => (window.location.href = "/Admin?blogCatData")}
            startIcon={<AddIcon />}
          >
            เพิ่มข้อมูลแมว
          </AddButton>
        </DivButtonAdd>
        <CardList>
          {dataBlogs?.map((blog, i) => (
            <Card key={blog?.id}>
              <CardImage src={blog?.imgCat} alt={blog?.title} />
              <CardTitle>{blog?.title}</CardTitle>
              <CardDescription>{blog?.description}</CardDescription>
              <IconWrapper>
                <MoreHorizIcon onClick={() => setIsOpenMenu(blog?.id)} />

                {isOpenMenu === blog?.id && (
                  <DivMenu onMouseLeave={() => setIsOpenMenu(null)}>
                    <MenuItem
                      onClick={() =>
                        (window.location.href = `/Admin?blogCatData&id=${blog?.id}`)
                      }
                    >
                      <EditIcon style={{ marginRight: "8px" }} />
                      แก้ไข
                    </MenuItem>
                    <MenuItem onClick={() => deleteData(blog?.id)}>
                      <DeleteIcon style={{ marginRight: "8px" }} />
                      ลบ
                    </MenuItem>
                  </DivMenu>
                )}
              </IconWrapper>
              <DivReccommend>
                {blog?.recommend && <Reccommend>เเนะนำ</Reccommend>}
              </DivReccommend>
            </Card>
          ))}
        </CardList>
      </ContentWrapper>
    </Container>
  );
}
export default BlogDataList;
