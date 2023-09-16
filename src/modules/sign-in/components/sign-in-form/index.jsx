import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import ROUTES from 'modules/common/constants/route';
import signInFormValidation from 'modules/sign-in/validation/sign-in-form-validation';
import { useDispatch, useSelector } from 'react-redux';
import { signInActions } from 'modules/sign-in/slice';
import { selectNotification } from 'modules/common/notifications/selectors';
import { notificationActions } from '../../../common/notifications/slice';
import { Alert, TextField } from './style';

const SignInFormView = () => {
  const dispatch = useDispatch();
  //
  const notification = useSelector(selectNotification);
  //
  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={signInFormValidation}
      onSubmit={async (values) => {
        if (notification?.isEnabled) dispatch(notificationActions.resetNotification());
        dispatch(signInActions.signIn(values));
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          {notification?.isEnabled && (
            <Alert mt={2} mb={3} severity={notification?.type}>
              {notification?.message}
            </Alert>
          )}
          <TextField
            type="username"
            name="username"
            value={values.username}
            error={Boolean(touched.username && errors.username)}
            helperText={touched.username && errors.username}
            fullWidth
            onBlur={handleBlur}
            onChange={handleChange}
            my={2}
            label="Username"
          />
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            Sign In
          </Button>
          <Button component={Link} to={ROUTES.FORGOT_PASSWORD} fullWidth color="primary">
            Forgot password?
          </Button>
        </form>
      )}
    </Formik>
  );
};
//
export default SignInFormView;
