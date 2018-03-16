import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import auth from './auth';
import post from './post';

export default combineReducers({
  auth,
  form: reduxForm,
  post,
});
