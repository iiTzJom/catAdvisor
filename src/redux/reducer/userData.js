import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLang: "th",
};

const userReducer = createSlice({
  name: "userState",
  initialState,
  reducers: {
    changeLang: (state, action) => {
      state.isLang = action.payload;
    },
  },
});

export const { changeLang } = userReducer.actions;
export default userReducer.reducer;
