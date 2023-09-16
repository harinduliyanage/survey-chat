import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
import { CssBaseline } from '@mui/material';
import GlobalStyle from 'modules/common/style/global';
import AuthWrapper from 'modules/common/wrappers/auth';

const Root = styled.div`
  max-width: 520px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

const AuthLayout = () => (
  <Root>
    <CssBaseline />
    <GlobalStyle />
    <AuthWrapper>
      <Outlet />
    </AuthWrapper>
    {/* <Settings /> */}
  </Root>
);

export default AuthLayout;
