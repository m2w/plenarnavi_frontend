import React, { Component } from 'react';
import './Portrait.css';

class Portrait extends Component {
  render() {
    // TODO: implement
    const p = this.props.person;
    return (
      <div className="Portrait">
        {p.last_name}, {p.first_name}
      </div>
    );
  }
}

export default Portrait;
