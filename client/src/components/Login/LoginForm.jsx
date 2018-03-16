import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import * as actions from '../../store/actions';
import LoginField from './LoginField';
import formFields from './formFields';

const validate = (values) => {
  const errors = {};

  formFields.forEach(({ name, label }) => {
    if (!values[name]) {
      errors[name] = `${label} Required`;
    }
  });

  return errors;
};

class LoginForm extends Component {
  renderformFields = () => {
    const fields = formFields.map(({ label, type, name, tag }) => ( // eslint-disable-line object-curly-newline, max-len
      <Field
        key={name}
        type={type}
        name={name}
        tag={tag}
        placeholder={label}
        component={LoginField}
      />
    ));
    return <div>{fields}</div>;
  }
  render() {
    const {
      err, history, handleSubmit, authLogin,
    } = this.props;
    return (
      <form onSubmit={handleSubmit(vals => authLogin(vals, history))}>
        {this.renderformFields()}
        <button className="btn waves-effect waves-light" type="submit">
          Login
        </button>
        <p>{err}</p>
      </form>
    );
  }
}

LoginForm.propTypes = {
  err: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
  authLogin: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
  err: null,
};

LoginForm = connect( // eslint-disable-line no-class-assign
  null,
  actions,
)(withRouter(LoginForm));

export default reduxForm({
  validate,
  form: 'loginForm',
  destroyOnUnmount: true,
})(LoginForm);
