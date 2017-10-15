import React, { Component } from 'react';

import './Loading.css';

class Loading extends Component {
  render() {
    return (
      <div className="Loading">
        <i className="fa fa-spinner fa-pulse fa-fw fa-4x" aria-hidden="true" />
        Loading...
      </div>
    );
  }
}

export default Loading;
