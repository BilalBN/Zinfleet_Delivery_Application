import React from "react";
import {
  useForm,
  Controller,
  SubmitHandler,
} from "react-hook-form";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import { FleetPayload } from "../../../../types/fleet";

type AddFleetProps = {
  handleSave: (fleet: FleetPayload) => void;
  handleClose: (_event: React.MouseEvent, reason: string) => void;
  handleClickOpen: (value: boolean) => void;
  title: string;
  initialData?: FleetPayload;
  open: boolean;
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FieldItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const FleetDialog = ({
  title,
  open,
  handleClickOpen,
  handleClose,
  handleSave,
  initialData = {
    name: "",
    email: "",
    address: "",
    password: "",
    phoneNumber: "",
    username: "",
  },
}: AddFleetProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FleetPayload>({
    defaultValues: initialData,
    mode: "onChange",
  });

  const saveChanges: SubmitHandler<FleetPayload> = (data) => {
    handleSave(data);
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"sm"}
      open={open}
      disableEscapeKeyDown={true}
      onClose={handleClose}
    >
      <DialogTitle>
        <Header>
          <div>{title}</div>
          <IconButton
            onClick={() => {
              handleClickOpen(false);
            }}
          >
            <CloseIcon />
          </IconButton>
        </Header>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(saveChanges)}>
          <Container>
            <FieldItem>
              <InputLabel>Fleet Name*</InputLabel>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: "Fleet name is required",
                  validate: (value) =>
                    value.trim() !== "" || "Enter a valid fleet name",
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    autoFocus
                    placeholder="Enter fleet name"
                    fullWidth
                    variant="outlined"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </FieldItem>
            <FieldItem>
              <InputLabel>Address*</InputLabel>
              <Controller
                name="address"
                control={control}
                rules={{
                  required: "Address is required",
                  validate: (value) =>
                    value.trim() !== "" || "Enter a valid address",
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Enter fleet address"
                    fullWidth
                    variant="outlined"
                    error={!!errors.address}
                    helperText={errors.address?.message}
                  />
                )}
              />
            </FieldItem>
            <FieldItem>
              <InputLabel>Email*</InputLabel>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                  validate: (value) =>
                    value.trim() !== "" || "Email cannot be blank",
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Enter email address"
                    fullWidth
                    variant="outlined"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </FieldItem>
            <FieldItem>
              <InputLabel>Mobile Number*</InputLabel>
              <Controller
                name="phoneNumber"
                control={control}
                rules={{
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Enter a valid 10-digit mobile number",
                  },
                  validate: (value) =>
                    value.trim() !== "" || "Mobile number cannot be blank",
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Enter mobile number"
                    fullWidth
                    variant="outlined"
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber?.message}
                  />
                )}
              />
            </FieldItem>
            <FieldItem>
              <InputLabel>Username*</InputLabel>
              <Controller
                name="username"
                control={control}
                rules={{
                  required: "Username is required",
                  validate: (value) =>
                    value.trim() !== "" || "Enter a valid username",
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Enter username"
                    fullWidth
                    variant="outlined"
                    error={!!errors.username}
                    helperText={errors.username?.message}
                  />
                )}
              />
            </FieldItem>
            <FieldItem>
              <InputLabel>Password*</InputLabel>
              {!initialData.password && (
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "Password is required",
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                      message:
                        "Password must include at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 6 characters long",
                    },
                    validate: (value) =>
                      value.trim() !== "" || "Password cannot be blank",
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="password"
                      placeholder="Enter password"
                      fullWidth
                      variant="outlined"
                      error={!!errors.password}
                      helperText={errors.password?.message}
                    />
                  )}
                />
              )}
            </FieldItem>
          </Container>
          <DialogActions>
            <Button
              onClick={() => {
                handleClickOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button variant="contained" type="submit" disabled={!isValid}>
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};