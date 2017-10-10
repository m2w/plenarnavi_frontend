import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { sortById } from './utils/helpers';

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

    const items = sortById(this.props.agendaItems, 'agenda_id');
    const sid = this.props.session_number;
    const eid = this.props.electoral_period;
    return (
      <div className="Agenda">
        <div onClick={this.toggleItems}>
          <i className="fa fa-caret-up" aria-hidden="true" /> Agenda
        </div>
        <ul>
          {items.map(i => {
            return (
              <li key={i.uuid}>
                <p>
                  <Link
                    to={{
                      pathname: `/plenum/${eid}/${sid}`,
                      search: `item=${i.agenda_id}`,
                      state: {
                        item: i.id
                      }
                    }}
                  >
                    {i.name}
                  </Link>
                </p>
                <p>{i.summary}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Agenda;
