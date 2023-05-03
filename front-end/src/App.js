import React, { useEffect } from "react";
import Index from "./Components/Pages/IndexPage/Index";
import Login from "./Components/Pages/LoginPage/Login";
import Register from "./Components/Pages/RegisterPage/Register";
import Alert from "./Components/AlertSnackBar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ThemeProvider from "./Admin/theme";
import ScrollToTop from "./Admin/components/scroll-to-top";
import Boards from "./Components/Pages/BoardsPage/Boards";
import ProtectedRoute from "./Utils/ProtectedRoute";
import { loadUser } from "./Services/userService";
import Store from "./Redux/Store";
import FreeRoute from "./Utils/FreeRoute";
import Board from "./Components/Pages/BoardPage/Board";
import Profile from "./Components/Pages/ProfilePage/Profile";
import BoardPage from "./Admin/pages/BoardPage";
import UserPage from "./Admin/pages/UserPage";
import DashboardPage from "./Admin/pages/DashboardPage";
import LoginPage from "./Admin/pages/LoginPage";

const App = () => {
  useEffect(() => {
    loadUser(Store.dispatch);
  }, []);
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <Alert />
          <Switch>
            <ProtectedRoute exact path="/boards" component={Boards} />
            <ProtectedRoute exact path="/profile" component={Profile} />
            <ProtectedRoute exact path="/board/:id" component={Board} />
            <ProtectedRoute exact path="/dashboard" component={DashboardPage} />
            <ProtectedRoute exact path="/dashboard/user" component={UserPage} />
            <ProtectedRoute exact path="/dashboard/board" component={BoardPage}/>
            <ProtectedRoute exact path="/login/admin" component={LoginPage} />
            <FreeRoute exact path="/login" component={Login} />
            <FreeRoute exact path="/register" component={Register} />
            <FreeRoute exact path="/" component={Index} />
          </Switch>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
