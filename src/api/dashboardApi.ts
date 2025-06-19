// Mock API service for dashboard data
// In a real app, this would use axios or fetch to call your backend API

// Simulates API response delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchDashboardDataAPI = async () => {
  // Simulate API call delay
  await delay(1000);
  
  // Return mock data
  return {
    summary: {
      totalAudience: 1200000,
      audienceGrowth: 12.3,
      engagementRate: 4.5,
      engagementChange: 0.8,
      contentConsistency: 85,
      consistencyChange: -2.1,
      roi: 3.2,
      roiChange: 0.4,
    },
    channelData: [
      { name: 'Website', reach: 450000, engagement: 5.2, conversion: 2.1 },
      { name: 'Social Media', reach: 320000, engagement: 7.8, conversion: 1.5 },
      { name: 'Streaming', reach: 180000, engagement: 6.1, conversion: 0.9 },
      { name: 'Traditional Media', reach: 250000, engagement: 2.3, conversion: 0.7 },
    ],
    audienceData: [
      { platform: 'Website', value: 450000, percentage: 37.5 },
      { platform: 'Social Media', value: 320000, percentage: 26.7 },
      { platform: 'Streaming', value: 180000, percentage: 15 },
      { platform: 'Traditional Media', value: 250000, percentage: 20.8 },
    ],
    contentData: [
      { type: 'Video', engagement: 8.7, reach: 520000, growth: 15.2 },
      { type: 'Articles', engagement: 4.2, reach: 350000, growth: 7.8 },
      { type: 'Social Posts', engagement: 6.5, reach: 480000, growth: 12.3 },
      { type: 'Audio', engagement: 5.1, reach: 210000, growth: 9.6 },
      { type: 'Interactive', engagement: 9.3, reach: 180000, growth: 23.5 },
    ],
    trendData: [
      { month: 'Jan', website: 410000, socialMedia: 280000, streaming: 150000, traditionalMedia: 260000 },
      { month: 'Feb', website: 415000, socialMedia: 285000, streaming: 155000, traditionalMedia: 258000 },
      { month: 'Mar', website: 422000, socialMedia: 290000, streaming: 160000, traditionalMedia: 255000 },
      { month: 'Apr', website: 428000, socialMedia: 295000, streaming: 165000, traditionalMedia: 252000 },
      { month: 'May', website: 435000, socialMedia: 300000, streaming: 168000, traditionalMedia: 250000 },
      { month: 'Jun', website: 440000, socialMedia: 305000, streaming: 172000, traditionalMedia: 248000 },
      { month: 'Jul', website: 442000, socialMedia: 310000, streaming: 175000, traditionalMedia: 245000 },
      { month: 'Aug', website: 445000, socialMedia: 312000, streaming: 176000, traditionalMedia: 248000 },
      { month: 'Sep', website: 447000, socialMedia: 315000, streaming: 177000, traditionalMedia: 249000 },
      { month: 'Oct', website: 448000, socialMedia: 318000, streaming: 178000, traditionalMedia: 250000 },
      { month: 'Nov', website: 449000, socialMedia: 319000, streaming: 179000, traditionalMedia: 250000 },
      { month: 'Dec', website: 450000, socialMedia: 320000, streaming: 180000, traditionalMedia: 250000 },
    ],
  };
};

