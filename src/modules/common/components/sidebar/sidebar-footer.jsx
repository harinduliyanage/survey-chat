/* eslint-disable no-unused-vars */
import React from 'react';
import styled from '@emotion/styled';

import { Badge, Grid, Avatar, Typography } from '@mui/material';
import { ENVIRONMENT } from 'config';
import { useSelector } from 'react-redux';

const Footer = styled.div`
  background-color: ${(props) => props.theme.sidebar.footer.background} !important;
  padding: ${(props) => props.theme.spacing(2.75)} ${(props) => props.theme.spacing(4)};
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`;

const FooterText = styled(Typography)`
  color: ${(props) => props.theme.sidebar.footer.color};
`;

const FooterSubText = styled(Typography)`
  color: ${(props) => props.theme.sidebar.footer.color};
  font-size: 0.7rem;
  display: block;
  padding: 1px;
`;

const FooterBadge = styled(Badge)`
  margin-right: ${(props) => props.theme.spacing(1)};
  span {
    background-color: ${(props) => props.theme.sidebar.footer.online.background};
    border: 1.5px solid ${(props) => props.theme.palette.common.white};
    height: 12px;
    width: 12px;
    border-radius: 50%;
  }
`;

const SidebarFooter = ({ ...rest }) => (
  <Footer {...rest}>
    <Grid container spacing={2}>
      <Grid item>
        <Avatar alt={ENVIRONMENT.APP_NAME} src="/static/img/avatars/avatar-1.jpg" />
        {/* </FooterBadge> */}
      </Grid>
      <Grid item>
        {/* Demo data */}
        <FooterText variant="body2">{ENVIRONMENT.APP_NAME}</FooterText>
        {/* <FooterSubText variant="caption">UX Designer</FooterSubText> */}
      </Grid>
    </Grid>
  </Footer>
);

export default SidebarFooter;
