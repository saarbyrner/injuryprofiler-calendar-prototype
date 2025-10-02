import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  LinearProgress,
  Chip,
  Grid,
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  TrendingUpOutlined,
  TrendingDownOutlined,
  TrendingFlatOutlined,
  AssessmentOutlined,
  FitnessCenterOutlined,
  PsychologyOutlined,
  TimelineOutlined
} from '@mui/icons-material';
import '../styles/design-tokens.css';

/**
 * Development Metrics Component
 * Shows AI-calculated development metrics and progress indicators
 */
const DevelopmentMetrics = ({ athleteData, timeRange = '6months' }) => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateDevelopmentMetrics(athleteData);
  }, [athleteData, timeRange]);

  const generateDevelopmentMetrics = (data) => {
    setLoading(true);
    
    // Simulate AI calculation
    setTimeout(() => {
      const calculatedMetrics = {
        overallProgress: {
          value: 78,
          trend: 'up',
          change: '+12%',
          label: 'Overall development'
        },
        technicalSkills: {
          value: 85,
          trend: 'up',
          change: '+8%',
          label: 'Technical skills'
        },
        physicalFitness: {
          value: 72,
          trend: 'up',
          change: '+15%',
          label: 'Physical fitness'
        },
        mentalResilience: {
          value: 68,
          trend: 'flat',
          change: '0%',
          label: 'Mental resilience'
        },
        tacticalAwareness: {
          value: 81,
          trend: 'up',
          change: '+6%',
          label: 'Tactical awareness'
        },
        injuryRisk: {
          value: 23,
          trend: 'down',
          change: '-5%',
          label: 'Injury risk',
          isRisk: true
        }
      };

      setMetrics(calculatedMetrics);
      setLoading(false);
    }, 1000);
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <TrendingUpOutlined sx={{ color: 'var(--color-success)' }} />;
      case 'down': return <TrendingDownOutlined sx={{ color: 'var(--color-error)' }} />;
      case 'flat': return <TrendingFlatOutlined sx={{ color: 'var(--color-text-secondary)' }} />;
      default: return <TrendingFlatOutlined />;
    }
  };

  const getTrendColor = (trend, isRisk = false) => {
    if (isRisk) {
      return trend === 'down' ? 'var(--color-success)' : 'var(--color-warning)';
    }
    switch (trend) {
      case 'up': return 'var(--color-success)';
      case 'down': return 'var(--color-error)';
      case 'flat': return 'var(--color-text-secondary)';
      default: return 'var(--color-text-secondary)';
    }
  };

  const getProgressColor = (value, isRisk = false) => {
    if (isRisk) {
      return value < 30 ? 'var(--color-success)' : value < 60 ? 'var(--color-warning)' : 'var(--color-error)';
    }
    return value >= 80 ? 'var(--color-success)' : value >= 60 ? 'var(--color-warning)' : 'var(--color-error)';
  };

  if (loading) {
    return (
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <AssessmentOutlined sx={{ mr: 1, color: 'var(--color-primary)' }} />
            <Typography variant="h6" sx={{ color: 'var(--color-text-primary)' }}>
              Development metrics
            </Typography>
          </Box>
          <LinearProgress />
        </CardContent>
      </Card>
    );
  }

  if (!metrics) return null;

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <AssessmentOutlined sx={{ mr: 1, color: 'var(--color-primary)' }} />
          <Typography variant="h6" sx={{ color: 'var(--color-text-primary)' }}>
            Development metrics
          </Typography>
          <Chip 
            label={timeRange} 
            size="small" 
            sx={{ ml: 2, backgroundColor: 'var(--color-secondary)', color: 'var(--color-text-primary)' }}
          />
        </Box>

        <Grid container spacing={3}>
          {Object.entries(metrics).map(([key, metric]) => (
            <Grid item xs={12} sm={6} md={4} key={key}>
              <Box sx={{ 
                p: 2, 
                border: '1px solid var(--color-border-primary)', 
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-background-primary)'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                    {metric.label}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {getTrendIcon(metric.trend)}
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: getTrendColor(metric.trend, metric.isRisk),
                        fontWeight: 600,
                        fontSize: '0.75rem'
                      }}
                    >
                      {metric.change}
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ mb: 1 }}>
                  <Typography variant="h4" sx={{ 
                    color: 'var(--color-text-primary)', 
                    fontWeight: 700,
                    fontSize: '1.5rem'
                  }}>
                    {metric.value}%
                  </Typography>
                </Box>

                <LinearProgress
                  variant="determinate"
                  value={metric.value}
                  sx={{
                    height: 8,
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--color-background-secondary)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: getProgressColor(metric.value, metric.isRisk),
                      borderRadius: 'var(--radius-sm)'
                    }
                  }}
                />

                {metric.isRisk && (
                  <Typography variant="caption" sx={{ 
                    color: 'var(--color-text-muted)', 
                    mt: 0.5, 
                    display: 'block',
                    fontStyle: 'italic'
                  }}>
                    Lower is better
                  </Typography>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 3, p: 2, backgroundColor: 'var(--color-background-secondary)', borderRadius: 'var(--radius-md)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <TimelineOutlined sx={{ mr: 1, color: 'var(--color-primary)' }} />
            <Typography variant="subtitle2" sx={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>
              AI development summary
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)' }}>
            Based on {timeRange} of data, this athlete shows strong technical progression with room for improvement in mental resilience. 
            Injury risk is well-managed. Recommended focus areas: tactical decision-making and psychological development.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DevelopmentMetrics;

