import React from 'react';
import { connect } from 'react-redux';
import formFields from './formfields';
import * as actions from '../../store/actions';
import { withRouter } from 'react-router-dom';

const PostReview = ({ onCancel, formValues, history }) => {
  const reviewFields = formFields.map(({ name, label }) => (
    <div key={name}>
      <label>{label}</label>
      <div>{formValues[name]}</div>
    </div>
  ));

  return (
    <div>
      <h5>Please confirm your entries</h5>
      <div>
        {reviewFields}
      </div>
      <button
        className="yellow darken-3 white-text btn-flat"
        onClick={onCancel}
      >
        Back
      </button>
      <button
        className="green btn-flat white-text right"
        onClick={() => console.log(formValues)}
      >
        Post
      </button>
    </div>
  );
};

const mapStateToProps = state => ({ formValues: state.form.postForm.values });

export default connect(mapStateToProps, actions)(withRouter(PostReview));
