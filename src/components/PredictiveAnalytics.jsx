import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Chip,
  Grid,
  Alert,
  Button,
  LinearProgress,
  Tooltip
} from '@mui/material';
import { 
  TimelineOutlined,
  TrendingUpOutlined,
  TrendingDownOutlined,
  TrendingFlatOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  PsychologyOutlined,
  FitnessCenterOutlined,
  AssessmentOutlined
} from '@mui/icons-material';
import '../styles/design-tokens.css';

/**
 * Predictive Analytics Component
 * Shows AI predictions for athlete development, injury risk, and performance
 */
const PredictiveAnalytics = ({ athleteData, predictionHorizon = '6months' }) => {
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generatePredictions(athleteData);
  }, [athleteData, predictionHorizon]);

  const generatePredictions = (data) => {
    setLoading(true);
    
    // Simulate AI prediction processing
    setTimeout(() => {
      const aiPredictions = {
        performance: {
          current: 78,
          predicted: 85,
          confidence: 82,
          trend: 'up',
          timeframe: '6 months',
          factors: ['Training consistency', 'Age development curve', 'Current trajectory']
        },
        injuryRisk: {
          current: 23,
          predicted: 18,
          confidence: 76,
          trend: 'down',
          timeframe: '3 months',
          factors: ['Load management', 'Recovery patterns', 'Biomechanical markers']
        },
        development: {
          current: 72,
          predicted: 89,
          confidence: 88,
          trend: 'up',
          timeframe: '12 months',
          factors: ['Technical progression', 'Physical maturation', 'Coaching input']
        },
        readiness: {
          current: 81,
          predicted: 92,
          confidence: 85,
          trend: 'up',
          timeframe: '4 months',
          factors: ['Match fitness', 'Mental preparation', 'Tactical understanding']
        }
      };

      setPredictions(aiPredictions);
      setLoading(false);
    }, 2000);
  };

  const getPredictionIcon = (trend) => {
    switch (trend) {
      case 'up': return <TrendingUpOutlined sx={{ color: 'var(--color-success)' }} />;
      case 'down': return <TrendingDownOutlined sx={{ color: 'var(--color-error)' }} />;
      default: return <TrendingFlatOutlined sx={{ color: 'var(--color-text-secondary)' }} />;
    }
  };

  const getPredictionColor = (trend, isRisk = false) => {
    if (isRisk) {
      return trend === 'down' ? 'var(--color-success)' : 'var(--color-warning)';
    }
    return trend === 'up' ? 'var(--color-success)' : 'var(--color-error)';
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'var(--color-success)';
    if (confidence >= 60) return 'var(--color-warning)';
    return 'var(--color-error)';
  };

  if (loading) {
    return (
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <TimelineOutlined sx={{ mr: 1, color: 'var(--color-primary)' }} />
            <Typography variant="h6" sx={{ color: 'var(--color-text-primary)' }}>
              Predictive analytics
            </Typography>
          </Box>
          <LinearProgress />
          <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)', mt: 1 }}>
            Generating AI predictions...
          </Typography>
        </CardContent>
      </Card>
    );
  }

  if (!predictions) return null;

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <TimelineOutlined sx={{ mr: 1, color: 'var(--color-primary)' }} />
          <Typography variant="h6" sx={{ color: 'var(--color-text-primary)' }}>
            Predictive analytics
          </Typography>
          <Chip 
            label={`${predictionHorizon} forecast`} 
            size="small" 
            sx={{ ml: 2, backgroundColor: 'var(--color-primary)', color: 'white' }}
          />
        </Box>

        <Grid container spacing={3}>
          {Object.entries(predictions).map(([key, prediction]) => (
            <Grid item xs={12} sm={6} key={key}>
              <Box sx={{ 
                p: 3, 
                border: '1px solid var(--color-border-primary)', 
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-background-primary)',
                height: '100%'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ color: 'var(--color-text-primary)', fontWeight: 600, textTransform: 'capitalize' }}>
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {getPredictionIcon(prediction.trend)}
                    <Chip
                      label={`${prediction.confidence}% confidence`}
                      size="small"
                      sx={{
                        backgroundColor: getConfidenceColor(prediction.confidence),
                        color: 'white',
                        fontSize: '0.7rem'
                      }}
                    />
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)' }}>
                      Current
                    </Typography>
                    <Typography variant="h5" sx={{ color: 'var(--color-text-primary)', fontWeight: 700 }}>
                      {prediction.current}%
                    </Typography>
                  </Box>
                  
                  <Box sx={{ flex: 1, textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)' }}>
                      Predicted ({prediction.timeframe})
                    </Typography>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        color: getPredictionColor(prediction.trend, key === 'injuryRisk'), 
                        fontWeight: 700 
                      }}
                    >
                      {prediction.predicted}%
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <LinearProgress
                    variant="determinate"
                    value={prediction.predicted}
                    sx={{
                      height: 8,
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--color-background-secondary)',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: getPredictionColor(prediction.trend, key === 'injuryRisk'),
                        borderRadius: 'var(--radius-sm)'
                      }
                    }}
                  />
                </Box>

                <Box>
                  <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)', mb: 1, fontWeight: 500 }}>
                    Key factors:
                  </Typography>
                  {prediction.factors.map((factor, index) => (
                    <Chip
                      key={index}
                      label={factor}
                      size="small"
                      variant="outlined"
                      sx={{
                        mr: 0.5,
                        mb: 0.5,
                        fontSize: '0.7rem',
                        borderColor: 'var(--color-border-primary)',
                        color: 'var(--color-text-secondary)'
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Alert 
          severity="info" 
          sx={{ mt: 3 }}
          icon={<PsychologyOutlined />}
        >
          <Typography variant="body2" sx={{ color: 'var(--color-text-primary)' }}>
            <strong>AI recommendation:</strong> Based on current trends and historical data, 
            this athlete shows strong potential for advancement. Focus on technical skill 
            development and mental resilience training to maximize predicted outcomes.
          </Typography>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default PredictiveAnalytics;

