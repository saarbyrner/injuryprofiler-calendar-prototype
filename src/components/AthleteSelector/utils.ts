import { Athlete, AgeGroup, Position, FilterOptions } from './types';

export const groupAthletesByAgeGroup = (athletes: Athlete[]): AgeGroup[] => {
  const grouped = athletes.reduce((acc, athlete) => {
    if (!acc[athlete.ageGroup]) {
      acc[athlete.ageGroup] = {
        id: athlete.ageGroup,
        name: athlete.ageGroup,
        athletes: [],
        isExpanded: false,
      };
    }
    acc[athlete.ageGroup].athletes.push(athlete);
    return acc;
  }, {} as Record<string, AgeGroup>);

  return Object.values(grouped).sort((a, b) => {
    // Sort by age group (U23, U21, U19, etc.)
    const aNum = parseInt(a.name.replace('U', ''));
    const bNum = parseInt(b.name.replace('U', ''));
    return bNum - aNum; // Descending order (U23 first)
  });
};

export const groupAthletesByPosition = (athletes: Athlete[]): Position[] => {
  const grouped = athletes.reduce((acc, athlete) => {
    if (!acc[athlete.position]) {
      acc[athlete.position] = {
        id: athlete.position,
        name: athlete.position,
        athletes: [],
      };
    }
    acc[athlete.position].athletes.push(athlete);
    return acc;
  }, {} as Record<string, Position>);

  return Object.values(grouped).sort((a, b) => a.name.localeCompare(b.name));
};

export const filterAthletes = (athletes: Athlete[], filters: FilterOptions): Athlete[] => {
  return athletes.filter(athlete => {
    // Squad filter - this is the main filter that determines which athletes to show
    if (filters.selectedSquad) {
      switch (filters.selectedSquad) {
        case 'current':
          // Show only currently active squads (U21, U19, U17)
          if (!['U21', 'U19', 'U17'].includes(athlete.ageGroup)) {
            return false;
          }
          break;
        case 'free-agents':
          // Show empty listing for now - return no athletes
          return false;
        case 'historical':
          // Show historical athletes (not in current squads)
          if (['U21', 'U19', 'U17'].includes(athlete.ageGroup)) {
            return false;
          }
          break;
        case 'all':
        default:
          // Show all athletes
          break;
      }
    }

    // Search term filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      if (!athlete.name.toLowerCase().includes(searchLower) &&
          !athlete.position.toLowerCase().includes(searchLower) &&
          !athlete.ageGroup.toLowerCase().includes(searchLower)) {
        return false;
      }
    }

    // Age group filter
    if (filters.selectedAgeGroups.length > 0 && 
        !filters.selectedAgeGroups.includes(athlete.ageGroup)) {
      return false;
    }

    // Position filter
    if (filters.selectedPositions.length > 0 && 
        !filters.selectedPositions.includes(athlete.position)) {
      return false;
    }

    return true;
  });
};

export const sortAthletes = (athletes: Athlete[], sortBy: string, sortOrder: string): Athlete[] => {
  return [...athletes].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'position':
        comparison = a.position.localeCompare(b.position);
        break;
      case 'ageGroup': {
        const aNum = parseInt(a.ageGroup.replace('U', ''));
        const bNum = parseInt(b.ageGroup.replace('U', ''));
        comparison = bNum - aNum;
        break;
      }
      default:
        comparison = 0;
    }
    
    return sortOrder === 'desc' ? -comparison : comparison;
  });
};

export const getStatusColor = (status: Athlete['status']): 'success' | 'default' | 'error' | 'primary' | 'secondary' | 'info' | 'warning' => {
  switch (status) {
    case 'available':
      return 'success';
    case 'unavailable':
      return 'default';
    case 'injured':
      return 'error';
    default:
      return 'default';
  }
};

export const getStatusLabel = (status: Athlete['status']) => {
  switch (status) {
    case 'available':
      return 'Available';
    case 'unavailable':
      return 'Unavailable';
    case 'injured':
      return 'Injured';
    default:
      return 'Unknown';
  }
};
