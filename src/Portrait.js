import React, { Component } from 'react';

import './Portrait.css';

class Portrait extends Component {
  render() {
    const degree = this.props.degree ? this.props.degree : '';
    return (
      <img
        className="Portrait"
        //src={this.props.image_url}
        alt={`${degree} ${this.props.first_name} ${this.props.last_name}`}
      />
    );
  }
}

export default Portrait;
