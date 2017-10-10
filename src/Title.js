import React, { Component } from 'react';

import './Title.css';

class Title extends Component {
  render() {
    return (
      <div className="" id={this.props.id}>
        <div className="Title">{this.props.title}</div>
        <div className="SubTitle">{this.props.subTitle}</div>
      </div>
    );
  }
}

export default Title;
