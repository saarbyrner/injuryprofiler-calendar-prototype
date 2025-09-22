import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  FormControlLabel, 
  Checkbox, 
  Collapse,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip
} from '@mui/material';
import { ExpandMore, ExpandLess, Search, Close } from '@mui/icons-material';

const FiltersSidebar = ({ onClose }) => {
  // Accordion states
  const [squadsExpanded, setSquadsExpanded] = useState(true);
  const [typesExpanded, setTypesExpanded] = useState(true);
  const [attendeesExpanded, setAttendeesExpanded] = useState(true);
  const [locationExpanded, setLocationExpanded] = useState(true);
  const [gamesExpanded, setGamesExpanded] = useState(true);

  // Filter states
  const [squadFilters, setSquadFilters] = useState({
    '1st team': true,
    'Academy Squad': true,
    'Academy team': true,
    'International Squad': false,
    'team_1': false,
    'team_2': false,
    'Test': false,
  });

  const [typeFilters, setTypeFilters] = useState({
    'Squad Sessions': true,
    'Games': true,
    'Individual Sessions': false,
    'Events': false,
  });

  const [locationFilters, setLocationFilters] = useState({
    'Home': false,
    'Away': false,
    'Neutral': false,
  });

  const [selectedAthletes, setSelectedAthletes] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState([]);
  const [selectedCompetition, setSelectedCompetition] = useState('');
  const [selectedOpposition, setSelectedOpposition] = useState('');
  const [locationSearch, setLocationSearch] = useState('');

  // Search states
  const [squadSearch, setSquadSearch] = useState('');
  const [typeSearch, setTypeSearch] = useState('');

  // Helper functions
  const getActiveFilterCount = (filters) => {
    return Object.values(filters).filter(Boolean).length;
  };

  const handleSquadChange = (squad) => {
    setSquadFilters(prev => ({
      ...prev,
      [squad]: !prev[squad]
    }));
  };

  const handleTypeChange = (type) => {
    setTypeFilters(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleLocationChange = (location) => {
    setLocationFilters(prev => ({
      ...prev,
      [location]: !prev[location]
    }));
  };

  const selectAll = (setter, keys) => {
    setter(prev => {
      const newFilters = {};
      keys.forEach(key => {
        newFilters[key] = true;
      });
      return newFilters;
    });
  };

  const clearAll = (setter, keys) => {
    setter(prev => {
      const newFilters = {};
      keys.forEach(key => {
        newFilters[key] = false;
      });
      return newFilters;
    });
  };

  const FilterSection = ({ 
    title, 
    count, 
    expanded, 
    onToggle, 
    children, 
    onSelectAll, 
    onClearAll,
    showSearch = true,
    searchValue = '',
    onSearchChange = () => {}
  }) => (
    <Box sx={{ mb: 1 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          backgroundColor: '#f8f9fa',
          cursor: 'pointer',
          borderBottom: '1px solid #e5e5e5',
          '&:hover': {
            backgroundColor: '#f0f0f0',
          },
        }}
        onClick={onToggle}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            sx={{
              color: '#333333',
              fontWeight: 500,
              fontSize: '14px',
            }}
          >
            {title}
          </Typography>
          {count > 0 && (
            <Box
              sx={{
                backgroundColor: '#0F28FF',
                color: 'white',
                fontSize: '11px',
                fontWeight: 500,
                height: '18px',
                minWidth: '18px',
                borderRadius: '9px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 6px',
              }}
            >
              {count}
            </Box>
          )}
        </Box>
        {expanded ? <ExpandLess sx={{ color: '#666666' }} /> : <ExpandMore sx={{ color: '#666666' }} />}
      </Box>
      
      <Collapse in={expanded}>
        <Box sx={{ padding: '16px', backgroundColor: '#ffffff', borderBottom: '1px solid #e5e5e5' }}>
          {showSearch && (
            <TextField
              size="small"
              placeholder="Search"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ color: '#666666', mr: 1, fontSize: '16px' }} />,
              }}
              sx={{
                width: '100%',
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#ffffff',
                  '& fieldset': {
                    borderColor: '#d0d0d0',
                    borderRadius: '4px',
                  },
                  '&:hover fieldset': {
                    borderColor: '#0F28FF',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#0F28FF',
                  },
                },
                '& .MuiInputBase-input': {
                  color: '#333333',
                  fontSize: '14px',
                  padding: '8px 12px',
                  '&::placeholder': {
                    color: '#999999',
                    opacity: 1,
                  },
                },
              }}
            />
          )}

          {onSelectAll && onClearAll && (
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Typography
                sx={{
                  color: '#0F28FF',
                  fontSize: '12px',
                  cursor: 'pointer',
                  fontWeight: 500,
                  '&:hover': { textDecoration: 'underline' },
                }}
                onClick={onSelectAll}
              >
                Select all
              </Typography>
              <Typography sx={{ color: '#cccccc', fontSize: '12px' }}>|</Typography>
              <Typography
                sx={{
                  color: '#0F28FF',
                  fontSize: '12px',
                  cursor: 'pointer',
                  fontWeight: 500,
                  '&:hover': { textDecoration: 'underline' },
                }}
                onClick={onClearAll}
              >
                Clear
              </Typography>
            </Box>
          )}

          {children}
        </Box>
      </Collapse>
    </Box>
  );

  const CheckboxList = ({ items, checkedItems, onChange, disabledItems = [] }) => (
    <Box component="ul" sx={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {Object.entries(items).map(([key, value]) => (
        <Box component="li" key={key} sx={{ mb: 1 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedItems[key] || false}
                onChange={() => onChange(key)}
                disabled={disabledItems.includes(key)}
                sx={{
                  color: '#0F28FF',
                  padding: '4px',
                  '&.Mui-checked': {
                    color: '#0F28FF',
                  },
                  '&.Mui-disabled': {
                    color: '#cccccc',
                  },
                }}
              />
            }
            label={
              <Typography
                sx={{
                  color: checkedItems[key] ? '#333333' : '#666666',
                  fontSize: '14px',
                  fontWeight: checkedItems[key] ? 500 : 400,
                }}
              >
                {value}
              </Typography>
            }
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              width: '100%',
              margin: 0,
              padding: '4px 0',
            }}
          />
        </Box>
      ))}
    </Box>
  );

  const SelectField = ({ label, value, onChange, placeholder, options = [] }) => (
    <FormControl fullWidth size="small" sx={{ mb: 2 }}>
      <InputLabel sx={{ fontSize: '14px', color: '#666666' }}>{label}</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        label={label}
        displayEmpty
        sx={{
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#d0d0d0',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#0F28FF',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#0F28FF',
          },
          '& .MuiSelect-select': {
            color: '#333333',
            fontSize: '14px',
          },
        }}
      >
        <MenuItem value="" sx={{ fontSize: '14px', color: '#999999' }}>
          {placeholder}
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value} sx={{ fontSize: '14px' }}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  return (
    <Box
      sx={{
        width: '340px',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e0e0e0',
        height: '100%',
        overflowY: 'auto',
        position: 'relative',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          borderBottom: '1px solid #e5e5e5',
          backgroundColor: '#ffffff',
        }}
      >
        <Typography
          sx={{
            color: '#333333',
            fontWeight: 600,
            fontSize: '16px',
          }}
        >
          Filters
        </Typography>
        <Close sx={{ color: '#666666', cursor: 'pointer', fontSize: '20px' }} onClick={onClose} />
      </Box>

      <Box sx={{ padding: 0 }}>
        {/* Squads Section */}
        <FilterSection
          title="Squads"
          count={getActiveFilterCount(squadFilters)}
          expanded={squadsExpanded}
          onToggle={() => setSquadsExpanded(!squadsExpanded)}
          onSelectAll={() => selectAll(setSquadFilters, Object.keys(squadFilters))}
          onClearAll={() => clearAll(setSquadFilters, Object.keys(squadFilters))}
          searchValue={squadSearch}
          onSearchChange={setSquadSearch}
        >
          <CheckboxList
            items={squadFilters}
            checkedItems={squadFilters}
            onChange={handleSquadChange}
            disabledItems={['International Squad']}
          />
        </FilterSection>

        {/* Types Section */}
        <FilterSection
          title="Types"
          count={getActiveFilterCount(typeFilters)}
          expanded={typesExpanded}
          onToggle={() => setTypesExpanded(!typesExpanded)}
          onSelectAll={() => selectAll(setTypeFilters, Object.keys(typeFilters))}
          onClearAll={() => clearAll(setTypeFilters, Object.keys(typeFilters))}
          searchValue={typeSearch}
          onSearchChange={setTypeSearch}
        >
          <CheckboxList
            items={typeFilters}
            checkedItems={typeFilters}
            onChange={handleTypeChange}
          />
        </FilterSection>

        {/* Attendees Section */}
        <FilterSection
          title="Attendees"
          count={selectedAthletes.length + selectedStaff.length}
          expanded={attendeesExpanded}
          onToggle={() => setAttendeesExpanded(!attendeesExpanded)}
          showSearch={false}
        >
          <SelectField
            label="Athletes"
            value={selectedAthletes}
            onChange={(e) => setSelectedAthletes(e.target.value)}
            placeholder="Search for athletes"
            options={[
              { value: 'athlete1', label: 'John Doe' },
              { value: 'athlete2', label: 'Jane Smith' },
              { value: 'athlete3', label: 'Mike Johnson' },
            ]}
          />
          <SelectField
            label="Staff"
            value={selectedStaff}
            onChange={(e) => setSelectedStaff(e.target.value)}
            placeholder="Search for staff"
            options={[
              { value: 'staff1', label: 'Coach Wilson' },
              { value: 'staff2', label: 'Dr. Brown' },
              { value: 'staff3', label: 'Trainer Davis' },
            ]}
          />
        </FilterSection>

        {/* Location Section */}
        <FilterSection
          title="Location"
          count={getActiveFilterCount(locationFilters)}
          expanded={locationExpanded}
          onToggle={() => setLocationExpanded(!locationExpanded)}
          showSearch={false}
        >
          <CheckboxList
            items={locationFilters}
            checkedItems={locationFilters}
            onChange={handleLocationChange}
          />
          <TextField
            size="small"
            placeholder="Search locations"
            value={locationSearch}
            onChange={(e) => setLocationSearch(e.target.value)}
            InputProps={{
              endAdornment: <Search sx={{ color: '#666666', fontSize: '16px' }} />,
            }}
            sx={{
              width: '100%',
              mt: 2,
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#ffffff',
                '& fieldset': {
                  borderColor: '#d0d0d0',
                },
                '&:hover fieldset': {
                  borderColor: '#0F28FF',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#0F28FF',
                },
              },
              '& .MuiInputBase-input': {
                color: '#333333',
                fontSize: '14px',
                '&::placeholder': {
                  color: '#999999',
                  opacity: 1,
                },
              },
            }}
          />
        </FilterSection>

        {/* Games Section */}
        <FilterSection
          title="Games"
          count={selectedCompetition ? 1 : 0}
          expanded={gamesExpanded}
          onToggle={() => setGamesExpanded(!gamesExpanded)}
          showSearch={false}
        >
          <SelectField
            label=""
            value={selectedCompetition}
            onChange={(e) => setSelectedCompetition(e.target.value)}
            placeholder="Competition"
            options={[
              { value: 'premier-league', label: 'Premier League' },
              { value: 'champions-league', label: 'Champions League' },
              { value: 'fa-cup', label: 'FA Cup' },
            ]}
          />
          <SelectField
            label=""
            value={selectedOpposition}
            onChange={(e) => setSelectedOpposition(e.target.value)}
            placeholder="Opposition"
            options={[
              { value: 'arsenal', label: 'Arsenal' },
              { value: 'chelsea', label: 'Chelsea' },
              { value: 'liverpool', label: 'Liverpool' },
            ]}
          />
        </FilterSection>
      </Box>
    </Box>
  );
};

export default FiltersSidebar;
