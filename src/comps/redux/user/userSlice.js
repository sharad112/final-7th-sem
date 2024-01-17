import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   loading: false,
//   userData: [],
//   error: "",
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     fetchUserRequest: (state) => {
//       state.loading = true;
//     },
//     fetchUserRequestSuccees: (state, action) => {
//       state.loading = false;
//       state.userData = action.payload;
//       state.error = "";
//     },
//     fetchUserRequestFailure: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//   },
// });
// export const {
//   fetchUserRequest,
//   fetchUserRequestSuccees,
//   fetchUserRequestFailure,
// } = userSlice.actions;
// export default userSlice.reducer;

const initialState = {
  userData: [],
  isLoading: false,
  error: "",
};

export const fetchUsers = createAsyncThunk("user/fetchUser", async () => {
  const response = await axios.get("");
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userData = action.payload;
      state.error = "";
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;
