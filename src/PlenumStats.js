import React, { Component } from 'react';

// import './PlenumStats.css';

class PlenumStats extends Component {
  row(data) {
    return <div />;
  }
  render() {
    let absences = this.props.data.absences;

    return (
      <div className="PlenumStats">
        Abwesende:
        <ul>
          <li>CDU / CSU: {absences['CDU/CSU']}</li>
          <li>SPD: {absences['SPD']}</li>
          <li>Linke: {absences['DIE LINKE']}</li>
          <li>Grüne: {absences['BÜNDNIS 90/DIE GRÜNEN']}</li>
          <li>FDP: {absences['FDP']}</li>
          <li>AfD: {absences['AfD']}</li>
          <li>fraktionslos: {absences['fraktionslos']}</li>
        </ul>
      </div>
    );
  }
}

export default PlenumStats;
