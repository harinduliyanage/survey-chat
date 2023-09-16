import { useSelector } from 'react-redux';
import { Loader } from 'modules/common/components';
import { selectLoader } from 'modules/dashboard/selectors';

const DashboardView = () => {
  const loading = useSelector(selectLoader);
  //
  return (
    <Loader loading={loading}>
      <span>Dashboard</span>
    </Loader>
  );
};
//
export default DashboardView;
