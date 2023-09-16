import * as yup from 'yup';

/**
 * Here mentioned users feature add user validations
 */
export const addUserValidation = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('Email Address is a required field')
    .email('Email address must be valid'),
  username: yup.string().trim().required('Username is a required field'),
  firstName: yup.string().trim().required('First Name is a required field'),
  lastName: yup.string().trim().required('Last Name is a required field'),
  password: yup.string().trim().required('Password is a required field'),
});
/**
 * Here mentioned users feature update user validations
 */
export const updateUserValidation = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('Email Address is a required field')
    .email('Email address must be valid'),
  firstName: yup.string().trim().required('First Name is a required field'),
  lastName: yup.string().trim().required('Last Name is a required field'),
});
