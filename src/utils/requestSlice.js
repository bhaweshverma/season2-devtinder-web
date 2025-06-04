import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    addRequest: (state, action) => action.payload,
    removeRequest: (state, action) => null,
    filterRequest: (state, action) => {
      const filteredArr = state.filter(
        (request) => request._id !== action.payload._id
      );
      return filteredArr;
    },
  },
});

export const { addRequest, removeRequest, filterRequest } =
  requestSlice.actions;

export default requestSlice.reducer;
