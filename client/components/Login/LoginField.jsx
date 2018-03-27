import React from 'react';
import PropTypes from 'prop-types';

import './LoginField.scss';

const LoginField = (props) => {
  const Tag = `${props.tag}`;

  let placeholderText;
  let placeholderStyle;

  if (props.meta.touched && props.meta.error) {
    placeholderText = props.meta.touched && props.meta.error;
    placeholderStyle = 'validation-error';
  } else {
    placeholderText = props.placeholder;
  }

  return (
    <div className="field-container">
      <Tag
        placeholder={placeholderText}
        className={`${placeholderStyle} field`}
        type={props.type}
        {...props.input}
      />
    </div>
  );
};

LoginField.propTypes = {
  input: PropTypes.shape({}).isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.isRequired,
  }).isRequired,
  placeholder: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default LoginField;
