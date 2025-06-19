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
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tabs,
  Tab
} from '@mui/material';
import { RootState } from '../../store';
import { fetchAudienceData } from '../dashboard/dashboardSlice';
import AudienceDistributionChart from '../../components/charts/AudienceDistributionChart';
import { TrendingUp, TrendingDown, TrendingFlat } from '@mui/icons-material';

const AudienceAnalysis: React.FC = () => {
  const dispatch = useDispatch();
  const { audienceData, isLoading, error } = useSelector((state: RootState) => state.dashboard);
  const [tabValue, setTabValue] = React.useState(0);

  useEffect(() => {
    dispatch(fetchAudienceData() as any);
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
          Error loading audience data: {error}
        </Typography>
      </Box>
    );
  }

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Format numbers for display
  const formatNumber = (num: number) => {
    return num >= 1000000
      ? `${(num / 1000000).toFixed(1)}M`
      : num >= 1000
      ? `${(num / 1000).toFixed(0)}K`
      : num.toString();
  };

  // Audience insights based on platform
  const audienceInsights = {
    'Website': [
      { insight: 'Direct traffic dominates at 45%', trend: 'up' },
      { insight: 'Mobile visitors increased by 12%', trend: 'up' },
      { insight: 'Average session duration: 3:24', trend: 'flat' },
      { insight: 'Bounce rate decreased to 38%', trend: 'down' },
    ],
    'Social Media': [
      { insight: 'Instagram showing highest growth at 18%', trend: 'up' },
      { insight: 'Facebook engagement declined by 5%', trend: 'down' },
      { insight: 'Video content drives 3x more interactions', trend: 'up' },
      { insight: 'Twitter followers plateaued at 85K', trend: 'flat' },
    ],
    'Streaming': [
      { insight: 'Live content viewership up by 24%', trend: 'up' },
      { insight: 'Average watch time: 12:35 minutes', trend: 'up' },
      { insight: 'Subscriber conversion rate: 2.8%', trend: 'flat' },
      { insight: 'Mobile streaming increased to 68%', trend: 'up' },
    ],
    'Traditional Media': [
      { insight: 'TV viewership down by 8% year-over-year', trend: 'down' },
      { insight: 'Print readership stable for core segments', trend: 'flat' },
      { insight: 'Radio listenership shifted to morning hours', trend: 'flat' },
      { insight: 'Cross-promotion driving 15% digital migration', trend: 'up' },
    ],
  };

  const currentPlatform = audienceData[tabValue]?.platform || 'Website';

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
        Audience Analysis
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
        Understanding your audience distribution and engagement across platforms
      </Typography>

      <Grid container spacing={3}>
        {/* Audience Distribution Chart */}
        <Grid item xs={12} lg={6}>
          <Card sx={{ height: '100%' }}>
            <CardHeader title="Audience Distribution" />
            <Divider />
            <CardContent sx={{ height: 400 }}>
              <AudienceDistributionChart />
            </CardContent>
          </Card>
        </Grid>

        {/* Audience Metrics */}
        <Grid item xs={12} lg={6}>
          <Card sx={{ height: '100%' }}>
            <CardHeader title="Audience Platform Metrics" />
            <Divider />
            <CardContent>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{ mb: 3 }}
              >
                {audienceData.map((platform, index) => (
                  <Tab key={platform.platform} label={platform.platform} value={index} />
                ))}
              </Tabs>

              {audienceData.map((platform, index) => (
                <Box key={platform.platform} sx={{ display: tabValue === index ? 'block' : 'none' }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          Total Audience
                        </Typography>
                        <Typography variant="h4" fontWeight="bold">
                          {formatNumber(platform.value)}
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          Percentage Share
                        </Typography>
                        <Typography variant="h4" fontWeight="bold">
                          {platform.percentage}%
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>

                  <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>
                    Key Insights
                  </Typography>
                  <List>
                    {audienceInsights[platform.platform as keyof typeof audienceInsights]?.map((item, i) => (
                      <ListItem key={i} sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          {item.trend === 'up' ? (
                            <TrendingUp color="success" />
                          ) : item.trend === 'down' ? (
                            <TrendingDown color="error" />
                          ) : (
                            <TrendingFlat color="action" />
                          )}
                        </ListItemIcon>
                        <ListItemText primary={item.insight} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Demographics */}
        <Grid item xs={12}>
          <Card sx={{ mt: 3 }}>
            <CardHeader title={`${currentPlatform} Audience Demographics`} />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Age Distribution
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemText primary="18-24" secondary="22%" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="25-34" secondary="35%" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="35-44" secondary="25%" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="45+" secondary="18%" />
                      </ListItem>
                    </List>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Gender
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemText primary="Male" secondary="58%" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Female" secondary="41%" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Non-binary/Other" secondary="1%" />
                      </ListItem>
                    </List>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Location
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemText primary="North America" secondary="45%" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Europe" secondary="28%" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Asia" secondary="18%" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Other" secondary="9%" />
                      </ListItem>
                    </List>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Interest Categories
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemText primary="Sports" secondary="65%" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Entertainment" secondary="42%" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Technology" secondary="38%" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Lifestyle" secondary="25%" />
                      </ListItem>
                    </List>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AudienceAnalysis;