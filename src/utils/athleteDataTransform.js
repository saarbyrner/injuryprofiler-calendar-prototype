/**
 * Transform athlete data from the current format to the new AthleteSelector format
 */

export const transformAthleteData = (athletes) => {
  return athletes.map(athlete => ({
    id: athlete.id.toString(),
    name: `${athlete.firstname} ${athlete.lastname}`,
    position: athlete.position,
    ageGroup: getAgeGroup(athlete.age),
    avatar: athlete.avatar || undefined,
    status: mapAvailabilityStatus(athlete.availability_status),
    dateOfBirth: athlete.date_of_birth,
    squadNumber: athlete.squad_number || undefined,
    leagueId: athlete.league_id || undefined,
    labels: getAthleteLabels(athlete),
    isSelected: false,
  }));
};

/**
 * Map age to age group
 */
const getAgeGroup = (age) => {
  if (age <= 17) return 'U17';
  if (age <= 19) return 'U19';
  if (age <= 21) return 'U21';
  if (age <= 23) return 'U23';
  return 'Senior';
};

/**
 * Map availability status to component status
 */
const mapAvailabilityStatus = (status) => {
  switch (status?.toLowerCase()) {
    case 'available':
      return 'available';
    case 'injured':
      return 'injured';
    case 'unavailable':
    default:
      return 'unavailable';
  }
};

/**
 * Generate labels for athlete
 */
const getAthleteLabels = (athlete) => {
  const labels = [];
  
  if (athlete.squad_name) {
    labels.push(athlete.squad_name);
  }
  
  if (athlete.position_group) {
    labels.push(athlete.position_group);
  }
  
  if (athlete.fitness_level) {
    labels.push(athlete.fitness_level);
  }
  
  return labels;
};
