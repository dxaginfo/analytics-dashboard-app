import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchDashboardDataAPI } from '../../api/dashboardApi';

interface SummaryData {
  totalAudience: number;
  audienceGrowth: number;
  engagementRate: number;
  engagementChange: number;
  contentConsistency: number;
  consistencyChange: number;
  roi: number;
  roiChange: number;
}

interface ChannelData {
  name: string;
  reach: number;
  engagement: number;
  conversion: number;
}

interface AudienceData {
  platform: string;
  value: number;
  percentage: number;
}

interface ContentData {
  type: string;
  engagement: number;
  reach: number;
  growth: number;
}

interface TrendData {
  month: string;
  website: number;
  socialMedia: number;
  streaming: number;
  traditionalMedia: number;
}

interface DashboardState {
  isLoading: boolean;
  error: string | null;
  summary: SummaryData | null;
  channelData: ChannelData[];
  audienceData: AudienceData[];
  contentData: ContentData[];
  trendData: TrendData[];
  lastUpdated: string | null;
}

const initialState: DashboardState = {
  isLoading: false,
  error: null,
  summary: null,
  channelData: [],
  audienceData: [],
  contentData: [],
  trendData: [],
  lastUpdated: null,
};

// Async thunk for fetching dashboard data
export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchDashboardData',
  async (_, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      const data = await fetchDashboardDataAPI();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch dashboard data');
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    refreshData: (state) => {
      state.isLoading = true;
    },
    filterByDateRange: (state, action: PayloadAction<{ startDate: string; endDate: string }>) => {
      // This would typically trigger a new API request with the date range
      // For demo purposes, we'll just update the lastUpdated field
      state.lastUpdated = new Date().toISOString();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.summary = action.payload.summary;
        state.channelData = action.payload.channelData;
        state.audienceData = action.payload.audienceData;
        state.contentData = action.payload.contentData;
        state.trendData = action.payload.trendData;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { refreshData, filterByDateRange } = dashboardSlice.actions;

export default dashboardSlice.reducer;