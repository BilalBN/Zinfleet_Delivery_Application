import styled from "@emotion/styled";
import CustomTable from "../../core/components/tables/Drivers";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { DriverDetails } from "../components/DriverDetails";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
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
const DriverManagment = () => {
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
        <DriverDetails />
      </SubNavBar>
      <CustomTable></CustomTable>
    </Container>
  );
};

export default DriverManagment;
