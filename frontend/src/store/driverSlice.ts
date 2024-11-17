import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {} from "../types/fleet";
import { apiService } from "../api";
import { setLoading } from "./rootslice";
import { Driver, DriverPayload, DriverUpdatePayload } from "../types/driver";

interface IDriver {
  data: Driver[];
  pageno: number;
  fetched: boolean;
  error: string | null;
  itemsPerPage: number;
}
const initialState: IDriver = {
  data: [],
  pageno: 1,
  fetched: false,
  error: null,
  itemsPerPage: 8,
};

// Async actions for CRUD operations
export const fetchDrivers = createAsyncThunk("driver/fetchDrivers", async (_, { dispatch }) => {
  dispatch(setLoading(true));
  const response: any = await apiService.post("/api/drivers", {});
  dispatch(setLoading(false));
  return response.data.data;
});

export const addShop = createAsyncThunk<void, DriverPayload>(
  "/driver/addDriver",
  async (newShop: DriverPayload, { dispatch }) => {
    dispatch(setLoading(true));
    await apiService.post("/api/drivers", newShop);
    dispatch(setLoading(false));
  }
);

export const updateShop = createAsyncThunk("driver/updateDriver", async (updatedFleet: DriverUpdatePayload, { dispatch }) => {
  dispatch(setLoading(true));
  const response: any = await apiService.put(`/api/drivers/${updatedFleet.id}`, updatedFleet);
  await dispatch(fetchDrivers());
  return response.data;
});

export const deleteShop = createAsyncThunk("driver/deleteDriver", async (fleetId: number, { dispatch }) => {
  dispatch(setLoading(true));
  await apiService.delete(`/api/drivers/${fleetId}`);
  await dispatch(fetchDrivers()); // Fetch fleets again after deleting
});

const DriverSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle fetchDrivers actions
    builder.addCase(fetchDrivers.pending, (state) => {
      state.error = null;
    });
    builder.addCase(fetchDrivers.fulfilled, (state, action: PayloadAction<Driver[]>) => {
      state.data = action.payload;
      state.fetched = true;
    });
    builder.addCase(fetchDrivers.rejected, (state, action) => {
      state.error = action.error.message || "Failed to fetch shops";
    });

    // Handle addShop actions
    builder.addCase(addShop.pending, (state) => {
      state.error = null;
    });
    builder.addCase(addShop.fulfilled, (state) => {});
    builder.addCase(addShop.rejected, (state, action) => {
      state.error = action.error.message || "Failed to add shop";
    });

    // Handle updateShop actions
    builder.addCase(updateShop.pending, (state) => {
      state.error = null;
    });
    builder.addCase(updateShop.fulfilled, (state) => {});
    builder.addCase(updateShop.rejected, (state, action) => {
      state.error = action.error.message || "Failed to update fleet";
    });

    // Handle deleteShop actions
    builder.addCase(deleteShop.pending, (state) => {
      state.error = null;
    });
    builder.addCase(deleteShop.fulfilled, (state) => {});
    builder.addCase(deleteShop.rejected, (state, action) => {
      state.error = action.error.message || "Failed to delete shop";
    });
  },
});

export const {} = DriverSlice.actions;
export default DriverSlice.reducer;
