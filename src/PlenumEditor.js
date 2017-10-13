import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import AgendaItemPicker from './AgendaItemPicker';
import Contribution from './Contribution';
import Loading from './Loading';
import PlenumHeader from './PlenumHeader';
import { sortById } from './utils/helpers';

import './PlenumEditor.css';

class PlenumEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, invalidId: false };

    this.toggleSpeechForAgendaItem = this.toggleSpeechForAgendaItem.bind(this);
    this.splitSpeech = this.splitSpeech.bind(this);
    this.selectAgendaItem = this.selectAgendaItem.bind(this);
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
    // speech UUID
    const val = evt.target.id;
    // should be an agendaItem UUID
    // TODO: implement
    const selectedAgendaItem = this.state.selectedAgendaItem;
    const idx = this.state.meta.agendaItems.findIndex(i => {
      return i.uuid = selectedAgendaItem;
    });

    // make a copy of the agendaItems
    const agendaItems = this.state.meta.agendaItems.slice();
    // remove the agendaItem we want to update
    const ai = agendaItems.splice(idx, 1)[0];
    const as = new Set(ai.speeches);
    if (as.has(val)) {
      as.delete(val);
    } else {
      as.add(val);
    }

    const updatedSpeeches = Array.from(as);
    // update the speeches array
    ai.speeches = updatedSpeeches;
    // re-insert our update agendaItem
    agendaItems.splice(idx, 0, ai);

    let newMeta = this.state.meta;
    newMeta.agendaItems = agendaItems;
    // this.setState({ meta: newMeta });
    // TODO: send the change to the backend
  }

  splitSpeech(speechId, caretPosition) {
    const cons = this.state.contributions.slice();
    const speech = cons.splice(speechId, 1)[0];
    const partA = speech.text.slice(0, caretPosition);
    const partB = speech.text.slice(caretPosition);

    const id = speech.speech_id;
    // TODO: need new UUID(s)!
    // TODO: update agendaItems! -> add speechB
    let speechA = Object.assign({}, speech);
    speechA.text = partA;
    let speechB = Object.assign({}, speech);
    speechB.text = partB;
    speechB.speech_id = id + 1;

    const newCons = cons.map(c => {
      if (c.speech_id > id) {
        c.speech_id = c.speech_id + 1;
      }
      return c;
    });
    newCons.splice(speechA.speech_id, 0, speechA);
    newCons.splice(speechB.speech_id, 0, speechB);
    console.log(newCons);

    this.setState({ contributions: newCons });
    // TODO: submit change to the backend
  }

  selectAgendaItem(evt) {
    const uuid = evt.target.value;
    if (uuid !== 'dummy') {
      this.setState({ selectedAgendaItem: uuid });
    }
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
        <PlenumHeader {...this.state.meta}>
          <AgendaItemPicker selectAgendaItem={this.selectAgendaItem} agendaItems={this.state.meta.agendaItems} />
        </PlenumHeader>
        <div className="Transcript">
          {this.state.contributions.map(i => {
            const agendaItems = this.agendaItems || [];
            return (
              <div className="" key={i.uuid}>
                <input
                  type="checkbox"
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
