import React, { Component } from 'react';
import './PlenumHeader.css';
import { Link } from 'react-router-dom';

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
    return (
      <div id="top" className="Header">
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
              <a href="#absentees">Abwesende</a>
            </div>
            {this.props.agendaItems.map(a => {
              return (
                <div key={a.id} className="ToC-Item">
                  <a href={`#${a.id}`}>
                    {a.type} {a.id}
                  </a>
                </div>
              );
            })}
            <div className="ToC-Item is-minor">
              <a href="#top">
                <i className="fa fa-long-arrow-up fa-lg" aria-hidden="true" />
                Zum Anfang
              </a>
            </div>
          </div>
        </div>
        <div className="Title">{this.sessionTitle(this.props.sessionNr)}</div>
        <div className="SubTitle">{this.props.date}</div>
      </div>
    );
  }
}

export default PlenumHeader;
