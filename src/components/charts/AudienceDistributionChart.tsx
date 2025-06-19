import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

// Mock data - In a real app, this would come from props or Redux
const data = [
  { platform: 'Website', value: 450000, percentage: 37.5 },
  { platform: 'Social Media', value: 320000, percentage: 26.7 },
  { platform: 'Streaming', value: 180000, percentage: 15 },
  { platform: 'Traditional Media', value: 250000, percentage: 20.8 },
];

// Format large numbers with K/M suffixes
const formatNumber = (value: number) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K`;
  }
  return value;
};

const CustomTooltip = ({ active, payload }: any) => {
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
          {payload[0].name}
        </Typography>
        <Typography
          variant="body2"
          sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.25 }}
        >
          <span>Audience:</span> <strong>{formatNumber(payload[0].value)}</strong>
        </Typography>
        <Typography
          variant="body2"
          sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.25 }}
        >
          <span>Percentage:</span> <strong>{payload[0].payload.percentage}%</strong>
        </Typography>
      </Box>
    );
  }
  return null;
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize="12"
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const AudienceDistributionChart: React.FC = () => {
  const theme = useTheme();
  
  // Colors based on theme palette
  const COLORS = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={"70%"}
          fill="#8884d8"
          dataKey="value"
          nameKey="platform"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend layout="horizontal" verticalAlign="bottom" align="center" />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default AudienceDistributionChart;