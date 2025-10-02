import React from 'react';
import { Box } from '@mui/material';

/**
 * Sparkline Chart Component
 * Shows mini performance trend charts on hover
 */
const SparklineChart = ({ data, width = 30, height = 30, color = '#3B4960' }) => {
  if (!data || data.length === 0) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  // Generate SVG path for the sparkline
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * (width - 2);
    const y = height - 2 - ((value - min) / range) * (height - 4);
    return `${x},${y}`;
  }).join(' ');

  return (
    <Box
      sx={{
        width,
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        '&:hover': {
          '& svg': {
            opacity: 1
          }
        }
      }}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ opacity: 0.7, transition: 'opacity 0.2s ease' }}
      >
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Add dots for data points */}
        {data.map((value, index) => {
          const x = (index / (data.length - 1)) * (width - 2);
          const y = height - 2 - ((value - min) / range) * (height - 4);
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="1"
              fill={color}
            />
          );
        })}
      </svg>
    </Box>
  );
};

export default SparklineChart;
