import { POST_START, POST_SUCCESS, POST_FAIL } from '../actions/types';
import updateObject from '../../utils/updateObject';

const initialState = {
  complete: null,
  error: null,
  loading: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_START:
      return updateObject(state, {
        loading: true,
      });
    case POST_SUCCESS:
      return updateObject(state, {
        complete: true,
        error: null,
        loading: false,
      });
    case POST_FAIL:
      return updateObject(state, {
        complete: true,
        error: action.payload,
        loading: false,
      });
    default:
      return state;
  }
};

export default reducer;
