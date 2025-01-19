import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {} from "../types/fleet";
import { apiService } from "../api";
import { setLoading } from "./rootslice";
import { Driver, DriverAPIResponse, DriverPayload, DriverUpdatePayload } from "../types/driver";
import { showSnackbar } from "./snackbarSlice";

interface IDriver {
  data: Driver[];
  pageno: number;
  fetched: boolean;
  error: string | null;
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}
const initialState: IDriver = {
  data: [],
  pageno: 1,
  fetched: false,
  error: null,
  limit: 8,
  page: 1,
  total: 0,
  totalPages: 0,
};

// Async actions for CRUD operations
export const fetchDrivers = createAsyncThunk("driver/fetchDrivers", async (_, { dispatch, getState }) => {
  dispatch(setLoading(true));
  const state: any = getState();
  const { page, limit, total, totalPages } = state.driver;
  const response: any = await apiService.post("/api/drivers", { page, limit, total, totalPages });
  dispatch(setLoading(false));
  return response.data;
});

export const fetchAllDrivers = createAsyncThunk("driver/fetchAllDrivers", async (_, { dispatch }) => {
  dispatch(setLoading(true));
  const response: any = await apiService.post("/api/drivers", {});
  dispatch(setLoading(false));
  return response.data;
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
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle fetchDrivers actions
    builder.addCase(fetchDrivers.pending, (state) => {
      state.error = null;
    });
    builder.addCase(fetchDrivers.fulfilled, (state, action: PayloadAction<DriverAPIResponse>) => {
      state.data = action.payload.data;
      state.fetched = true;
      state.total = action.payload.total;
      state.totalPages = action.payload.totalPagess;
    });
    builder.addCase(fetchDrivers.rejected, (state, action) => {
      state.error = action.error.message || "Failed to fetch drivers";
    });

    // Handle fetchAllDrivers actions
    builder.addCase(fetchAllDrivers.pending, (state) => {
      state.error = null;
    });
    builder.addCase(fetchAllDrivers.fulfilled, (state, action: PayloadAction<DriverAPIResponse>) => {
      state.data = action.payload.data;
      state.fetched = true;
      state.total = action.payload.data.length;
      state.totalPages = 1;
    });
    builder.addCase(fetchAllDrivers.rejected, (state, action) => {
      state.error = action.error.message || "Failed to fetch drivers";
    });

    // Handle addDriver actions
    builder.addCase(addDriver.pending, (state) => {
      state.error = null;
    });
    builder.addCase(addDriver.fulfilled, (_state) => {});
    builder.addCase(addDriver.rejected, (state, action) => {
      state.error = action.error.message || "Failed to add driver";
    });

    // Handle updateDriver actions
    builder.addCase(updateDriver.pending, (state) => {
      state.error = null;
    });
    builder.addCase(updateDriver.fulfilled, (_state) => {});
    builder.addCase(updateDriver.rejected, (state, action) => {
      state.error = action.error.message || "Failed to update fleet";
    });

    // Handle deleteDriver actions
    builder.addCase(deleteDriver.pending, (state) => {
      state.error = null;
    });
    builder.addCase(deleteDriver.fulfilled, (_state) => {});
    builder.addCase(deleteDriver.rejected, (state, action) => {
      state.error = action.error.message || "Failed to delete sriver";
    });
  },
});

export const { setPage } = DriverSlice.actions;
export default DriverSlice.reducer;
