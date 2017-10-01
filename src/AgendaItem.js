import React, { Component } from 'react';
import './AgendaItem.css';

class AgendaItem extends Component {
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
    let item = this.props.item;
    return (
      <div>
        <div id={item.uuid} className="AgendaItem">
          {item.title}
        </div>
        <div className="Transcript">
          {item.contributions.map((x, idx) => {
            return (
              <div className="Row" key={`row-${idx}`}>
                <div className="Speaker">
                  {/* TODO: linkify speaker */}
                  {x.speaker.last_name}, {x.speaker.first_name}:
                </div>
                {this.paragrafy(x.speech)}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default AgendaItem;
