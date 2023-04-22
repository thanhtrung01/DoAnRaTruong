import { Helmet } from "react-helmet-async";
// @mui
import { Grid, Typography } from "@mui/material";
import { AppWidgetSummary } from "../sections/@dashboard/app";
import UserPage from "./UserPage";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../Services/userService";
import { useEffect } from "react";
import axios from "axios";
import { getAllBoard } from "../../Services/boardsService";
const apiURL = process.env.REACT_APP_SERVER_API;
const baseUrl = apiURL + `user/`;
// ----------------------------------------------------------------------

export default function DashboardPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    getAllUser(dispatch);
  }, []);

  const user = useSelector((state) => state?.user);
  const users = user?.users;

  return (
    <div className="">
      <Helmet>
        <title> Dashboard | Admin Todo </title>
      </Helmet>
      <div className="container-fix ">
        <Typography className="flex-center" variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3} className="container flex-center">
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Users"
              total={users?.count}
              icon={"mdi:user-circle-outline"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3} ml={3}>
            <AppWidgetSummary
              title="Boards"
              total={1355831}
              color="info"
              icon={"mingcute:trello-board-fill"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3} ml={3}>
            <AppWidgetSummary
              title="Comments"
              total={1723315}
              color="warning"
              icon={"ic:twotone-insert-comment"}
            />
          </Grid>
        </Grid>
      </div>
      <Grid item xs={12} md={12} lg={12} mt={12}>
        <UserPage users={users?.user} />
      </Grid>
    </div>
  );
}
