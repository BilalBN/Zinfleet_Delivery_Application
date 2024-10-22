import styled from "@emotion/styled";
import { Button, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useState } from "react";
import Timer from "../../fleets/components/Timer";

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

const CustomSearch = styled(SearchOutlinedIcon)`
  cursor: pointer;
`

const TimerContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`
export const SubNavBar = () => {
  const [searchBy, setSearchBy] = useState("orderid");
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
    </Container>
  );
};
