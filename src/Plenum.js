import React, { Component } from 'react';
import './Plenum.css';
import Contribution from './Contribution';
import Loading from './Loading';
import PlenumHeader from './PlenumHeader';
import Portrait from './Portrait';
import { Redirect } from 'react-router-dom';

class Plenum extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, invalidId: false };
  }
  componentDidMount() {
    const plenumId = this.props.match.params.id;
    fetch(`/data/${plenumId}.json`)
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error('unable to get plenum data');
      })
      .then(json => {
        this.setState({
          loading: false,
          agendaItems: json.agendaItems,
          contributions: json.contributions,
          date: json.date,
          absentees: json.absentRepresentatives,
          sessionNr: json.session
        });
      })
      .catch(reason => {
        console.log(reason);
        // this.setState({ loading: false });
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
        <PlenumHeader
          agendaItems={this.state.agendaItems}
          sessionNr={this.state.sessionNr}
          date={this.state.date}
        />
        <div id="absentees" className="SubTitle">
          Abwesend waren:
        </div>
        <div className="ListOfAbsentees">
          {this.state.absentees.map(a => {
            return <Portrait person={a} />;
          })}
        </div>
        <div className="Transcript">
          {this.state.contributions.map((i, idx) => {
            return <Contribution key={`contribution-${idx}`} data={i} />;
          })}
        </div>
      </div>
    );
  }
}

export default Plenum;
