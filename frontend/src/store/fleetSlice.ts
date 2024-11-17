import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Fleet, FleetPayload, FleetUpdatePayload } from "../types/fleet";
import { apiService } from "../api";
import { setLoading } from "./rootslice";

interface IFleetSlice {
  data: Fleet[];
  selectedFleet: Fleet | null;
  pageno: number;
  fetched: boolean;
  error: string | null;
  itemsPerPage: number;
}

const initialState: IFleetSlice = {
  data: [],
  pageno: 1,
  selectedFleet: null,
  fetched: false,
  error: null,
  itemsPerPage: 8,
};

// Async actions for CRUD operations
export const fetchFleets = createAsyncThunk("fleet/fetchFleets", async (_, { dispatch }) => {
  dispatch(setLoading(true));
  const response: any = await apiService.post("/api/fleets/getfleets", {});
  dispatch(setLoading(false));
  return response.data.data;
});

export const addFleet = createAsyncThunk("fleet/addFleet", async (newFleet: FleetPayload, { dispatch }) => {
  dispatch(setLoading(true));
  await apiService.post("/api/fleets", newFleet);
  await dispatch(fetchFleets()); // Fetch fleets again after adding
});

export const updateFleet = createAsyncThunk("fleet/updateFleet", async (updatedFleet: FleetUpdatePayload, { dispatch }) => {
  dispatch(setLoading(true));
  const response: any = await apiService.put(`/api/fleets/${updatedFleet.id}`, updatedFleet);
  dispatch(setLoading(false));
  return response.data;
});

export const deleteFleet = createAsyncThunk("fleet/deleteFleet", async (fleetId: number, { dispatch }) => {
  dispatch(setLoading(true));
  await apiService.delete(`/api/fleets/${fleetId}`);
  await dispatch(fetchFleets()); // Fetch fleets again after deleting
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
  },
  extraReducers: (builder) => {
    // Handle fetchFleets actions
    builder.addCase(fetchFleets.pending, (state) => {
      state.error = null;
    });
    builder.addCase(fetchFleets.fulfilled, (state, action: PayloadAction<Fleet[]>) => {
      state.data = action.payload;
      state.fetched = true;
    });
    builder.addCase(fetchFleets.rejected, (state, action) => {
      state.error = action.error.message || "Failed to fetch fleets";
    });

    // Handle addFleet actions
    builder.addCase(addFleet.pending, (state) => {
      state.error = null;
    });
    builder.addCase(addFleet.fulfilled, (state) => {});
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
    builder.addCase(deleteFleet.fulfilled, (state) => {});
    builder.addCase(deleteFleet.rejected, (state, action) => {
      state.error = action.error.message || "Failed to delete fleet";
    });
  },
});

export const { setSelectedFleet, clearSelectedFleet } = FleetSlice.actions;
export default FleetSlice.reducer;
