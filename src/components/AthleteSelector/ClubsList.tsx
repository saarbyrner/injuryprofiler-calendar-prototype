import React, { useState, useCallback, useMemo } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  Checkbox,
  IconButton,
  Collapse,
  Divider,
  Tooltip,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

interface ClubsListProps {
  /** Array of club names */
  clubs: string[];
  /** Optional squads provider. If not supplied default demo squads used */
  getSquadsForClub?: (club: string) => string[];
  /** Fired when club selection changes (entire club toggled) */
  onClubSelectionChange?: (selectedClubs: string[]) => void;
  /** Fired when a squad selection changes */
  onSquadSelectionChange?: (club: string, selectedSquads: string[]) => void;
  /** Optional externally controlled selected clubs */
  valueClubs?: string[];
  /** Optional externally controlled selected squads mapping */
  valueSquads?: Record<string, string[]>;
  /** If true component is read only */
  readOnly?: boolean;
  /** All athletes (for deriving selections). Not required; only used when onAthleteSelectionsChange provided */
  athletes?: { id: string; ageGroup: string; club?: string }[];
  /** Current selected athlete IDs (for merging incremental changes) */
  selectedAthletes?: string[];
  /** Callback to push updated athlete selections upward */
  onAthleteSelectionsChange?: (nextSelected: string[]) => void;
}

// Default demo squads repeated for each club (simple mock for prototype)
const DEFAULT_SQUADS = ['1st Team', 'U21', 'U19', 'U18', 'U17'];

/**
 * ClubsList implements the "Clubs x Squads" accordion style multi-select described in issue #3.
 * - Each club row has a checkbox (multi-select) and an expand arrow.
 * - Expanding reveals that club's squads, each with its own checkbox (multi-select).
 * - Selecting a club selects (and keeps in sync) all its squads by default. Partial selection puts club in indeterminate state.
 * - All state is handled internally unless controlled values are provided.
 */
