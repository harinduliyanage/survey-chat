import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import { Button, Typography } from '@mui/material';
import ROUTES from 'modules/common/constants/route';
import { useDispatch, useSelector } from 'react-redux';
import resetPasswordValidation from 'modules/reset-password/validations/reset-password-validation';
import { resetPasswordActions } from 'modules/reset-password/slice';
import { selectResetPasswordToken } from 'modules/common/auth/selectors';
import useCounter from 'modules/common/hooks/use-counter';
import useAuthErrors from 'modules/common/hooks/use-error-message';
import { selectNotification } from 'modules/common/notifications/selectors';
import ERROR_TYPES from 'modules/common/constants/error-types';
import { useEffect } from 'react';
import TIME_OUTS from 'modules/common/constants/time-outs';
import { Alert, TextField } from './style';

const ResetPasswordForm = () => {
  const { timeLeft, setTimeLeft } = useCounter();
  const { generateError, message } = useAuthErrors();
  //
  const dispatch = useDispatch();
  //
  const notification = useSelector(selectNotification);
  const token = useSelector(selectResetPasswordToken);
  //
  useEffect(() => {
    if (notification?.isEnabled && notification?.type !== ERROR_TYPES.SUCCESS) {
      generateError(notification?.message);
    } else if (notification?.isEnabled && notification?.type === ERROR_TYPES.SUCCESS) {
      setTimeLeft(TIME_OUTS.REDIRECT_TO_LOGIN);
    }
  }, [notification]);
  return (
    <Formik
      initialValues={{
        password: '',
        confirmPassword: '',
      }}
      validationSchema={resetPasswordValidation}
      onSubmit={async (values) => {
        dispatch(resetPasswordActions.resetPassword({ token, newPassword: values?.password }));
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          {notification?.isEnabled && (
            <Alert mt={2} mb={1} severity={notification?.type}>
              {notification?.type === ERROR_TYPES.SUCCESS
                ? 'Password reset successfully. You will be redirected to a login page in 5 seconds. If you are not automatically redirected, Please click on the link bellow.'
                : message}
            </Alert>
          )}
          {timeLeft && (
            <Typography component="h2" variant="body1" align="center">
              You will be redirected to the login page in {timeLeft} seconds
            </Typography>
          )}
          <TextField
            type="password"
            name="password"
            value={values.password}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
            onBlur={handleBlur}
            onChange={handleChange}
            fullWidth
            label="Password"
            my={2}
          />
          <TextField
            type="password"
            name="confirmPassword"
            value={values.confirmPassword}
            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
            onBlur={handleBlur}
            onChange={handleChange}
            fullWidth
            label="Confirm Password"
            my={2}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            Reset Password
          </Button>
          <Button component={Link} to={ROUTES.LOGIN} fullWidth color="primary">
            Return to Login
          </Button>
        </form>
      )}
    </Formik>
  );
};
//
export default ResetPasswordForm;
