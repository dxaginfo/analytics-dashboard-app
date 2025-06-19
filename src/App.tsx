import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import Dashboard from './features/dashboard/Dashboard';
import ChannelAnalysis from './features/channels/ChannelAnalysis';
import AudienceAnalysis from './features/audience/AudienceAnalysis';
import ContentAnalysis from './features/content/ContentAnalysis';
import Login from './features/auth/Login';
import Layout from './components/layout/Layout';
import { RootState } from './store';
import { checkAuth } from './features/auth/authSlice';

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Check user authentication status on app load
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Routes>
      {!isAuthenticated ? (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      ) : (
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/channels" element={<ChannelAnalysis />} />
          <Route path="/audience" element={<AudienceAnalysis />} />
          <Route path="/content" element={<ContentAnalysis />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      )}
    </Routes>
  );
};

export default App;