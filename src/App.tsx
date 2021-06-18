import React from 'react';
import { Router } from '@reach/router'
// import { Counter } from './features/counter/Counter';
import './App.css';
import DevTools from './logic/utils/DevTools';

import { Home } from './pages/Home'
import { Summary } from './pages/Sumamry'
import { Header } from './components/Header'

function App() {
  return (
    <div className="App">
      <Header />
    {
      !process.env.production && (
        <DevTools />
      )
    }
    <Router className="router">
      <Home path="/"/>
      <Summary path="/summary/:customerID/:orderID" />
    </Router>
    </div>
  );
}

export default App;
