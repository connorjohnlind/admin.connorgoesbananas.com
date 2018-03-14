import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';

import PostForm from './PostForm';
import PostReview from './PostReview';

class PostNew extends Component {
  state = {
    showFormReview: false,
  }
  renderContent() {
    if (this.state.showFormReview) {
      return (
        <PostReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }
    return (
      <PostForm
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
})(PostNew);
