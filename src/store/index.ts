import { configureStore } from '@reduxjs/toolkit';
import channelReducer from '../features/channels/channelSlice';
import audienceReducer from '../features/audience/audienceSlice';
import contentReducer from '../features/content/contentSlice';
import authReducer from '../features/auth/authSlice';
import dashboardReducer from '../features/dashboard/dashboardSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    channels: channelReducer,
    audience: audienceReducer,
    content: contentReducer,
    dashboard: dashboardReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;