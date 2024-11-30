import styled from "@emotion/styled";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import WarehouseOrdersTable from "../components/WarehouseOrdersTable";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  width: 100%;
`;
const SearchFilterContainer = styled.div`
  display: flex;
  padding: 10px;
  gap: 20px;
  align-items: center;
`;
const InputContainer = styled.div`
  display: flex;
  width: 350px;
  border: 1px solid #6d6d6d;
  height: 38px;
  border-radius: 7px;
  align-items: center;
  padding: 0 10px;
  gap: 10px;
`;
const Input = styled.input`
  border: none;
  width: 100%;
  padding: 10px 0;
  &:focus {
    outline: none;
  }
`;
const FilterContainer = styled.div`
  display: flex;
  width: 120px;
  border: 1px solid #6d6d6d;
  height: 38px;
  border-radius: 7px;
  align-items: center;
  justify-content: center;
`;
const SubNavBar = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Dashboard = () => {


  return (
    <Container>
      <SubNavBar>
        <SearchFilterContainer>
          <InputContainer>
            <SearchOutlinedIcon />
            <Input placeholder="Search" />
          </InputContainer>
          <FilterContainer>
            <div>Filter By</div>
          </FilterContainer>
        </SearchFilterContainer>
      </SubNavBar>
      <WarehouseOrdersTable />
    </Container>
  );
};

export default Dashboard;
