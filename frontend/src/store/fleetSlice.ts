import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Fleet, FleetApiResponse, FleetPayload, FleetUpdatePayload } from "../types/fleet";
import { apiService } from "../api";
import { setLoading } from "./rootslice";
import { showSnackbar } from "./snackbarSlice";

interface IFleetSlice {
  data: Fleet[];
  selectedFleet: Fleet | null;
  pageno: number;
  fetched: boolean;
  error: string | null;
  page: number;
  limit: number;
  totalPages: number;
  total: number;
}

const initialState: IFleetSlice = {
  data: [],
  pageno: 1,
  selectedFleet: null,
  fetched: false,
  error: null,
  limit: 4,
  page: 1,
  totalPages: 0,
  total: 0,
};

// Async actions for CRUD operations
export const fetchFleets = createAsyncThunk("fleet/fetchFleets", async (_, { dispatch, getState }) => {
  const state: any = getState();
  const { page, limit } = state.fleet;
  dispatch(setLoading(true));
  const response: any = await apiService.post("/api/fleets/getfleets", {
    page,
    limit,
  });
  dispatch(setLoading(false));
  return response.data;
});

export const fetchAllFleets = createAsyncThunk("fleet/fetchAllFleets", async (_, { dispatch }) => {
  dispatch(setLoading(true));
  const response: any = await apiService.post("/api/fleets/getfleets", {});
  dispatch(setLoading(false));
  return response.data;
});

export const addFleet = createAsyncThunk("fleet/fleets", async (newFleet: FleetPayload, { dispatch }) => {
  dispatch(setLoading(true));
  await apiService.post("/api/fleets", newFleet);
  dispatch(showSnackbar({ message: "Successfully added fleet", severity: "success" }));
  await dispatch(fetchAllFleets()); // Fetch fleets again after adding
});

export const updateFleet = createAsyncThunk(
  "fleet/updateFleet",
  async (updatedFleet: FleetUpdatePayload, { dispatch }) => {
    dispatch(setLoading(true));
    const response: any = await apiService.put(`/api/fleets/${updatedFleet.id}`, updatedFleet);
    dispatch(showSnackbar({ message: "Successfully updated fleet", severity: "success" }));
    dispatch(setLoading(false));
    return response.data;
  }
);

export const deleteFleet = createAsyncThunk("fleet/deleteFleet", async (fleetId: number, { dispatch }) => {
  dispatch(setLoading(true));
  await apiService.delete(`/api/fleets/${fleetId}`);
  dispatch(showSnackbar({ message: "Successfully deleted fleet", severity: "success" }));
  await dispatch(fetchAllFleets()); // Fetch fleets again after deleting
});

const FleetSlice = createSlice({
  name: "fleet",
  initialState,
  reducers: {
    setSelectedFleet: (state, action: PayloadAction<Fleet>) => {
      state.selectedFleet = action.payload;
    },
    clearSelectedFleet: (state) => {
      state.selectedFleet = null;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle fetchFleets actions
    builder.addCase(fetchFleets.pending, (state) => {
      state.error = null;
    });
    builder.addCase(fetchFleets.fulfilled, (state, action: PayloadAction<FleetApiResponse>) => {
      state.data = action.payload.data;
      state.fetched = true;
      state.total = action.payload.total;
      state.totalPages = action.payload.totalPagess;
    });
    builder.addCase(fetchFleets.rejected, (state, action) => {
      state.error = action.error.message || "Failed to fetch fleets";
    });

    // Handle fetchAllFleets actions
    builder.addCase(fetchAllFleets.pending, (state) => {
      state.error = null;
    });
    builder.addCase(fetchAllFleets.fulfilled, (state, action: PayloadAction<FleetApiResponse>) => {
      state.data = action.payload.data;
      state.fetched = true;
      state.total = action.payload.data.length;
      state.totalPages = 1;
    });
    builder.addCase(fetchAllFleets.rejected, (state, action) => {
      state.error = action.error.message || "Failed to fetch fleets";
    });

    // Handle addFleet actions
    builder.addCase(addFleet.pending, (state) => {
      state.error = null;
    });
    builder.addCase(addFleet.fulfilled, (_state) => {});
    builder.addCase(addFleet.rejected, (state, action) => {
      state.error = action.error.message || "Failed to add fleet";
    });

    // Handle updateFleet actions
    builder.addCase(updateFleet.pending, (state) => {
      state.error = null;
    });
    builder.addCase(updateFleet.fulfilled, (state, action: PayloadAction<Fleet>) => {
      const index = state.data.findIndex((fleet) => fleet.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    });
    builder.addCase(updateFleet.rejected, (state, action) => {
      state.error = action.error.message || "Failed to update fleet";
    });

    // Handle deleteFleet actions
    builder.addCase(deleteFleet.pending, (state) => {
      state.error = null;
    });
    builder.addCase(deleteFleet.fulfilled, (_state) => {});
    builder.addCase(deleteFleet.rejected, (state, action) => {
      state.error = action.error.message || "Failed to delete fleet";
    });
  },
});

export const { setSelectedFleet, clearSelectedFleet, setPage } = FleetSlice.actions;
export default FleetSlice.reducer;
