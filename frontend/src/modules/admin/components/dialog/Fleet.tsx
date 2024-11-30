import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { IconButton, InputLabel } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { SelectChangeEvent } from "@mui/material/Select";
import styled from "@emotion/styled";
import { FleetPayload } from "../../../../types/fleet";

type AddFleetProps = {
  handleSave: (fleet: FleetPayload) => void
  handleClose: (_event: React.MouseEvent, reason: string) => void
  handleClickOpen: (value: boolean) => void
  title: string
  initialData?: FleetPayload
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
const initialValue: FleetPayload = {
  name: "",
  email: "",
  address: "",
  password: "",
  phoneNumber: "",
  username: "",
};

export const FleetDialog = ({ title, open, handleClickOpen, handleClose, handleSave, initialData }: AddFleetProps) => {
  const [fleet, setFleet] = useState<FleetPayload>(initialData || initialValue);


  const handleChange = (
    event: SelectChangeEvent<string> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFleet((prev) => ({ ...prev, [name]: value }));
  };

  const saveChanges = () => {
    handleSave(fleet)
  }


  return (
    <div>


      <Dialog fullWidth={true} maxWidth={"sm"} open={open} disableEscapeKeyDown={true} onClose={handleClose}>
        <DialogTitle>
          <Header>
            <div>{title}</div>
            <IconButton
              onClick={() => {
                handleClickOpen(false)
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
                name="phoneNumber"
                fullWidth
                placeholder="Enter phone number"
                value={fleet.phoneNumber}
                onChange={handleChange}
              />
            </FieldItem>
            <FieldItem>
              <InputLabel>UserName*</InputLabel>
              <TextField
                variant="outlined"
                label=""
                name="username"
                fullWidth
                placeholder="Enter userName"
                value={fleet.username}
                onChange={handleChange}
              />
            </FieldItem>
            {!initialData ? (<FieldItem>
              <InputLabel>Password*</InputLabel>
              <TextField
                variant="outlined"
                label=""
                name="password"
                type="password"
                fullWidth
                placeholder="Password"
                value={fleet.password}
                onChange={handleChange}
              />
            </FieldItem>) : null}

          </Container>
        </DialogContent>

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
            onClick={saveChanges}
            disabled={
              !fleet.address || !fleet.name || !fleet.email || !fleet.phoneNumber || !fleet.username || (!initialData &&!fleet.password)
            }
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
