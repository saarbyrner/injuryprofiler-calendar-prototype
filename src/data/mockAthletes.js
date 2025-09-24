// Rich mock data for the athlete selector - matches the original Athlete-Selector repository

const baseAthletes = [
  // U23 Athletes (not in current squads filter)
  {
    id: 'adams-john',
    name: 'Adams, John',
    position: 'Striker',
    ageGroup: 'U23',
    status: 'available',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    dateOfBirth: '2003-05-17',
    squadNumber: 9,
    leagueId: 'L-12345',
    labels: ['Two-footed', 'Leadership', 'High Work-Rate'],
  },
  {
    id: 'byrne-john',
    name: 'Byrne, John',
    position: 'Striker',
    ageGroup: 'U23',
    status: 'available',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 'anderson-john',
    name: 'Anderson, John',
    position: 'Centre forward',
    ageGroup: 'U23',
    status: 'available',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 'garcia-luis',
    name: 'Garcia, Luis',
    position: 'Midfielder',
    ageGroup: 'U23',
    status: 'available',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 'rodriguez-carlos',
    name: 'Rodriguez, Carlos',
    position: 'Defender',
    ageGroup: 'U23',
    status: 'injured',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 'martinez-diego',
    name: 'Martinez, Diego',
    position: 'Goalkeeper',
    ageGroup: 'U23',
    status: 'available',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 'clarke-michael',
    name: 'Clarke, Michael',
    position: 'Midfielder',
    ageGroup: 'U23',
    status: 'injured',
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 'davis-robert',
    name: 'Davis, Robert',
    position: 'Defender',
    ageGroup: 'U23',
    status: 'unavailable',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
  },

  // U21 Athletes
  {
    id: 'evans-james',
    name: 'Evans, James',
    position: 'Goalkeeper',
    ageGroup: 'U21',
    status: 'available',
    avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 'foster-william',
    name: 'Foster, William',
    position: 'Midfielder',
    ageGroup: 'U21',
    status: 'available',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop&crop=face',
    dateOfBirth: '2004-01-10',
    squadNumber: 8,
    leagueId: 'L-67890',
    labels: ['Fit', 'Academy'],
  },
  {
    id: 'green-thomas',
    name: 'Green, Thomas',
    position: 'Winger',
    ageGroup: 'U21',
    status: 'available',
    avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 'harris-daniel',
    name: 'Harris, Daniel',
    position: 'Defender',
    ageGroup: 'U21',
    status: 'injured',
    avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150&h=150&fit=crop&crop=face',
  },

  // U19 Athletes
  {
    id: 'jackson-christopher',
    name: 'Jackson, Christopher',
    position: 'Striker',
    ageGroup: 'U19',
    status: 'available',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 'king-matthew',
    name: 'King, Matthew',
    position: 'Midfielder',
    ageGroup: 'U19',
    status: 'available',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 'lewis-anthony',
    name: 'Lewis, Anthony',
    position: 'Defender',
    ageGroup: 'U19',
    status: 'unavailable',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=face',
  },

  // U18 Athletes
  {
    id: 'martin-joshua',
    name: 'Martin, Joshua',
    position: 'Winger',
    ageGroup: 'U18',
    status: 'available',
    avatar: 'https://images.unsplash.com/photo-1558203728-00f45181dd84?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 'nelson-andrew',
    name: 'Nelson, Andrew',
    position: 'Goalkeeper',
    ageGroup: 'U18',
    status: 'available',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 'owen-ryan',
    name: 'Owen, Ryan',
    position: 'Midfielder',
    ageGroup: 'U18',
    status: 'injured',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  },

  // U17 Athletes
  {
    id: 'parker-benjamin',
    name: 'Parker, Benjamin',
    position: 'Striker',
    ageGroup: 'U17',
    status: 'available',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 'quinn-jacob',
    name: 'Quinn, Jacob',
    position: 'Defender',
    ageGroup: 'U17',
    status: 'available',
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face',
  },

  // U16 Athletes
  {
    id: 'roberts-ethan',
    name: 'Roberts, Ethan',
    position: 'Midfielder',
    ageGroup: 'U16',
    status: 'available',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 'smith-noah',
    name: 'Smith, Noah',
    position: 'Winger',
    ageGroup: 'U16',
    status: 'unavailable',
    avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face',
  },

  // U14 Athletes
  {
    id: 'young-oliver',
    name: 'Young, Oliver',
    position: 'Striker',
    ageGroup: 'U14',
    status: 'available',
    avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 'white-lucas',
    name: 'White, Lucas',
    position: 'Midfielder',
    ageGroup: 'U14',
    status: 'injured',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
  },
];

