import React, { Component } from 'react';

import './AgendaItemPicker.css';

class AgendaItemPicker extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }

  render() {
    return (
      <div className="AgendaItemPicker">
        {/* TODO: multiple select */}
        <select name="AgendaItems" onChange={this.props.selectAgendaItem}>
          <option value="dummy">Tagesordnungspunkt auswählen</option>
          {this.props.agendaItems.map(i => {
            return (
              <option key={i.uuid} value={i.uuid}>
                {i.name}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

export default AgendaItemPicker;
