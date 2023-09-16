/* eslint-disable no-unused-vars */
import { signInActions } from 'modules/sign-in/slice';

const customMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case signInActions.signIn.type:
      next(action);
      break;
    default:
      next(action);
      break;
  }
};

export default customMiddleware;
