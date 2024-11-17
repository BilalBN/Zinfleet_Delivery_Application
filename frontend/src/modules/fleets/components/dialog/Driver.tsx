import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { IconButton, InputLabel } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import styled from "@emotion/styled";
import { DriverPayload } from "../../../../types/driver";

type DriverProps = {
    handleSave: (fleet: DriverPayload) => void
    handleClose: (_event: React.MouseEvent, reason: string) => void
    handleClickOpen: (value: boolean) => void
    title: string
    initialData?: DriverPayload
    open: boolean

}

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
const initialValue: DriverPayload = {
    name: "",
    licenseNumber: "",
    age: 0,
    address: "",
    phoneNumber: "",
};

export const DriverDialog = ({ title, open, handleClickOpen, handleClose, handleSave }: DriverProps) => {
    const [driver, setDriver] = useState<DriverPayload>(initialValue);



    const handleChange = (
        event: SelectChangeEvent<string> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;
        setDriver((prev) => ({ ...prev, [name]: value }));
    };

    const saveChanges = () => {
        handleSave(driver)
    };
    return (
        <Dialog fullWidth={true} maxWidth={"sm"} open={open} disableEscapeKeyDown={true} onClose={handleClose}>
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
                <Container>
                    <FieldItem>
                        <InputLabel>Driver Name*</InputLabel>
                        <TextField
                            autoFocus
                            required
                            name="name"
                            label=""
                            fullWidth
                            placeholder="Enter driver name"
                            variant="outlined"
                            value={driver.name}
                            onChange={handleChange}
                        />
                    </FieldItem>
                    <FieldItem>
                        <InputLabel>Driver Id*</InputLabel>
                        <TextField
                            variant="outlined"
                            label=""
                            name="licenseNumber"
                            fullWidth
                            placeholder="Enter your license number"
                            value={driver.licenseNumber}
                            onChange={handleChange}
                        />
                    </FieldItem>
                    <FieldItem>
                        <InputLabel>Address*</InputLabel>
                        <TextField
                            variant="outlined"
                            label=""
                            name="address"
                            fullWidth
                            placeholder="Enter full Address"
                            value={driver.address}
                            onChange={handleChange}
                        />
                    </FieldItem>
                    <FieldItem>
                        <InputLabel>Mobile Number*</InputLabel>
                        <TextField
                            variant="outlined"
                            label=""
                            name="phoneNumber"
                            fullWidth
                            placeholder="Enter mobile number"
                            value={driver.phoneNumber}
                            onChange={handleChange}
                        />
                    </FieldItem>
                    <FieldItem>
                        <InputLabel>Age*</InputLabel>
                        <TextField
                            variant="outlined"
                            label=""
                            name="age"
                            fullWidth
                            placeholder="Enter your age"
                            value={driver.age}
                            onChange={handleChange}
                        />
                    </FieldItem>
                    {/* <FieldItem>
                        <InputLabel>Vehicle*</InputLabel>
                        <FormControl fullWidth>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={driver.vehicle || ""}
                                onChange={handleChange}
                                name="vehicle"
                                displayEmpty
                            >
                                <MenuItem value="" disabled>
                                    Select Vehicle Type
                                </MenuItem>
                                <MenuItem value={"BIKE"}>Bike</MenuItem>
                                <MenuItem value={"CAR"}>Car</MenuItem>
                                <MenuItem value={"VAN"}>Van</MenuItem>
                            </Select>
                        </FormControl>
                    </FieldItem> */}
                </Container>
            </DialogContent>

            <DialogActions>
                <Button
                    onClick={() => {
                        handleClickOpen(false)
                    }}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={saveChanges}
                    disabled={!driver.address || !driver.name || !driver.licenseNumber || !driver.phoneNumber || !driver.age}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};
