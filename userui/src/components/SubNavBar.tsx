import styled from "@emotion/styled";
import { Button, MenuItem, Select, SelectChangeEvent, keyframes } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useState } from "react";

type ViewMode = "LiveOrders" | "ProcessingOrders" | "AssignedOrders" | "RejectedOrders" | "AllOrders";

const borderGrow = keyframes`
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
`;

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
const ProcessTimeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const InputField = styled.input`
  border: none;
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
  padding-bottom: 20px;
  cursor: pointer;

  /* Add transition for color */
  transition: color 0.3s ease;

  /* Pseudo-element for animated border */
  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 2px;
    width: ${(props) => (props.isActive ? "100%" : "0%")};
    background-color: #04009a;

    /* Apply the borderGrow animation if isActive is true */
    ${(props) =>
      props.isActive &&
      `
      animation: ${borderGrow} 0.5s ease forwards;
    `}
  }
`;
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
            <SearchOutlinedIcon />
          </SearchBox>

          <FilterBox>
            <FilterAltOutlinedIcon />
          </FilterBox>
        </SearchFilterContainer>
        <ProcessTimeContainer>
          <Button variant="contained" sx={{ textTransform: "None" }}>
            Process
          </Button>
          <div>Time</div>
        </ProcessTimeContainer>
      </TopRow>
      <BottomRow>
        <ListItem
          isActive={orderType === "LiveOrders"}
          onClick={() => {
            setOrderType("LiveOrders");
          }}
        >
          Live Orders
        </ListItem>
        <ListItem
          isActive={orderType === "ProcessingOrders"}
          onClick={() => {
            setOrderType("ProcessingOrders");
          }}
        >
          Processing Orders
        </ListItem>
        <ListItem
          isActive={orderType === "AssignedOrders"}
          onClick={() => {
            setOrderType("AssignedOrders");
          }}
        >
          Assigned Orders
        </ListItem>
        <ListItem
          isActive={orderType === "RejectedOrders"}
          onClick={() => {
            setOrderType("RejectedOrders");
          }}
        >
          Rejected Orders{" "}
        </ListItem>
        <ListItem
          isActive={orderType === "AllOrders"}
          onClick={() => {
            setOrderType("AllOrders");
          }}
        >
          All Orders{" "}
        </ListItem>
      </BottomRow>
    </Container>
  );
};
