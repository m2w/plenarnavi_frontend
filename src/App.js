import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Plena from './Plena';
import Plenum from './Plenum';
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
              <Route path="/plenum/:id" component={Plenum} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
