/* eslint-disable import/no-cycle */
import { useLocation } from 'react-router-dom';
import reduceChildRoutes from './reduce-child-routes';

const SidebarNavList = (props) => {
  const { pages, depth } = props;
  const router = useLocation();
  const currentRoute = router.pathname;

  const childRoutes = pages.reduce(
    (items, page) => reduceChildRoutes({ items, page, currentRoute, depth }),
    []
  );

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{childRoutes}</>;
};

export default SidebarNavList;
