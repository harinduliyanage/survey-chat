/* eslint-disable import/no-cycle */
import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'modules/common/utils/request';
import { usersActions } from './slice';
import API from './constants';

/**
 * Users list generator function to get users list
 * @param {*} param0
 */
export function* usersListGenerator({ payload }) {
  try {
    const response = yield call(request, API.GET_USER_LIST, payload);
    yield put(usersActions.usersListSucceeded(response));
  } catch (error) {
    yield put(usersActions.usersListFailed(error?.message));
  }
}
/**
 * Admin users generator function to create admin user
 * @param {*} param0
 */
export function* adminUsersGenerator({ payload }) {
  try {
    const response = yield call(request, API.POST_USERS_ADMIN, payload);
    yield put(usersActions.createAdminUsersSucceeded(response));
  } catch (error) {
    yield put(usersActions.createAdminUsersFailed(error?.message));
  }
}
/**
 * General users generator function to create general user
 * @param {*} param0
 */
export function* generalUsersGenerator({ payload }) {
  try {
    const response = yield call(request, API.POST_USERS_GENERAL, payload);
    yield put(usersActions.createGeneralUsersSucceeded(response));
  } catch (error) {
    yield put(usersActions.createGeneralUsersFailed(error?.message));
  }
}
/**
 * Get roles generator function to get roles
 * @param {*} param0
 */
export function* getRolesGenerator({ payload }) {
  try {
    const response = yield call(request, API.GET_ROLES, payload);
    yield put(usersActions.getRolesSucceeded(response));
  } catch (error) {
    yield put(usersActions.getRolesFailed(error?.message));
  }
}
/**
 * Update role generator function to update user role
 * @param {*} param0
 */
export function* updateUserGenerator({ payload }) {
  try {
    const response = yield call(request, API.PATCH_USER, payload);
    yield put(usersActions.updateUserSucceeded(response));
  } catch (error) {
    yield put(usersActions.updateUserFailed(error?.message));
  }
}
/**
 * Update role generator function to update user role
 * @param {*} param0
 */
export function* updateRoleGenerator({ payload }) {
  try {
    const response = yield call(request, API.PATCH_ROLE, payload);
    yield put(usersActions.updateRoleSucceeded(response));
  } catch (error) {
    yield put(usersActions.updateRoleFailed(error?.message));
  }
}
/**
 * Delete user generator function to delete user
 * @param {*} param0
 */
export function* deleteUserGenerator({ payload }) {
  try {
    const response = yield call(request, API.DELETE_USER, payload);
    yield put(usersActions.deleteUserSucceeded({ response, data: payload }));
  } catch (error) {
    yield put(usersActions.deleteUserFailed(error?.message));
  }
}
//
export function* userSaga() {
  yield takeLatest(usersActions.usersList.type, usersListGenerator);
  yield takeLatest(usersActions.createAdminUsers.type, adminUsersGenerator);
  yield takeLatest(usersActions.createGeneralUsers.type, generalUsersGenerator);
  yield takeLatest(usersActions.updateUser.type, updateUserGenerator);
  yield takeLatest(usersActions.updateRole.type, updateRoleGenerator);
  yield takeLatest(usersActions.deleteUser.type, deleteUserGenerator);
  yield takeLatest(usersActions.getRoles.type, getRolesGenerator);
}

export default userSaga;
