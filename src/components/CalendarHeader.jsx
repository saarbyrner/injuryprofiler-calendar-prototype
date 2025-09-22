import React from 'react';
import { Box, Typography, Button, IconButton, Badge } from '@mui/material';
import { Add, ArrowDropDown, ChevronLeft, ChevronRight, FilterList } from '@mui/icons-material';

const CalendarHeader = ({ currentView, onViewChange, onAddEvent, onToggleFilters, showFilters, onNavigate }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 24px',
        backgroundColor: '#ffffff',
        minHeight: '64px',
      }}
    >
      {/* Left Section - Filters and Navigation */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* Show/Hide Filters Button */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            onClick={onToggleFilters}
            sx={{
              color: '#666666',
              padding: '8px 12px',
              textTransform: 'none',
              fontWeight: 400,
              fontSize: '14px',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}
            startIcon={<FilterList sx={{ fontSize: '18px' }} />}
            endIcon={
              <Badge
                badgeContent={2}
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: '#666666',
                    color: 'white',
                    fontSize: '10px',
                    minWidth: '16px',
                    height: '16px',
                    right: '-8px',
                    top: '2px',
                  },
                }}
              />
            }
          >
            Show Filters
          </Button>
        </Box>

        {/* Navigation Controls */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            onClick={() => onNavigate && onNavigate('prev')}
            sx={{
              color: '#666666',
              padding: '8px',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}
          >
            <ChevronLeft />
          </IconButton>
          
          <IconButton
            onClick={() => onNavigate && onNavigate('next')}
            sx={{
              color: '#666666',
              padding: '8px',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}
          >
            <ChevronRight />
          </IconButton>

          <Button
            onClick={() => onNavigate && onNavigate('today')}
            sx={{
              color: '#666666',
              padding: '8px 12px',
              textTransform: 'none',
              fontWeight: 400,
              fontSize: '14px',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}
          >
            Today
          </Button>
        </Box>
      </Box>

      {/* Center Section - September 2025 Title */}
      <Typography
        sx={{
          color: '#333333',
          fontSize: '20px',
          fontWeight: 600,
          textAlign: 'center',
        }}
      >
        September 2025
      </Typography>

      {/* Right Section - Month and Add Buttons */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          sx={{
            color: '#666666',
            padding: '8px 12px',
            textTransform: 'none',
            fontWeight: 400,
            fontSize: '14px',
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
          endIcon={<ArrowDropDown sx={{ fontSize: '16px' }} />}
        >
          Month
        </Button>

        <Button
          sx={{
            backgroundColor: '#333333',
            color: 'white',
            padding: '8px 12px',
            textTransform: 'none',
            fontWeight: 400,
            fontSize: '14px',
            '&:hover': {
              backgroundColor: '#555555',
            },
          }}
          startIcon={<Add sx={{ fontSize: '16px' }} />}
          endIcon={<ArrowDropDown sx={{ fontSize: '16px' }} />}
          onClick={onAddEvent}
        >
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default CalendarHeader;
