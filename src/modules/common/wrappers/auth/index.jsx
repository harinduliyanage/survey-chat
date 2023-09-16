import styled from '@emotion/styled';

import { Avatar, Paper, Typography } from '@mui/material';
// import { ReactComponent as Logo } from "assets/images/svg/logo.svg";
import { useLocation } from 'react-router-dom';
import ROUTES from 'modules/common/constants/route';
import { ENVIRONMENT } from 'config';

// const Brand = styled(Logo)`
//   fill: ${(props) => props.theme.palette.primary.main};
//   width: 64px;
//   height: 64px;
//   margin-bottom: 32px;
// `;

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)};

  ${(props) => props.theme.breakpoints.up('md')} {
    padding: ${(props) => props.theme.spacing(10)};
  }
`;

const BigAvatar = styled(Avatar)`
  width: 92px;
  height: 92px;
  text-align: center;
  margin: 0 auto ${(props) => props.theme.spacing(5)};
`;

const AuthWrapper = ({ children }) => {
  const location = useLocation();
  return (
    <>
      {/* <Brand /> */}
      {location.pathname === ROUTES.LOGIN && (
        <Wrapper>
          <BigAvatar alt={ENVIRONMENT.APP_NAME} src="/static/assets/logo.svg" />

          <Typography component="h1" variant="h4" align="center" gutterBottom>
            React Boilerplate
          </Typography>
          <Typography component="h2" variant="body1" align="center">
            Sign in to your account to continue
          </Typography>
          {children}
        </Wrapper>
      )}
      {location.pathname === ROUTES.FORGOT_PASSWORD && (
        <Wrapper>
          <BigAvatar alt={ENVIRONMENT.APP_NAME} src="/static/assets/logo.svg" />

          <Typography component="h1" variant="h4" align="center" gutterBottom>
            Forgot Password?
          </Typography>
          <Typography component="h2" variant="body1" align="center">
            Enter your email to reset your password
          </Typography>
          {children}
        </Wrapper>
      )}
      {location.pathname === ROUTES.RESET_PASSWORD && (
        <Wrapper>
          <BigAvatar alt={ENVIRONMENT.APP_NAME} src="/static/assets/logo.svg" />

          <Typography component="h1" variant="h4" align="center" gutterBottom>
            Reset Password
          </Typography>
          <Typography component="h2" variant="body1" align="center">
            Enter your new password to reset your password
          </Typography>
          {children}
        </Wrapper>
      )}
    </>
  );
};

export default AuthWrapper;
