// Mock API service for dashboard data
// In a real application, these would be actual API calls to a backend

// Summary data
const summaryData = {
  totalAudience: 1200000,
  audienceGrowth: 8.5,
  engagementRate: 5.2,
  engagementChange: 1.8,
  contentConsistency: 85,
  consistencyChange: 5,
  roi: 320,
  roiChange: 12.5,
};

// Channel data
const channelData = [
  { name: 'Website', reach: 450000, engagement: 5.2, conversion: 2.1 },
  { name: 'Social', reach: 320000, engagement: 7.8, conversion: 1.5 },
  { name: 'Streaming', reach: 180000, engagement: 6.1, conversion: 0.9 },
  { name: 'Traditional', reach: 250000, engagement: 2.3, conversion: 0.7 },
];

// Audience data
const audienceData = [
  { platform: 'Website', value: 450000, percentage: 37.5 },
  { platform: 'Social Media', value: 320000, percentage: 26.7 },
  { platform: 'Streaming', value: 180000, percentage: 15 },
  { platform: 'Traditional Media', value: 250000, percentage: 20.8 },
];

// Content data
const contentData = [
  { type: 'Video', engagement: 8.7, reach: 520000, growth: 15.2 },
  { type: 'Articles', engagement: 4.2, reach: 350000, growth: 7.8 },
  { type: 'Social Posts', engagement: 6.5, reach: 480000, growth: 12.3 },
  { type: 'Audio', engagement: 5.1, reach: 210000, growth: 9.6 },
  { type: 'Interactive', engagement: 9.3, reach: 180000, growth: 23.5 },
];

// Trend data (12 months)
const trendData = [
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
];

// Migration data
const migrationData = [
  { platform: 'TV to Streaming', value: 15.2, year: 2023 },
  { platform: 'TV to Streaming', value: 18.5, year: 2024 },
  { platform: 'TV to Streaming', value: 22.1, year: 2025 },
  { platform: 'Print to Digital', value: 25.7, year: 2023 },
  { platform: 'Print to Digital', value: 32.3, year: 2024 },
  { platform: 'Print to Digital', value: 38.6, year: 2025 },
  { platform: 'Radio to Podcast', value: 8.3, year: 2023 },
  { platform: 'Radio to Podcast', value: 12.4, year: 2024 },
  { platform: 'Radio to Podcast', value: 15.8, year: 2025 },
];

// API functions with simulated delay
export const fetchDashboardDataAPI = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        summary: summaryData,
        channelData,
        audienceData,
        contentData,
        trendData,
      });
    }, 800);
  });
};

export const fetchChannelDataAPI = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(channelData);
    }, 600);
  });
};

export const fetchAudienceDataAPI = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(audienceData);
    }, 600);
  });
};

export const fetchContentDataAPI = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(contentData);
    }, 600);
  });
};

export const fetchMigrationDataAPI = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(migrationData);
    }, 600);
  });
};