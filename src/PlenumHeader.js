import React, { Component } from 'react';

import Header from './Header';
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
      <Header>
        {this.props.children}
        {/* TODO: add start / end times */}
        <Title subTitle={formatDate(start)}>
          {this.sessionTitle(this.props.sessionNr)}
        </Title>
      </Header>
    );
  }
}

export default PlenumHeader;
