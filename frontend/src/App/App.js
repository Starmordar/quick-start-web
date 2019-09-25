import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import CreateWorkspace from './pages/CreateWorkspace/CreateWorkspace';
import Registration from './pages/Registration/Registrations';
import CreateNewWorkspace from './pages/CreateNewWorkspace/CreateNewWorkspace';

class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={CreateWorkspace}/>
          <Route exact path='/registration' component={Registration}/>
          <Route exact path='/prackRoom' component={CreateNewWorkspace}/>
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