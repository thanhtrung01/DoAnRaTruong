import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <>
      <Header />
      <Sidebar />
      <Outlet />
    </>
  );
}

export default App;
