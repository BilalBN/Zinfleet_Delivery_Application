import { isRejected } from "@reduxjs/toolkit";
import { Middleware } from "redux";
import { setLoading } from "../rootslice";
import { showSnackbar } from "../snackbarSlice";

export const loadingMiddleware: Middleware = (store) => (next) => (action) => {
  if (isRejected(action)) {
    store.dispatch(setLoading(false));
    store.dispatch(showSnackbar({ message: "Something went wrong", severity: "error" }));
  }
  return next(action);
};
