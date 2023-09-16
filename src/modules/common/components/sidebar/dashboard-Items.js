import ROUTES from 'modules/common/constants/route';
import { Layout, Sliders, Users } from 'react-feather';

const getDashboardItems = () => {
  const pagesSection = [
    {
      href: ROUTES.DASHBOARD,
      icon: Sliders,
      title: 'Dashboard',
    },
    {
      href: ROUTES.DASHBOARD,
      icon: Layout,
      title: 'Test',
      children: [
        {
          href: ROUTES.DEVICES_LOGS,
          title: 'Test 1',
        },
        {
          href: ROUTES.DEVICES_REPORT,
          title: 'Test 2',
        },
      ],
    },
    {
      href: ROUTES.USERS,
      icon: Users,
      title: 'Users',
    },
  ];
  return [
    {
      title: 'React Boilerplate',
      pages: pagesSection,
    },
  ];
};
//
export default getDashboardItems;
