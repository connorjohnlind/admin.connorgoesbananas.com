import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';

import NewPostForm from './NewPostForm';
import NewPostReview from './NewPostReview';

class NewPostNew extends Component {
  state = {
    showFormReview: false,
  }
  renderContent() {
    if (this.state.showFormReview) {
      return (
        <NewPostReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }
    return (
      <NewPostForm
        onFormSubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }
  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

export default reduxForm({
  form: 'postForm',
})(NewPostNew);
