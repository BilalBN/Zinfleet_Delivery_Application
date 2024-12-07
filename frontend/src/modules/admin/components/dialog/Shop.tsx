import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton, InputLabel } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import styled from "@emotion/styled";
import { Shop, ShopPayload } from "../../../../types/shop";
import { useState } from "react";
import { useAppSelector } from "../../../../store/hook";

type ShopProps = {
  handleSave: (fleet: ShopPayload) => void
  handleClose: (_event: React.MouseEvent, reason: string) => void
  handleClickOpen: (value: boolean) => void
  title: string
  initialData?: Shop
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
const initialValue: Shop = {
  name: "",
  warehouseAddress: "",
  address: "",
  fleet_id: -1,
  userName: "",
  password: "",
};

export const ShopDialog = ({ open, handleClickOpen, handleClose, handleSave, initialData, }: ShopProps) => {
  const [shop, setShop] = useState<Shop>(initialData || initialValue);
  const { data } = useAppSelector((state) => state.fleet)

  const handleChange = (
    event: SelectChangeEvent<number> | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setShop((prev) => ({ ...prev, [name]: value }));
  };

  const addNewShop = async () => {
    const body: ShopPayload = {
      name: shop.name,
      address: shop.address,
      warehouse_address: shop.warehouseAddress,
      fleet_id: shop.fleet_id,
      username: shop.userName,
      password: shop.password,
    };
    handleSave(body)
  };
  return (
    <Dialog fullWidth={true} maxWidth={"sm"} open={open} disableEscapeKeyDown={true} onClose={handleClose}>
      <DialogTitle>
        <Header>
          <div>Add shop Details</div>
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
                value={shop.fleet_id || -1}
                onChange={handleChange}
                name="fleet_id"
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Select fleet name
                </MenuItem>
                {data.map((fleet: any) => (
                  <MenuItem value={fleet.id}>{fleet.name}</MenuItem>
                ))}
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
          {!initialData ? (<FieldItem>
            <InputLabel>Password*</InputLabel>
            <TextField
              variant="outlined"
              label=""
              type="password"
              name="password"
              fullWidth
              placeholder="password"
              value={shop.password}
              onChange={handleChange}
            />
          </FieldItem>) : null}

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
          onClick={addNewShop}
          disabled={
            !shop.address || !shop.name || !shop.address || !shop.warehouseAddress || !shop.userName || (!shop.password && !initialData)
          }
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
