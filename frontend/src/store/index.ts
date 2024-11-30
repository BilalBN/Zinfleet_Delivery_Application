import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import rootSlice from "./rootslice";
import orderslice from "./orderslice";
import fleetSlice from "./fleetSlice";
import ShoptSlice from "./shopSlice";
import DriverSlice from "./driverSlice";
import SnackbarReducer from "./snackbarSlice";
import WarehouseReducer from "./warehouse";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    root: rootSlice,
    order: orderslice,
    fleet: fleetSlice,
    shop: ShoptSlice,
    driver: DriverSlice,
    snackbar: SnackbarReducer,
    warehouse: WarehouseReducer,
  },
});
