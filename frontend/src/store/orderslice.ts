import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order, OrderType } from "../types/order";

interface IOrderSlice {
  loading: boolean;
  selectedOrder: OrderType;
  data: Order[];
  fetched: boolean;
}

const initialState: IOrderSlice = {
  loading: false,
  selectedOrder: OrderType.Live,
  data: [],
  fetched: false,
};

const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSelectedOrder: (state, action: PayloadAction<OrderType>) => {
      state.selectedOrder = action.payload;
    },
  },
});

export const { setLoading, setSelectedOrder } = OrderSlice.actions;

export default OrderSlice.reducer;
