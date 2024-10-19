import styled from "@emotion/styled";
import Switch from "@mui/material/Switch";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SettingsIcon from "@mui/icons-material/Settings";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store/hook";
import { SideBarItem } from "../../../types/sidebar";
import { UserType } from "../../../types/user";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { colors } from "../../../utils/theme";

type SidebarProps = {
  items: SideBarItem[];
};

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
const ListItemContainer = styled.div<{ isActive: boolean }>`
  display: flex;
  gap: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.isActive ? colors.secondary : "#fff")};
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
`;

const Statuscontainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
`;

const NavigationTitle = styled.div<{ isActive: boolean }>`
  color: ${(props) => (props.isActive ? colors.primary : colors.default)};
`;

export const SideBar = ({ items }: SidebarProps) => {
  const navigation = useNavigate();
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);

  const navigateUser = (path: string) => {
    const targetPath =
      user?.type === UserType.FLEET_USER
        ? `/${user?.companyName}/${path}`
        : user?.type === UserType.ADMIN_USER
        ? `/admin/${path}`
        : `/warehouse/${path}`;
    navigation(targetPath);
  };

  const isActivePath = (currentPath: string, item: SideBarItem) => {
    return currentPath.split("/").filter(Boolean).includes(item.path);
  };

  const getSideBarIcon = (item: SideBarItem) => {
    switch (item.icon) {
      case "Dashboard":
        return (
          <SpaceDashboardIcon sx={{ color: isActivePath(location.pathname, item) ? colors.primary : colors.default }} />
        );
      case "Order":
        return <ListAltIcon sx={{ color: isActivePath(location.pathname, item) ? colors.primary : colors.default }} />;
      case "Driver":
        return (
          <ManageAccountsIcon sx={{ color: isActivePath(location.pathname, item) ? colors.primary : colors.default }} />
        );
      case "Settings":
        return <SettingsIcon sx={{ color: isActivePath(location.pathname, item) ? colors.primary : colors.default }} />;
      case "Shops":
        return (
          <StorefrontIcon sx={{ color: isActivePath(location.pathname, item) ? colors.primary : colors.default }} />
        );
      case "Fleets":
        return (
          <LocalShippingIcon sx={{ color: isActivePath(location.pathname, item) ? colors.primary : colors.default }} />
        );
      default:
        <div></div>;
    }
  };

  return (
    <Sidebar>
      <Container>
        {items.map((item) => (
          <ListItemContainer
            key={item.path}
            isActive={isActivePath(location.pathname, item)}
            onClick={() => {
              navigateUser(item.path);
            }}
          >
            {getSideBarIcon(item)}
            <NavigationTitle isActive={isActivePath(location.pathname, item)}>{item.label}</NavigationTitle>
          </ListItemContainer>
        ))}
        <Statuscontainer>
          <NavigationTitle isActive={location.pathname === ""}>Online Status</NavigationTitle>
          <Switch />
        </Statuscontainer>
      </Container>
    </Sidebar>
  );
};
