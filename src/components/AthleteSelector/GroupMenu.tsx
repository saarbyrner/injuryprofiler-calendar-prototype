import React from 'react';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { Category as CategoryIcon } from '@mui/icons-material';

export type GroupOption = 'position' | 'status';

interface GroupMenuProps {
  groupBy: GroupOption;
  onChange: (groupBy: GroupOption) => void;
}

export const GroupMenu: React.FC<GroupMenuProps> = ({ groupBy, onChange }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const label = groupBy === 'position' ? 'Group by: Position' : 'Group by: Availability';

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleSelect = (value: GroupOption) => {
    onChange(value);
    handleClose();
  };

  return (
    <>
      <Tooltip title={label} arrow>
        <IconButton
          size="small"
          onClick={handleOpen}
          sx={{ 
            color: 'text.secondary', 
            '&:hover': { 
              backgroundColor: 'action.hover',
              color: 'var(--color-primary)',
            } 
          }}
          aria-label={label}
          aria-controls={open ? 'group-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <CategoryIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Menu
        id="group-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem selected={groupBy === 'position'} onClick={() => handleSelect('position')}>
          Position
        </MenuItem>
        <MenuItem selected={groupBy === 'status'} onClick={() => handleSelect('status')}>
          Availability
        </MenuItem>
      </Menu>
    </>
  );
};
