import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

// Mock data - In a real app, this would come from props or Redux
const data = [
  { name: 'Website', reach: 450000, engagement: 5.2, conversion: 2.1 },
  { name: 'Social', reach: 320000, engagement: 7.8, conversion: 1.5 },
  { name: 'Streaming', reach: 180000, engagement: 6.1, conversion: 0.9 },
  { name: 'Traditional', reach: 250000, engagement: 2.3, conversion: 0.7 },
];

// Format large numbers with K/M suffixes
const formatYAxis = (value: number) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K`;
  }
  return value;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          bgcolor: 'background.paper',
          p: 1.5,
          border: '1px solid #ccc',
          borderRadius: 1,
          boxShadow: 1,
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
          {label}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: payload[0].color, display: 'flex', justifyContent: 'space-between' }}
        >
          <span>Reach:</span> <strong>{formatYAxis(payload[0].value)}</strong>
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: payload[1].color, display: 'flex', justifyContent: 'space-between' }}
        >
          <span>Engagement:</span> <strong>{payload[1].value}%</strong>
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: payload[2].color, display: 'flex', justifyContent: 'space-between' }}
        >
          <span>Conversion:</span> <strong>{payload[2].value}%</strong>
        </Typography>
      </Box>
    );
  }
  return null;
};

const ChannelPerformanceChart: React.FC = () => {
  const theme = useTheme();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="name" />
        <YAxis
          yAxisId="left"
          orientation="left"
          stroke={theme.palette.primary.main}
          tickFormatter={formatYAxis}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          stroke={theme.palette.secondary.main}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar
          yAxisId="left"
          dataKey="reach"
          name="Reach"
          fill={theme.palette.primary.main}
          radius={[4, 4, 0, 0]}
        />
        <Bar
          yAxisId="right"
          dataKey="engagement"
          name="Engagement (%)"
          fill={theme.palette.secondary.main}
          radius={[4, 4, 0, 0]}
        />
        <Bar
          yAxisId="right"
          dataKey="conversion"
          name="Conversion (%)"
          fill={theme.palette.success.main}
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ChannelPerformanceChart;