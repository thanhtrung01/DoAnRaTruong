import { useState } from "react";
// import { Outlet } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
//
import Header from "./header";
import Nav from "./nav";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")({
  display: "flex",
  // minHeight: "100%",
  overflow: "hidden",
});

// ----------------------------------------------------------------------

export default function DashboardLayout({}) {
  const [open, setOpen] = useState(false);

  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} />

      <Nav openNav={open} onCloseNav={() => setOpen(false)} />

      {/* <Main>{children}</Main> */}
    </StyledRoot>
  );
}
