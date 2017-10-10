import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Contribution from './Contribution';
import Loading from './Loading';
import PlenumHeader from './PlenumHeader';
import Portrait from './Portrait';
import { sortById } from './utils/helpers';

import './Plenum.css';

class Plenum extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, invalidId: false };
  }

  componentDidUpdate(prevProps, prevState) {
    let lstate = this.props.location.state;
    let item = lstate ? lstate.item : undefined;
    // FIXME: quick hack
    if (item !== undefined) {
      let n = document.getElementById(item);
      if (n !== null) {
        window.scrollTo(0, n.offsetTop);
      }
    }
  }

  componentDidMount() {
    const sid = this.props.match.params.sessionNumber;
    const eid = this.props.match.params.electoralPeriod;
    fetch(`./data/${eid}${sid}.json`)
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error('unable to get plenum data');
      })
      .then(json => {
        const agendaItems = sortById(json.agendaItems, 'agenda_id');
        const speeches = sortById(json.speeches, 'speech_id');

        this.setState({
          loading: false,
          meta: {
            agendaItems: agendaItems,
            start: json.start_time,
            end: json.end_time,
            electoralPeriod: json.electoral_period,
            sessionNr: json.session_number
          },
          contributions: speeches,
          absentees: json.absentees
        });
      })
      .catch(reason => {
        console.error(reason);
        this.setState({ invalidId: true });
      });
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    if (this.state.invalidId) {
      return <Redirect to="/not-found" />;
    }

    return (
      <div>
        <PlenumHeader {...this.state.meta} />
        <div id="absentees" className="SubTitle">
          Abwesend waren:
        </div>
        <div className="ListOfAbsentees">
          {this.state.absentees.map(a => {
            return <Portrait key={a.uuid} {...a} />;
          })}
        </div>
        <div className="Transcript">
          {this.state.contributions.map(i => {
            return <Contribution key={i.uuid} {...i} />;
          })}
        </div>
      </div>
    );
  }
}

export default Plenum;
