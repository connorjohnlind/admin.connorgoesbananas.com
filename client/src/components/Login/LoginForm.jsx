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
    return (
      <form onSubmit={this.props.handleSubmit(values => this.props.authLogin(values, this.props.history))}>
        {this.renderformFields()}
        <button className="contact-submit" type="submit">
          Login
        </button>
      </form>
    );
  }
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  authLogin: PropTypes.func.isRequired,
};

LoginForm = connect( // eslint-disable-line no-class-assign
  null,
  actions,
)(withRouter(LoginForm));

export default reduxForm({
  validate,
  form: 'loginForm',
})(LoginForm);
