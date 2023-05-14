// import Cookies from "js-cookie";
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const FreeRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.user);
  if (localStorage.getItem("token")) return <Redirect push to="/boards" />;
  if (localStorage.getItem("token") && user.userInfo.isAdmin)
    return <Redirect push to="/dashboard/app" />;
  return (
    <Route
      {...rest}
      render={(props) => {
        return <Component {...props} />;
      }}
    />
  );
};

export default FreeRoute;
