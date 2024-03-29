import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import LoadingScreen from "../Components/LoadingScreen";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const history = useHistory();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (!user.isAuthenticated && !user.pending) {
      history.push("/");
    } else if (user.isAuthenticated && !user.userInfo.isAdmin) {
      history.push("/boards");
    } else if (user.isAuthenticated && user.userInfo.isAdmin) {
      history.push("/dashboard/app");
    }
  }, [history, user]);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user.isAuthenticated && !user.pending) {
          return <Component {...props} />;
        } else return <LoadingScreen />;
      }}
    />
  );
};

export default ProtectedRoute;
