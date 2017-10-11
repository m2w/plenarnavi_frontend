import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Contribution from './Contribution';
import Loading from './Loading';
import PlenumHeader from './PlenumHeader';
import Portrait from './Portrait';
import { sortById } from './utils/helpers';

import './PlenumEditor.css';

// TODO: select agendaitem from list, then select speeches to attach it to

class PlenumEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, invalidId: false };

    this.toggleSpeechForAgendaItem = this.toggleSpeechForAgendaItem.bind(this);
    this.splitSpeech = this.splitSpeech.bind(this);
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

  toggleSpeechForAgendaItem(evt) {
    const val = evt.target.value;
    // this.state.meta.agendaItems
    // should be an agendaItem UUID
    const selectedAgendaItem = undefined;
    // TODO: update data and send the change to the backend
  }

  splitSpeech(speechId, caretPosition) {
    // TODO: update data and submit change to the backend
    console.log(speechId, caretPosition);
    // this.state.contributions[speechId]
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    if (this.state.invalidId) {
      return <Redirect to="/not-found" />;
    }

    // should be an agendaItem UUID
    const selectedAgendaItem = undefined;

    return (
      <div>
        <PlenumHeader {...this.state.meta} />
        <div className="Transcript">
          {this.state.contributions.map(i => {
            const agendaItems = this.agendaItems || [];
            return (
              <div className="" key={i.uuid}>
                <option
                  id={i.uuid}
                  onChange={this.toggleSpeechForAgendaItem}
                  value={agendaItems.includes(selectedAgendaItem) ? true : false}
                />
                <Contribution handleSplit={this.splitSpeech} editable {...i} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default PlenumEditor;
