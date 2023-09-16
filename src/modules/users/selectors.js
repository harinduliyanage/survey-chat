import { createSelector } from '@reduxjs/toolkit';
import { initialState } from './slice';

const selectDomain = (state) => state['feature/users'] || initialState;

/**
 * Getting the loader state into the component
 */
export const selectLoader = createSelector([selectDomain], (usersState) => usersState.loading);
/**
 * Getting the users list state into the component
 */
export const selectUsers = createSelector([selectDomain], (usersState) => usersState?.usersList);
/**
 * Getting the roles list state into the component
 */
export const selectRoleList = createSelector([selectDomain], (usersState) => usersState.roleList);
/**
 * Getting the filtered user by user id state into the component
 */
const getFirstParam = (_, param) => param;
export const selectUserById = createSelector(
  [selectUsers, getFirstParam],
  (filteredUsers, userId) => filteredUsers?.results?.filter((user) => user.id === userId)[0]
);
