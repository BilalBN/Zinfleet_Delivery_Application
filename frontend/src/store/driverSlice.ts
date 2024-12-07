import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {} from "../types/fleet";
import { apiService } from "../api";
import { setLoading } from "./rootslice";
import { Driver, DriverPayload, DriverUpdatePayload } from "../types/driver";
import { showSnackbar } from "./snackbarSlice";

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

export const addDriver = createAsyncThunk<void, DriverPayload>(
  "/driver/addDriver",
  async (newDriver: DriverPayload, { dispatch }) => {
    dispatch(setLoading(true));
    await apiService.post("/api/drivers/add", newDriver);
    dispatch(fetchDrivers());
    dispatch(showSnackbar({ message: "Successfully added new driver", severity: "success" }));
  }
);

export const updateDriver = createAsyncThunk(
  "driver/updateDriver",
  async (updateDriver: DriverUpdatePayload, { dispatch }) => {
    dispatch(setLoading(true));
    const response: any = await apiService.put(`/api/drivers/${updateDriver.id}`, updateDriver);
    dispatch(showSnackbar({ message: "Successfully updated driver", severity: "success" }));
    await dispatch(fetchDrivers());
    return response.data;
  }
);

export const deleteDriver = createAsyncThunk("driver/deleteDriver", async (driverId: number, { dispatch }) => {
  dispatch(setLoading(true));
  await apiService.delete(`/api/drivers/${driverId}`);
  dispatch(showSnackbar({ message: "Successfully deleted a driver", severity: "success" }));
  await dispatch(fetchDrivers()); // Fetch fleets again after deleting
});

const DriverSlice = createSlice({
  name: "driver",
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
      state.error = action.error.message || "Failed to fetch drivers";
    });

    // Handle addDriver actions
    builder.addCase(addDriver.pending, (state) => {
      state.error = null;
    });
    builder.addCase(addDriver.fulfilled, (state) => {});
    builder.addCase(addDriver.rejected, (state, action) => {
      state.error = action.error.message || "Failed to add driver";
    });

    // Handle updateDriver actions
    builder.addCase(updateDriver.pending, (state) => {
      state.error = null;
    });
    builder.addCase(updateDriver.fulfilled, (state) => {});
    builder.addCase(updateDriver.rejected, (state, action) => {
      state.error = action.error.message || "Failed to update fleet";
    });

    // Handle deleteDriver actions
    builder.addCase(deleteDriver.pending, (state) => {
      state.error = null;
    });
    builder.addCase(deleteDriver.fulfilled, (state) => {});
    builder.addCase(deleteDriver.rejected, (state, action) => {
      state.error = action.error.message || "Failed to delete sriver";
    });
  },
});

export const {} = DriverSlice.actions;
export default DriverSlice.reducer;
