import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { IconButton, InputLabel } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";


type AddCreditValue = {
    handleSave: (value: number) => void
    handleClose: (_event: React.MouseEvent, reason: string) => void
    handleClickOpen: (value: boolean) => void
    title: string
    credit: number
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

const CurrentCredit = styled.div`
    padding-left: 20px;
`;

export const AddCredit = ({ title, open, handleClickOpen, handleClose, handleSave, credit }: AddCreditValue) => {
    const [creditValue, setCreditValue] = useState(0);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {

        setCreditValue(parseInt(event.target.value) || 0)
    };

    const saveChanges = () => {
        handleSave(creditValue)
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
                            <InputLabel>Credit*</InputLabel>
                            <TextField
                                autoFocus
                                required
                                name="name"
                                label=""
                                fullWidth
                                placeholder="Enter Credit"
                                variant="outlined"
                                value={creditValue}
                                onChange={handleChange}
                            />
                        </FieldItem>
                        <FieldItem>
                            <InputLabel>Current Credit</InputLabel>
                            <CurrentCredit>$ {credit + creditValue}</CurrentCredit>
                        </FieldItem>

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
                            !creditValue
                        }
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
