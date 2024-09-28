import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state using a TypeScript interface
interface RootState {
  loading: boolean;
}

const initialState: RootState = {
  loading: false,
};

const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

// Export the actions
export const { setLoading } = rootSlice.actions;

// Export the reducer
export default rootSlice.reducer;
