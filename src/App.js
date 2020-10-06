import React from 'react';
import './App.css';
import Auth from './components/Auth';
import Contacts from './components/Contacts';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";

function App() {

  return (
    <Router>
      <header className="App-header">    
        <Link to="/auth"><h1>CONTACTS</h1></Link>    
      </header>
      <Switch>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/contacts">
          <Contacts />
        </Route>
      </Switch>
    </Router>    
  );
}

export default App;
