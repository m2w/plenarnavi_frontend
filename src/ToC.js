import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { scrollTop } from './utils/dom';

import './ToC.css';

class ToC extends Component {
  constructor(props) {
    super(props);
    this.state = { tocVisible: true };

    this.toggleToC = this.toggleToC.bind(this);
  }

  toggleToC(evt) {
    evt.preventDefault();
    this.setState({ tocVisible: !this.state.tocVisible });
  }

  render() {
    return (
      <div className="TableOfContents">
        <div className="Burger" onClick={this.toggleToC}>
          <i className="fa fa-list-ol fa-lg" aria-hidden="true" />
        </div>
        <div className={`ToC ${this.state.tocVisible ? '' : 'hidden'}`}>
          <div className="ToC-Header">
            <Link to="/" className="ToC-Home unstyled">
              <i className="fa fa-home fa-lg" aria-hidden="true" />
            </Link>
            Inhaltsverzeichnis
            <span className="ToC-Close" onClick={this.toggleToC}>
              <i className="fa fa-times fa-lg" aria-hidden="true" />
            </span>
          </div>
          <div className="ToC-Contents">
            <div className="ToC-Item">
              <a href="#absentees" onClick={scrollTop}>Abwesende</a>
            </div>
            {this.props.agendaItems.map(a => {
              return (
                <div key={a.uuid} className="ToC-Item">
                  <Link
                    to={{
                      search: `item=${a.agenda_id}`,
                      state: {
                        item: a.agenda_id
                      }
                    }}
                    replace
                  >
                    {a.name}
                  </Link>
                </div>
              );
            })}
            <div className="ToC-Item is-minor">
              <a href="#top" onClick={scrollTop}>
                <i className="fa fa-long-arrow-up fa-lg" aria-hidden="true" />
                Zum Anfang</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ToC;
