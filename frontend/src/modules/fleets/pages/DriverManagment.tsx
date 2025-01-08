import styled from "@emotion/styled";
import DriverTable from "../../core/components/tables/DriverTable";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { DriverDialog } from "../components/dialog/Driver";
import AddIcon from "@mui/icons-material/Add";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { Button } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../../../store/hook";
import { DriverPayload } from "../../../types/driver";
import { addDriver } from "../../../store/driverSlice";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 60px);
  gap: 10px;
  padding: 10px 10px 0 10px;
  box-sizing: border-box;
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
  &:focus {
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
const DriverManagment = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleSave = async (driver: DriverPayload) => {
    setOpen(false)
    dispatch(addDriver(driver))
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
    <Container id="driver-managment">
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
        <Button variant="contained" onClick={() => { handleClickOpen(true) }}>
          <AddIcon />
          Add Driver
        </Button>
        <DriverDialog open={open} handleClose={handleClose} handleClickOpen={handleClickOpen} handleSave={handleSave} title="Add new Driver" />
      </SubNavBar>
      <DriverTable />
    </Container>
  );
};

export default DriverManagment;

