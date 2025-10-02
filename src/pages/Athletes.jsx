import React, { useState } from 'react'
import { Box, Typography, Paper, Alert, Snackbar, Tabs, Tab, Grid } from '@mui/material'
import { AthleteDataGrid, AIDashboard, SquadOverviewTable } from '../components'
import athletesData from '../data/athletes.json'
import '../styles/design-tokens.css'

/**
 * Athletes page with comprehensive DataGrid
 * Displays all athletes with premium features like filtering, grouping, and export
 */
function Athletes() {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' })
  const [activeTab, setActiveTab] = useState(0)
  const [selectedAthlete, setSelectedAthlete] = useState(null)

  const handleBulkAction = (action, selectedRows) => {
    const selectedAthletes = athletesData.filter(athlete => selectedRows.includes(athlete.id))
    const count = selectedAthletes.length
    
    let message = ''
    let severity = 'info'
    
    switch (action) {
      case 'view':
        message = `Viewing ${count} selected athlete${count > 1 ? 's' : ''}`
        break
      case 'email':
        message = `Sending email to ${count} athlete${count > 1 ? 's' : ''}`
        severity = 'success'
        break
      case 'group':
        message = `Creating group from ${count} athlete${count > 1 ? 's' : ''}`
        severity = 'success'
        break
      case 'export':
        message = `Exporting ${count} athlete${count > 1 ? 's' : ''} to spreadsheet`
        severity = 'success'
        break
      case 'assessment':
        message = `Scheduling assessment for ${count} athlete${count > 1 ? 's' : ''}`
        severity = 'success'
        break
      case 'remove':
        message = `Removing ${count} athlete${count > 1 ? 's' : ''} from system`
        severity = 'warning'
        break
      default:
        message = `Unknown action: ${action}`
        severity = 'error'
    }
    
    setSnackbar({ open: true, message, severity })
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const handleAthleteSelect = (athlete) => {
    setSelectedAthlete(athlete)
    setActiveTab(1) // Switch to AI dashboard
  }

  const handleAIAction = (action) => {
    console.log('AI action:', action)
    setSnackbar({ 
      open: true, 
      message: `AI recommendation: ${action.title}`, 
      severity: 'info' 
    })
  }

  return (
    <Box sx={{ p: 3 }}>
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
          <Tab label="Squad overview" />
          <Tab label="Athletes list" />
          <Tab label="AI development dashboard" />
        </Tabs>
      </Box>

      {activeTab === 0 && (
        <SquadOverviewTable />
      )}

      {activeTab === 1 && (
        <Paper 
          elevation={0}
          sx={{
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border-primary)',
            overflow: 'hidden'
          }}
        >
          <AthleteDataGrid 
            data={athletesData}
            height={700}
            showToolbar={true}
            groupingEnabled={true}
            onBulkAction={handleBulkAction}
            onRowClick={(params) => handleAthleteSelect(params.row)}
          />
        </Paper>
      )}

      {activeTab === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {selectedAthlete ? (
              <AIDashboard 
                athleteData={selectedAthlete} 
                onAction={handleAIAction}
              />
            ) : (
              <Paper 
                elevation={0}
                sx={{
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border-primary)',
                  p: 4,
                  textAlign: 'center'
                }}
              >
                <Typography variant="h6" sx={{ color: 'var(--color-text-secondary)', mb: 2 }}>
                  Select an athlete to view AI development insights
                </Typography>
                <Typography variant="body2" sx={{ color: 'var(--color-text-muted)' }}>
                  Click on any athlete in the list to see their personalized AI dashboard
                </Typography>
              </Paper>
            )}
          </Grid>
        </Grid>
      )}
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          severity={snackbar.severity} 
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default Athletes