import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

import PostField from './PostField';
import formFields from './formfields';

const validate = (values) => {
  const errors = {};

  formFields.forEach(({ name, label }) => {
    if (!values[name]) {
      errors[name] = `${label} Required`;
    }
  });

  return errors;
};

class PostForm extends Component {
  renderFormFields = () => {
    const fields = formFields.map(({ label, type, name, tag }) => ( // eslint-disable-line object-curly-newline, max-len
      <Field
        key={name}
        type={type}
        name={name}
        tag={tag}
        placeholder={label}
        component={PostField}
      />
    ));
    return <div>{fields}</div>;
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onFormSubmit)}>
          {this.renderFormFields()}
          <button>
            <Link to="/" className="">
              Cancel
            </Link>
          </button>
          <button className="" type="submit">
            Next
          </button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  validate,
  form: 'postForm',
  destroyOnUnmount: false,
})(PostForm);
