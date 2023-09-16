import {
  FormControl,
  Grid,
  Box,
  IconButton,
  Alert,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from '@mui/material';
import { selectUserById, selectRoleList } from 'modules/users/selectors';
import ERROR_TYPES from 'modules/common/constants/error-types';
import { ADMIN_ROLE, SUPER_ADMIN_ROLE, USER_ROLE } from 'modules/common/constants/roles';
import ROLE_NAMES from 'modules/common/constants/user-roles';
import TextField from '@mui/material/TextField';
import { selectOrganizationId, selectAuthUser } from 'modules/common/auth/selectors';
import { selectNotification } from 'modules/common/notifications/selectors';
import { Modal } from 'modules/common/components';
import { Trash, X, Save } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { Formik } from 'formik';
import { usersActions } from 'modules/users/slice';
import { updateUserValidation } from '../../validation/add-user-form-validation';
import { Typography } from './style';

const FormStyles = { borderRadius: 10 };
//
const UserDataDrawerView = ({ show, isShow, userId }) => {
  const dispatch = useDispatch();
  //
  const organizationId = useSelector(selectOrganizationId);
  const notification = useSelector(selectNotification);
  const currentUser = useSelector(selectAuthUser);
  const roleList = useSelector(selectRoleList);
  //
  const user = useSelector((state) => selectUserById(state, userId));
  //
  const [initialValues, setInitialValues] = useState({
    email: '',
    firstName: '',
    lastName: '',
  });
  //
  const [isDelete, setDelete] = useState(false);
  const [isUpdate, setUpdate] = useState(false);
  const [isEditUnavailable, setEditUnavailable] = useState(false);
  const [isDeleteUnavailable, setDeleteUnavailable] = useState(false);
  const [role, setRole] = useState('');
  const formElement = useRef(null);
  //
  useEffect(() => {
    if (notification?.isEnabled && notification?.type === ERROR_TYPES.SUCCESS) {
      isShow(false);
    }
  }, [notification]);
  //
  useEffect(() => {
    setEditUnavailable(false);
    setDeleteUnavailable(false);
    dispatch(usersActions.getRoles({ organizationId }));
    //
    if (user) {
      setInitialValues({
        email: user?.email,
        firstName: user?.firstName,
        lastName: user?.lastName,
      });
      //
      setRole(
        user?.roles[0].name !== SUPER_ADMIN_ROLE
          ? ROLE_NAMES.filter((userRole) => userRole.key === user?.roles[0].name).map(
              (roleName) => roleName.label
            )
          : ROLE_NAMES[1].label
      );
      //
      if (currentUser.id !== user?.id) {
        if (currentUser?.roles[0].name !== SUPER_ADMIN_ROLE) {
          if (user?.roles[0].name === USER_ROLE && currentUser?.roles[0].name === ADMIN_ROLE) {
            setEditUnavailable(false);
            setDeleteUnavailable(false);
          } else if (
            user?.roles[0].name === ADMIN_ROLE &&
            currentUser?.roles[0].name === ADMIN_ROLE
          ) {
            setEditUnavailable(true);
            setDeleteUnavailable(true);
          } else {
            setEditUnavailable(true);
            setDeleteUnavailable(true);
          }
        }
      } else if (currentUser?.roles[0].name === USER_ROLE || user?.roles[0].name === USER_ROLE) {
        setDeleteUnavailable(true);
      }
    }
  }, [user]);
  //
  const deleteUser = (payload) => {
    dispatch(usersActions.deleteUser(payload));
    setDelete(false);
  };
  //
  return (
    <Box
      xs={12}
      md={4}
      ml={4}
      mt={2}
      component={Grid}
      container
      item
      display="flex"
      direction="column"
      sx={{ backgroundColor: 'white', flexShrink: 0, display: show ? 'flex' : 'none' }}
    >
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={updateUserValidation}
        onSubmit={async (values) => {
          const roleName = ROLE_NAMES.filter((userRole) => userRole.label === role).map(
            (r) => r.key
          );
          const roleId = roleList
            .filter((userRole) => userRole.name === roleName[0])
            .map((key) => key.id);
          dispatch(usersActions.updateUser({ ...values, organizationId, userId }));
          if (roleId) {
            dispatch(usersActions.updateRole({ roles: roleId, organizationId, userId }));
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container direction="row" justifyContent="space-between" px={2} mb={6}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {user?.firstName} {user?.lastName}
              </Typography>
              <Grid>
                {!isEditUnavailable && (
                  <Tooltip title="Update">
                    <IconButton
                      disabled={isSubmitting}
                      onClick={() =>
                        errors.email || errors.firstName || errors.lastName ? '' : setUpdate(true)
                      }
                      color="inherit"
                      size="small"
                    >
                      <Save />
                    </IconButton>
                  </Tooltip>
                )}
                {!isDeleteUnavailable && (
                  <Tooltip title="Delete">
                    <IconButton color="error" size="small" onClick={() => setDelete(true)}>
                      <Trash />
                    </IconButton>
                  </Tooltip>
                )}
                <IconButton color="inherit" size="small" onClick={() => isShow(false)}>
                  <X />
                </IconButton>
              </Grid>
            </Grid>
            <Grid container spacing={2} direction="column">
              {notification?.isEnabled && notification?.type === ERROR_TYPES.ERROR && (
                <Alert mt={2} mb={3} severity={notification?.type}>
                  {notification?.message}
                </Alert>
              )}
              <Grid justifyContent="space-around" alignItems="center" px={4} my={4}>
                <FormControl sx={FormStyles} fullWidth>
                  <TextField
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                    label="Email"
                    variant="outlined"
                    size="large"
                  />
                </FormControl>
              </Grid>

              <Grid justifyContent="space-around" alignItems="center" px={4} my={4}>
                <FormControl sx={FormStyles} fullWidth>
                  <TextField
                    name="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                    error={Boolean(touched.firstName && errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                    label="First name"
                    variant="outlined"
                    size="large"
                  />
                </FormControl>
              </Grid>
              <Grid justifyContent="space-around" alignItems="center" px={4} my={4}>
                <FormControl sx={FormStyles} fullWidth>
                  <TextField
                    name="lastName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                    error={Boolean(touched.lastName && errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                    label="Last name"
                    variant="outlined"
                    size="large"
                  />
                </FormControl>
              </Grid>
              <Grid justifyContent="space-around" alignItems="center" px={4} my={4}>
                <FormControl sx={FormStyles} fullWidth>
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    value={role}
                    label="Role"
                    name="role"
                    onChange={(event) => setRole(event.target.value)}
                    disabled={isDeleteUnavailable}
                  >
                    {ROLE_NAMES?.map((type) => (
                      <MenuItem key={type.key} value={type.label}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <input ref={formElement} style={{ visibility: 'hidden' }} type="submit" />
          </form>
        )}
      </Formik>
      <Modal
        open={isDelete}
        handleClose={() => setDelete(false)}
        title="Delete User"
        content="Are you sure you want to delete the user?"
        handleSuccess={() => deleteUser({ organizationId, userId: user?.id })}
        closeLabel="Cancel"
        successLabel="Delete"
        variant="contained"
        color="error"
      />
      <Modal
        open={isUpdate}
        handleClose={() => setUpdate(false)}
        title="Update Device"
        content="Are you sure you want to update the user ?"
        handleSuccess={() => {
          formElement.current?.click();
          setUpdate(false);
        }}
        closeLabel="Cancel"
        successLabel="Update"
        variant="contained"
        color="primary"
      />
    </Box>
  );
};
//
export default UserDataDrawerView;
