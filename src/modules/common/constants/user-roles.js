import { ADMIN_ROLE, SUPER_ADMIN_ROLE, USER_ROLE } from 'modules/common/constants/roles';
/**
 * User roles for dropdowns
 */
const ROLE_NAMES = [
  { label: 'General User', key: USER_ROLE },
  { label: 'Admin User', key: ADMIN_ROLE },
  { label: 'Super Admin User', key: SUPER_ADMIN_ROLE },
];
//
export default ROLE_NAMES;
