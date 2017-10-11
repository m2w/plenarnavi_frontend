import React, { Component } from 'react';

import './Contribution.css';

class Contribution extends Component {
  paragrafy(str) {
    const parts = str.split('\n');
    return (
      <div className="Text">
        {parts.map((p, idx) => {
          return (
            <p className={p.startsWith('(') ? 'Itallic' : ''} key={`p-${idx}`}>
              {p}
            </p>
          );
        })}
      </div>
    );
  }
  render() {
    if (this.props.editable) {
      return (
        <div className="Row" id={this.props.speech_id}>
          <div className="Speaker">
            {/* TODO: linkify speaker */}
            {this.props.speaker.last_name}, {this.props.speaker.first_name}:
          </div>
          {/* TODO: on select, give option to split */}
          <textarea value={this.props.text} readOnly />
        </div>
      );
    }

    return (
      <div className="Row" id={this.props.speech_id}>
        <div className="Speaker">
          {/* TODO: linkify speaker */}
          {this.props.speaker.last_name}, {this.props.speaker.first_name}:
        </div>
        {this.paragrafy(this.props.text)}
      </div>
    );
  }
}

export default Contribution;
