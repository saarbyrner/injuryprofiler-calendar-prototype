export interface Athlete {
  id: string;
  name: string;
  position: string;
  ageGroup: string;
  avatar?: string;
  status: 'available' | 'unavailable' | 'injured';
  // Optional profile fields for hover card
  dateOfBirth?: string;
  squadNumber?: string | number;
  leagueId?: string;
  labels?: string[];
  isSelected?: boolean;
  /** Optional associated club (for clubs x squads selection) */
  club?: string;
}

export interface AgeGroup {
  id: string;
  name: string;
  athletes: Athlete[];
  isExpanded?: boolean;
}

export interface Position {
  id: string;
  name: string;
  athletes: Athlete[];
}

// Shared view types
export type GroupBy = 'squad' | 'status' | 'position';
export type SortOrder = 'asc' | 'desc';

export interface FilterOptions {
  searchTerm: string;
  selectedAgeGroups: string[];
  selectedPositions: string[];
  selectedSquad: string;
  sortBy: 'name' | 'position' | 'ageGroup';
  sortOrder: 'asc' | 'desc';
}

export interface AthleteSelectorProps {
  athletes: Athlete[];
  selectedAthletes?: string[];
  onSelectionChange: (selectedIds: string[]) => void;
  onClose?: () => void;
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  maxHeight?: number | string;
  variant?: 'drawer' | 'dropdown';
  loading?: boolean;
  error?: string;
}

export interface AthleteSelectorContentProps extends Omit<AthleteSelectorProps, 'variant'> {
  compact?: boolean;
}
