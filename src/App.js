import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';

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
          <Helmet>
            <title>PlenarNavi</title>
            <meta name="description" content="TODO" />
          </Helmet>
          <div className="Content">
            <Switch>
              <Route exact path="/" component={Plena} />
              <Route
                path="/plenum/:electoralPeriod/:sessionNumber/edit"
                component={PlenumEditor}
              />
              <Route
                path="/plenum/:electoralPeriod/:sessionNumber"
                component={Plenum}
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
