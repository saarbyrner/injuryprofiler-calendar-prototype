import React from 'react';
import { Box, Typography } from '@mui/material';

interface ClubsListProps {
  clubs: string[];
}

export const ClubsList: React.FC<ClubsListProps> = ({ clubs }) => {
  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="body2" color="text.secondary">
        Clubs functionality coming soon
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
        {clubs.length} clubs available
      </Typography>
    </Box>
  );
};
