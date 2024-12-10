import { createSlice } from "@reduxjs/toolkit";

interface WarehouseOrder {
  id: number;
  order_id: number;
  name: string;
  date: string;
  no_of_items: number;
  delivery_location: string;
  items: any[];
  status: string;
}

interface IWarehouse {
  data: WarehouseOrder[];
  pageno: number;
  fetched: boolean;
  error: string | null;
  itemsPerPage: number;
}
const initialState: IWarehouse = {
  data: [{
    id: 1,
    order_id: 1,
    name: 'Rinshad',
    date: '10 may 2024',
    no_of_items: 2,
    delivery_location: 'Box no. 1172 Dubai',
    items: [],
    status: 'DELIVERED',
  },
  {
    id: 2,
    order_id: 3,
    name: 'Shaik',
    date: '12 June 2024',
    no_of_items: 2,
    delivery_location: 'Box no. 1122 Dubai',
    items: [],
    status: 'PENDING',
  }],
  pageno: 1,
  fetched: false,
  error: null,
  itemsPerPage: 8,
};

const Warehouse = createSlice({
  name: "warehouse",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const {} = Warehouse.actions;
export default Warehouse.reducer;