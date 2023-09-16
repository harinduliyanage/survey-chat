import { Loader } from 'modules/common/components';
import { selectLoader } from 'modules/reset-password/selectors';
import { useSelector } from 'react-redux';
import ResetPasswordForm from 'modules/reset-password/components/reset-password-form';

const ResetPasswordView = () => {
  const loading = useSelector(selectLoader);
  //
  return (
    <Loader loading={loading}>
      <ResetPasswordForm />
    </Loader>
  );
};
//
export default ResetPasswordView;
