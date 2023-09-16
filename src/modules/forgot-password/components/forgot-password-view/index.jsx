import { Loader } from 'modules/common/components';
import { selectLoader } from 'modules/forgot-password/selectors';
import { useSelector } from 'react-redux';
import ForgotPasswordForm from 'modules/forgot-password/components/forgot-password-form';

const ForgotPasswordView = () => {
  const loading = useSelector(selectLoader);
  //
  return (
    <Loader loading={loading}>
      <ForgotPasswordForm />
    </Loader>
  );
};
//
export default ForgotPasswordView;
