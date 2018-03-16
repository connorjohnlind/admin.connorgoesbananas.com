import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
      <form onSubmit={this.props.handleSubmit(values => this.props.authInit(values))}>
        {this.renderformFields()}
        <button className="contact-submit" type="submit">
          Submit
        </button>
      </form>
    );
  }
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  authInit: PropTypes.func.isRequired,
};

LoginForm = connect( // eslint-disable-line no-class-assign
  null,
  actions,
)(LoginForm);

export default reduxForm({
  validate,
  form: 'loginForm',
})(LoginForm);
