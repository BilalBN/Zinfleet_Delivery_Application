import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { FormControl, InputLabel } from "@mui/material";
export const DriverDetails = () => {
    const [open, setOpen] = useState(false);
    // const [age, setAge] = useState(0);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    // const handleChange = (event: SelectChangeEvent<string>) => {
    //     setAge(Number(event.target.value));
    // };
    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>
                <AddIcon />
                Add Driver
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: "form",
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData as any).entries());
                        const email = formJson.email;
                        console.log(email);
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Add Driver Details</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="Enter driver name"
                        label=""
                        type="text"
                        fullWidth
                        placeholder="Enter driver name"
                        variant="outlined"
                    />

                    <TextField variant="outlined" margin="dense" fullWidth placeholder="Enter ID number" type="number" />
                    <TextField variant="outlined" margin="dense" fullWidth placeholder="Enter full Address" type="text" />
                    <TextField variant="outlined" margin="dense" fullWidth placeholder="Enter full address" type="text" />

                    <TextField variant="outlined" margin="dense" fullWidth placeholder="Enter mobile number" type="number" />
                    <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-filled-label">Age</InputLabel>
                        {/* <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={age}
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select> */}
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
