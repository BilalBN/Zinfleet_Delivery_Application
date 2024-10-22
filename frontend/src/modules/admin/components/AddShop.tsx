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
import { Shop } from "../../../types/shop";

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
const initialValue: Shop = {
    name: "",
    warehouseAddress: "",
    address: "",
    fleetName: "",
    userName: "",
    password: ""
};

export const ShopDetails = () => {
    const [shop, setShop] = useState<Shop>(initialValue);
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
        setShop((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        setShop(initialValue);
    };
    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>
                <AddIcon />
                Add new shop
            </Button>

            <Dialog fullWidth={true} maxWidth={"sm"} open={open} disableEscapeKeyDown={true} onClose={handleClose}>
                <DialogTitle>
                    <Header>
                        <div>Add shop Details</div>
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
                            <InputLabel>Shop Name*</InputLabel>
                            <TextField
                                autoFocus
                                required
                                name="name"
                                label=""
                                fullWidth
                                placeholder="Enter shop name"
                                variant="outlined"
                                value={shop.name}
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
                                placeholder="Enter shop address"
                                value={shop.address}
                                onChange={handleChange}
                            />
                        </FieldItem>
                        <FieldItem>
                            <InputLabel>Warehous address*</InputLabel>
                            <TextField
                                variant="outlined"
                                label=""
                                name="warehouseAddress"
                                fullWidth
                                placeholder="Enter full Address"
                                value={shop.warehouseAddress}
                                onChange={handleChange}
                            />
                        </FieldItem>
                        <FieldItem>
                            <InputLabel>Select fleet name*</InputLabel>
                            <FormControl fullWidth>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={shop.fleetName || ""}
                                    onChange={handleChange}
                                    name="fleetName"
                                    displayEmpty
                                >
                                    <MenuItem value="" disabled>
                                        Select fleet name
                                    </MenuItem>
                                    <MenuItem value={"BIKE"}>Bike</MenuItem>
                                    <MenuItem value={"CAR"}>Car</MenuItem>
                                    <MenuItem value={"VAN"}>Van</MenuItem>
                                </Select>
                            </FormControl>
                        </FieldItem>
                        <FieldItem>
                            <InputLabel>User Name*</InputLabel>
                            <TextField
                                variant="outlined"
                                label=""
                                name="userName"
                                fullWidth
                                placeholder="Add user name"
                                value={shop.userName}
                                onChange={handleChange}
                            />
                        </FieldItem>
                        <FieldItem>
                            <InputLabel>Password*</InputLabel>
                            <TextField
                                variant="outlined"
                                label=""
                                name="password"
                                fullWidth
                                placeholder="password"
                                value={shop.password}
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
                        disabled={!shop.address || !shop.name || !shop.address || !shop.warehouseAddress || !shop.userName|| !shop.password}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
};
