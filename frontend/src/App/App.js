import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import CreateWorkspace from './pages/CreateWorkspace/CreateWorkspace';
import LoginPage from './pages/LoginPage/LoginPage';
import CreateNewWorkspace from './pages/CreateNewWorkspace/CreateNewWorkspace';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';

class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={CreateWorkspace}/>
          <Route exact path='/auth' component={LoginPage}/>
          <Route exact path='/registration' component={RegistrationPage}/>
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