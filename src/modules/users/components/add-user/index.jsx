import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from '@mui/material';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { selectNotification } from 'modules/common/notifications/selectors';
import { selectOrganizationId, selectAuthUser } from 'modules/common/auth/selectors';
import ERROR_TYPES from 'modules/common/constants/error-types';
import ROLE_NAMES from 'modules/common/constants/user-roles';
import { USER_ROLE } from 'modules/common/constants/roles';
import { notificationActions } from 'modules/common/notifications/slice';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import TOAST_TYPES from 'modules/common/constants/toast-types';
import { addUserValidation } from '../../validation/add-user-form-validation';
import { Alert, TextField } from './style';
import { usersActions } from '../../slice';

const AddUserFormDialog = ({ open, onClose }) => {
  const dispatch = useDispatch();
  //
  const organizationId = useSelector(selectOrganizationId);
  const notification = useSelector(selectNotification);
  const currentUser = useSelector(selectAuthUser);
  //
  const [role, setRole] = useState(ROLE_NAMES[0].label);
  //
  const modalAction = (action) => {
    if (notification?.isEnabled) dispatch(notificationActions.resetNotification());
    onClose(action);
  };
  //
  const initialValues = {
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    password: '',
  };
  //
  useEffect(() => {
    if (notification?.isEnabled && notification?.type === ERROR_TYPES.SUCCESS) {
      toast(notification?.message, { type: TOAST_TYPES.SUCCESS });
      modalAction(false);
    }
  }, [notification]);
  //
  return (
    <Dialog open={open} onClose={() => modalAction(false)} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add User</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={addUserValidation}
          onSubmit={async (values) => {
            if (role === ROLE_NAMES[0].label) {
              dispatch(usersActions.createGeneralUsers({ ...values, organizationId }));
            } else {
              dispatch(usersActions.createAdminUsers({ ...values, organizationId }));
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <form noValidate onSubmit={handleSubmit}>
              {notification?.isEnabled && notification?.type === ERROR_TYPES.ERROR && (
                <Alert mt={2} mb={3} severity={notification?.type}>
                  {notification?.message}
                </Alert>
              )}
              <TextField
                type="email"
                name="email"
                value={values.email}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
                my={2}
                label="Email Address"
              />
              <TextField
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
                name="firstName"
                value={values.firstName}
                error={Boolean(touched.firstName && errors.firstName)}
                helperText={touched.firstName && errors.firstName}
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
                my={2}
                label="First Name"
              />
              <TextField
                name="lastName"
                value={values.lastName}
                error={Boolean(touched.lastName && errors.lastName)}
                helperText={touched.lastName && errors.lastName}
                onBlur={handleBlur}
                onChange={handleChange}
                fullWidth
                label="Last Name"
                my={2}
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
              <TextField
                select
                name="role"
                disabled={currentUser.roles[0].name === USER_ROLE}
                value={role}
                label="Role"
                onChange={(event) => setRole(event.target.value)}
                fullWidth
                sx={{ marginY: 2 }}
                InputLabelProps={{ shrink: true }}
              >
                {ROLE_NAMES?.map((type) => (
                  <MenuItem key={type.key} value={type.label}>
                    {type.label}
                  </MenuItem>
                ))}
              </TextField>
              <DialogActions>
                <Button type="submit" variant="contained" color="success" disabled={isSubmitting}>
                  Save
                </Button>
                <Button onClick={() => modalAction(false)} variant="contained" color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
//
export default AddUserFormDialog;
