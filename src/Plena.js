import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Agenda from './Agenda';
import Header from './Header';
import Loading from './Loading';
import Title from './Title';
// import PlenumStats from './PlenumStats';
import { formatDate } from './utils/format';

import './Plena.css';

class Plena extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }
  componentDidMount() {
    fetch(`./data/sessions.json`)
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
        <Header>
          <Title>Chronologische Liste der Plenarsitzungen</Title>
        </Header>
        <div className="Plena-List">
          {this.state.data.map(p => {
            let start = new Date(p.start_time);

            return (
              <div key={p.uuid} className="Card">
                <div className="Card-Header">
                  <Title subTitle={formatDate(start)}>
                    <Link
                      to={`/plenum/${p.electoral_period}/${p.session_number}`}
                    >
                      Sitzung Nr. {p.session_number}
                    </Link>
                  </Title>
                </div>
                <div className="Card-Content">
                  <Agenda {...p} />
                  {/* <PlenumStats data={p.stats} /> */}
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
