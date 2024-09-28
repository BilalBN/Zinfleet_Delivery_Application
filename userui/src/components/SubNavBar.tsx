import styled from "@emotion/styled";
import { Button, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useState } from "react";
import Timer from "./Timer";


type ViewMode = "LiveOrders" | "ProcessingOrders" | "AssignedOrders" | "RejectedOrders" | "AllOrders";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 20px;
`;
const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const SearchFilterContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
`;

const InputField = styled.input`
  border: none;
  &:focus{
    outline: none;
  }
`;
const SearchBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 300px;
  height: 38px;
  background-color: #ffffff;
  border-radius: 6px;
  color: #6e6e6e;
`;
const Divider = styled.div`
  border: 1px solid;
  height: 14px;
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
const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 0.5px solid #6e6e6e;
`;
const ListItem = styled.div<{ isActive: boolean }>`
  position: relative;
  color: ${(props) => (props.isActive ? "#04009A" : "#6e6e6e")};
  border-bottom: ${(props) => (props.isActive ? " 2px solid #04009A" : null)};
  padding-bottom: 20px;
  cursor: pointer;

  /* Add transition for color */
  transition: color 0.3s ease;
  display: flex;
  gap: 10px;
  align-items: center;
  line-height: 20px;
`;



const CustomSearch = styled(SearchOutlinedIcon)`
  cursor: pointer;
`
const Count = styled.div<{ isActive: boolean }>`
  width: 36px;
  height: 22px;
  color: ${(props) => (props.isActive ? "#04009A" : "#B5B5B5")};
  border: ${(props) => (props.isActive ? " 1px solid #04009A" : '1px solid #B5B5B5')};
  display: flex;
  align-items: center;
  justify-content:center;
`
const TimerContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`
export const SubNavBar = () => {
  const [searchBy, setSearchBy] = useState("orderid");
  const [orderType, setOrderType] = useState<ViewMode>("LiveOrders");
  const handleChange = (event: SelectChangeEvent) => {
    setSearchBy(event.target.value as string);
  };
  return (
    <Container>
      <TopRow>
        <SearchFilterContainer>
          <SearchBox>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={searchBy}
              onChange={handleChange}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
            >
              <MenuItem value={"orderid"}>Order ID</MenuItem>
              <MenuItem value={"quantity"}>Quantity</MenuItem>
              <MenuItem value={"shop"}>Shop</MenuItem>
            </Select>

            <Divider></Divider>
            <InputField placeholder="Search" />
            <CustomSearch />
          </SearchBox>

          <FilterBox>
            <FilterAltOutlinedIcon />
          </FilterBox>
        </SearchFilterContainer>

        <Button variant="contained" sx={{ textTransform: "None" }}>
          Process
        </Button>
      </TopRow>
      <TimerContainer><Timer /></TimerContainer>
      <BottomRow>
        <ListItem
          isActive={orderType === "LiveOrders"}
          onClick={() => {
            setOrderType("LiveOrders");
          }}
        >
          Live Orders
          <Count isActive={orderType === "LiveOrders"}>50</Count></ListItem>
        <ListItem
          isActive={orderType === "ProcessingOrders"}
          onClick={() => {
            setOrderType("ProcessingOrders");
          }}
        >
          Processing Orders
          <Count isActive={orderType === "ProcessingOrders"}>50</Count></ListItem>
        <ListItem
          isActive={orderType === "AssignedOrders"}
          onClick={() => {
            setOrderType("AssignedOrders");
          }}
        >
          Assigned Orders
          <Count isActive={orderType === "AssignedOrders"}>50</Count></ListItem>
        <ListItem
          isActive={orderType === "RejectedOrders"}
          onClick={() => {
            setOrderType("RejectedOrders");
          }}
        >
          Rejected Orders
          <Count isActive={orderType === "RejectedOrders"}>50</Count></ListItem>
        <ListItem
          isActive={orderType === "AllOrders"}
          onClick={() => {
            setOrderType("AllOrders");
          }}
        >
          All Orders{" "}
          <Count isActive={orderType === "AllOrders"}>50</Count></ListItem>
      </BottomRow>
    </Container>
  );
};
