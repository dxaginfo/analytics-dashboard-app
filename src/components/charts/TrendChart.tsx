import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useTheme } from '@mui/material/styles';
import { Box, Typography, FormControlLabel, Switch } from '@mui/material';

// Mock data - In a real app, this would come from props or Redux
const data = [
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
            <span>{entry.name}:</span> <strong>{formatYAxis(entry.value)}</strong>
          </Typography>
        ))}
      </Box>
    );
  }
  return null;
};

const TrendChart: React.FC = () => {
  const theme = useTheme();
  const [showTotal, setShowTotal] = useState(false);

  // Calculate total for each month if showing total
  const dataWithTotal = data.map(item => ({
    ...item,
    total: item.website + item.socialMedia + item.streaming + item.traditionalMedia
  }));

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={showTotal}
              onChange={() => setShowTotal(!showTotal)}
              size="small"
            />
          }
          label="Show Total"
        />
      </Box>
      
      <ResponsiveContainer width="100%" height="85%">
        <LineChart
          data={dataWithTotal}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={formatYAxis} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="website"
            name="Website"
            stroke={theme.palette.primary.main}
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="socialMedia"
            name="Social Media"
            stroke={theme.palette.secondary.main}
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="streaming"
            name="Streaming"
            stroke={theme.palette.success.main}
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="traditionalMedia"
            name="Traditional Media"
            stroke={theme.palette.warning.main}
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          {showTotal && (
            <Line
              type="monotone"
              dataKey="total"
              name="Total"
              stroke={theme.palette.error.main}
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default TrendChart;