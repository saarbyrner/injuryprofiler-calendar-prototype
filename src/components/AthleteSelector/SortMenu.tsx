import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { SortByAlpha as SortByAlphaIcon } from '@mui/icons-material';

export type SortOrder = 'asc' | 'desc';

interface SortMenuProps {
  order: SortOrder;
  onChange: (order: SortOrder) => void;
}

// A minimal icon toggle for sort order (A→Z vs Z→A)
export const SortMenu: React.FC<SortMenuProps> = ({ order, onChange }) => {
  const next = order === 'asc' ? 'desc' : 'asc';
  const label = order === 'asc' ? 'Order A → Z' : 'Order Z → A';

  return (
    <Tooltip title={label} arrow>
      <IconButton
        size="small"
        onClick={() => onChange(next)}
        sx={{
          color: 'text.secondary',
          '&:hover': { 
            backgroundColor: 'action.hover',
            color: 'var(--color-primary)',
          },
          transform: order === 'asc' ? 'none' : 'scaleX(-1)', // mirror for Z→A hint
          transition: 'transform 120ms ease-in-out',
        }}
        aria-label={label}
      >
        <SortByAlphaIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};
