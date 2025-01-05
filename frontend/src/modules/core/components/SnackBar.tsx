import { Snackbar, Alert } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { hideSnackbar } from '../../../store/snackbarSlice';

export const SnackbarComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { open, message, severity } = useAppSelector((state) => state.snackbar);

  const closeSnackbar = () => {
    dispatch(hideSnackbar());
  };

  return (
    <Snackbar
      open={open}
      onClose={closeSnackbar}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={50000}
    >
      <Alert
        id="toaster-body"
        onClose={closeSnackbar}
        severity={severity}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
