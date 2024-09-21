import styled from "@emotion/styled/macro";

const Container = styled.div`
  width: 100%;
  padding: 25px 60px;
`;

const DivDataEdit = styled.div`
  max-width: 101%;
  background-color: #ffffff;
  margin-top: 100px;
  height: 80vh;
  min-height: 80vh;
  // overflow-y: scroll;
  position: relative;
`;

const UploadBox = styled.div`
  position: absolute;
  border: 1px dashed #aaa;
  padding: 10px;
  border-radius: 5px;
  margin-top: 100px;
  margin-left: 100px;
  text-align: center;
  width: 500px; /* ขนาดกล่อง */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* เงา */
  cursor: pointer;
`;

const AdditionalDetailsWrapper = styled.div`
  position: absolute;
  width: 660px;
  margin-top: 85px;
  margin-left: 750px;
`;

function BlogDataAdd() {
  return (
    <Container>
      <DivDataEdit>
        <UploadBox
          onClick={() => document.getElementById("imageUpload").click()}
        >
          <PanoramaIcon style={{ fontSize: 50, color: "#888" }} />
          <p>อัปโหลดรูปภาพ</p>
          <HiddenInput
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Selected"
              style={{ width: "80px", marginTop: "10px" }}
            />
          )}
        </UploadBox>
        <AdditionalDetailsWrapper>
          <TextField
            label="คำอธิบาย"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={20}
          />
        </AdditionalDetailsWrapper>
      </DivDataEdit>
    </Container>
  );
}

export default BlogDataAdd;
