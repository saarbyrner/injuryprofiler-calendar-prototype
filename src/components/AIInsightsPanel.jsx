import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Chip, 
  LinearProgress, 
  IconButton,
  Collapse,
  Alert,
  Button
} from '@mui/material';
import { 
  TrendingUpOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  InfoOutlined,
  ExpandMoreOutlined,
  ExpandLessOutlined,
  PsychologyOutlined
} from '@mui/icons-material';
import '../styles/design-tokens.css';

/**
 * AI Insights Panel for Youth Development
 * Provides AI-powered insights and recommendations for athlete development
 */
const AIInsightsPanel = ({ athleteId, athleteData, onAction }) => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    // Simulate AI analysis
    generateAIInsights(athleteData);
  }, [athleteData]);

  const generateAIInsights = (data) => {
    setLoading(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      const aiInsights = [
        {
          id: 1,
          type: 'development',
          priority: 'high',
          title: 'Growth potential identified',
          description: 'AI analysis shows strong potential for position advancement within 6-12 months',
          confidence: 87,
          action: 'Schedule development assessment',
          icon: <TrendingUpOutlined />,
          color: 'success'
        },
        {
          id: 2,
          type: 'risk',
          priority: 'medium',
          title: 'Injury risk factor',
          description: 'Training load patterns suggest increased injury risk. Recommend load management',
          confidence: 73,
          action: 'Adjust training program',
          icon: <WarningOutlined />,
          color: 'warning'
        },
        {
          id: 3,
          type: 'performance',
          priority: 'high',
          title: 'Performance optimization',
          description: 'Wellbeing scores indicate optimal conditions for skill development focus',
          confidence: 91,
          action: 'Focus on technical skills',
          icon: <CheckCircleOutlined />,
          color: 'info'
        },
        {
          id: 4,
          type: 'development',
          priority: 'low',
          title: 'Long-term development',
          description: 'Consistent performance trends suggest readiness for advanced training modules',
          confidence: 65,
          action: 'Review progression plan',
          icon: <PsychologyOutlined />,
          color: 'info'
        }
      ];

      setInsights(aiInsights);
      setLoading(false);
    }, 1500);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'var(--color-error)';
      case 'medium': return 'var(--color-warning)';
      case 'low': return 'var(--color-info)';
      default: return 'var(--color-text-secondary)';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'development': return 'var(--color-success)';
      case 'risk': return 'var(--color-error)';
      case 'performance': return 'var(--color-info)';
      default: return 'var(--color-text-secondary)';
    }
  };

  const handleAction = (insight) => {
    if (onAction) {
      onAction(insight);
    }
  };

  if (loading) {
    return (
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <PsychologyOutlined sx={{ mr: 1, color: 'var(--color-primary)' }} />
            <Typography variant="h6" sx={{ color: 'var(--color-text-primary)' }}>
              AI insights
            </Typography>
          </Box>
          <LinearProgress sx={{ mb: 2 }} />
          <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)' }}>
            Analyzing athlete data...
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PsychologyOutlined sx={{ mr: 1, color: 'var(--color-primary)' }} />
            <Typography variant="h6" sx={{ color: 'var(--color-text-primary)' }}>
              AI insights
            </Typography>
            <Chip 
              label={`${insights.length} insights`} 
              size="small" 
              sx={{ ml: 1, backgroundColor: 'var(--color-primary)', color: 'white' }}
            />
          </Box>
          <IconButton 
            onClick={() => setExpanded(!expanded)}
            size="small"
          >
            {expanded ? <ExpandLessOutlined /> : <ExpandMoreOutlined />}
          </IconButton>
        </Box>

        <Collapse in={expanded}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {insights.map((insight) => (
              <Alert
                key={insight.id}
                severity={insight.color}
                icon={insight.icon}
                sx={{
                  '& .MuiAlert-message': {
                    width: '100%'
                  }
                }}
                action={
                  <Button
                    size="small"
                    onClick={() => handleAction(insight)}
                    sx={{ 
                      textTransform: 'none',
                      fontSize: '0.75rem',
                      minWidth: 'auto',
                      px: 1
                    }}
                  >
                    {insight.action}
                  </Button>
                }
              >
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mr: 1 }}>
                      {insight.title}
                    </Typography>
                    <Chip
                      label={insight.priority}
                      size="small"
                      sx={{
                        backgroundColor: getPriorityColor(insight.priority),
                        color: 'white',
                        fontSize: '0.7rem',
                        height: '18px'
                      }}
                    />
                    <Chip
                      label={`${insight.confidence}% confidence`}
                      size="small"
                      variant="outlined"
                      sx={{
                        ml: 1,
                        fontSize: '0.7rem',
                        height: '18px',
                        borderColor: getTypeColor(insight.type),
                        color: getTypeColor(insight.type)
                      }}
                    />
                  </Box>
                  <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)' }}>
                    {insight.description}
                  </Typography>
                </Box>
              </Alert>
            ))}
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default AIInsightsPanel;

