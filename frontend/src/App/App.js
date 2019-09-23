import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import CreateWorkspace from './pages/CreateWorkspace/CreateWorkspace';

class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={CreateWorkspace}/>
        </Switch>
      </div>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    );
  }
}

export default App;