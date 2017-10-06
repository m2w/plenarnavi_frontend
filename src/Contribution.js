import React, { Component } from 'react';

import Title from './Title';

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
    let item = this.props.data;
    if (item.speaker === undefined) {
      return (
        <Title id={item.id} title={`${item.type} ${item.id}`} subTitle={item.summary} />
      );
    }

    return (
      <div className="Row">
        <div className="Speaker">
          {/* TODO: linkify speaker */}
          {item.speaker.last_name}, {item.speaker.first_name}:
        </div>
        {this.paragrafy(item.speech)}
      </div>
    );
  }
}

export default Contribution;
