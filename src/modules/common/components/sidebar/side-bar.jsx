import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

import { green } from '@mui/material/colors';

import { Box, Chip, Drawer as MuiDrawer, ListItemButton } from '@mui/material';
import { ReactComponent as Logo } from 'modules/common/assets/images/svg/logo.svg';
import { ENVIRONMENT } from 'config';
import ROUTES from 'modules/common/constants/route';
import Footer from './sidebar-footer';
import SidebarNav from './sidebar-nav';

const Drawer = styled(MuiDrawer)`
  border-right: 0;

  > div {
    border-right: 0;
  }
`;

const Brand = styled(ListItemButton)`
  font-size: ${(props) => props.theme.typography.h5.fontSize};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
  color: ${(props) => props.theme.sidebar.header.color};
  background-color: ${(props) => props.theme.sidebar.header.background};
  font-family: ${(props) => props.theme.typography.fontFamily};
  min-height: 56px;
  padding-left: ${(props) => props.theme.spacing(6)};
  padding-right: ${(props) => props.theme.spacing(6)};
  justify-content: center;
  cursor: pointer;
  flex-grow: 0;

  ${(props) => props.theme.breakpoints.up('sm')} {
    min-height: 64px;
  }

  &:hover {
    background-color: ${(props) => props.theme.sidebar.header.background};
  }
`;

const BrandIcon = styled(Logo)`
  margin-right: ${(props) => props.theme.spacing(2)};
  color: ${(props) => props.theme.sidebar.header.brand.color};
  fill: ${(props) => props.theme.sidebar.header.brand.color};
  width: 32px;
  height: 32px;
`;

const BrandChip = styled(Chip)`
  background-color: ${green[700]};
  border-radius: 5px;
  color: ${(props) => props.theme.palette.common.white};
  font-size: 55%;
  height: 18px;
  margin-left: 2px;
  margin-top: -16px;
  padding: 3px 0;

  span {
    padding-left: ${(props) => props.theme.spacing(1.375)};
    padding-right: ${(props) => props.theme.spacing(1.375)};
  }
`;

const Sidebar = ({ items, showFooter = true, ...rest }) => (
  <Drawer variant="permanent" {...rest}>
    <Brand component={NavLink} to={ROUTES.DASHBOARD}>
      <BrandIcon />{' '}
      <Box ml={1}>
        {ENVIRONMENT.APP_NAME} <BrandChip label="2.0.0" />
      </Box>
    </Brand>
    <SidebarNav items={items} />
    {!!showFooter && <Footer />}
  </Drawer>
);

export default Sidebar;
