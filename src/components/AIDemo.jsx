import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button,
  Grid,
  Chip,
  Alert
} from '@mui/material';
import { 
  PsychologyOutlined,
  TrendingUpOutlined,
  AssessmentOutlined,
  TimelineOutlined
} from '@mui/icons-material';
import { AIDashboard, AIInsightsPanel, DevelopmentMetrics, PredictiveAnalytics } from './index';
import athletesData from '../data/athletes.json';
import '../styles/design-tokens.css';

/**
 * AI Demo Component
 * Showcases all AI features with sample data
 */
const AIDemo = () => {
  const [selectedAthlete, setSelectedAthlete] = useState(athletesData[0]);
  const [activeDemo, setActiveDemo] = useState('dashboard');

  const handleAIAction = (action) => {
    console.log('AI action triggered:', action);
  };

  const demoOptions = [
    { id: 'dashboard', label: 'Full AI dashboard', icon: <PsychologyOutlined /> },
    { id: 'insights', label: 'AI insights panel', icon: <TrendingUpOutlined /> },
    { id: 'metrics', label: 'Development metrics', icon: <AssessmentOutlined /> },
    { id: 'predictions', label: 'Predictive analytics', icon: <TimelineOutlined /> }
  ];

  const renderDemo = () => {
    switch (activeDemo) {
      case 'dashboard':
        return (
          <AIDashboard 
            athleteData={selectedAthlete} 
            onAction={handleAIAction}
          />
        );
      case 'insights':
        return (
          <AIInsightsPanel 
            athleteData={selectedAthlete} 
            onAction={handleAIAction}
          />
        );
      case 'metrics':
        return (
          <DevelopmentMetrics 
            athleteData={selectedAthlete} 
            timeRange="6months"
          />
        );
      case 'predictions':
        return (
          <PredictiveAnalytics 
            athleteData={selectedAthlete} 
            predictionHorizon="12months"
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ color: 'var(--color-text-primary)', mb: 2, fontWeight: 600 }}>
          AI-powered youth development
        </Typography>
        <Typography variant="body1" sx={{ color: 'var(--color-text-secondary)', mb: 3 }}>
          Experience the future of athlete development with AI-powered insights, predictions, and recommendations.
        </Typography>
        
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            <strong>Demo mode:</strong> This showcases AI features using simulated data. 
            In production, these components would connect to real AI models and live data streams.
          </Typography>
        </Alert>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ color: 'var(--color-text-primary)', mb: 2 }}>
                Demo options
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
                {demoOptions.map((option) => (
                  <Button
                    key={option.id}
                    variant={activeDemo === option.id ? 'contained' : 'text'}
                    onClick={() => setActiveDemo(option.id)}
                    startIcon={option.icon}
                    sx={{
                      justifyContent: 'flex-start',
                      textTransform: 'none',
                      fontWeight: activeDemo === option.id ? 600 : 400
                    }}
                  >
                    {option.label}
                  </Button>
                ))}
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ color: 'var(--color-text-primary)', mb: 1 }}>
                  Sample athlete
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {athletesData.slice(0, 3).map((athlete) => (
                    <Button
                      key={athlete.id}
                      variant={selectedAthlete.id === athlete.id ? 'contained' : 'outlined'}
                      onClick={() => setSelectedAthlete(athlete)}
                      size="small"
                      sx={{
                        textTransform: 'none',
                        justifyContent: 'flex-start',
                        fontSize: '0.8rem'
                      }}
                    >
                      {athlete.firstname} {athlete.lastname}
                    </Button>
                  ))}
                </Box>
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ color: 'var(--color-text-primary)', mb: 1 }}>
                  Current selection
                </Typography>
                <Box sx={{ p: 2, backgroundColor: 'var(--color-background-secondary)', borderRadius: 'var(--radius-sm)' }}>
                  <Typography variant="body2" sx={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>
                    {selectedAthlete.firstname} {selectedAthlete.lastname}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'var(--color-text-secondary)' }}>
                    {selectedAthlete.position} • {selectedAthlete.squad_name}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    <Chip 
                      label={selectedAthlete.availability_status} 
                      size="small" 
                      color={selectedAthlete.availability_status === 'Available' ? 'success' : 'error'}
                    />
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={9}>
          {renderDemo()}
        </Grid>
      </Grid>
    </Box>
  );
};

export default AIDemo;

