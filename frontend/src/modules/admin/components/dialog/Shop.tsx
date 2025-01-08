import React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { ShopPayload } from "../../../../types/shop";
import { useAppSelector } from "../../../../store/hook";

type ShopProps = {
  handleSave: (shop: ShopPayload) => void;
  handleClose: (_event: React.MouseEvent, reason: string) => void;
  handleClickOpen: (value: boolean) => void;
  title: string;
  initialData?: ShopPayload;
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

export const ShopDialog = ({
  open,
  handleClickOpen,
  handleClose,
  handleSave,
  initialData,
}: ShopProps) => {
  const { data: fleetData } = useAppSelector((state) => state.fleet);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ShopPayload>({
    defaultValues: initialData || {
      name: "",
      address: "",
      warehouse_address: "",
      fleet_id: -1,
      username: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<ShopPayload> = (data) => {
    handleSave(data);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      disableEscapeKeyDown
      onClose={handleClose}
    >
      <DialogTitle>
        <Header>
          <div>{initialData ? "Edit Shop" : "Add Shop"}</div>
          <IconButton
            onClick={() => handleClickOpen(false)}
          >
            <CloseIcon />
          </IconButton>
        </Header>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Container>
            <FieldItem>
              <InputLabel>Shop Name*</InputLabel>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: "Shop name is required",
                  validate: (value) =>
                    value.trim() !== "" || "Shop name cannot contain only spaces",
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    placeholder="Enter shop name"
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
                    value.trim() !== "" || "Address cannot contain only spaces",
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    placeholder="Enter shop address"
                    variant="outlined"
                    error={!!errors.address}
                    helperText={errors.address?.message}
                  />
                )}
              />
            </FieldItem>
            <FieldItem>
              <InputLabel>Warehouse Address*</InputLabel>
              <Controller
                name="warehouse_address"
                control={control}
                rules={{
                  required: "Warehouse address is required",
                  validate: (value) =>
                    value.trim() !== "" ||
                    "Warehouse address cannot contain only spaces",
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    placeholder="Enter warehouse address"
                    variant="outlined"
                    error={!!errors.warehouse_address}
                    helperText={errors.warehouse_address?.message}
                  />
                )}
              />
            </FieldItem>
            <FieldItem>
              <InputLabel>Select Fleet Name*</InputLabel>
              <FormControl fullWidth>
                <Controller
                  name="fleet_id"
                  control={control}
                  rules={{
                    required: "Fleet name is required",
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      displayEmpty
                      variant="outlined"
                      error={!!errors.fleet_id}
                    >
                      <MenuItem value={-1} disabled>
                        Select fleet name
                      </MenuItem>
                      {fleetData.map((fleet: any) => (
                        <MenuItem key={fleet.id} value={fleet.id}>
                          {fleet.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
              {errors.fleet_id && (
                <p style={{ color: "red", margin: "5px 0 0" }}>
                  {errors.fleet_id.message}
                </p>
              )}
            </FieldItem>
            <FieldItem>
              <InputLabel>Username*</InputLabel>
              <Controller
                name="username"
                control={control}
                rules={{
                  required: "Username is required",
                  validate: (value) =>
                    value.trim() !== "" || "Username cannot contain only spaces",
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    placeholder="Enter username"
                    variant="outlined"
                    error={!!errors.username}
                    helperText={errors.username?.message}
                  />
                )}
              />
            </FieldItem>
            {!initialData && (
              <FieldItem>
                <InputLabel>Password*</InputLabel>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "Password is required",
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                      message:
                        "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 6 characters long",
                    },
                    validate: (value) =>
                      value.trim() !== "" || "Password cannot contain only spaces",
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="password"
                      fullWidth
                      placeholder="Enter password"
                      variant="outlined"
                      error={!!errors.password}
                      helperText={errors.password?.message}
                    />
                  )}
                />
              </FieldItem>
            )}
          </Container>
          <DialogActions>
            <Button onClick={() => handleClickOpen(false)}>Cancel</Button>
            <Button
              variant="contained"
              type="submit"
              disabled={!isValid}
            >
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};