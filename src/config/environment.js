/**
 * Define all the .env file related keys
 */
const ENVIRONMENT = {
  BACKEND_API: process.env?.REACT_APP_BACKEND_API,
  APP_NAME: process.env?.REACT_APP_APP_NAME,
  PERSIST_ENCRYPTED_SECRET_KEY: process.env.REACT_APP_PERSIST_ENCRYPTED_SECRET_KEY,
  PERSIST_KEY: process.env.REACT_APP_PERSIST_KEY,
  PERSIST_VERSION: process.env.REACT_APP_PERSIST_VERSION,
};
//
export default ENVIRONMENT;
