/**
 * Here mentioned users feature request structure
 */
const API = {
  GET_USER_LIST: {
    path: '/organizations/:organizationId/users?:query',
    method: 'GET',
  },
  GET_ROLES: {
    path: '/organizations/:organizationId/roles',
    method: 'GET',
  },
  POST_USERS: {
    path: '/organizations/:organizationId/users',
    method: 'POST',
  },
  POST_USERS_ADMIN: {
    path: '/organizations/:organizationId/users/admin',
    method: 'POST',
  },
  POST_USERS_GENERAL: {
    path: '/organizations/:organizationId/users/general',
    method: 'POST',
  },
  PATCH_USER: {
    path: '/organizations/:organizationId/users/:userId',
    method: 'PATCH',
  },
  PATCH_ROLE: {
    path: '/organizations/:organizationId/users/:userId/assign-roles',
    method: 'PATCH',
  },
  DELETE_USER: {
    path: '/organizations/:organizationId/users/:userId',
    method: 'DELETE',
  },
};
//
export default API;
