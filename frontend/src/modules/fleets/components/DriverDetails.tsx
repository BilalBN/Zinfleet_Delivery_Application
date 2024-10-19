import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, InputLabel } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import styled from "@emotion/styled";
import { Driver } from "../../../types/driver";

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
const initialValue: Driver = {
    name: "",
    id: "",
    address: "",
    contact: "",
    vehicle: "",
};

export const DriverDetails = () => {
    const [driver, setDriver] = useState<Driver>(initialValue);
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (_event: React.MouseEvent, reason: string) => {
        if (reason !== "backdropClick") {
            setOpen(false);
        }
    };

    const handleChange = (
        event: SelectChangeEvent<string> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;
        setDriver((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        setDriver(initialValue);
    };
    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>
                <AddIcon />
                Add Driver
            </Button>

            <Dialog fullWidth={true} maxWidth={"sm"} open={open} disableEscapeKeyDown={true} onClose={handleClose}>
                <DialogTitle>
                    <Header>
                        <div>Add Driver Details</div>
                        <IconButton
                            onClick={() => {
                                setOpen(false);
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
                                name="id"
                                fullWidth
                                placeholder="Enter ID number"
                                value={driver.id}
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
                                name="contact"
                                fullWidth
                                placeholder="Enter mobile number"
                                value={driver.contact}
                                onChange={handleChange}
                            />
                        </FieldItem>
                        <FieldItem>
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
                        </FieldItem>
                    </Container>
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSave}
                        disabled={!driver.address || !driver.name || !driver.id || !driver.contact || !driver.vehicle}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
};
