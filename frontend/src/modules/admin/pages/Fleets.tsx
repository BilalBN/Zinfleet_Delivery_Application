import styled from "@emotion/styled";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { FleetDialog } from "../components/dialog/Fleet";
import FleetTable from "../../core/components/tables/FleetTable";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch } from "../../../store/hook";
import { useState } from "react";
import { addFleet } from "../../../store/fleetSlice";
import { FleetPayload } from "../../../types/fleet";
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
export const Fleets = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const handleSave = async (fleet: FleetPayload) => {
    setOpen(false)
    dispatch(addFleet(fleet))
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
          Add new fleet
        </Button>
        {open ? (<FleetDialog open={open}  handleClose={handleClose} handleClickOpen={handleClickOpen} handleSave={handleSave} title={"Add new fleet"} />) : null}
      </SubNavBar>
      <FleetTable />
    </Container>
  );
};
