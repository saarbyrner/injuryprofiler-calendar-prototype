import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Select, 
  MenuItem, 
  Button, 
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  Chip,
  Paper,
  Checkbox,
  Tooltip
} from '@mui/material';
import { 
  MoreVertOutlined,
  ArrowDropDownOutlined
} from '@mui/icons-material';
import SparklineChart from './SparklineChart';
import squadAthletesData from '../data/squadAthletes.json';
import '../styles/design-tokens.css';

/**
 * Squad Overview Table Component
 * Based on Figma design: Squad Overview with Sparkline hover
 */
const SquadOverviewTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);

  const filteredAthletes = squadAthletesData.filter(athlete => {
    const matchesSearch = athlete.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         athlete.lastname.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = !positionFilter || athlete.position === positionFilter;
    return matchesSearch && matchesPosition;
  });

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedRows(filteredAthletes.map(athlete => athlete.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (athleteId) => {
    setSelectedRows(prev => 
      prev.includes(athleteId) 
        ? prev.filter(id => id !== athleteId)
        : [...prev, athleteId]
    );
  };

  const getOverallChipColor = (overall) => {
    if (overall >= 80) return 'success';
    if (overall >= 60) return 'warning';
    return 'error';
  };

  const getOverallChipVariant = (overall) => {
    return overall >= 80 ? 'filled' : 'outlined';
  };

  // Generate sparkline data for each athlete (simulated performance over time)
  const generateSparklineData = (athlete) => {
    const baseScore = athlete.overall;
    return Array.from({ length: 8 }, (_, i) => {
      const variation = (Math.random() - 0.5) * 20;
      return Math.max(0, Math.min(100, baseScore + variation));
    });
  };

  return (
    <Paper 
      elevation={0}
      sx={{
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-border-primary)',
        overflow: 'hidden',
        width: '100%'
      }}
    >
      {/* Toolbar - Exact Figma Structure */}
      <Box 
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1, // 8px gap between sections
          pt: 2, // 16px top padding
          pb: 1, // 8px bottom padding
          px: 3, // 24px horizontal padding
          height: 66, // Exact Figma height
          borderBottom: '1px solid var(--color-border-primary)',
          backgroundColor: 'var(--color-background-primary)'
        }}
      >
        {/* Queries Section - 1147px width */}
        <Box sx={{ display: 'flex', gap: 1, flex: 1, maxWidth: 1147 }}>
          {/* Search Field - 300px */}
          <TextField
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="outlined"
            size="small"
            sx={{
              width: 300,
              height: 42,
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#f1f2f3',
                height: 42,
                '& fieldset': {
                  borderColor: '#3b4960',
                  borderRadius: '4px 4px 0 0',
                },
                '&:hover fieldset': {
                  borderColor: '#3b4960',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#3b4960',
                },
              },
              '& .MuiInputBase-input': {
                padding: '9px 12px',
                fontSize: '16px',
                fontFamily: 'Open Sans, sans-serif',
                fontWeight: 400,
                lineHeight: '24px',
                color: '#1f2d44',
              }
            }}
          />
          
          {/* Position Filter - 180px */}
          <Select
            value={positionFilter}
            onChange={(e) => setPositionFilter(e.target.value)}
            displayEmpty
            size="small"
            sx={{
              width: 180,
              height: 42,
              backgroundColor: '#f1f2f3',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#3b4960',
                borderRadius: '4px 4px 0 0',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#3b4960',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#3b4960',
              },
              '& .MuiSelect-select': {
                padding: '9px 12px',
                fontSize: '16px',
                fontFamily: 'Open Sans, sans-serif',
                fontWeight: 400,
                lineHeight: '24px',
                color: '#1f2d44',
              }
            }}
            IconComponent={ArrowDropDownOutlined}
          >
            <MenuItem value="">Position</MenuItem>
            <MenuItem value="Forward">Forward</MenuItem>
            <MenuItem value="Midfielder">Midfielder</MenuItem>
            <MenuItem value="Defender">Defender</MenuItem>
            <MenuItem value="Goalkeeper">Goalkeeper</MenuItem>
          </Select>
        </Box>

        {/* Actions Section 1 - 129px width */}
        <Button
          variant="contained"
          size="small"
          sx={{
            backgroundColor: '#3b4960',
            color: 'white',
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '14px',
            fontFamily: 'Open Sans, sans-serif',
            lineHeight: '24px',
            px: 2, // 16px horizontal padding
            py: 0.75, // 6px vertical padding
            borderRadius: '4px',
            width: 129,
            height: 36,
            '&:hover': {
              backgroundColor: '#2a3441',
            }
          }}
        >
          Label
        </Button>
        
        {/* Actions Section 2 - 40px width */}
        <IconButton
          size="small"
          sx={{
            backgroundColor: '#f1f2f3',
            width: 40,
            height: 40,
            borderRadius: '4px',
            p: 1, // 8px padding
            '&:hover': {
              backgroundColor: '#e8e9ea',
            },
            '& .MuiSvgIcon-root': {
              fontSize: '24px',
              color: '#3b4960'
            }
          }}
        >
          <MoreVertOutlined />
        </IconButton>
      </Box>

      {/* Table - Exact Figma Structure */}
      <Box sx={{ overflowX: 'auto', width: '100%' }}>
        <Table sx={{ tableLayout: 'fixed', minWidth: 1380, width: 1380 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: 'var(--color-background-secondary)', height: 56 }}>
            {/* Athlete Column - 218px (Figma: First column, no checkbox in header) */}
            <TableCell sx={{ width: 218, fontWeight: 600, color: 'var(--color-text-primary)' }}>
              Athlete
            </TableCell>
            
            {/* Position Column - 180px */}
            <TableCell sx={{ width: 180, fontWeight: 600, color: 'var(--color-text-primary)' }}>
              Position
            </TableCell>
            
            {/* Physical Column - 180px */}
            <TableCell sx={{ width: 180, fontWeight: 600, color: 'var(--color-text-primary)' }}>
              Physical
            </TableCell>
            
            {/* Technical Column - 180px */}
            <TableCell sx={{ width: 180, fontWeight: 600, color: 'var(--color-text-primary)' }}>
              Technical
            </TableCell>
            
            {/* Tactical Column - 180px */}
            <TableCell sx={{ width: 180, fontWeight: 600, color: 'var(--color-text-primary)' }}>
              Tactical
            </TableCell>
            
            {/* Psychological Column - 180px */}
            <TableCell sx={{ width: 180, fontWeight: 600, color: 'var(--color-text-primary)' }}>
              Psychological
            </TableCell>
            
            {/* Missing Column - 36px (Figma: Cell #7) */}
            <TableCell sx={{ width: 36, fontWeight: 600, color: 'var(--color-text-primary)' }}>
              {/* Empty column as per Figma */}
            </TableCell>
            
            {/* Overall Column - 106px (Figma: Cell #8) */}
            <TableCell sx={{ width: 106, fontWeight: 600, color: 'var(--color-text-primary)' }}>
              Overall
            </TableCell>
            
            {/* Actions Column - 120px (Figma: Cell #9) */}
            <TableCell sx={{ width: 120, fontWeight: 600, color: 'var(--color-text-primary)' }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredAthletes.map((athlete) => (
            <TableRow 
              key={athlete.id}
              sx={{
                height: 52,
                '&:hover': {
                  backgroundColor: 'var(--color-background-selected)',
                }
              }}
            >
              {/* Checkbox Column */}
              <TableCell sx={{ padding: '8px' }}>
                <Checkbox
                  checked={selectedRows.includes(athlete.id)}
                  onChange={() => handleSelectRow(athlete.id)}
                  size="small"
                />
              </TableCell>

              {/* Athlete Column - 168px (Figma: Cell #1 in data rows) */}
              <TableCell sx={{ width: 168 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      backgroundColor: 'var(--color-primary)',
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}
                  >
                    {athlete.firstname[0]}{athlete.lastname[0]}
                  </Avatar>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontWeight: 500, 
                      color: 'var(--color-text-primary)',
                      fontSize: '0.875rem'
                    }}
                  >
                    {athlete.firstname} {athlete.lastname}
                  </Typography>
                </Box>
              </TableCell>

              {/* Position Column */}
              <TableCell sx={{ width: 180 }}>
                <Typography variant="body2" sx={{ color: 'var(--color-text-primary)', fontSize: '0.875rem' }}>
                  {athlete.position}
                </Typography>
              </TableCell>

              {/* Physical Column with Sparkline */}
              <TableCell sx={{ width: 180 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ color: 'var(--color-text-primary)', fontSize: '0.875rem' }}>
                    {athlete.physical}
                  </Typography>
                  <Tooltip title="Physical performance trend" arrow>
                    <Box>
                      <SparklineChart 
                        data={generateSparklineData(athlete)} 
                        width={30} 
                        height={20} 
                        color="#3B4960"
                      />
                    </Box>
                  </Tooltip>
                </Box>
              </TableCell>

              {/* Technical Column with Sparkline */}
              <TableCell sx={{ width: 180 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ color: 'var(--color-text-primary)', fontSize: '0.875rem' }}>
                    {athlete.technical}
                  </Typography>
                  <Tooltip title="Technical performance trend" arrow>
                    <Box>
                      <SparklineChart 
                        data={generateSparklineData(athlete)} 
                        width={30} 
                        height={20} 
                        color="#29AE61"
                      />
                    </Box>
                  </Tooltip>
                </Box>
              </TableCell>

              {/* Tactical Column with Sparkline */}
              <TableCell sx={{ width: 180 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ color: 'var(--color-text-primary)', fontSize: '0.875rem' }}>
                    {athlete.tactical}
                  </Typography>
                  <Tooltip title="Tactical performance trend" arrow>
                    <Box>
                      <SparklineChart 
                        data={generateSparklineData(athlete)} 
                        width={30} 
                        height={20} 
                        color="#F1C410"
                      />
                    </Box>
                  </Tooltip>
                </Box>
              </TableCell>

              {/* Psychological Column with Sparkline */}
              <TableCell sx={{ width: 180 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ color: 'var(--color-text-primary)', fontSize: '0.875rem' }}>
                    {athlete.psychological}
                  </Typography>
                  <Tooltip title="Psychological performance trend" arrow>
                    <Box>
                      <SparklineChart 
                        data={generateSparklineData(athlete)} 
                        width={30} 
                        height={20} 
                        color="#9b58b5"
                      />
                    </Box>
                  </Tooltip>
                </Box>
              </TableCell>

              {/* Missing Column - 36px (Figma: Cell #7) */}
              <TableCell sx={{ width: 36 }}>
                {/* Empty cell as per Figma */}
              </TableCell>

              {/* Overall Column with Color-coded Chip (106px) */}
              <TableCell sx={{ width: 106 }}>
                <Chip
                  label={athlete.overall}
                  size="small"
                  color={getOverallChipColor(athlete.overall)}
                  variant={getOverallChipVariant(athlete.overall)}
                  sx={{
                    fontSize: '0.75rem',
                    height: 24,
                    fontWeight: 600,
                    minWidth: 36
                  }}
                />
              </TableCell>

              {/* Actions Column - 120px (Figma: Cell #9) */}
              <TableCell sx={{ width: 120 }}>
                <IconButton size="small">
                  <MoreVertOutlined fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
      </Box>
    </Paper>
  );
};

export default SquadOverviewTable;
