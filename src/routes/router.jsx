import ROUTES from 'modules/common/constants/route';
import DashboardLayout from 'modules/common/layouts/dashboard';
import { DashboardView } from 'modules/dashboard/components';
import { Page404 } from 'modules/error-pages';

/**
 * Define the routeing structure using array. Here include the nested routeing as well.
 * And also define the auth wrapper and private routers for helping to role based routes
 */
const routes = [
  {
    path: ROUTES.ROOT,
    element: (
      <DashboardLayout />
    ),
    children: [
      {
        path: '',
        element: <DashboardView />,
      },
    ],
  },
  {
    path: ROUTES.NOT_FOUND,
    element: <Page404 />,
  },
];
//
export default routes;
