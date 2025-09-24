import React from 'react';
import {
  Box,
  Checkbox,
  Avatar,
  Typography,
  Chip,
  useTheme,
} from '@mui/material';
import { Group as GroupIcon } from '@mui/icons-material';
import { Athlete } from './types';
import { getStatusColor, getStatusLabel } from './utils';

interface CompactAthleteCardProps {
  athlete: Athlete;
  isSelected: boolean;
  onToggle: (id: string) => void;
  showGroupIcon?: boolean;
}

export const CompactAthleteCard: React.FC<CompactAthleteCardProps> = ({
  athlete,
  isSelected,
  onToggle,
  showGroupIcon = false,
}) => {
  const theme = useTheme();

  const handleCheckboxChange = () => {
    onToggle(athlete.id);
  };

  const isAggregate = athlete.name.includes('Aggregate') || showGroupIcon;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        py: 1,
        px: 2,
        minHeight: 48,
        backgroundColor: isSelected ? 'action.selected' : 'transparent',
        '&:hover': {
          backgroundColor: isSelected ? 'action.selected' : 'action.hover',
        },
        transition: theme.transitions.create('background-color', {
          duration: theme.transitions.duration.short,
        }),
      }}
    >
      {/* Checkbox */}
      <Checkbox
        checked={isSelected}
        onChange={handleCheckboxChange}
        size="small"
        sx={{
          color: 'var(--color-primary)',
          '&.Mui-checked': {
            color: 'var(--color-primary)',
          },
          p: 0.5,
          mr: 1,
        }}
      />

      {/* Avatar, Name and Position */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ mr: 1, position: 'relative' }}>
          <Avatar
            src={isAggregate ? undefined : athlete.avatar}
            alt={athlete.name}
            sx={{
              width: 34,
              height: 34,
              bgcolor: isAggregate ? 'grey.300' : undefined,
            }}
          >
            {isAggregate && (
              <GroupIcon 
                sx={{ 
                  fontSize: 18, 
                  color: 'text.secondary' 
                }} 
              />
            )}
          </Avatar>
        </Box>

        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography
            variant="body1"
            sx={{
              fontFamily: '"Open Sans", sans-serif',
              fontSize: '1rem',
              fontWeight: 400,
              color: 'text.primary',
              lineHeight: 1.3,
              mb: 0,
            }}
          >
            {athlete.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontFamily: '"Open Sans", sans-serif',
              fontSize: '0.875rem',
              fontWeight: 400,
              color: 'text.secondary',
              lineHeight: 1.3,
            }}
          >
            {athlete.position}
          </Typography>
        </Box>
      </Box>

      {/* Status Chip */}
      {!isAggregate && (
        <Chip
          label={getStatusLabel(athlete.status)}
          color={getStatusColor(athlete.status)}
          size="small"
          variant="filled"
          sx={{
            ml: 'auto',
            minWidth: 70,
            height: 24,
            fontFamily: '"Open Sans", sans-serif',
            fontSize: '0.8125rem',
            fontWeight: 400,
            '& .MuiChip-label': {
              px: 1,
              lineHeight: '18px',
            },
          }}
        />
      )}
    </Box>
  );
};
