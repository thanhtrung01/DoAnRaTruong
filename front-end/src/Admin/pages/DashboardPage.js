import { Helmet } from "react-helmet-async";
// @mui
import { Grid, Typography } from "@mui/material";
import { AppWidgetSummary } from "../sections/@dashboard/app";
import UserPage from "./UserPage";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../Services/userService";
import { useEffect, useState } from "react";
import { getAllBoard } from "../../Services/boardsService";
const apiURL = process.env.REACT_APP_SERVER_API;
// ----------------------------------------------------------------------

export default function DashboardPage() {
  const [dataUsers, setDataUsers] = useState(null);
  const [dataBoard, setBoardData] = useState(null);

  useEffect(() => {
    getAllUser().then((data) => setDataUsers(data.data));
    getAllBoard().then((data) => setBoardData(data.data));
  }, []);

  // console.log(dataUsers);

  return (
    <div>
      <Helmet>
        <title> Quản trị viên </title>
      </Helmet>
      <div className="container-fix ">
        <Typography className="flex-center" variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3} className="container flex-center">
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Người dùng"
              total={dataUsers?.count}
              icon={"mdi:user-circle-outline"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3} ml={3}>
            <AppWidgetSummary
              title="Bảng"
              total={dataBoard?.count}
              color="warning"
              icon={"mingcute:trello-board-fill"}
            />
          </Grid>

          {/* <Grid item xs={12} sm={6} md={3} ml={3}>
            <AppWidgetSummary
              title="Comments"
              total={1723315}
              color="info"
              icon={"ic:twotone-insert-comment"}
            />
          </Grid> */}
        </Grid>
      </div>
      <Grid item xs={12} md={12} lg={12} mt={12}>
        <UserPage />
      </Grid>
    </div>
  );
}
