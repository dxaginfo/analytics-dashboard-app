import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend, 
  Tooltip 
} from 'recharts';
import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

// Mock data - In a real app, this would come from props or Redux
const data = [
  { platform: 'Website', value: 450000, percentage: 37.5 },
  { platform: 'Social Media', value: 320000, percentage: 26.7 },
  { platform: 'Streaming', value: 180000, percentage: 15 },
  { platform: 'Traditional Media', value: 250000, percentage: 20.8 },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ 
  cx, cy, midAngle, innerRadius, outerRadius, percent, index 
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      fontSize={12}
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
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
        <Typography variant="body2" color="text.secondary">
          {`Audience: ${payload[0].value.toLocaleString()}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`Share: ${payload[0].payload.percentage}%`}
        </Typography>
      </Box>
    );
  }
  return null;
};

const AudienceDistributionChart: React.FC = () => {
  const theme = useTheme();
  
  // Custom colors for the pie slices
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
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          nameKey="platform"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          layout="horizontal" 
          verticalAlign="bottom" 
          align="center"
          formatter={(value, entry, index) => (
            <span style={{ color: '#333', fontSize: '0.875rem' }}>{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default AudienceDistributionChart;