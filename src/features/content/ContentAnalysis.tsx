import React, { useEffect, useState } from 'react';
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
  LinearProgress,
  Tab,
  Tabs,
  Button,
  Rating
} from '@mui/material';
import { RootState } from '../../store';
import { fetchContentData } from '../dashboard/dashboardSlice';
import ContentPerformanceChart from '../../components/charts/ContentPerformanceChart';

const ContentAnalysis: React.FC = () => {
  const dispatch = useDispatch();
  const { contentData, isLoading, error } = useSelector((state: RootState) => state.dashboard);
  const [tabValue, setTabValue] = useState(0);
  const [consistencyScore, setConsistencyScore] = useState(85);

  useEffect(() => {
    dispatch(fetchContentData() as any);
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
          Error loading content data: {error}
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

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Content type details
  const contentTypeDetails = [
    {
      type: 'Video',
      description: 'Short-form and long-form video content across platforms',
      bestPerforming: ['Game Highlights', 'Player Interviews', 'Behind-the-Scenes'],
      frequency: 'Daily',
      avgLength: '3-8 minutes',
      topChannels: ['YouTube', 'Instagram', 'TikTok'],
      effectivenessScore: 4.5
    },
    {
      type: 'Articles',
      description: 'Written content including news, analysis, and features',
      bestPerforming: ['Analysis Pieces', 'Player Profiles', 'Team Updates'],
      frequency: '3-5x Weekly',
      avgLength: '800-1200 words',
      topChannels: ['Website', 'Apple News', 'Newsletters'],
      effectivenessScore: 3.8
    },
    {
      type: 'Social Posts',
      description: 'Short updates, images, and engagement content',
      bestPerforming: ['Game Day Updates', 'Player Quotes', 'Fan Interaction Posts'],
      frequency: 'Multiple Daily',
      avgLength: 'Text: 30-50 words',
      topChannels: ['Twitter', 'Instagram', 'Facebook'],
      effectivenessScore: 4.2
    },
    {
      type: 'Audio',
      description: 'Podcasts, interviews, and audio features',
      bestPerforming: ['Weekly Podcast', 'Coach Interviews', 'Game Previews'],
      frequency: 'Weekly',
      avgLength: '30-45 minutes',
      topChannels: ['Spotify', 'Apple Podcasts', 'Website'],
      effectivenessScore: 3.5
    },
    {
      type: 'Interactive',
      description: 'Polls, quizzes, brackets, and interactive experiences',
      bestPerforming: ['Fan Polls', 'Bracket Challenges', 'Interactive Stats'],
      frequency: '2-3x Weekly',
      avgLength: 'Varies',
      topChannels: ['Website', 'Social Media', 'App'],
      effectivenessScore: 4.8
    }
  ];

  const currentContentType = contentTypeDetails[tabValue] || contentTypeDetails[0];
  const currentContent = contentData[tabValue] || contentData[0];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
        Content Analysis
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
        Analyzing content performance across formats and platforms
      </Typography>

      <Grid container spacing={3}>
        {/* Content Performance Chart */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ height: '100%' }}>
            <CardHeader title="Content Performance" />
            <Divider />
            <CardContent sx={{ height: 400 }}>
              <ContentPerformanceChart />
            </CardContent>
          </Card>
        </Grid>

        {/* Content Consistency */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardHeader title="Content Consistency" />
            <Divider />
            <CardContent>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" align="center" sx={{ mb: 2 }}>
                  {consistencyScore}%
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={consistencyScore} 
                  color={consistencyScore >= 80 ? "success" : consistencyScore >= 60 ? "warning" : "error"}
                  sx={{ height: 10, borderRadius: 5 }}
                />
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
                  Overall content consistency score
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="subtitle2" gutterBottom>Consistency Factors</Typography>
                <List dense>
                  <ListItem>
                    <ListItemText 
                      primary="Publishing Schedule" 
                      secondary={
                        <LinearProgress 
                          variant="determinate" 
                          value={90} 
                          color="success"
                          sx={{ height: 6, borderRadius: 3, mt: 0.5 }}
                        />
                      } 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Content Quality" 
                      secondary={
                        <LinearProgress 
                          variant="determinate" 
                          value={82} 
                          color="success"
                          sx={{ height: 6, borderRadius: 3, mt: 0.5 }}
                        />
                      } 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Brand Voice" 
                      secondary={
                        <LinearProgress 
                          variant="determinate" 
                          value={88} 
                          color="success"
                          sx={{ height: 6, borderRadius: 3, mt: 0.5 }}
                        />
                      } 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Platform Coverage" 
                      secondary={
                        <LinearProgress 
                          variant="determinate" 
                          value={75} 
                          color="warning"
                          sx={{ height: 6, borderRadius: 3, mt: 0.5 }}
                        />
                      } 
                    />
                  </ListItem>
                </List>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Content Type Details */}
        <Grid item xs={12}>
          <Card sx={{ mt: 3 }}>
            <CardHeader title="Content Type Analysis" />
            <Divider />
            <CardContent>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{ mb: 3 }}
              >
                {contentTypeDetails.map((item, index) => (
                  <Tab key={item.type} label={item.type} value={index} />
                ))}
              </Tabs>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    {currentContentType.type} Content
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {currentContentType.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Typography variant="subtitle2">Publication Frequency:</Typography>
                    <Typography variant="body2">{currentContentType.frequency}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    <Typography variant="subtitle2">Average Length:</Typography>
                    <Typography variant="body2">{currentContentType.avgLength}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
                    <Typography variant="subtitle2">Effectiveness Rating:</Typography>
                    <Rating value={currentContentType.effectivenessScore} precision={0.5} readOnly />
                  </Box>
                  
                  <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>Top Distribution Channels</Typography>
                  <List dense>
                    {currentContentType.topChannels.map((channel, index) => (
                      <ListItem key={index} disablePadding>
                        <ListItemText primary={channel} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Performance Metrics
                    </Typography>
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                      <Grid item xs={4}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom align="center">
                          Engagement
                        </Typography>
                        <Typography variant="h5" align="center">
                          {currentContent.engagement}%
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom align="center">
                          Reach
                        </Typography>
                        <Typography variant="h5" align="center">
                          {formatNumber(currentContent.reach)}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom align="center">
                          Growth
                        </Typography>
                        <Typography variant="h5" align="center">
                          {currentContent.growth}%
                        </Typography>
                      </Grid>
                    </Grid>
                    
                    <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>
                      Best Performing Content
                    </Typography>
                    <List dense>
                      {currentContentType.bestPerforming.map((item, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={item} />
                        </ListItem>
                      ))}
                    </List>
                    
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                      <Button variant="outlined" size="small">
                        View Detailed Report
                      </Button>
                    </Box>
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

export default ContentAnalysis;