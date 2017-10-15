import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import * as uuid from 'uuid/v4';

import AgendaItemPicker from './AgendaItemPicker';
import Contribution from './Contribution';
import Loading from './Loading';
import PlenumHeader from './PlenumHeader';
import { sortById } from './utils/helpers';

import './PlenumEditor.css';

class PlenumEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      invalidId: false,
      selectedAgendaItem: 'dummy'
    };

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
        const agendaItems = sortById(json.agenda_items, 'agenda_id');
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
    const speechUUID = evt.target.id;
    // agendaItem UUID
    const selectedAgendaItem = this.state.selectedAgendaItem;
    const idx = this.state.meta.agendaItems.findIndex(i => {
      return i.uuid === selectedAgendaItem;
    });

    // grab the speech corresponding to the UUID
    const speech = this.state.contributions.find(c => {
      return c.uuid === speechUUID;
    });

    // make a copy of the agendaItems
    const agendaItems = this.state.meta.agendaItems.slice();
    // remove the agendaItem we want to update
    const ai = agendaItems.splice(idx, 1)[0];
    const as = new Set(ai.speeches);
    if (as.has(speechUUID)) {
      speech.agenda_item_uuid = undefined;
      as.delete(speechUUID);
    } else {
      speech.agenda_item_uuid = selectedAgendaItem;
      as.add(speechUUID);
    }

    const updatedSpeeches = Array.from(as);
    // update the speeches array
    ai.speeches = updatedSpeeches;
    // re-insert our updated agendaItem
    agendaItems.splice(idx, 0, ai);

    let newMeta = Object.assign({}, this.state.meta);
    newMeta.agendaItems = agendaItems;

    fetch(`/speeches/${speechUUID}`, {
      method: 'PUT',
      body: JSON.stringify(speech)
    }).then(resp => {
      console.log(resp);
      this.setState({ meta: newMeta });
    });
  }

  splitSpeech(speechId, paragraphIdx, caretPosition) {
    const cons = this.state.contributions.slice();
    const speech = cons.splice(speechId, 1)[0];
    const paragraphs = speech.text.split('\n');
    const firstSection = paragraphs.slice(0, paragraphIdx).join('\n');
    // FIXME: if paragraphIdx is last paragraph
    const secondSection = paragraphs.slice(paragraphIdx + 1).join('\n');
    const p = paragraphs[paragraphIdx];

    // FIXME the \n is optional if the section is empty
    const partA = `${firstSection}\n${p.substring(0, caretPosition)}`;
    const partB = `${p.substring(caretPosition)}\n${secondSection}`;

    const id = speech.speech_id;

    let speechA = Object.assign({}, speech);
    speechA.text = partA;
    let speechB = Object.assign({}, speech);
    speechB.text = partB;
    speechB.uuid = uuid();
    speechB.speech_id = id + 1;

    const newCons = cons.map(c => {
      if (c.speech_id > id) {
        c.speech_id = c.speech_id + 1;
      }
      return c;
    });
    newCons.splice(speechA.speech_id, 0, speechA);
    newCons.splice(speechB.speech_id, 0, speechB);

    let a = fetch(`/speeches/${speechA.uuid}`, {
      method: 'PUT',
      body: JSON.stringify(speechA)
    });
    let b = fetch('/speeches/', {
      method: 'POST',
      body: JSON.stringify(speechB)
    });
    Promise.all([a, b]).then(result => {
      console.log('done here');
      console.log(result);
      this.setState({ contributions: newCons });
    });
  }

  selectAgendaItem(evt) {
    const uuid = evt.target.value;
    this.setState({ selectedAgendaItem: uuid });
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
        <PlenumHeader {...this.state.meta}>
          <AgendaItemPicker
            selectAgendaItem={this.selectAgendaItem}
            agendaItems={this.state.meta.agendaItems}
          />
        </PlenumHeader>
        <div className="Transcript">
          {this.state.contributions.map(i => {
            const checked = i.agenda_item_uuid === this.state.selectedAgendaItem ? true : false;
            return (
              <div className="" key={i.uuid}>
                <input
                  type="checkbox"
                  id={i.uuid}
                  onChange={this.toggleSpeechForAgendaItem}
                  checked={checked}
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
