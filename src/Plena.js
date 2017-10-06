import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Agenda from './Agenda';
import Loading from './Loading';
import PlenumStats from './PlenumStats';

import './Plena.css';

class Plena extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }
  componentDidMount() {
    fetch(`./data/plenums.json`)
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        }

        throw new Error(`couldn't load plenums.json`);
      })
      .then(json => {
        this.setState({
          loading: false,
          data: json
        });
      })
      .catch(reason => {
        console.log(reason);
        this.setState({ loading: false });
      });
  }
  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <div className="Plena">
        <div id="top" className="Header">
          <div className="Title">Chronologische Liste der Plenarsitzungen</div>
        </div>
        <div className="Plena-List">
          {this.state.data.map(p => {
            return (
              <div key={p.session} className="Card">
                <div className="Card-Header">
                  <div className="Title">
                    <Link to={`/plenum/${p.session}`}>
                      Sitzung Nr. {p.session}
                    </Link>
                  </div>
                  <div className="SubTitle">{p.date}</div>
                </div>
                <div className="Card-Content">
                  <Agenda items={p.agendaItems} />
                  <PlenumStats data={p.stats} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Plena;
