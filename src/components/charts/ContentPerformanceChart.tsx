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
  ReferenceLine,
} from 'recharts';
import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

// Mock data - In a real app, this would come from props or Redux
const data = [
  { type: 'Video', engagement: 8.7, reach: 520000, growth: 15.2 },
  { type: 'Articles', engagement: 4.2, reach: 350000, growth: 7.8 },
  { type: 'Social Posts', engagement: 6.5, reach: 480000, growth: 12.3 },
  { type: 'Audio', engagement: 5.1, reach: 210000, growth: 9.6 },
  { type: 'Interactive', engagement: 9.3, reach: 180000, growth: 23.5 },
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
          minWidth: 180,
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
          {label}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: payload[0].color, display: 'flex', justifyContent: 'space-between' }}
        >
          <span>Engagement:</span> <strong>{payload[0].value}%</strong>
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: payload[1].color, display: 'flex', justifyContent: 'space-between' }}
        >
          <span>Reach:</span> <strong>{formatYAxis(payload[1].value)}</strong>
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: payload[2].color, display: 'flex', justifyContent: 'space-between' }}
        >
          <span>Growth:</span> <strong>{payload[2].value}%</strong>
        </Typography>
      </Box>
    );
  }
  return null;
};

const ContentPerformanceChart: React.FC = () => {
  const theme = useTheme();

  // Average values for reference lines
  const avgEngagement = data.reduce((sum, item) => sum + item.engagement, 0) / data.length;
  const avgGrowth = data.reduce((sum, item) => sum + item.growth, 0) / data.length;

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
        <XAxis dataKey="type" />
        <YAxis
          yAxisId="left"
          orientation="left"
          stroke={theme.palette.primary.main}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          stroke={theme.palette.secondary.main}
          tickFormatter={formatYAxis}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar
          yAxisId="left"
          dataKey="engagement"
          name="Engagement (%)"
          fill={theme.palette.primary.main}
          radius={[4, 4, 0, 0]}
        />
        <Bar
          yAxisId="right"
          dataKey="reach"
          name="Reach"
          fill={theme.palette.secondary.main}
          radius={[4, 4, 0, 0]}
        />
        <Bar
          yAxisId="left"
          dataKey="growth"
          name="Growth (%)"
          fill={theme.palette.success.main}
          radius={[4, 4, 0, 0]}
        />
        <ReferenceLine
          yAxisId="left"
          y={avgEngagement}
          label="Avg Engagement"
          stroke={theme.palette.primary.main}
          strokeDasharray="3 3"
        />
        <ReferenceLine
          yAxisId="left"
          y={avgGrowth}
          label="Avg Growth"
          stroke={theme.palette.success.main}
          strokeDasharray="3 3"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ContentPerformanceChart;