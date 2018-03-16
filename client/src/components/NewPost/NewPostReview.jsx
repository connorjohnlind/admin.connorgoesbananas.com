import React from 'react';
import { connect } from 'react-redux';
import he from 'he';
import { withRouter } from 'react-router-dom';

import formFields from './formfields';
import * as actions from '../../store/actions';

const NewPostReview = ({ onCancel, formValues, submitForm, history }) => {
  const reviewFields = formFields.map(({ name, label }) => (
    <div key={name}>
      <label>{label}</label>
      <div>{formValues[name]}</div>
    </div>
  ));
  const submitFormHandler = () => {
    formValues.html = he.encode(formValues.html);
    submitForm(formValues, history);
  };
  return (
    <div>
      <h5>Please confirm your entries</h5>
      <div>
        {reviewFields}
      </div>
      <button
        className=""
        onClick={onCancel}
      >
        Back
      </button>
      <button
        className=""
        onClick={() => submitFormHandler()}
      >
        Post
      </button>
    </div>
  );
};

const mapStateToProps = state => ({ formValues: state.form.postForm.values });

export default connect(mapStateToProps, actions)(withRouter(NewPostReview));
