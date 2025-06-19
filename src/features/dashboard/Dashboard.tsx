import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Grid,
  Typography,
  Paper,
  Divider,
  Button,
  Card,
  CardContent,
  CardHeader,
  useTheme,
} from '@mui/material';
import { 
  TrendingUp, 
  TrendingDown,
  BarChart,
  PieChart,
  Timeline
} from '@mui/icons-material';

import StatCard from '../../components/dashboard/StatCard';
import ChannelPerformanceChart from '../../components/charts/ChannelPerformanceChart';
import AudienceDistributionChart from '../../components/charts/AudienceDistributionChart';
import ContentPerformanceChart from '../../components/charts/ContentPerformanceChart';
import TrendChart from '../../components/charts/TrendChart';
import { RootState } from '../../store';
import { fetchDashboardData } from './dashboardSlice';

const Dashboard = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { 
    isLoading, 
    summary, 
    channelData, 
    audienceData, 
    contentData,
    trendData 
  } = useSelector((state: RootState) => state.dashboard);

  useEffect(() => {
    // Fetch dashboard data when component mounts
    dispatch(fetchDashboardData());
  }, [dispatch]);

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Button variant="contained" color="primary">
          Export Report
        </Button>
      </Box>

      {/* Summary Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Audience"
            value="1.2M"
            change="+12.3%"
            isPositive={true}
            icon={<TrendingUp />}
            color={theme.palette.success.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Engagement Rate"
            value="4.5%"
            change="+0.8%"
            isPositive={true}
            icon={<TrendingUp />}
            color={theme.palette.success.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Content Consistency"
            value="85%"
            change="-2.1%"
            isPositive={false}
            icon={<TrendingDown />}
            color={theme.palette.error.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="ROI"
            value="3.2x"
            change="+0.4x"
            isPositive={true}
            icon={<TrendingUp />}
            color={theme.palette.success.main}
          />
        </Grid>
      </Grid>

      {/* Main Charts */}
      <Grid container spacing={3}>
        {/* Channel Performance */}
        <Grid item xs={12} md={6}>
          <Card className="dashboard-card">
            <CardHeader 
              title="Channel Performance" 
              subheader="Metrics by channel" 
              action={
                <Button size="small">View Details</Button>
              }
            />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <ChannelPerformanceChart />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Audience Distribution */}
        <Grid item xs={12} md={6}>
          <Card className="dashboard-card">
            <CardHeader 
              title="Audience Distribution" 
              subheader="By platform" 
              action={
                <Button size="small">View Details</Button>
              }
            />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <AudienceDistributionChart />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Content Performance */}
        <Grid item xs={12} md={6}>
          <Card className="dashboard-card">
            <CardHeader 
              title="Content Performance" 
              subheader="By content type" 
              action={
                <Button size="small">View Details</Button>
              }
            />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <ContentPerformanceChart />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Audience Migration Trends */}
        <Grid item xs={12} md={6}>
          <Card className="dashboard-card">
            <CardHeader 
              title="Audience Migration Trends" 
              subheader="Last 12 months" 
              action={
                <Button size="small">View Details</Button>
              }
            />
            <CardContent>
              <Box sx={{ height: 300 }}>
                <TrendChart />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;