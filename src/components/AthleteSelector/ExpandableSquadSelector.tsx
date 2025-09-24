import React, { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  MenuList,
  MenuItem,
  Typography,
  Collapse,
  useTheme,
  useMediaQuery,
  Divider,
  ClickAwayListener,
} from '@mui/material';
import {
  ArrowDropUp as ArrowDropUpIcon,
  ArrowDropDown as ArrowDropDownIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';

interface SquadOption {
  id: string;
  label: string;
  count?: number;
  hasSubmenu?: boolean;
  isSpecial?: boolean; // For special styling like Selected option
}

interface ExpandableSquadSelectorProps {
  selectedSquad: string;
  onSquadChange: (squad: string) => void;
  selectedCount?: number;
  compact?: boolean;
}

// Prototype flag to show Selected (N) as a separate button below dropdown
// Set to false to quickly revert to current behavior
const SHOW_SELECTED_BELOW_DROPDOWN = true;

const squadOptions: SquadOption[] = [
  { id: 'squads', label: 'Squads' },
  { id: 'clubs', label: 'Clubs' },
  { id: 'free-agents', label: 'Free Agents' },
  { id: 'historical', label: 'Historical Athletes' },
  { id: 'selected', label: 'Selected', isSpecial: true },
];

export const ExpandableSquadSelector: React.FC<ExpandableSquadSelectorProps> = ({
  selectedSquad,
  onSquadChange,
  selectedCount = 0,
  compact = false,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleOptionSelect = (optionId: string) => {
    onSquadChange(optionId);
    setIsExpanded(false);
  };

  const getSelectedLabel = () => {
    const option = squadOptions.find(opt => opt.id === selectedSquad);
    return option?.label || 'Squads';
  };

  const getDisplayLabel = (option: SquadOption) => {
    if (option.id === 'selected') {
      return `${option.label} (${selectedCount})`;
    }
    return option.label;
  };

  return (
    <ClickAwayListener onClickAway={() => isExpanded && setIsExpanded(false)}>
      <Box sx={{ position: 'relative', width: '100%' }}>
      {/* Toggle Button */}
      <Button
        onClick={handleToggle}
        variant="text"
        endIcon={isExpanded ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        sx={{
          width: '100%',
          justifyContent: 'space-between',
          textTransform: 'none',
          fontFamily: '"Open Sans", sans-serif',
          fontSize: compact ? '0.875rem' : '1rem',
          fontWeight: 400,
          color: 'text.primary',
          px: compact ? 1.5 : 2,
          py: compact ? 1 : 1.5,
          minHeight: compact ? 36 : 44,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          backgroundColor: 'background.paper',
          '&:hover': {
            backgroundColor: 'action.hover',
            borderColor: 'var(--color-primary)',
          },
        }}
      >
        {getSelectedLabel()}
      </Button>

      {/* Expandable Menu */}
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <Paper
          elevation={8}
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            minWidth: '100%',
            width: 'max-content',
            zIndex: theme.zIndex.modal,
            maxHeight: isMobile ? '70vh' : '400px',
            overflowY: 'auto',
            mt: 0.5,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
          }}
        >
          <MenuList
            sx={{
              py: 1,
              minWidth: '200px',
              '& .MuiMenuItem-root': {
                fontFamily: '"Open Sans", sans-serif',
                fontSize: '1rem',
                fontWeight: 400,
                px: 2,
                py: 1.5,
                minHeight: 'auto',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              },
            }}
          >
            {(SHOW_SELECTED_BELOW_DROPDOWN ? squadOptions.filter(o => o.id !== 'selected') : squadOptions).map((option) => (
              <React.Fragment key={option.id}>
                {option.isSpecial && (
                  <Divider sx={{ my: 0.5 }} />
                )}
                <MenuItem
                  selected={selectedSquad === option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  sx={{
                    backgroundColor: selectedSquad === option.id 
                      ? 'action.selected' 
                      : 'transparent',
                    '&:hover': {
                      backgroundColor: selectedSquad === option.id 
                        ? 'action.selected' 
                        : 'action.hover',
                    },
                    '&.Mui-selected': {
                      backgroundColor: 'action.selected',
                      '&:hover': {
                        backgroundColor: 'action.selected',
                      },
                    },
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    // Special styling for Selected option
                    ...(option.isSpecial && {
                      fontWeight: 400,
                      color: 'var(--color-primary)',
                      '&.Mui-selected': {
                        backgroundColor: 'var(--color-primary-light)',
                        color: 'var(--color-primary)',
                        '&:hover': {
                          backgroundColor: 'var(--color-primary-light)',
                        },
                      },
                    }),
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: '"Open Sans", sans-serif',
                      fontSize: '1rem',
                      fontWeight: 400,
                      color: option.isSpecial ? 'var(--color-primary)' : 'text.primary',
                      flexGrow: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {getDisplayLabel(option)}
                  </Typography>
                  
                  {option.hasSubmenu && (
                    <ChevronRightIcon 
                      fontSize="small" 
                      sx={{ 
                        color: 'text.secondary',
                        ml: 1,
                      }} 
                    />
                  )}
                </MenuItem>
                
                {/* Divider now shown above Selected option */}
              </React.Fragment>
            ))}
          </MenuList>
        </Paper>
      </Collapse>
    </Box>
    </ClickAwayListener>
  );
};
