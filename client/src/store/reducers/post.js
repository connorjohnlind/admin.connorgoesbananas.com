import { POST_SUBMIT, POST_SUCCESS, POST_FAIL } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    // case FETCH_SURVEYS:
    //   return action.payload || false;
    default:
      return state;
  }
}
