import React from "react";

import LoadingToRedirect from "./LoadingToRedirect";
import jwt_decode from "jwt-decode";
const result = JSON.parse(localStorage.getItem("currentUser"));
const PrivateRoute = ({ children }) => {
  const token = result?.token;
  let currentDate = new Date();

  const decoded = token ? jwt_decode(token) : null;
  /// login if token expiration time is > current date
  return decoded?.exp * 1000 > currentDate.getTime()
    ? children
    : localStorage.removeItem("currentUser") && <LoadingToRedirect />;
};
export const Admin = ({ children }) => {
  const token = result?.token;

  const decoded = token ? jwt_decode(token) : null;
  return decoded?.isAdmin === true && children;
};
export default PrivateRoute;
