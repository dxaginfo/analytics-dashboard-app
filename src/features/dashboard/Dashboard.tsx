import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  Card, 
  CardContent, 
  CardHeader,
  CircularProgress,
  Container,
  Stack,
  Divider
} from '@mui/material';
import { RootState } from '../../store';
import { fetchDashboardData } from './dashboardSlice';
import { ArrowUpward as ArrowUpwardIcon, ArrowDownward as ArrowDownwardIcon } from '@mui/icons-material';

// Import our chart components
import ChannelPerformanceChart from '../../components/charts/ChannelPerformanceChart';
import AudienceDistributionChart from '../../components/charts/AudienceDistributionChart';
import ContentPerformanceChart from '../../components/charts/ContentPerformanceChart';
import TrendChart from '../../components/charts/TrendChart';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { summary, isLoading, error } = useSelector((state: RootState) => state.dashboard);

  useEffect(() => {
    // Fetch dashboard data when component mounts
    dispatch(fetchDashboardData() as any);
  }, [dispatch]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography color="error" variant="h6">
          Error loading dashboard data: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
        Analytics Dashboard
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
        Comprehensive view of audience metrics across all channels
      </Typography>

      {/* Summary Cards */}
      {summary && (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Total Audience
                </Typography>
                <Typography variant="h4" component="div" fontWeight="bold">
                  {summary.totalAudience.toLocaleString()}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 1 }}>
                  {summary.audienceGrowth > 0 ? (
                    <ArrowUpwardIcon fontSize="small" color="success" />
                  ) : (
                    <ArrowDownwardIcon fontSize="small" color="error" />
                  )}
                  <Typography 
                    variant="body2" 
                    color={summary.audienceGrowth > 0 ? "success.main" : "error.main"}
                  >
                    {Math.abs(summary.audienceGrowth)}% from last period
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Engagement Rate
                </Typography>
                <Typography variant="h4" component="div" fontWeight="bold">
                  {summary.engagementRate}%
                </Typography>
                <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 1 }}>
                  {summary.engagementChange > 0 ? (
                    <ArrowUpwardIcon fontSize="small" color="success" />
                  ) : (
                    <ArrowDownwardIcon fontSize="small" color="error" />
                  )}
                  <Typography 
                    variant="body2" 
                    color={summary.engagementChange > 0 ? "success.main" : "error.main"}
                  >
                    {Math.abs(summary.engagementChange)}% from last period
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Content Consistency
                </Typography>
                <Typography variant="h4" component="div" fontWeight="bold">
                  {summary.contentConsistency}%
                </Typography>
                <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 1 }}>
                  {summary.consistencyChange > 0 ? (
                    <ArrowUpwardIcon fontSize="small" color="success" />
                  ) : (
                    <ArrowDownwardIcon fontSize="small" color="error" />
                  )}
                  <Typography 
                    variant="body2" 
                    color={summary.consistencyChange > 0 ? "success.main" : "error.main"}
                  >
                    {Math.abs(summary.consistencyChange)}% from last period
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  ROI
                </Typography>
                <Typography variant="h4" component="div" fontWeight="bold">
                  {summary.roi}%
                </Typography>
                <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 1 }}>
                  {summary.roiChange > 0 ? (
                    <ArrowUpwardIcon fontSize="small" color="success" />
                  ) : (
                    <ArrowDownwardIcon fontSize="small" color="error" />
                  )}
                  <Typography 
                    variant="body2" 
                    color={summary.roiChange > 0 ? "success.main" : "error.main"}
                  >
                    {Math.abs(summary.roiChange)}% from last period
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Charts Row 1 */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Card sx={{ height: 400 }}>
            <CardHeader title="Audience Trend" />
            <Divider />
            <CardContent sx={{ height: 'calc(100% - 76px)' }}>
              <TrendChart />
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ height: 400 }}>
            <CardHeader title="Audience Distribution" />
            <Divider />
            <CardContent sx={{ height: 'calc(100% - 76px)' }}>
              <AudienceDistributionChart />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Row 2 */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: 400 }}>
            <CardHeader title="Channel Performance" />
            <Divider />
            <CardContent sx={{ height: 'calc(100% - 76px)' }}>
              <ChannelPerformanceChart />
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card sx={{ height: 400 }}>
            <CardHeader title="Content Performance" />
            <Divider />
            <CardContent sx={{ height: 'calc(100% - 76px)' }}>
              <ContentPerformanceChart />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;