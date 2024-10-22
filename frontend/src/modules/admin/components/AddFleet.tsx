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
import { Fleet } from "../../../types/fleet";

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
const initialValue: Fleet = {
    name: "",
    email: "",
    address: "",
    password: "",
    phone: "",
    userName: "",
};

export const FleetDetails = () => {
    const [fleet, setFleet] = useState<Fleet>(initialValue);
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
        setFleet((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        setFleet(initialValue);
    };
    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>
                <AddIcon />
                Add new fleet
            </Button>

            <Dialog fullWidth={true} maxWidth={"sm"} open={open} disableEscapeKeyDown={true} onClose={handleClose}>
                <DialogTitle>
                    <Header>
                        <div>Add Fleet Details</div>
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
                            <InputLabel>Fleet Name*</InputLabel>
                            <TextField
                                autoFocus
                                required
                                name="name"
                                label=""
                                fullWidth
                                placeholder="Enter fleet name"
                                variant="outlined"
                                value={fleet.name}
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
                                placeholder="Enter fleet address"
                                value={fleet.address}
                                onChange={handleChange}
                            />
                        </FieldItem>
                        <FieldItem>
                            <InputLabel>Email*</InputLabel>
                            <TextField
                                variant="outlined"
                                label=""
                                name="email"
                                fullWidth
                                placeholder="Enter email Address"
                                value={fleet.email}
                                onChange={handleChange}
                            />
                        </FieldItem>
                        <FieldItem>
                            <InputLabel>Mobile Number*</InputLabel>
                            <TextField
                                variant="outlined"
                                label=""
                                name="phone"
                                fullWidth
                                placeholder="Enter phone number"
                                value={fleet.phone}
                                onChange={handleChange}
                            />
                        </FieldItem>
                        <FieldItem>
                            <InputLabel>Select user name*</InputLabel>
                            <FormControl fullWidth>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={fleet.userName || ""}
                                    onChange={handleChange}
                                    name="userName"
                                    displayEmpty
                                >
                                    <MenuItem value="" disabled>
                                        Select user name
                                    </MenuItem>
                                    <MenuItem value={"BIKE"}>Bike</MenuItem>
                                    <MenuItem value={"CAR"}>Car</MenuItem>
                                    <MenuItem value={"VAN"}>Van</MenuItem>
                                </Select>
                            </FormControl>
                        </FieldItem>
                        <FieldItem>
                            <InputLabel>Password*</InputLabel>
                            <TextField
                                variant="outlined"
                                label=""
                                name="password"
                                fullWidth
                                placeholder="Password"
                                value={fleet.password}
                                onChange={handleChange}
                            />
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
                        disabled={!fleet.address || !fleet.name || !fleet.email || !fleet.phone || !fleet.userName || !fleet.password}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
};
