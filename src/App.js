import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Plena from './Plena';
import Plenum from './Plenum';
import PlenumEditor from './PlenumEditor';
import NotFound from './NotFound';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="Content">
            <Switch>
              <Route exact path="/" component={Plena} />
              <Route
                path="/plenum/:electoralPeriod/:sessionNumber"
                component={Plenum}
              />
              <Route
                path="/plenum/:electoralPeriod/:sessionNumber/edit"
                component={PlenumEditor}
              />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