export const fetchChannelDataAPI = async () => {
  await delay(800);
  
  return {
    channelPerformance: [
      { channel: 'Website', visitors: 450000, pageviews: 1200000, avgTimeOnSite: 185, bounceRate: 45 },
      { channel: 'Facebook', followers: 120000, reach: 350000, engagement: 28000, postFrequency: 12 },
      { channel: 'Instagram', followers: 85000, reach: 280000, engagement: 32000, postFrequency: 18 },
      { channel: 'Twitter', followers: 65000, reach: 220000, engagement: 18000, postFrequency: 25 },
      { channel: 'YouTube', subscribers: 50000, views: 320000, watchTime: 2800000, postFrequency: 4 },
      { channel: 'TikTok', followers: 35000, views: 420000, engagement: 38000, postFrequency: 15 },
      { channel: 'LinkedIn', followers: 28000, reach: 95000, engagement: 8500, postFrequency: 8 },
      { channel: 'TV', viewers: 180000, adSpend: 85000, adROI: 2.4, frequency: 2 },
      { channel: 'Radio', listeners: 95000, adSpend: 35000, adROI: 1.8, frequency: 3 },
      { channel: 'Print', readers: 75000, adSpend: 28000, adROI: 1.5, frequency: 1 },
    ],
    channelComparison: {
      reach: [
        { channel: 'Website', thisMonth: 450000, lastMonth: 435000, yoy: 410000 },
        { channel: 'Social Media', thisMonth: 320000, lastMonth: 305000, yoy: 280000 },
        { channel: 'Streaming', thisMonth: 180000, lastMonth: 172000, yoy: 150000 },
        { channel: 'Traditional Media', thisMonth: 250000, lastMonth: 248000, yoy: 260000 },
      ],
      engagement: [
        { channel: 'Website', thisMonth: 5.2, lastMonth: 5.0, yoy: 4.8 },
        { channel: 'Social Media', thisMonth: 7.8, lastMonth: 7.5, yoy: 7.2 },
        { channel: 'Streaming', thisMonth: 6.1, lastMonth: 5.9, yoy: 5.5 },
        { channel: 'Traditional Media', thisMonth: 2.3, lastMonth: 2.2, yoy: 2.0 },
      ],
    },
  };
};

export const fetchAudienceDataAPI = async () => {
  await delay(900);
  
  return {
    demographics: {
      age: [
        { group: '18-24', percentage: 18 },
        { group: '25-34', percentage: 32 },
        { group: '35-44', percentage: 24 },
        { group: '45-54', percentage: 15 },
        { group: '55+', percentage: 11 },
      ],
      gender: [
        { group: 'Male', percentage: 52 },
        { group: 'Female', percentage: 47 },
        { group: 'Other', percentage: 1 },
      ],
      location: [
        { region: 'North America', percentage: 45 },
        { region: 'Europe', percentage: 28 },
        { region: 'Asia Pacific', percentage: 18 },
        { region: 'Latin America', percentage: 6 },
        { region: 'Other', percentage: 3 },
      ],
    },
    behavior: {
      deviceUsage: [
        { device: 'Mobile', percentage: 58 },
        { device: 'Desktop', percentage: 32 },
        { device: 'Tablet', percentage: 8 },
        { device: 'Other', percentage: 2 },
      ],
      timeOfDay: [
        { time: 'Morning (6am-12pm)', percentage: 22 },
        { time: 'Afternoon (12pm-5pm)', percentage: 28 },
        { time: 'Evening (5pm-10pm)', percentage: 38 },
        { time: 'Night (10pm-6am)', percentage: 12 },
      ],
    },
  };
};

export const fetchContentDataAPI = async () => {
  await delay(850);
  
  return {
    topPerforming: [
      { title: 'Ultimate Guide to Multi-Channel Marketing', type: 'Article', engagement: 9.2, reach: 85000 },
      { title: 'How to Build a Loyal Audience in 2025', type: 'Video', engagement: 8.7, reach: 78000 },
      { title: 'Behind the Scenes: Campaign Creation', type: 'Video', engagement: 8.5, reach: 72000 },
      { title: 'Marketing Analytics Explained', type: 'Interactive', engagement: 10.2, reach: 65000 },
      { title: 'Expert Interview: Future of Digital Media', type: 'Audio', engagement: 7.8, reach: 58000 },
    ],
    contentConsistency: {
      messaging: 85,
      visualIdentity: 92,
      brandVoice: 88,
      cadence: 78,
      overall: 85,
    },
  };
};

export const fetchMigrationDataAPI = async () => {
  await delay(950);
  
  return {
    platformMigration: [
      { from: 'Facebook', to: 'Instagram', volume: 12000 },
      { from: 'Facebook', to: 'TikTok', volume: 18000 },
      { from: 'Twitter', to: 'Instagram', volume: 8000 },
      { from: 'Traditional TV', to: 'YouTube', volume: 15000 },
      { from: 'Traditional TV', to: 'Streaming', volume: 22000 },
      { from: 'Radio', to: 'Podcasts', volume: 9000 },
      { from: 'Print', to: 'Digital Articles', volume: 14000 },
    ],
  };
};