/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
/**
 * Define the the users feature initial state
 */
export const initialState = {
  loading: false,
  usersList: {},
  roleList: {},
};
/**
 * Here mentioned all the users feature related actions
 */
export const usersSlice = createSlice({
  name: 'feature/users',
  initialState,
  reducers: {
    usersList(state) {
      state.loading = true;
    },
    usersListSucceeded(state, action) {
      state.loading = false;
      state.usersList = action?.payload;
    },
    usersListFailed(state) {
      state.loading = false;
    },
    createAdminUsers(state) {
      state.loading = true;
    },
    createAdminUsersSucceeded(state, action) {
      state.loading = false;
      state.usersList.results = [...state.usersList.results, action?.payload];
    },
    createAdminUsersFailed(state) {
      state.loading = false;
    },
    createGeneralUsers(state) {
      state.loading = true;
    },
    createGeneralUsersSucceeded(state, action) {
      state.loading = false;
      state.usersList.results = [...state.usersList.results, action?.payload];
    },
    createGeneralUsersFailed(state) {
      state.loading = false;
    },
    updateUser(state) {
      state.loading = true;
    },
    updateUserSucceeded(state, action) {
      state.loading = false;
      state.usersList.results = state?.usersList?.results.map((object) =>
        object?.id === action?.payload?.id ? { ...object, ...action.payload } : object
      );
    },
    updateUserFailed(state) {
      state.loading = false;
    },
    updateRole(state) {
      state.loading = true;
    },
    updateRoleSucceeded(state) {
      state.loading = false;
    },
    updateRoleFailed(state) {
      state.loading = false;
    },
    getRoles(state) {
      state.loading = true;
    },
    getRolesSucceeded(state, action) {
      state.loading = false;
      state.roleList = action?.payload?.results;
    },
    getRolesFailed(state) {
      state.loading = false;
    },
    deleteUser(state) {
      state.loading = true;
    },
    deleteUserSucceeded(state, action) {
      state.loading = false;
      state.usersList.results = state?.usersList?.results.filter(
        (object) => object?.id !== action?.payload?.data?.userId
      );
    },
    deleteUserFailed(state) {
      state.loading = false;
    },
  },
});
//
export const { actions: usersActions } = usersSlice;
