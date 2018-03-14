import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import post from './post';

export default combineReducers({
  form: reduxForm,
  post,
});
