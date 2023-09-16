import { Link } from 'react-router-dom';
import { Formik } from 'formik';

import { Button, Typography } from '@mui/material';
import ROUTES from 'modules/common/constants/route';
import { forgotPasswordActions } from 'modules/forgot-password/slice';
import { useDispatch, useSelector } from 'react-redux';
import { selectNotification } from 'modules/common/notifications/selectors';
import { useEffect } from 'react';
import useCounter from 'modules/common/hooks/use-counter';
import TIME_OUTS from 'modules/common/constants/time-outs';
import forgetEmailFormValidation from 'modules/forgot-password/validations/forgot-password-form-validation';
import { notificationActions } from 'modules/common/notifications/slice';
import { Alert, TextField } from './style';

const ResetPasswordForm = () => {
  const { timeLeft, setTimeLeft } = useCounter();
  //
  const dispatch = useDispatch();
  //
  const notification = useSelector(selectNotification);
  //
  useEffect(() => {
    setTimeLeft(null);
    if (notification?.isEnabled) {
      setTimeLeft(TIME_OUTS.REDIRECT_TO_LOGIN);
    }
    return () => notification?.isEnabled && dispatch(notificationActions.resetNotification());
  }, [notification]);
  return (
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={forgetEmailFormValidation}
      onSubmit={async (values) => {
        dispatch(forgotPasswordActions.forgotPassword(values));
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          {notification?.isEnabled && (
            <Alert mt={2} mb={1} severity={notification?.type}>
              {notification?.message}
            </Alert>
          )}
          {timeLeft && (
            <Typography component="h2" variant="body1" align="center">
              You will be redirected to the login page in {timeLeft} seconds
            </Typography>
          )}
          <TextField
            type="email"
            name="email"
            label="Email Address"
            value={values.email}
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            onBlur={handleBlur}
            onChange={handleChange}
            my={3}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            Request reset link
          </Button>
          <Button component={Link} to={ROUTES.LOGIN} fullWidth color="primary">
            Return to Login
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default ResetPasswordForm;
