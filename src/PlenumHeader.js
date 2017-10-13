import React, { Component } from 'react';

import Title from './Title';
import { formatDate } from './utils/format';

import './PlenumHeader.css';

class PlenumHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { tocVisible: true };

    this.toggleToC = this.toggleToC.bind(this);
  }

  sessionTitle(sessionNr) {
    return `Plenarprotokoll der ${sessionNr}. Sitzung`;
  }

  toggleToC(evt) {
    evt.preventDefault();
    this.setState({ tocVisible: !this.state.tocVisible });
  }

  render() {
    const start = new Date(this.props.start);
    return (
      <div id="top" className="Header">
        {this.props.children}
        {/* TODO: add start / end times */}
        <Title
          title={this.sessionTitle(this.props.sessionNr)}
          subTitle={formatDate(start)}
        />
      </div>
    );
  }
}

export default PlenumHeader;
