import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { 
  fetchDashboardDataAPI, 
  fetchChannelDataAPI, 
  fetchAudienceDataAPI, 
  fetchContentDataAPI,
  fetchMigrationDataAPI
} from '../../api/dashboardApi';

// Define the types for our state
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
  summary: SummaryData | null;
  channelData: ChannelData[];
  audienceData: AudienceData[];
  contentData: ContentData[];
  trendData: TrendData[];
  isLoading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  summary: null,
  channelData: [],
  audienceData: [],
  contentData: [],
  trendData: [],
  isLoading: false,
  error: null,
};

// Create async thunks for data fetching
export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchDashboardDataAPI();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch dashboard data');
    }
  }
);

export const fetchChannelData = createAsyncThunk(
  'dashboard/fetchChannelData',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchChannelDataAPI();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch channel data');
    }
  }
);

export const fetchAudienceData = createAsyncThunk(
  'dashboard/fetchAudienceData',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAudienceDataAPI();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch audience data');
    }
  }
);

export const fetchContentData = createAsyncThunk(
  'dashboard/fetchContentData',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchContentDataAPI();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch content data');
    }
  }
);

export const fetchMigrationData = createAsyncThunk(
  'dashboard/fetchMigrationData',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchMigrationDataAPI();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch migration data');
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    clearDashboardData: (state) => {
      state.summary = null;
      state.channelData = [];
      state.audienceData = [];
      state.contentData = [];
      state.trendData = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchDashboardData
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
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearDashboardData } = dashboardSlice.actions;

export default dashboardSlice.reducer;