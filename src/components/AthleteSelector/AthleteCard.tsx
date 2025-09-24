import React from 'react';
import {
  Card,
  CardContent,
  Checkbox,
  Avatar,
  Typography,
  Chip,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Athlete } from './types';
import { getStatusColor, getStatusLabel } from './utils';

interface AthleteCardProps {
  athlete: Athlete;
  isSelected: boolean;
  onSelectionChange: (athleteId: string, selected: boolean) => void;
  compact?: boolean;
}

export const AthleteCard: React.FC<AthleteCardProps> = ({
  athlete,
  isSelected,
  onSelectionChange,
  compact = false,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isCompact = compact || isMobile;

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSelectionChange(athlete.id, event.target.checked);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        mb: 1,
        backgroundColor: isSelected ? 'action.selected' : 'transparent',
        '&:hover': {
          backgroundColor: 'action.hover',
        },
        transition: theme.transitions.create('background-color', {
          duration: theme.transitions.duration.short,
        }),
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          py: isCompact ? 1.5 : 2,
          px: isCompact ? 2 : 3,
          '&:last-child': { pb: isCompact ? 1.5 : 2 },
        }}
      >
        <Checkbox
          checked={isSelected}
          onChange={handleCheckboxChange}
          size={isCompact ? 'small' : 'medium'}
          sx={{
            color: 'var(--color-primary)',
            '&.Mui-checked': {
              color: 'var(--color-primary)',
            },
          }}
        />

        <Avatar
          src={athlete.avatar}
          alt={athlete.name}
          sx={{
            width: isCompact ? 32 : 40,
            height: isCompact ? 32 : 40,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          {athlete.name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()}
        </Avatar>

        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography
            variant={isCompact ? 'body2' : 'body1'}
            fontWeight="medium"
            sx={{
              color: 'text.primary',
              mb: 0.5,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {athlete.name}
          </Typography>
          <Typography
            variant={isCompact ? 'caption' : 'body2'}
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {athlete.position}
          </Typography>
        </Box>

        <Chip
          label={getStatusLabel(athlete.status)}
          color={getStatusColor(athlete.status)}
          size={isCompact ? 'small' : 'medium'}
          variant="filled"
          sx={{
            minWidth: isCompact ? 60 : 80,
            fontWeight: 'medium',
            fontFamily: '"Open Sans", sans-serif',
          }}
        />
      </CardContent>
    </Card>
  );
};
