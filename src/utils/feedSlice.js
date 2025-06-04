import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeeds: (state, action) => action.payload,
    removeFeeds: (state, action) => null,
    filterFeeds: (state, action) => {
      let filtered = state.filter((feed) => feed._id !== action.payload);
      return filtered;
    },
  },
});

export const { addFeeds, removeFeeds, filterFeeds } = feedSlice.actions;

export default feedSlice.reducer;
