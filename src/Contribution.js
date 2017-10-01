import React, { Component } from 'react';
import './AgendaItem.css';

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
        <div id={item.id}>
          <div className="Title">
            {item.type} {item.id}
          </div>
          <div className="SubTitle">{item.summary}</div>
        </div>
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
