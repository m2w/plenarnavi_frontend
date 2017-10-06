import React, { Component } from 'react';

// import './PlenumStats.css';

class PlenumStats extends Component {
  row(data) {
    return <div></div>;
  }
  render() {
    let absences = this.props.data.absences;

    return (
      <div className="PlenumStats">
        Abwesende:

        CDU / CSU: {absences["CDU/CSU"]}
        SPD: {absences["SPD"]}
        Linke: {absences["DIE LINKE"]}
        Grüne: {absences["BÜNDNIS 90/DIE GRÜNEN"]}
        FDP: {absences["FDP"]}
        AfD: {absences["AfD"]}
        fraktionslos: {absences["fraktionslos"]}
      </div>
    );
  }
}

export default PlenumStats;
