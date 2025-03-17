import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order, OrderAPIResponse, OrderType } from "../types/order";
import { apiService } from "../api";

interface IOrderSlice {
  loading: boolean;
  selectedOrder: OrderType;
  data: Order[];
  fetched: boolean;
  error: string | null;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export type OrderTable = {
  id: number,
  amount: string,
  quantity: string,
  status: number,
  shop: number,
  pickUp: string
  delivery: string
}

const initialState: IOrderSlice = {
  loading: false,
  selectedOrder: OrderType.Live,
  data: [],
  fetched: false,
  error: null,
  page: 1,
  limit: 8,
  total: 0,
  totalPages: 0,
};

export const fetchAllOrders = createAsyncThunk(
  "orders/fetcAllhOrders",
  async (payload: { order_type: string; fleetId: number | null }, { dispatch }) => {
    dispatch(setLoading(true));
    const response: any = await apiService.post("/api/orders/fleetorders", payload);
    dispatch(setLoading(false));
    return response.data;
  }
);

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (payload: { order_type: string; fleetId: number | null }, { dispatch, getState }) => {
    const state: any = getState();
    const { page, limit } = state.order;
    dispatch(setLoading(true));
    const response: any = await apiService.post("/api/orders/fleetorders", { ...payload, page, limit });
    dispatch(setLoading(false));
    return response.data;
  }
);

const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSelectedOrder: (state, action: PayloadAction<OrderType>) => {
      state.selectedOrder = action.payload;
      state.page = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle fetchOrders actions
    builder.addCase(fetchOrders.pending, (state) => {
      state.error = null;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action: PayloadAction<OrderAPIResponse>) => {
      state.data = action.payload.data;
      state.fetched = true;
      state.total = action.payload.total;
      state.totalPages = action.payload.totalPagess;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.error = action.error.message || "Failed to fetch shops";
    });

    // Handle fetchAllOrders actions
    builder.addCase(fetchAllOrders.pending, (state) => {
      state.error = null;
    });
    builder.addCase(fetchAllOrders.fulfilled, (state, action: PayloadAction<OrderAPIResponse>) => {
      state.data = action.payload.data;
      state.fetched = true;
      state.total = action.payload.data.length;
      state.totalPages = 1;
    });
    builder.addCase(fetchAllOrders.rejected, (state, action) => {
      state.error = action.error.message || "Failed to fetch shops";
    });
  },
});

export const { setLoading, setSelectedOrder, setPage } = OrderSlice.actions;

export default OrderSlice.reducer;
