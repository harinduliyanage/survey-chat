import styled from '@emotion/styled';
import { withTheme } from '@emotion/react';
import { useLocation } from 'react-router-dom';
import ROUTE_NAMES from 'modules/common/constants/route-names';
import {
  Grid,
  AppBar as MuiAppBar,
  IconButton as MuiIconButton,
  Toolbar,
  Typography,
} from '@mui/material';

import { Menu as MenuIcon } from '@mui/icons-material';
import NavbarUserDropdown from './navbar-user-dropdown';

const AppBar = styled(MuiAppBar)`
  background: ${(props) => props.theme.header.background};
  color: ${(props) => props.theme.header.color};
`;

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

const Navbar = ({ theme, onDrawerToggle }) => {
  const location = useLocation();
  //
  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar sx={{ backgroundColor: theme.palette.background.default }}>
        <Grid container alignItems="center">
          <Grid item sx={{ display: { xs: 'block', md: 'none' } }}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={onDrawerToggle}
              size="large"
            >
              <MenuIcon />
            </IconButton>
          </Grid>
          <Grid item xs px={10}>
            <Typography variant="h3" gutterBottom sx={{ color: 'black' }}>
              {ROUTE_NAMES[location.pathname]}
            </Typography>
          </Grid>
          <Grid item>
            {/* <NavbarMessagesDropdown /> */}
            {/* <NavbarNotificationsDropdown /> */}
            {/* <NavbarLanguagesDropdown /> */}
            <NavbarUserDropdown />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default withTheme(Navbar);
