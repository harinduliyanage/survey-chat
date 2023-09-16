import { createSelector } from '@reduxjs/toolkit';
import { initialState } from './slice';

const selectDomain = (state) => state['feature/sign-in'] || initialState;
/**
 * Getting entire sign in state into the component
 */
export const selectSignInState = createSelector([selectDomain], (sighInState) => sighInState);
/**
 * Getting the loader state into the component
 */
export const selectLoader = createSelector([selectDomain], (sighInState) => sighInState.loading);
