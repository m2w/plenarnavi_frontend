import React, { Component } from 'react';
import Textarea from 'react-textarea-autosize';

import './Contribution.css';

class Contribution extends Component {
  constructor(props) {
    super(props);
    this.prompForSplit = this.prompForSplit.bind(this);
  }

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

  doubleLineBreaks(text) {
    return text.split('\n').map(s => {
      return s.trim();
    }).join('\n\n');
  }

  prompForSplit(evt) {
    const selStart = evt.target.selectionStart;
    // TODO: style
    const split = window.confirm('split?');
    if (split) {
      this.props.handleSplit(this.props.speech_id, selStart);
    }
  }

  render() {
    if (this.props.editable) {
      return (
        <div className="Row" id={this.props.speech_id}>
          <div className="Speaker">
            {/* TODO: linkify speaker */}
            {this.props.speaker.last_name}, {this.props.speaker.first_name}:
          </div>
          <Textarea className="EditableText" value={this.doubleLineBreaks(this.props.text)} onClick={this.prompForSplit} readOnly />
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
