import { jwtDecode } from "jwt-decode";
export interface JwtPayload {
  username: string;
  role: string;
  exp: number;
  iat: number;
  fleet_id: number;
  id: number;
}
export const decodeToken = (userToken: string): JwtPayload => {
  const token = jwtDecode<JwtPayload>(userToken);
  return token;
};
