import React from 'react';
import PropTypes from 'prop-types';

const NewPostField = (props) => {
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
    <div>
      <Tag
        placeholder={placeholderText}
        className={placeholderStyle}
        type={props.type}
        {...props.input}
      />
    </div>
  );
};

NewPostField.propTypes = {
  input: PropTypes.shape({}).isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.isRequired,
  }).isRequired,
  placeholder: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default NewPostField;
