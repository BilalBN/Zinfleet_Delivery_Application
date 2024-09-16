import styled from "@emotion/styled";
import Switch from "@mui/material/Switch";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SettingsIcon from '@mui/icons-material/Settings';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = styled.div`
  width: 265px;
  height: 100%;
  background-color: #f6f6f6;
  flex-shrink: 0;
  flex-grow: 0;
  
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  gap: 10px;
  padding: 30px 10px 10px 10px;
  box-sizing: border-box;
`;
const ListItemContainer =styled.div<{ isActive: boolean }>`
  display: flex;
  gap: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.isActive ? '#A5A2FF36' : '#fff')};
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
`;

const Statuscontainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
`;
const active = '#04009A'
const normal = '#6E6E6E'

const NavigationTitle = styled.div<{ isActive: boolean }>`
  color: ${(props) => (props.isActive ? active : normal)};
`;

export const SideBar = () => {
  const navigation = useNavigate()
  const location = useLocation()

  return (
    <Sidebar>
      <Container>
        <ListItemContainer  isActive={location.pathname === '/'} onClick={() => { navigation('/') }}>
          <SpaceDashboardIcon sx={{ color: location.pathname === '/' ? active : normal }} />
          <NavigationTitle isActive={location.pathname === '/'}>DashBoard</NavigationTitle>
        </ListItemContainer>
        <ListItemContainer isActive={location.pathname === '/order'} onClick={() => { navigation('/order') }}>
          <ListAltIcon sx={{ color: location.pathname === '/order' ? active : normal }} />
          <NavigationTitle isActive={location.pathname === '/order'}>Order Management</NavigationTitle>
        </ListItemContainer>
        <ListItemContainer isActive={location.pathname === '/drivermanagement'} onClick={() => { navigation('/drivermanagement') }}>
          <ManageAccountsIcon sx={{ color: location.pathname === '/drivermanagement' ? active : normal }} />
          <NavigationTitle isActive={location.pathname === '/drivermanagement'}>Driver Management</NavigationTitle>
        </ListItemContainer>
        <ListItemContainer isActive={location.pathname === '/settings'} onClick={() => { navigation('/settings') }}>
          <SettingsIcon sx={{ color: location.pathname === '/settings' ? active : normal }} />
          <NavigationTitle isActive={location.pathname === '/settings'}>Settings</NavigationTitle>
        </ListItemContainer >
        <Statuscontainer>
          <NavigationTitle isActive={location.pathname === ''}>Online Status</NavigationTitle>
          <Switch />
        </Statuscontainer>
      </Container>
    </Sidebar>
  );
};
