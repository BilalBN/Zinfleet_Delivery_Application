import { useState, useEffect } from 'react';
import { User, UserType } from '../types/user';

const FleetColors: Color = {
    primary: "#04009A",
    secondary: "#A5A2FF36",
    default: "#6E6E6E",
  };
  
  const AdminColors: Color = {
    primary: "#0066AD",
    secondary: "#D7E4ED",
    default: "#6E6E6E",
  };
  
  const WarehouseColors: Color = {
    primary: "#FF6E2D",
    secondary: "#FF4F002E",
    default: "#000",
  };
type Color = {
    primary: string;
    secondary: string;
    default: string;
  };

export const useCurrentColors = (user: User|null): Color => {
  const [colors, setColors] = useState<Color>(AdminColors); // Default to AdminColors

  useEffect(() => {
    if (user) {
      const newColors =
        user.type === UserType.ADMIN_USER
          ? AdminColors
          : user.type === UserType.FLEET_USER
          ? FleetColors
          : WarehouseColors;

      setColors(newColors);
    }
  }, [user]); // Re-run the effect if the user changes

  return colors;
};
