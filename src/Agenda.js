import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Agenda.css';

class Agenda extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };

    this.toggleItems = this.toggleItems.bind(this);
  }

  toggleItems(evt) {
    evt.preventDefault();
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    if (!this.state.expanded) {
      return (
        <div className="Agenda" onClick={this.toggleItems}>
          <i className="fa fa-caret-down" aria-hidden="true" /> Agenda
        </div>
      );
    }

    const sid = this.props.session;
    return (
      <div className="Agenda">
        <div onClick={this.toggleItems}>
          <i className="fa fa-caret-up" aria-hidden="true" /> Agenda
        </div>
        <ul>
          {this.props.items.map(i => {
            return (
              <li>
                <Link to={{
                  pathname: `/plenum/${sid}`,
                  search: `item=${i.id}`,
                  state: {
                    item: i.id
                  }
                }} >
                  {i.type} {i.id}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Agenda;
