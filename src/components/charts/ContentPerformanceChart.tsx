import React, { useState } from 'react';
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
import { Box, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material';

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
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
          {label}
        </Typography>
        {payload.map((entry: any, index: number) => (
          <Typography
            key={index}
            variant="body2"
            sx={{ 
              color: entry.color, 
              display: 'flex', 
              justifyContent: 'space-between',
              mt: 0.25
            }}
          >
            <span>{entry.name}:</span> <strong>
              {entry.dataKey === 'reach' ? formatYAxis(entry.value) : 
               entry.dataKey === 'engagement' ? `${entry.value}%` : 
               `${entry.value}%`}
            </strong>
          </Typography>
        ))}
      </Box>
    );
  }
  return null;
};

type MetricType = 'engagement' | 'reach' | 'growth';

const ContentPerformanceChart: React.FC = () => {
  const theme = useTheme();
  const [metric, setMetric] = useState<MetricType>('engagement');

  const handleMetricChange = (
    event: React.MouseEvent<HTMLElement>,
    newMetric: MetricType | null,
  ) => {
    if (newMetric !== null) {
      setMetric(newMetric);
    }
  };

  const getBarColor = () => {
    switch (metric) {
      case 'engagement':
        return theme.palette.primary.main;
      case 'reach':
        return theme.palette.secondary.main;
      case 'growth':
        return theme.palette.success.main;
      default:
        return theme.palette.primary.main;
    }
  };

  const getYAxisFormatter = (value: number) => {
    if (metric === 'reach') {
      return formatYAxis(value);
    }
    return `${value}%`;
  };

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <ToggleButtonGroup
          value={metric}
          exclusive
          onChange={handleMetricChange}
          size="small"
        >
          <ToggleButton value="engagement">Engagement</ToggleButton>
          <ToggleButton value="reach">Reach</ToggleButton>
          <ToggleButton value="growth">Growth</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      
      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="type" />
          <YAxis tickFormatter={getYAxisFormatter} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar
            dataKey={metric}
            name={metric.charAt(0).toUpperCase() + metric.slice(1)}
            fill={getBarColor()}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ContentPerformanceChart;