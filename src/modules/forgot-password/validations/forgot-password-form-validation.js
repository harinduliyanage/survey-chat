import * as yup from 'yup';
/**
 * Validate the forgot password email (Requested email)
 */
const forgetEmailFormValidation = yup.object().shape({
  email: yup.string().trim().required('Email is a required field'),
});
//
export default forgetEmailFormValidation;
