import * as yup from 'yup';
/**
 * Validate the new password structure
 */
const resetPasswordValidation = yup.object().shape({
  password: yup
    .string()
    .trim()
    .required('Password is required field')
    .min(8, 'Password must contain at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/,
      'Password should contain One Uppercase, One Lowercase and One Number'
    ),
  confirmPassword: yup
    .string()
    .trim()
    .required('Confirm Password is a required field')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});
//
export default resetPasswordValidation;
