import * as yup from 'yup';

const signInFormValidation = yup.object().shape({
  username: yup.string().trim().required('Username is a required field'),
  password: yup.string().trim().required('Password is a required field'),
});
//
export default signInFormValidation;
