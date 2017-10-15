import React, { Component } from 'react';

import './Contribution.css';

const noop = () => {
  return;
};

class Contribution extends Component {
  constructor(props) {
    super(props);
    this.prompForSplit = this.promptForSplit.bind(this);
    this.paragrafy = this.paragrafy.bind(this);

    this.state = { editable: false };
  }

  paragrafy(str) {
    const parts = str.split('\n');
    return (
      <div className="Text">
        {parts.map((p, idx) => {
          const handler = this.props.editable ? this.promptForSplit(idx) : noop;
          return (
            <p
              className={p.startsWith('(') ? 'Itallic' : ''}
              key={`p-${idx}`}
              onClick={handler}
            >
              {p}
            </p>
          );
        })}
      </div>
    );
  }

  promptForSplit(paragraphIdx) {
    return evt => {
      const selection = document.getSelection();
      // TODO: style
      const split = window.confirm('split?');
      if (split) {
        this.props.handleSplit(
          this.props.speech_id,
          paragraphIdx,
          selection.anchorOffset
        );
      }
    };
  }

  render() {
    return (
      <div className="Row" id={this.props.speech_id}>
        <div className="Speaker">
          {/* TODO: linkify speaker */}
          {this.props.person.last_name}, {this.props.person.first_name}:
        </div>
        {this.paragrafy(this.props.text)}
      </div>
    );
  }
}

export default Contribution;
