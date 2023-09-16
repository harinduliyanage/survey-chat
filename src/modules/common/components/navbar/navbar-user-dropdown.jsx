import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Power } from 'react-feather';

import { Tooltip, IconButton as MuiIconButton } from '@mui/material';

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

const NavbarUserDropdown = () => {
  const [anchorMenu, setAnchorMenu] = useState(null);

  const toggleMenu = (event) => {
    setAnchorMenu(event.currentTarget);
  };
  //
  return (
    <Tooltip title="Account">
      <IconButton
        aria-owns={anchorMenu ? 'menu-appbar' : undefined}
        aria-haspopup="true"
        onClick={toggleMenu}
        color="inherit"
        size="large"
      >
        <Power />
      </IconButton>
    </Tooltip>
  );
};

export default NavbarUserDropdown;
