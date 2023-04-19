import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Container, Typography } from '@mui/material';
import { AppWidgetSummary } from '../sections/@dashboard/app';
import UserPage from './UserPage';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard | Admin Todo </title>
      </Helmet>

      <div className="container">
        <Typography className="flex-center" variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3} className="flex-center">
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Users" total={714000} icon={'mdi:user-circle-outline'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Boards" total={1352831} color="info" icon={'mingcute:trello-board-fill'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Comments" total={1723315} color="warning" icon={'ic:twotone-insert-comment'} />
          </Grid>

          <Grid item xs={12} md={12} lg={12} mt={12}>
            <UserPage />
          </Grid>
        </Grid>
      </div>
    </>
  );
}