// Helper: create additional players per squad until target size is reached
const POSITIONS = ['Goalkeeper', 'Defender', 'Midfielder', 'Winger', 'Striker', 'Centre forward'];
const STATUSES = ['available', 'unavailable', 'injured'];
const AVATARS = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face',
];

function placeholderAvatar(text) {
  return `https://via.placeholder.com/150?text=${encodeURIComponent(text)}`;
}

// Generate consistent profile data for demo purposes
function generateDob(ageGroup, index) {
  const yearNow = new Date().getFullYear();
  const m = ageGroup.match(/U(\d+)/);
  const approxAge = m ? parseInt(m[1], 10) - 1 : 22;
  const year = yearNow - approxAge;
  const month = ((index % 12) + 1).toString().padStart(2, '0');
  const day = ((index % 27) + 1).toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const LABEL_SETS = [
  ['Fit'],
  ['Development'],
  ['Two-footed'],
  ['Leadership'],
  ['High Work-Rate'],
  ['Academy'],
];

function ensureSquadSize(all, ageGroup, target, seed = 1) {
  const output = [...all];
  let i = 0;
  while (output.filter(a => a.ageGroup === ageGroup).length < target) {
    const index = seed + i;
    const position = POSITIONS[index % POSITIONS.length];
    const status = STATUSES[index % STATUSES.length];
    const last = ['Smith', 'Brown', 'Johnson', 'Taylor', 'Miller', 'Wilson'][index % 6];
    const first = ['Alex', 'Jamie', 'Jordan', 'Casey', 'Drew', 'Riley'][index % 6];
    const name = `${last}, ${first}`;

    const avatarChoice = index % 5 === 0
      ? undefined
      : index % 2 === 0
        ? AVATARS[index % AVATARS.length]
        : placeholderAvatar(ageGroup);

    output.push({
      id: `gen-${ageGroup}-${index}`,
      name,
      position,
      ageGroup,
      status,
      avatar: avatarChoice,
      dateOfBirth: generateDob(ageGroup, index),
      squadNumber: (index % 30) + 1,
      leagueId: `L-${ageGroup}-${index}`,
      labels: LABEL_SETS[index % LABEL_SETS.length],
    });
    i += 1;
  }
  return output;
}

// Build final list: guarantee ~25 per current squads (U21, U19, U17)
let built = [...baseAthletes];

built = ensureSquadSize(built, 'U21', 25);
built = ensureSquadSize(built, 'U19', 25, 100);
built = ensureSquadSize(built, 'U17', 25, 200);

// Optionally add a few extras for depth in other squads (keeps previous data as-is)
built = ensureSquadSize(built, 'U23', Math.max(12, built.filter(a => a.ageGroup === 'U23').length));

// Add some older historical athletes for the historical view
built = ensureSquadSize(built, 'U25', 8, 300);
built = ensureSquadSize(built, 'U27', 6, 400);
built = ensureSquadSize(built, 'U30', 4, 500);

export const mockAthletes = built;

// Premier League clubs (example data for Clubs view)
export const clubs = [
  'Arsenal',
  'Aston Villa',
  'Bournemouth',
  'Brentford',
  'Brighton & Hove Albion',
  'Chelsea',
  'Crystal Palace',
  'Everton',
  'Fulham',
  'Ipswich Town',
  'Leicester City',
  'Liverpool',
  'Manchester City',
  'Manchester United',
  'Newcastle United',
  'Nottingham Forest',
  'Southampton',
  'Tottenham Hotspur',
  'West Ham United',
  'Wolverhampton Wanderers',
];
