import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid,
  Tabs,
  Tab,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Alert,
  Button
} from '@mui/material';
import { 
  DashboardOutlined,
  PsychologyOutlined,
  AssessmentOutlined,
  TimelineOutlined,
  SettingsOutlined,
  RefreshOutlined,
  DownloadOutlined,
  ShareOutlined
} from '@mui/icons-material';
import AIInsightsPanel from './AIInsightsPanel';
import DevelopmentMetrics from './DevelopmentMetrics';
import PredictiveAnalytics from './PredictiveAnalytics';
import '../styles/design-tokens.css';

/**
 * AI Dashboard Component
 * Comprehensive AI-powered dashboard for youth development
 */
const AIDashboard = ({ athleteData, onAction }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setLastUpdated(new Date());
      setRefreshing(false);
    }, 2000);
  };

  const handleExport = () => {
    // Simulate export functionality
    console.log('Exporting AI dashboard data...');
    handleMenuClose();
  };

  const handleShare = () => {
    // Simulate share functionality
    console.log('Sharing AI dashboard...');
    handleMenuClose();
  };

  const tabPanels = [
    {
      label: 'Overview',
      icon: <DashboardOutlined />,
      content: (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <AIInsightsPanel 
              athleteData={athleteData} 
              onAction={onAction}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DevelopmentMetrics athleteData={athleteData} />
          </Grid>
          <Grid item xs={12} md={6}>
            <PredictiveAnalytics athleteData={athleteData} />
          </Grid>
        </Grid>
      )
    },
    {
      label: 'Development',
      icon: <AssessmentOutlined />,
      content: (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <DevelopmentMetrics athleteData={athleteData} timeRange="12months" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ color: 'var(--color-text-primary)', mb: 2 }}>
                  Development trajectory
                </Typography>
                <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-background-secondary)', borderRadius: 'var(--radius-md)' }}>
                  <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)' }}>
                    Development chart would be rendered here
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ color: 'var(--color-text-primary)', mb: 2 }}>
                  Skill progression
                </Typography>
                <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-background-secondary)', borderRadius: 'var(--radius-md)' }}>
                  <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)' }}>
                    Skill progression chart would be rendered here
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )
    },
    {
      label: 'Predictions',
      icon: <TimelineOutlined />,
      content: (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <PredictiveAnalytics athleteData={athleteData} predictionHorizon="12months" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ color: 'var(--color-text-primary)', mb: 2 }}>
                  Performance forecast
                </Typography>
                <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-background-secondary)', borderRadius: 'var(--radius-md)' }}>
                  <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)' }}>
                    Performance forecast chart would be rendered here
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ color: 'var(--color-text-primary)', mb: 2 }}>
                  Risk assessment
                </Typography>
                <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-background-secondary)', borderRadius: 'var(--radius-md)' }}>
                  <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)' }}>
                    Risk assessment chart would be rendered here
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )
    }
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        mb: 3,
        p: 2,
        backgroundColor: 'var(--color-background-primary)',
        border: '1px solid var(--color-border-primary)',
        borderRadius: 'var(--radius-md)'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PsychologyOutlined sx={{ mr: 1, color: 'var(--color-primary)', fontSize: '1.5rem' }} />
          <Box>
            <Typography variant="h5" sx={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>
              AI development dashboard
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)' }}>
              Last updated: {lastUpdated.toLocaleTimeString()}
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip 
            label="AI powered" 
            size="small" 
            sx={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
          />
          <IconButton 
            onClick={handleRefresh} 
            disabled={refreshing}
            size="small"
          >
            <RefreshOutlined />
          </IconButton>
          <IconButton onClick={handleMenuOpen} size="small">
            <SettingsOutlined />
          </IconButton>
        </Box>
      </Box>

      {/* Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        sx={{
          '& .MuiPaper-root': {
            boxShadow: 'var(--shadow-lg)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border-primary)'
          }
        }}
      >
        <MenuItem onClick={handleExport}>
          <DownloadOutlined sx={{ mr: 1 }} />
          Export data
        </MenuItem>
        <MenuItem onClick={handleShare}>
          <ShareOutlined sx={{ mr: 1 }} />
          Share dashboard
        </MenuItem>
      </Menu>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'var(--color-border-primary)', mb: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
              color: 'var(--color-text-secondary)',
              '&.Mui-selected': {
                color: 'var(--color-primary)'
              }
            },
            '& .MuiTabs-indicator': {
              backgroundColor: 'var(--color-primary)'
            }
          }}
        >
          {tabPanels.map((panel, index) => (
            <Tab
              key={index}
              label={panel.label}
              icon={panel.icon}
              iconPosition="start"
            />
          ))}
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box>
        {tabPanels[activeTab].content}
      </Box>

      {/* Footer Info */}
      <Alert 
        severity="info" 
        sx={{ mt: 3 }}
        icon={<PsychologyOutlined />}
      >
        <Typography variant="body2" sx={{ color: 'var(--color-text-primary)' }}>
          <strong>AI analysis:</strong> This dashboard uses machine learning algorithms to analyze 
          athlete development patterns, predict future performance, and provide personalized 
          recommendations for youth development pathways.
        </Typography>
      </Alert>
    </Box>
  );
};

export default AIDashboard;

