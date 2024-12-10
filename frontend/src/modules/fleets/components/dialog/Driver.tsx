import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import { DriverPayload } from "../../../../types/driver";
import { decodeToken } from "../../../core/utils";

type DriverProps = {
    handleSave: (fleet: DriverPayload) => void;
    handleClose: (_event: React.MouseEvent, reason: string) => void;
    handleClickOpen: (value: boolean) => void;
    title: string;
    initialData?: DriverPayload;
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

export const DriverDialog = ({
    title,
    open,
    handleClickOpen,
    handleClose,
    handleSave,
    initialData = {
        name: "",
        licenseNumber: "",
        age: 0,
        address: "",
        phoneNumber: "",
        fleet_id: 0,
        vehicle_type: ''
    },
}: DriverProps) => {
    const {
        handleSubmit,
        control,
        formState: { errors, isValid },
    } = useForm<DriverPayload>({
        defaultValues: initialData,
        mode: "onChange",
    });

    const saveChanges: SubmitHandler<DriverPayload> = (data) => {
        const decodedToken = decodeToken(localStorage.getItem('authToken') ?? '')
        const payload = { ...data, fleet_id: decodedToken.fleet_id }
        handleSave(payload);
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
                            <InputLabel>Driver Name*</InputLabel>
                            <Controller
                                name="name"
                                control={control}
                                rules={{ required: "Driver name is required" }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        autoFocus
                                        placeholder="Enter driver name"
                                        fullWidth
                                        variant="outlined"
                                        error={!!errors.name}
                                        helperText={errors.name?.message}
                                    />
                                )}
                            />
                        </FieldItem>
                        <FieldItem>
                            <InputLabel>Driver Id*</InputLabel>
                            <Controller
                                name="licenseNumber"
                                control={control}
                                rules={{
                                    required: "License number is required",
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message: "License number must be 10 digits",
                                    },
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        placeholder="Enter your license number"
                                        fullWidth
                                        variant="outlined"
                                        error={!!errors.licenseNumber}
                                        helperText={errors.licenseNumber?.message}
                                    />
                                )}
                            />
                        </FieldItem>
                        <FieldItem>
                            <InputLabel>Address*</InputLabel>
                            <Controller
                                name="address"
                                control={control}
                                rules={{ required: "Address is required" }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        placeholder="Enter full Address"
                                        fullWidth
                                        variant="outlined"
                                        error={!!errors.address}
                                        helperText={errors.address?.message}
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
                                        message: "Invalid mobile number",
                                    },
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
                            <InputLabel>Age*</InputLabel>
                            <Controller
                                name="age"
                                control={control}
                                rules={{
                                    required: "Age is required",
                                    validate: (value) =>
                                        value > 0 || "Age must be greater than 0",
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        placeholder="Enter your age"
                                        fullWidth
                                        variant="outlined"
                                        type="number"
                                        error={!!errors.age}
                                        helperText={errors.age?.message}
                                    />
                                )}
                            />
                        </FieldItem>
                        <FieldItem>
                            <InputLabel>Vehicle Type*</InputLabel>
                            <Controller
                                name="vehicle_type"
                                control={control}
                                rules={{
                                    required: "Vehicle type is required",
                                }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        displayEmpty
                                        fullWidth
                                        variant="outlined"
                                        error={!!errors.vehicle_type}
                                    >
                                        <MenuItem value="" disabled>
                                            Select Vehicle Type
                                        </MenuItem>
                                        {["Lorry", "Bike", "Bicycle"].map((vehicleType) => (
                                            <MenuItem key={vehicleType} value={vehicleType}>
                                                {vehicleType}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                            {errors.vehicle_type && (
                                <p style={{ color: "red", margin: "5px 0 0" }}>
                                    {errors.vehicle_type.message}
                                </p>
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
