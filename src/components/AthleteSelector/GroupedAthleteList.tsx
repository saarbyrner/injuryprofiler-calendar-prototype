import React, { useMemo, useState } from 'react';
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Divider,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { CompactAthleteCard } from './CompactAthleteCard';
import { Athlete, GroupBy, SortOrder } from './types';

interface GroupedAthleteListProps {
  athletes: Athlete[];
  selectedAthletes: string[];
  onSelectionChange: (athleteId: string, selected: boolean) => void;
  onBatchSelectionChange?: (athleteIds: string[], selected: boolean) => void;
  groupBy: GroupBy;
  order: SortOrder;
  showOnlySelected?: boolean;
}

interface AthleteGroup {
  id: string;
  name: string;
  athletes: Athlete[];
  aggregateAthlete?: Athlete;
}

export const GroupedAthleteList: React.FC<GroupedAthleteListProps> = ({
  athletes,
  selectedAthletes,
  onSelectionChange,
  onBatchSelectionChange,
  groupBy,
  order,
  showOnlySelected = false,
}) => {
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['Goalkeeper', 'Defender', 'Midfielder', 'Forward']); // Default expanded

  const handleToggle = (athleteId: string) => {
    const isSelected = selectedAthletes.includes(athleteId);
    onSelectionChange(athleteId, !isSelected);
  };

  const handleSelectAll = (groupAthletes: Athlete[]) => {
    const allSelected = groupAthletes.every(athlete => 
      selectedAthletes.includes(athlete.id)
    );
    
    const athleteIds = groupAthletes.map(athlete => athlete.id);
    const shouldSelect = !allSelected;
    
    if (onBatchSelectionChange) {
      // Use batch selection if available
      onBatchSelectionChange(athleteIds, shouldSelect);
    } else {
      // Fallback to individual selection
      athleteIds.forEach(athleteId => {
        onSelectionChange(athleteId, shouldSelect);
      });
    }
  };

  const handleAccordionChange = (groupId: string) => (
    _event: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    setExpandedGroups(prev => 
      isExpanded 
        ? [...prev, groupId]
        : prev.filter(id => id !== groupId)
    );
  };

  // Compute display list with optional selected-only filter
  const displayAthletes = useMemo(() => {
    return showOnlySelected
      ? athletes.filter(a => selectedAthletes.includes(a.id))
      : athletes;
  }, [athletes, selectedAthletes, showOnlySelected]);

  // Helper function to map positions to high-level position groups
  const getPositionGroup = (position: string): string => {
    const normalizedPosition = position.toLowerCase().trim();
    switch (normalizedPosition) {
      case 'goalkeeper':
        return 'Goalkeeper';
      case 'defender':
        return 'Defender';
      case 'midfielder':
      case 'winger':
        return 'Midfielder';
      case 'striker':
      case 'centre forward':
      case 'center forward': // Handle both spellings
        return 'Forward';
      default:
        return position; // Fallback for any unknown positions
    }
  };

  // Group athletes based on groupBy
  const athleteGroups = useMemo(() => {
    const groups: Record<string, Athlete[]> = {};
    displayAthletes.forEach((athlete) => {
      let key: string;
      if (groupBy === 'position') {
        key = getPositionGroup(athlete.position);
      } else if (groupBy === 'status') {
        key = athlete.status;
      } else {
        key = athlete.ageGroup;
      }
      if (!groups[key]) groups[key] = [];
      groups[key].push(athlete);
    });

    // Sort within groups by name according to order
    const sortedGroups: AthleteGroup[] = Object.entries(groups).map(([key, groupAthletes]) => {
      const within = [...groupAthletes].sort((a, b) => a.name.localeCompare(b.name));
      if (order === 'desc') within.reverse();

      const aggregateAthlete: Athlete | undefined = groupBy === 'position' ? {
        id: `${key}-aggregate`,
        name: key,
        position: 'Aggregate',
        ageGroup: within[0]?.ageGroup || 'U23',
        status: 'available',
        avatar: '',
      } : undefined;

      return {
        id: key,
        name: key,
        athletes: within,
        aggregateAthlete,
      };
    });

    // Keep group headers in a natural order: for squads by age (U23,U21..), for positions by custom order, otherwise A→Z
    const byAge = (name: string) => {
      const m = name.match(/U(\d+)/);
      return m ? parseInt(m[1], 10) : 0;
    };
    
    const positionOrder = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'];
    const getPositionOrder = (name: string) => {
      const index = positionOrder.indexOf(name);
      return index >= 0 ? index : 999; // Unknown positions go to the end
    };
    
    sortedGroups.sort((a, b) => {
      if (groupBy === 'squad') return byAge(b.name) - byAge(a.name);
      if (groupBy === 'position') return getPositionOrder(a.name) - getPositionOrder(b.name);
      return a.name.localeCompare(b.name);
    });

    return sortedGroups;
  }, [displayAthletes, groupBy, order]);

  return (
    <Box sx={{ width: '100%' }}>
      {athleteGroups.map((group, index) => {
        const isExpanded = expandedGroups.includes(group.id);
        const groupSelectedCount = group.athletes.filter(athlete =>
          selectedAthletes.includes(athlete.id)
        ).length;
        const isGroupAllSelected = group.athletes.every(athlete =>
          selectedAthletes.includes(athlete.id)
        );

        return (
          <Box key={group.id}>
            <Accordion
              expanded={isExpanded}
              onChange={handleAccordionChange(group.id)}
              elevation={0}
              sx={{
                '&:before': {
                  display: 'none',
                },
                '& .MuiAccordionSummary-root': {
                  minHeight: 48,
                  px: 2,
                  py: 0,
                  '&.Mui-expanded': {
                    minHeight: 48,
                  },
                },
                '& .MuiAccordionDetails-root': {
                  p: 0,
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  flexDirection: 'row-reverse',
                  '& .MuiAccordionSummary-expandIconWrapper': {
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                    mr: 1,
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: '"Open Sans", sans-serif',
                      fontSize: '1rem',
                      fontWeight: 400,
                      color: 'text.primary',
                    }}
                  >
                    {group.name}
                    {groupSelectedCount > 0 && (
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: 'text.secondary', ml: 0.5 }}
                      >
                        ({groupSelectedCount})
                      </Typography>
                    )}
                  </Typography>
                  
                  <Button
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectAll(group.athletes);
                    }}
                    sx={{
                      fontFamily: '"Open Sans", sans-serif',
                      fontSize: '0.875rem',
                      fontWeight: 400,
                      color: 'text.primary',
                      textTransform: 'none',
                      minWidth: 'auto',
                      p: 0,
                      '&:hover': {
                        backgroundColor: 'transparent',
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {isGroupAllSelected ? 'Deselect all' : 'Select all'}
                  </Button>
                </Box>
              </AccordionSummary>

              <AccordionDetails>
                <Box>
                  {/* Show aggregate option for position groups */}
                  {group.aggregateAthlete && (
                    <CompactAthleteCard
                      athlete={group.aggregateAthlete}
                      isSelected={selectedAthletes.includes(group.aggregateAthlete.id)}
                      onToggle={handleToggle}
                      showGroupIcon={true}
                    />
                  )}

                  {/* Position subheader for position grouping */}
                  {groupBy === 'position' && (
                    <Box sx={{ px: 2, py: 0 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: '"Open Sans", sans-serif',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          color: 'text.primary',
                        }}
                      >
                        {group.name}
                      </Typography>
                    </Box>
                  )}

                  {/* Individual athletes */}
                  {group.athletes.map((athlete) => (
                    <CompactAthleteCard
                      key={athlete.id}
                      athlete={athlete}
                      isSelected={selectedAthletes.includes(athlete.id)}
                      onToggle={handleToggle}
                    />
                  ))}
                </Box>
              </AccordionDetails>
            </Accordion>

            {/* Divider between groups */}
            {index < athleteGroups.length - 1 && (
              <Divider sx={{ mx: 2 }} />
            )}
          </Box>
        );
      })}
    </Box>
  );
};
