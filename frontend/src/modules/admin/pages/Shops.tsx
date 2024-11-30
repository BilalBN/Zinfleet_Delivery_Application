import styled from "@emotion/styled";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { ShopDialog } from "../components/dialog/Shop";
import ShopTable from "../../core/components/tables/ShopTable";
import { useAppDispatch } from "../../../store/hook";
import { useState } from "react";
import { ShopPayload } from "../../../types/shop";
import AddIcon from "@mui/icons-material/Add";
import { addShop } from "../../../store/shopSlice";
import { Button } from "@mui/material";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 10px 20px 20px 20px;
  gap: 15px;
`;
const SubNavBar = styled.div`
  display: flex;
  justify-content: space-between;
`;
const SearchBox = styled.div`
  display: flex;
  align-items: center;
  width: 300px;
  height: 38px;
  background-color: #ffffff;
  border-radius: 6px;
  color: #6e6e6e;
  padding-left: 5px;
`;
const InputField = styled.input`
  border: none;
  &:focus{
    outline: none;
  }
`;
const SerachFilterContainer = styled.div`
  display: flex;
  gap: 10px;
`;
const FilterBox = styled.div`
  width: 42px;
  height: 38px;
  border-radius: 6px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #777777;
`;
export const Shops = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const handleSave = async (shop: ShopPayload) => {
    setOpen(false)
    dispatch(addShop(shop))
  };

  const handleClickOpen = (value: boolean) => {
    setOpen(value);
  };

  const handleClose = (_event: React.MouseEvent, reason: string) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };
  return (
    <Container>
      <SubNavBar>
        <SerachFilterContainer>
          <SearchBox>
            <SearchOutlinedIcon />
            <InputField placeholder="Search" />
          </SearchBox>
          <FilterBox>
            <FilterAltOutlinedIcon />
          </FilterBox>
        </SerachFilterContainer>
        <Button variant="contained" onClick={()=>{handleClickOpen(true)}}>
          <AddIcon />
          Add new Shop
        </Button>
      </SubNavBar>
      {open ? (<ShopDialog open={open}  handleClose={handleClose} handleClickOpen={handleClickOpen} handleSave={handleSave} title={"Add new shop"} />) : null}
      <ShopTable/>
    </Container>
  );
};
