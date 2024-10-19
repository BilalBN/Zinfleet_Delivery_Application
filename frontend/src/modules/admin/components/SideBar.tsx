import styled from "@emotion/styled";
import Switch from "@mui/material/Switch";
import SettingsIcon from '@mui/icons-material/Settings';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
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
  background-color: ${(props) => (props.isActive ? '#D7E4ED' : '#fff')};
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
`;

const Statuscontainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
`;
const active = '#0066AD'
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
        <ListItemContainer isActive={location.pathname === '/shops'} onClick={() => { navigation('/shops') }}>
          <StorefrontIcon sx={{ color: location.pathname === '/shops' ? active : normal }} />
          <NavigationTitle isActive={location.pathname === '/shops'}>Shops</NavigationTitle>
        </ListItemContainer>
        <ListItemContainer isActive={location.pathname === '/fleets'} onClick={() => { navigation('/fleets') }}>
          <LocalShippingIcon sx={{ color: location.pathname === '/fleets' ? active : normal }} />
          <NavigationTitle isActive={location.pathname === '/fleets'}>Fleets</NavigationTitle>
        </ListItemContainer >
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
