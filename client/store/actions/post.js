import axios from 'axios';
import { POST_START, POST_SUCCESS, POST_FAIL } from './types';

export const submitPost = (values, history) => async (dispatch) => {
  try {
    await axios.post('/api/post', values);
    history.push('/dashboard');
    dispatch({ type: POST_SUCCESS });
  } catch (error) {
    dispatch({ type: POST_FAIL, payload: error.response });
  }
};

export const submitForm = (values, history) => (dispatch) => {
  dispatch({ type: POST_START });
  dispatch(submitPost(values, history));
};