export const ClubsList: React.FC<ClubsListProps> = ({
  clubs,
  getSquadsForClub,
  onClubSelectionChange,
  onSquadSelectionChange,
  valueClubs,
  valueSquads,
  readOnly = false,
  athletes = [],
  selectedAthletes = [],
  onAthleteSelectionsChange,
}) => {
  // Local (uncontrolled) state fallbacks
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [internalSelectedClubs, setInternalSelectedClubs] = useState<Set<string>>(new Set());
  const [internalSelectedSquads, setInternalSelectedSquads] = useState<Record<string, Set<string>>>({});

  const selectedClubs = useMemo(() => new Set(valueClubs ?? Array.from(internalSelectedClubs)), [valueClubs, internalSelectedClubs]);
  const selectedSquads = useMemo(() => {
    if (valueSquads) {
      const mapped: Record<string, Set<string>> = {};
      Object.entries(valueSquads).forEach(([club, list]) => {
        mapped[club] = new Set(list);
      });
      return mapped;
    }
    return internalSelectedSquads;
  }, [valueSquads, internalSelectedSquads]);

  const toggleExpand = (club: string) => {
    setExpanded(prev => ({ ...prev, [club]: !prev[club] }));
  };

  const getSquads = useCallback((club: string) => {
    return getSquadsForClub ? getSquadsForClub(club) : DEFAULT_SQUADS;
  }, [getSquadsForClub]);

  const setSelectedClubs = (next: Set<string>) => {
    if (!valueClubs) setInternalSelectedClubs(new Set(next));
    onClubSelectionChange?.(Array.from(next));
  };

  const setSelectedSquads = (club: string, next: Set<string>) => {
    if (!valueSquads) setInternalSelectedSquads(prev => ({ ...prev, [club]: new Set(next) }));
    onSquadSelectionChange?.(club, Array.from(next));
  };

  // Centralized mapping from squad label -> ageGroup(s) used in mock data.
  const squadToAgeGroup: Record<string, string> = {
    '1st Team': 'U23',
    'U21': 'U21',
    'U19': 'U19',
    'U18': 'U18',
    'U17': 'U17',
  };

  /**
   * Compute set of athlete IDs that correspond to a (club, squadSet) selection.
   */
  const deriveAthleteIdsForClubSquads = useCallback((club: string, squads: Set<string>) => {
    const ageGroups = new Set(Array.from(squads).map(s => squadToAgeGroup[s]).filter(Boolean));
    const ids = athletes
      .filter(a => a.club === club && ageGroups.has(a.ageGroup))
      .map(a => a.id);
    return new Set(ids);
  }, [athletes]);

  /**
   * Recalculate global selected athletes after any change to a single club's squads.
   * This considers every club's current squad selection and produces a fresh union.
   * If a club loses squads (deselect), athletes no longer represented are removed.
   */
  const recomputeGlobalSelection = useCallback((nextSelectedSquads: Record<string, Set<string>>) => {
    if (!onAthleteSelectionsChange) return;
    const unionIds = new Set<string>();
    Object.entries(nextSelectedSquads).forEach(([club, squadsSet]) => {
      if (squadsSet && squadsSet.size > 0) {
        const clubIds = deriveAthleteIdsForClubSquads(club, squadsSet);
        clubIds.forEach(id => unionIds.add(id));
      }
    });
    onAthleteSelectionsChange(Array.from(unionIds));
  }, [deriveAthleteIdsForClubSquads, onAthleteSelectionsChange]);

  const handleClubToggle = (club: string) => {
    if (readOnly) return;
    const next = new Set(selectedClubs);
    const squads = getSquads(club);
    const currentSquads = selectedSquads[club] ?? new Set<string>();
    const allSelected = squads.every(s => currentSquads.has(s));
    let nextSelectedSquadsState: Record<string, Set<string>> = { ...selectedSquads };
    if (next.has(club) && allSelected) {
      // Deselect club & its squads entirely
      next.delete(club);
      nextSelectedSquadsState = { ...nextSelectedSquadsState, [club]: new Set() };
      setSelectedClubs(next);
      setSelectedSquads(club, new Set());
    } else {
      // Select all squads for the club
      next.add(club);
      const fullSet = new Set(squads);
      nextSelectedSquadsState = { ...nextSelectedSquadsState, [club]: fullSet };
      setSelectedClubs(next);
      setSelectedSquads(club, fullSet);
    }
    recomputeGlobalSelection(nextSelectedSquadsState);
  };

  const handleSquadToggle = (club: string, squad: string) => {
    if (readOnly) return;
    const current = new Set(selectedSquads[club] ?? []);
    if (current.has(squad)) current.delete(squad); else current.add(squad);
    setSelectedSquads(club, current);
    const squads = getSquads(club);
    const allSelected = squads.every(s => current.has(s));
    const nextClubs = new Set(selectedClubs);
    if (allSelected) {
      nextClubs.add(club);
    } else if (current.size === 0) {
      nextClubs.delete(club);
    } else {
      // Partial selection => ensure club not fully selected (indeterminate state handled in render)
      nextClubs.delete(club);
    }
    setSelectedClubs(nextClubs);
    const nextSelectedSquadsState = { ...selectedSquads, [club]: current };
    recomputeGlobalSelection(nextSelectedSquadsState);
  };

  const isClubIndeterminate = (club: string) => {
    const squads = getSquads(club);
    const sel = selectedSquads[club];
    if (!sel || sel.size === 0) return false;
    return sel.size < squads.length;
  };

  // Removed global chips summary; container already provides a Selected chip outside this component.

  if (!clubs || clubs.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          No clubs available
        </Typography>
      </Box>
    );
  }

  // Derive a flat view of current selected squads mapping to feed select-all.
  const currentSquadsMapping = selectedSquads;
  const totalClubs = clubs.length;
  const fullySelectedClubCount = clubs.filter(club => {
    const squads = getSquads(club);
    return squads.every(s => currentSquadsMapping[club]?.has(s));
  }).length;
  const isAllSelected = totalClubs > 0 && fullySelectedClubCount === totalClubs;
  const isPartiallySelected = fullySelectedClubCount > 0 && fullySelectedClubCount < totalClubs;

  const handleSelectAllToggle = () => {
    if (readOnly) return;
    if (isAllSelected) {
      // Clear everything
      const clearedSquads: Record<string, Set<string>> = {};
      clubs.forEach(c => { clearedSquads[c] = new Set(); });
      setSelectedClubs(new Set());
      clubs.forEach(c => setSelectedSquads(c, new Set()));
      recomputeGlobalSelection(clearedSquads);
    } else {
      // Select all squads for every club
      const nextClubSet = new Set<string>();
      const nextSquads: Record<string, Set<string>> = {};
      clubs.forEach(c => {
        const squads = getSquads(c);
        nextClubSet.add(c);
        nextSquads[c] = new Set(squads);
        setSelectedSquads(c, nextSquads[c]);
      });
      setSelectedClubs(nextClubSet);
      recomputeGlobalSelection(nextSquads);
    }
  };

  return (
    <Box>
      <List disablePadding>
        {/* Select All Control */}
        <ListItem
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            px: 2,
            py: 1,
            borderBottom: '1px solid',
            borderColor: 'divider',
            gap: 1,
            fontFamily: 'var(--font-family-primary)',
            backgroundColor: 'var(--color-background-subtle)',
          }}
        >
          <Checkbox
            size="small"
            indeterminate={isPartiallySelected}
            checked={isAllSelected}
            onChange={handleSelectAllToggle}
            disabled={readOnly || clubs.length === 0}
            inputProps={{ 'aria-label': 'Select all clubs' }}
            sx={{
              mt: 0.25,
              p: 0.25,
              '& .MuiSvgIcon-root': { fontSize: '18px' },
              '&.MuiCheckbox-root': { color: 'var(--color-text-secondary)' },
              '&.Mui-checked': { color: 'var(--color-primary)' },
              '&.MuiCheckbox-indeterminate': { color: 'var(--color-primary)' },
              '&:hover': { backgroundColor: 'transparent' },
              '&.Mui-focusVisible': {
                outline: '2px solid var(--color-border-focus)',
                outlineOffset: 2,
              },
            }}
          />
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography
              variant="body1"
              sx={{
                fontFamily: 'var(--font-family-primary)',
                lineHeight: 1.4,
                fontSize: '0.95rem',
                color: 'var(--color-text-primary)',
                fontWeight: 400,
              }}
            >
              {`Select all (${fullySelectedClubCount} club${fullySelectedClubCount === 1 ? '' : 's'})`}
            </Typography>
          </Box>
        </ListItem>
        {clubs.map((club, idx) => {
          const squads = getSquads(club);
          const expandedClub = expanded[club] ?? false;
          const clubFullySelected = squads.every(s => selectedSquads[club]?.has(s));
          const indeterminate = !clubFullySelected && isClubIndeterminate(club);
          return (
            <React.Fragment key={club}>
              <ListItem
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  px: 2,
                  py: 1,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  gap: 1,
                  fontFamily: 'var(--font-family-primary)',
                  '&:hover': {
                    backgroundColor: 'var(--color-secondary-light)',
                  },
                }}
                secondaryAction={
                  <Tooltip title={expandedClub ? 'Collapse' : 'Expand'}>
                    <IconButton edge="end" size="small" onClick={() => toggleExpand(club)} disabled={readOnly} aria-label={expandedClub ? 'Collapse squads' : 'Expand squads'}>
                      <ExpandMoreIcon
                        fontSize="small"
                        sx={{
                          transform: expandedClub ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform var(--transition-fast)',
                          color: 'var(--color-text-secondary)',
                          '&:hover': { color: 'var(--color-text-primary)' },
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                }
              >
                <Checkbox
                  size="small"
                  indeterminate={indeterminate}
                  checked={clubFullySelected}
                  disabled={readOnly}
                  onChange={() => handleClubToggle(club)}
                  inputProps={{ 'aria-label': `${club} select all squads` }}
                  sx={{
                    mt: 0.25,
                    p: 0.25,
                    '& .MuiSvgIcon-root': {
                      fontSize: '18px',
                    },
                    '&.MuiCheckbox-root': {
                      color: 'var(--color-text-secondary)',
                    },
                    '&.Mui-checked': {
                      color: 'var(--color-primary)',
                    },
                    '&.MuiCheckbox-indeterminate': {
                      color: 'var(--color-primary)',
                    },
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                    '&.Mui-focusVisible': {
                      outline: '2px solid var(--color-border-focus)',
                      outlineOffset: 2,
                    },
                  }}
                />
                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: 'var(--font-family-primary)',
                      lineHeight: 1.4,
                      fontSize: '0.95rem',
                      color: 'var(--color-text-primary)',
                      fontWeight: 400,
                    }}
                  >
                    {club}
                  </Typography>
                  <Typography variant="caption" sx={{ fontFamily: 'var(--font-family-primary)', color: 'var(--color-text-secondary)' }}>
                    {selectedSquads[club]?.size || 0}/{squads.length} squads
                  </Typography>
                </Box>
              </ListItem>
              <Collapse in={expandedClub} timeout="auto" unmountOnExit>
                <List disablePadding sx={{ bgcolor: 'background.default' }}>
                  {squads.map(squad => {
                    const isSelected = selectedSquads[club]?.has(squad) ?? false;
                    return (
                      <ListItem
                        key={squad}
                        sx={{
                          pl: 7,
                          pr: 2,
                          py: 0.75,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          borderBottom: '1px solid',
                          borderColor: 'divider',
                          fontFamily: 'var(--font-family-primary)',
                          '&:hover': {
                            backgroundColor: 'var(--color-secondary-light)',
                          },
                        }}
                      >
                        <Checkbox
                          size="small"
                          checked={isSelected}
                          disabled={readOnly}
                          onChange={() => handleSquadToggle(club, squad)}
                          inputProps={{ 'aria-label': `${club} ${squad} squad` }}
                          sx={{
                            p: 0.25,
                            '& .MuiSvgIcon-root': { fontSize: '18px' },
                            '&.MuiCheckbox-root': { color: 'var(--color-text-secondary)' },
                            '&.Mui-checked': { color: 'var(--color-primary)' },
                            '&:hover': { backgroundColor: 'transparent' },
                            '&.Mui-focusVisible': {
                              outline: '2px solid var(--color-border-focus)',
                              outlineOffset: 2,
                            },
                          }}
                        />
                        <Typography
                          variant="body2"
                          sx={{
                            fontFamily: 'var(--font-family-primary)',
                            lineHeight: 1.3,
                            flexGrow: 1,
                            color: 'var(--color-text-primary)',
                          }}
                        >
                          {squad}
                        </Typography>
                      </ListItem>
                    );
                  })}
                </List>
              </Collapse>
              {idx === clubs.length - 1 && null}
            </React.Fragment>
          );
        })}
      </List>
    </Box>
  );
};
