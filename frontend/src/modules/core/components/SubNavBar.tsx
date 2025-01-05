import styled from "@emotion/styled";
import { Button, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useEffect, useState } from "react";
import Timer from "../../fleets/components/Timer";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { UserType } from "../../../types/user";
import { fetchFleets } from "../../../store/fleetSlice";
import { Fleet } from "../../../types/fleet";


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
  const dispatch = useAppDispatch();
  const [selectedFleet, setSelectedFleet] = useState<number>(-1);

  const { user } = useAppSelector((state) => state.auth);
  const { data } = useAppSelector((state) => state.fleet);

  useEffect(() => {
    dispatch(fetchFleets())
  }, []);

  const handleChange = (event: any) => {
    setSearchBy(event.target.value as string);
  };

  const handleFleetChange = (event: SelectChangeEvent) => {
    setSelectedFleet(Number(event.target.value))
  }

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
                width: '125px',           // Fixed width for the Select component
                minWidth: '125px',
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
            >
              <MenuItem value={"orderid"}>Order ID</MenuItem>
              <MenuItem value={"fleet"}>Fleet</MenuItem>
              <MenuItem value={"shop"}>Shop</MenuItem>
            </Select>

            <Divider></Divider>
            {searchBy === 'orderid' ? (<><InputField placeholder="Search" />  <CustomSearch /></>) : (<Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={selectedFleet.toString()}
              onChange={handleFleetChange}
              placeholder="Please select a fleet"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
            >
               <MenuItem value={-1}>Select a fleet</MenuItem>
              {data.map((item: Fleet) => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))}
            </Select>)}



          </SearchBox>

          <FilterBox>
            <FilterAltOutlinedIcon />
          </FilterBox>
        </SearchFilterContainer>
        {user?.type !== UserType.ADMIN_USER ? (<Button variant="contained" sx={{ textTransform: "None" }}>
          Process
        </Button>) : null}

      </TopRow>
      {user?.type !== UserType.ADMIN_USER ? (<TimerContainer><Timer /></TimerContainer>) : null}

    </Container>
  );
};
