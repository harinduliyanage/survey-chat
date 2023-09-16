/* eslint-disable no-unused-vars */
import { Loader } from 'modules/common/components';
import useQuery from 'modules/common/hooks/use-query';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoader } from 'modules/verify-callback/selectors';
import { selectNotification } from 'modules/common/notifications/selectors';
import { Alert as MuiAlert, Button } from '@mui/material';
import { spacing } from '@mui/system';
import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';
import ROUTES from 'modules/common/constants/route';
import { verifyCallbackActions } from 'modules/verify-callback/slice';
import { selectResetPasswordToken } from 'modules/common/auth/selectors';
import useAuthErrors from 'modules/common/hooks/use-error-message';
import { notificationActions } from 'modules/common/notifications/slice';

const Alert = styled(MuiAlert)(spacing);
const Root = styled.div`
  max-width: 520px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;
const VerifyCallback = () => {
  const loading = useSelector(selectLoader);
  const notification = useSelector(selectNotification);
  const resetPasswordToken = useSelector(selectResetPasswordToken);
  const { generateError, message } = useAuthErrors();
  const query = useQuery();
  const token = query.get('token');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(verifyCallbackActions.verifyToken({ token }));
  }, [token, dispatch]);
  //
  useEffect(() => {
    if (notification?.isEnabled) {
      generateError(notification);
    }
    return () => notification?.isEnabled && dispatch(notificationActions.resetNotification());
  }, [notification]);
  //
  useEffect(() => {
    if (resetPasswordToken) {
      navigate(ROUTES.RESET_PASSWORD);
    }
  }, [resetPasswordToken, notification]);

  return (
    <Root>
      <Loader loading={loading}>
        {notification?.isEnabled && (
          <>
            <span role="img" aria-label="Crying Face">
              😢 😢 😢
            </span>
            <Alert mt={2} mb={3} severity={notification?.type}>
              {message}
            </Alert>
          </>
        )}
        <Button component={Link} to={ROUTES.FORGOT_PASSWORD} fullWidth color="primary">
          Go Back
        </Button>
      </Loader>
    </Root>
  );
};
export default VerifyCallback;
