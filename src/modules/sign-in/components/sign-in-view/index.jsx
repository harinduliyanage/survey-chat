import './index.scss';
import { useSelector } from 'react-redux';
import { selectLoader } from 'modules/sign-in/selectors';
import { useEffect } from 'react';
import { Loader } from 'modules/common/components';
import ROUTE from 'modules/common/constants/route';
import { useNavigate } from 'react-router-dom';
import useIsAuthenticated from 'modules/common/auth/hooks/use-is-authenticated';
import SignInFormView from 'modules/sign-in/components/sign-in-form';

const SignInView = () => {
  const { isAuthenticated } = useIsAuthenticated();
  //
  const navigate = useNavigate();
  //
  const loading = useSelector(selectLoader);
  //
  useEffect(() => {
    if (isAuthenticated()) {
      navigate(ROUTE.DASHBOARD);
    }
  }, [isAuthenticated, navigate]);
  //
  return (
    <Loader loading={loading}>
      <SignInFormView />
    </Loader>
  );
};
//
export default SignInView;
