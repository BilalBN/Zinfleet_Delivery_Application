import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {} from "../types/fleet";
import { apiService } from "../api";
import { setLoading } from "./rootslice";
import { ShopItem, ShopPayload, ShopUpdatePayload } from "../types/shop";

interface IShoptSlice {
  data: ShopItem[];
  pageno: number;
  fetched: boolean;
  error: string | null;
  itemsPerPage: number;
}
const initialState: IShoptSlice = {
  data: [],
  pageno: 1,
  fetched: false,
  error: null,
  itemsPerPage: 8,
};

// Async actions for CRUD operations
export const fetchShops = createAsyncThunk("shop/fetchShops", async (_, { dispatch }) => {
  dispatch(setLoading(true));
  const response: any = await apiService.post("/api/shops/getshops", {});
  dispatch(setLoading(false));
  return response.data.data;
});

export const addShop = createAsyncThunk<void, ShopPayload>(
  "/shop/addshop",
  async (newShop: ShopPayload, { dispatch }) => {
    dispatch(setLoading(true));
    await apiService.post("/api/shops", newShop);
    dispatch(setLoading(false));
  }
);

export const updateShop = createAsyncThunk("shop/updateShop", async (updatedFleet: ShopUpdatePayload, { dispatch }) => {
  dispatch(setLoading(true));
  const response: any = await apiService.put(`/api/shops/${updatedFleet.id}`, updatedFleet);
  await dispatch(fetchShops());
  return response.data;
});

export const deleteShop = createAsyncThunk("shop/deleteShop", async (fleetId: number, { dispatch }) => {
  dispatch(setLoading(true));
  await apiService.delete(`/api/shops/${fleetId}`);
  await dispatch(fetchShops()); // Fetch fleets again after deleting
});

const ShoptSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle fetchShops actions
    builder.addCase(fetchShops.pending, (state) => {
      state.error = null;
    });
    builder.addCase(fetchShops.fulfilled, (state, action: PayloadAction<ShopItem[]>) => {
      state.data = action.payload;
      state.fetched = true;
    });
    builder.addCase(fetchShops.rejected, (state, action) => {
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

export const {} = ShoptSlice.actions;
export default ShoptSlice.reducer;
