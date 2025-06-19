import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Divider,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { RootState } from '../../store';
import { fetchChannelData } from '../dashboard/dashboardSlice';
import ChannelPerformanceChart from '../../components/charts/ChannelPerformanceChart';
import TrendChart from '../../components/charts/TrendChart';

const ChannelAnalysis: React.FC = () => {
  const dispatch = useDispatch();
  const { channelData, isLoading, error } = useSelector((state: RootState) => state.dashboard);

  useEffect(() => {
    dispatch(fetchChannelData() as any);
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
          Error loading channel data: {error}
        </Typography>
      </Box>
    );
  }

  // Format numbers for display
  const formatNumber = (num: number) => {
    return num >= 1000000
      ? `${(num / 1000000).toFixed(1)}M`
      : num >= 1000
      ? `${(num / 1000).toFixed(0)}K`
      : num.toString();
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
        Channel Analysis
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
        Detailed performance metrics across your media channels
      </Typography>

      <Grid container spacing={3}>
        {/* Channel Performance Chart */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ height: '100%' }}>
            <CardHeader title="Channel Performance Overview" />
            <Divider />
            <CardContent sx={{ height: 400 }}>
              <ChannelPerformanceChart />
            </CardContent>
          </Card>
        </Grid>

        {/* Channel Data Table */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardHeader title="Channel Metrics" />
            <Divider />
            <CardContent>
              <TableContainer component={Paper} elevation={0}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Channel</TableCell>
                      <TableCell align="right">Reach</TableCell>
                      <TableCell align="right">Engagement</TableCell>
                      <TableCell align="right">Conversion</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {channelData.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          <Typography fontWeight="medium">{row.name}</Typography>
                        </TableCell>
                        <TableCell align="right">{formatNumber(row.reach)}</TableCell>
                        <TableCell align="right">{row.engagement}%</TableCell>
                        <TableCell align="right">{row.conversion}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Audience Migration */}
        <Grid item xs={12}>
          <Card sx={{ mt: 3 }}>
            <CardHeader title="Audience Trend Analysis" />
            <Divider />
            <CardContent sx={{ height: 400 }}>
              <TrendChart />
            </CardContent>
          </Card>
        </Grid>

        {/* Channel-specific Insights */}
        <Grid item xs={12}>
          <Card sx={{ mt: 3 }}>
            <CardHeader title="Channel Insights" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                {channelData.map((channel) => (
                  <Grid item xs={12} md={6} lg={3} key={channel.name}>
                    <Card elevation={0} sx={{ bgcolor: 'background.default' }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {channel.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {channel.name === 'Website'
                            ? 'Primary owned platform showing steady growth. Focus on conversion optimization.'
                            : channel.name === 'Social'
                            ? 'Highest engagement rate across channels. Opportunity to expand reach.'
                            : channel.name === 'Streaming'
                            ? 'Growing steadily with good engagement. Invest in more content.'
                            : 'Declining slowly but still important for certain segments.'}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                          <Typography variant="subtitle2" color="text.secondary">
                            Priority:
                          </Typography>
                          <Typography variant="subtitle2" fontWeight="bold">
                            {channel.name === 'Website' || channel.name === 'Social'
                              ? 'High'
                              : channel.name === 'Streaming'
                              ? 'Medium'
                              : 'Low'}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ChannelAnalysis;