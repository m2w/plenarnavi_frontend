import React, { Component } from 'react';
import './Plena.css';
import { Link } from 'react-router-dom';
import Loading from './Loading';

class Plena extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }
  componentDidMount() {
    fetch(`/data/plenums.json`)
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
                {/* p.stats, p.agendaItems */}
                <div className="Card-Content">stats here</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Plena;
