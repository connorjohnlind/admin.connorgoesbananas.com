import axios from 'axios';
import { AUTH_START, AUTH_SUCCESS, AUTH_REVOKE, AUTH_FAIL } from './types';

export const authRevoke = () => ({
  type: AUTH_REVOKE,
});

// handles the token exchange on the backend
export const authInit = () => (async (dispatch) => {
  try {
    dispatch({ type: AUTH_START });
    const auth = await axios.post(``);
    dispatch({ type: AUTH_SUCCESS, payload: auth.token });
    localStorage.setItem('token', auth.data.token);
  } catch (error) {
    dispatch({ type: AUTH_FAIL, payload: error.response });
  }
  window.history.replaceState({}, document.title, '/dashboard');
});

// for revists, where the token is stored in localStorage
export const authRenew = token => (async (dispatch) => {
  try {
    dispatch({ type: AUTH_START });
    const auth = await axios.post(``);
    dispatch({ type: AUTH_SUCCESS, payload: auth.token });
  } catch (error) {
    dispatch({ type: AUTH_FAIL, payload: error.response });
  }
});
