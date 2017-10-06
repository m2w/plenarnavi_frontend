import React, { Component } from 'react';

import './Agenda.css';

class Agenda extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  toggleItems(evt) {
    evt.preventDefault();
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    if (this.state.expanded) {
      return (
        <div className="Agenda">
          Agenda <i className="fa fa-caret-down" aria-hidden="true" />
        </div>
      );
    }

    return (
      <div className="Agenda">
        {this.props.items.map(i => {
          // TODO: add proper href
          return <a href="">{i.type} {i.id}</a>;
        })}
      </div>
    );
  }
}

export default Agenda;
