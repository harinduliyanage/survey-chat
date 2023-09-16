import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { withTheme } from '@emotion/react';
import { Button, Grid, Toolbar } from '@mui/material';
import ROUTES from 'modules/common/constants/route';
import { AppBar } from './style';
/**
 * Navigation bar common component that uses
 * across modules for navigate among pages
 */
const Navbar = () => {
  const navigate = useNavigate();
  // get current path location
  const location = useLocation();
  // set initial selected path state
  const [selected, setSelected] = useState({
    businessInfo: location.pathname === ROUTES.BUSINESS_INFO,
    chat: location.pathname.includes(ROUTES.CHAT),
    presentation: location.pathname.includes(ROUTES.PRESENTATION),
  });
  // set selected menu item based on changed location
  useEffect(() => {
    setSelected({
      businessInfo: location.pathname === ROUTES.BUSINESS_INFO,
      chat: location.pathname.includes(ROUTES.CHAT),
      presentation: location.pathname.includes(ROUTES.PRESENTATION),
    });
  }, [location]);
  //
  return (
    <AppBar position="sticky" elevation={0} sx={{ height: 75, maxHeight: 75 }}>
      <Toolbar sx={{ backgroundColor: '#2e384a'}}>
        <Grid container alignItems="center" justifyContent="center" direction="row" sx={{ backgroundColor: '#2e384a'}}>
          <Grid item sx={{ display: 'block' }}>
            <Button
              onClick={() => {
                setSelected({
                  businessInfo: true,
                  chat: false,
                  presentation: false,
                });
                navigate(ROUTES.BUSINESS_INFO);
              }}
              variant="text"
              sx={{
                color: selected.businessInfo ? '#ffffff' : '#9e9e9e',
                fontSize: '15px',
              }}
            >
              Business Info
            </Button>
            <Button
              onClick={() => {
                setSelected({
                  businessInfo: false,
                  chat: true,
                  presentation: false,
                });
                navigate(ROUTES.CHAT);
              }}
              variant="text"
              sx={{
                color: selected.chat ? '#ffffff' : '#9e9e9e',
                fontSize: '15px',
              }}
            >
              Chat
            </Button>
            <Button
              onClick={() => {
                setSelected({
                  businessInfo: false,
                  chat: false,
                  presentation: true,
                });
                navigate(ROUTES.PRESENTATION);
              }}
              variant="text"
              sx={{
                color: selected.presentation ? '#ffffff' : '#9e9e9e',
                fontSize: '15px',
              }}
            >
              Presentation
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
//
export default withTheme(Navbar);
